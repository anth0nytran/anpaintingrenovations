'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const ADDRESS_ABBREVIATIONS: Record<string, string> = {
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    northeast: 'NE',
    northwest: 'NW',
    southeast: 'SE',
    southwest: 'SW',
    street: 'St',
    avenue: 'Ave',
    road: 'Rd',
    drive: 'Dr',
    lane: 'Ln',
    boulevard: 'Blvd',
    place: 'Pl',
    court: 'Ct',
    circle: 'Cir',
    terrace: 'Ter',
    parkway: 'Pkwy',
    highway: 'Hwy',
    suite: 'Ste',
    apartment: 'Apt',
    floor: 'Fl',
};

const titleCaseWord = (word: string) =>
    word
        .split('-')
        .map((segment) =>
            segment
                .split("'")
                .map((part) => {
                    if (!part) return part;
                    const lower = part.toLowerCase();
                    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
                })
                .join("'")
        )
        .join('-');

const normalizeAddress = (value: string) => {
    const cleaned = value
        .replace(/\r\n/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ', ')
        .trim();

    if (!cleaned) return '';

    return cleaned
        .split(' ')
        .map((token) => {
            const match = token.match(/^(.+?)([.,])?$/);
            if (!match) return token;

            const core = match[1];
            const suffix = match[2] ?? '';
            const key = core.toLowerCase().replace(/\./g, '');
            const mapped = ADDRESS_ABBREVIATIONS[key];
            if (mapped) return `${mapped}${suffix}`;

            if (/^\d+[A-Za-z]?$/.test(core)) return `${core.toUpperCase()}${suffix}`;
            if (/^[A-Za-z][A-Za-z'-]*$/.test(core)) return `${titleCaseWord(core)}${suffix}`;
            return `${core}${suffix}`;
        })
        .join(' ');
};

const normalizeZipCode = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export default function QuoteForm() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formError, setFormError] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [homeAddressValue, setHomeAddressValue] = useState('');
    const [zipCodeValue, setZipCodeValue] = useState('');
    const [timestamp] = useState(() => Date.now().toString());

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 10);
        if (digits.length === 0) return '';
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };

    const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setFormStatus('sending');
        const form = event.currentTarget;
        const fd = new FormData(form);
        const name = String(fd.get('name') || '').trim();
        const phone = String(fd.get('phone') || '').trim();
        const email = String(fd.get('email') || '').trim();
        const homeAddressRaw = String(fd.get('homeAddress') || fd.get('home_address') || '').trim();
        const homeAddress = normalizeAddress(homeAddressRaw);
        const zipCodeRaw = String(fd.get('zipCode') || fd.get('zip_code') || '').trim();
        const zipCode = normalizeZipCode(zipCodeRaw);
        const service = String(fd.get('service') || '').trim();
        const honeypot = String(fd.get('website') || '').trim();
        if (homeAddress) fd.set('homeAddress', homeAddress);
        if (zipCode) fd.set('zipCode', zipCode);
        setHomeAddressValue(homeAddress);
        setZipCodeValue(zipCode);
        if (honeypot) { form.reset(); setPhoneValue(''); setHomeAddressValue(''); setZipCodeValue(''); setFormStatus('success'); return; }
        if (!name || !phone || !email || !homeAddress || !zipCode || !service) {
            setFormStatus('error');
            setFormError('Please provide your name, phone, email, home address, zip code, and service needed.');
            return;
        }
        try {
            const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
            const payload = await res.json().catch(() => null);
            if (!res.ok || !payload?.ok) { setFormStatus('error'); setFormError(payload?.error || 'Something went wrong. Please try again.'); return; }
            form.reset(); setPhoneValue(''); setHomeAddressValue(''); setZipCodeValue(''); setFormStatus('success');
        } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
    };

    const inputCls = 'w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all';

    return (
        <div className="rounded-2xl p-6 sm:p-8 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/50 shadow-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Get Your Free Estimate</h2>
                <p className="text-sm text-neutral-400">No obligation. We respond within 24 hours.</p>
            </div>

            <form className="space-y-4" action="/api/lead" method="POST" onSubmit={handleLeadSubmit}>
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="company_url" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="fax" style={{ opacity: 0, height: 0, width: 0, position: 'absolute' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="address2" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="hidden" name="_ts" value={timestamp} />
                {/* We can grab the page URL in the parent or let it be handled by hidden inputs if we really need it, but for now simple is better */}
                {/* <input type="hidden" name="page" value={pageUrl} /> */}

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Name</label>
                        <input required name="name" type="text" placeholder="John Doe" className={inputCls} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Phone</label>
                        <input required name="phone" type="tel" placeholder="(713) 555-0123" value={phoneValue} onChange={e => setPhoneValue(formatPhone(e.target.value))} className={inputCls} />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Email</label>
                    <input required name="email" type="email" placeholder="you@email.com" className={inputCls} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Home Address</label>
                        <input
                            required
                            name="homeAddress"
                            type="text"
                            autoComplete="street-address"
                            placeholder="1234 Westheimer Rd"
                            value={homeAddressValue}
                            onChange={(e) => setHomeAddressValue(e.target.value)}
                            onBlur={(e) => {
                                const normalized = normalizeAddress(e.target.value);
                                setHomeAddressValue(normalized);
                            }}
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">ZIP Code</label>
                        <input
                            required
                            name="zipCode"
                            type="text"
                            autoComplete="postal-code"
                            inputMode="numeric"
                            placeholder="77006"
                            value={zipCodeValue}
                            onChange={(e) => setZipCodeValue(normalizeZipCode(e.target.value))}
                            onBlur={(e) => setZipCodeValue(normalizeZipCode(e.target.value))}
                            className={inputCls}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Service Needed</label>
                    <select required name="service" className={inputCls}>
                        <option value="">Select a service...</option>
                        {['Painting Services', 'Kitchen Renovations', 'Full Home Renovations', 'Bathroom Renovation', 'Drywall & Repairs', 'Power Washing', 'Cabinets', 'Siding', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Project Details</label>
                    <textarea name="message" rows={2} placeholder="Briefly describe your project..." className={`${inputCls} resize-none`} />
                </div>

                <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                    {formStatus === 'sending' ? 'Sending...' : 'Request Free Estimate'} <ArrowRight className="w-4 h-4" />
                </button>

                {formStatus === 'success' && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg flex items-center gap-2">
                        <Check className="w-4 h-4" /> Message received! We&apos;ll call you shortly.
                    </div>
                )}
                {formStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">{formError}</div>
                )}
            </form>
        </div>
    );
}
