'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Check, Clock, MapPin, ShieldCheck, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';
const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => { setPageUrl(window.location.href); }, []);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('sending');
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const service = String(fd.get('service') || '').trim();
    const honeypot = String(fd.get('website') || '').trim();
    if (honeypot) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    if (!name || !phone || !email || !service) { setFormStatus('error'); setFormError('Please fill out all required fields.'); return; }
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.ok) { setFormStatus('error'); setFormError(payload?.error || 'Something went wrong. Please try again.'); return; }
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
  };

  const inputCls = 'w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all';

  return (
    <div className="relative bg-black text-white">
      <Navigation onQuoteClick={scrollToForm} />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className={`${shell} relative z-10`}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
            <span className="text-red-500 font-semibold uppercase tracking-widest text-xs mb-5 block">Contact Us</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
              Let&apos;s Start<br /><span className="text-blue-500">Your Project.</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Free estimates, no obligation. Tell us what you need and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ FORM + INFO ════════════════ */}
      <section className="py-16 md:py-24 bg-black border-t border-neutral-800/50">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-start">

            {/* Form */}
            <motion.div id="contact-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="rounded-2xl p-8 sm:p-10 bg-neutral-950 border border-neutral-800">
                <h2 className="text-2xl font-bold text-white mb-1">Request Your Free Estimate</h2>
                <p className="text-neutral-500 text-sm mb-8">We respond within 24 hours — usually much sooner.</p>

                <form className="space-y-4" action="/api/lead" method="POST" onSubmit={handleSubmit}>
                  <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <input type="text" name="company_url" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <input type="text" name="fax" style={{ opacity: 0, height: 0, width: 0, position: 'absolute' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <input type="text" name="address2" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <input type="hidden" name="_ts" value={Date.now().toString()} />
                  <input type="hidden" name="page" value={pageUrl} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Name *</label>
                      <input required name="name" type="text" placeholder="John Doe" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Phone *</label>
                      <input required name="phone" type="tel" placeholder="(713) 555-0123" value={phoneValue} onChange={e => setPhoneValue(formatPhone(e.target.value))} className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Email *</label>
                    <input required name="email" type="email" placeholder="you@email.com" className={inputCls} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Service *</label>
                    <select required name="service" className={inputCls}>
                      <option value="">Select a service...</option>
                      {['Painting Services', 'Kitchen Remodels', 'Full House Remodeling', 'Bathroom Renovation', 'Drywall & Repairs', 'Power Washing', 'Cabinets', 'Siding', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Project Details</label>
                    <textarea name="message" rows={3} placeholder="Tell us about your project..." className={`${inputCls} resize-none`} />
                  </div>

                  <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                    {formStatus === 'sending' ? 'Sending...' : 'Submit Request'} <ArrowRight className="w-4 h-4" />
                  </button>

                  {formStatus === 'success' && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg flex items-center gap-2">
                      <Check className="w-5 h-5 shrink-0" /> Message received! We&apos;ll get back to you within 24 hours.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">{formError}</div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="space-y-5 lg:sticky lg:top-28">
              {/* Phone */}
              <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Call or Text</h3>
                    <a href={`tel:${CLEAN_PHONE}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors">{PHONE}</a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-3">Hours</h3>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between"><span className="text-neutral-500">Mon – Sat</span><span className="text-neutral-300">7am – 6pm</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Sunday</span><span className="text-neutral-500">Closed</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">Service Area</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">Houston and surrounding 25-mile radius — Katy, Sugar Land, Pearland, Cypress, The Woodlands, Spring, and more.</p>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="space-y-3">
                  {[
                    { icon: ShieldCheck, text: 'Fully Licensed & Insured', color: 'text-blue-400' },
                    { icon: Star, text: '5.0 Star Google Rating', color: 'text-amber-400' },
                    { icon: Check, text: '100% Satisfaction Guarantee', color: 'text-emerald-400' },
                  ].map(f => (
                    <div key={f.text} className="flex items-center gap-3">
                      <f.icon className={`h-4 w-4 ${f.color} shrink-0`} />
                      <span className="text-sm text-neutral-300">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-800 to-red-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className={`${shell} relative z-10 text-center`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Prefer to Talk?
          </h2>
          <p className="text-red-100 text-lg max-w-lg mx-auto mb-10">
            Give us a call and we&apos;ll walk you through the process. Free estimates, no obligation.
          </p>
          <a href={`tel:${CLEAN_PHONE}`} className="px-10 py-4 bg-white hover:bg-neutral-100 text-red-700 font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="flex gap-2 p-2 bg-black/95 backdrop-blur-md border border-neutral-800 shadow-2xl rounded-xl">
          <a href={`tel:${CLEAN_PHONE}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-700 transition-colors">
            <Phone className="h-3 w-3" /> Call Us
          </a>
          <button onClick={scrollToForm} className="flex-1 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-red-700 transition-colors">
            Free Quote
          </button>
        </div>
      </div>
    </div>
  );
}
