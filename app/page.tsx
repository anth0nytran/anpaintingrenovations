'use client';

import { useMemo, useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Star, Check, ClipboardList, Hammer, ArrowRight, Paintbrush, Home } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const config = {
  businessName: 'A&N Painting and Remodeling',
  businessOwner: 'Jaime Guillen',
  city: 'Houston, TX',
  phone: '(832) 267-6657',
  primaryService: 'Painting Services',
  services: ['Kitchen Remodels', 'Full House Remodeling', 'Drywall & Repairs'],

  testimonials: [
    { quote: "Jaime and his crew did an amazing job painting our entire home. The attention to detail was outstanding and the whole process was smooth from start to finish. Highly recommend!", name: 'Maria G.', highlight: 'Attention to detail was outstanding' },
    { quote: "We hired A&N for a full kitchen remodel and couldn't be happier. Clear estimate upfront, no surprises, and the finished result exceeded our expectations.", name: 'Robert T.', highlight: 'The finished result exceeded our expectations' },
    { quote: "Professional, on time, and great communication throughout the entire project. Our bathroom renovation looks incredible. Will definitely hire again!", name: 'Sarah M.', highlight: 'Professional, on time, and great communication' },
    { quote: "From the free estimate to the final walkthrough, everything was handled with care. Fair pricing and quality work. Satisfaction guaranteed is right!", name: 'David L.', highlight: 'Fair pricing and quality work' },
    { quote: "A&N completely transformed our living space. The drywall repairs and fresh paint made our home feel brand new. Highly recommend for any renovation project.", name: 'Jennifer W.', highlight: 'Completely transformed our living space' },
    { quote: "Great experience from start to finish. The crew was respectful, cleaned up every day, and delivered exactly what was promised. Will be calling them back for more work!", name: 'Michael R.', highlight: 'Delivered exactly what was promised' },
  ],

  faqs: [
    { q: 'Do you offer free estimates?', a: 'Yes! We provide 100% free, clear written estimates for all services including interior painting, kitchen remodels, and full home renovations in Houston, TX. No pressure, no obligation.' },
    { q: 'What areas in Houston do you serve?', a: 'We serve the entire Houston metro area within a 25-mile radius — including Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, Humble, Pasadena, Missouri City, and Baytown.' },
    { q: 'Are you licensed and insured?', a: 'Absolutely. A&N Painting and Remodeling is fully licensed and insured for both residential and commercial projects. Your property and peace of mind are always protected.' },
    { q: 'Do you handle both residential and commercial projects?', a: 'Yes. We provide painting and renovation services for homeowners, property managers, landlords, and commercial businesses throughout the greater Houston area.' },
    { q: 'What painting services do you offer?', a: 'We specialize in both interior and exterior painting — from single accent walls to full exterior makeovers. Our team uses premium paints and meticulous prep work for a flawless, long-lasting finish.' },
    { q: 'What types of renovations do you offer?', a: 'We provide complete kitchen remodels, bathroom renovations, full home remodeling, drywall repair, cabinet installation, siding, power washing, and more. No project is too big or too small.' },
  ],
};

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ANPaintingRemodeling() {
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), []);
  const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(config.testimonials.length / reviewsPerPage);
  const nextReviewPage = () => setReviewPage((p) => (p + 1) % totalReviewPages);
  const prevReviewPage = () => setReviewPage((p) => (p - 1 + totalReviewPages) % totalReviewPages);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const scrollToQuote = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => { setPageUrl(window.location.href); }, []);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    if (!name || !phone || !email || !service) { setFormStatus('error'); setFormError('Please provide your name, phone, email, and service needed.'); return; }
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.ok) { setFormStatus('error'); setFormError(payload?.error || 'Something went wrong. Please try again.'); return; }
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
  };

  // navLinks removed — using shared Navigation component

  const coreServices = [
    { name: 'Interior & Exterior Painting', icon: Paintbrush, desc: 'Premium residential and commercial painting services in Houston. Expert color matching, meticulous surface preparation, and top-quality paints for a flawless, long-lasting finish inside and out.' },
    { name: 'Kitchen & Bath Remodeling', icon: Home, desc: 'Complete kitchen and bathroom renovations that increase your home\'s value. Custom cabinets, countertops, fixtures, tile work, and full-service design from concept to completion.' },
    { name: 'Full Home Renovations', icon: Hammer, desc: 'Comprehensive home remodeling for Houston homeowners. From single-room upgrades to whole-house transformations — drywall, siding, flooring, and everything in between.' },
  ];

  const steps = [
    { title: 'Request Your Free Estimate', body: 'Call, text, or fill out our form. We respond within hours to schedule a walkthrough at your convenience.', icon: ClipboardList },
    { title: 'Review Your Written Quote', body: 'We assess your project on-site and provide a detailed, itemized written estimate. No pressure, no hidden costs.', icon: Check },
    { title: 'We Deliver Results', body: 'Our experienced crew completes your project on time and on budget. We don\'t stop until you\'re 100% satisfied.', icon: Hammer },
  ];

  const inputCls = 'w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all';

  return (
    <div id="top" className="relative bg-black text-white">

      {/* ════════════════ NAV ════════════════ */}
      <Navigation onQuoteClick={scrollToQuote} />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <NextImage src="/images/hero.jpeg" alt="Premium kitchen remodel by A&N Painting and Remodeling in Houston TX" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className={`${shell} relative z-20 pt-28 pb-20 lg:pt-36 lg:pb-0 flex-1 lg:flex lg:items-center`}>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center w-full lg:pb-20">

            {/* Left — Hero Copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Houston&apos;s Trusted Contractor</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Premium Painting<br />
                <span className="text-blue-500">&amp; Remodeling.</span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-neutral-300 max-w-lg">
                Houston&apos;s top-rated contractor for interior &amp; exterior painting, kitchen remodels, and complete home renovations. Licensed, insured, and committed to excellence.
              </p>

              <div className="flex flex-wrap gap-10 pt-6 border-t border-white/10">
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '100%', label: 'Satisfaction Rate' },
                  { value: '5.0', label: 'Google Rating' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Quote Form */}
            <motion.div id="quote-form" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
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
                  <input type="hidden" name="_ts" value={Date.now().toString()} />
                  <input type="hidden" name="page" value={pageUrl} />

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

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wide">Service Needed</label>
                    <select required name="service" className={inputCls}>
                      <option value="">Select a service...</option>
                      {['Painting Services', 'Kitchen Remodels', 'Full House Remodeling', 'Bathroom Renovation', 'Drywall & Repairs', 'Power Washing', 'Cabinets', 'Siding', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
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
            </motion.div>
          </div>
        </div>

        {/* Review ticker */}
        <div className="relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-md py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {config.testimonials.concat(config.testimonials).map((r, i) => (
              <div key={i} className="mx-10 flex items-center gap-3 opacity-80">
                <div className="flex text-amber-400">{[1,2,3,4,5].map(n => <Star key={n} className="h-3 w-3 fill-current" />)}</div>
                <span className="text-sm text-neutral-300 italic">&ldquo;{r.highlight}&rdquo;</span>
                <span className="text-xs font-semibold text-neutral-500">— {r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation:marquee 35s linear infinite}` }} />

      {/* ════════════════ SERVICES — 3-COLUMN GRID ════════════════ */}
      <section id="services" className="relative py-24 md:py-32 bg-neutral-950">
        <div className={shell}>
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs">Our Core Services</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-4">What We Do Best</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mt-4">Trusted by homeowners across Houston for expert painting, kitchen remodels, and full home renovations. Every project backed by our 100% satisfaction guarantee.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {coreServices.map((svc, i) => (
              <div key={svc.name} className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-red-500/30 transition-all duration-500 flex flex-col">
                {/* Photo-ready area */}
                <div className={`relative h-64 md:h-72 bg-gradient-to-br ${i === 0 ? 'from-blue-950/80 via-neutral-900 to-neutral-950' : i === 1 ? 'from-neutral-800 via-neutral-900 to-neutral-950' : 'from-red-950/40 via-neutral-900 to-neutral-950'} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.03) 60%, transparent 60%)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10">
                    <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/20 group-hover:border-red-500/30 transition-all duration-500">
                      <svc.icon className="h-10 w-10 text-blue-400 group-hover:text-red-400 transition-colors duration-500" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{svc.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{svc.desc}</p>
                  <button onClick={scrollToQuote} className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all self-start group/btn">
                    Get a Free Quote <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional services note */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 text-sm">Also offering: <span className="text-neutral-300">Drywall Repair</span> &middot; <span className="text-neutral-300">Power Washing</span> &middot; <span className="text-neutral-300">Bathroom Upgrades</span> &middot; <span className="text-neutral-300">Cabinet Installation</span> &middot; <span className="text-neutral-300">Siding</span></p>
          </div>
        </div>
      </section>

      {/* ════════════════ CTA BANNER 1 ════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className={`${shell} relative z-10 text-center`}>
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4 block">Trusted by Homeowners Across Houston</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Transform<br className="hidden sm:block" /> Your Space?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Get a free, no-obligation estimate from Houston&apos;s most trusted painting and renovation team. Transparent pricing. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToQuote} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              Get Your Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`tel:${cleanPhone}`} className="px-8 py-4 border border-neutral-600 hover:border-neutral-400 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════ WHY US ════════════════ */}
      <section id="why-us" className="py-24 md:py-32 bg-black">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">Why Homeowners Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Honest Work.<br /><span className="text-blue-500">Guaranteed Results.</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-12">
                We&apos;ve built our reputation on clear communication, fair pricing, and delivering exactly what we promise. That&apos;s why Houston homeowners trust A&amp;N with their most important investment — their home.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-neutral-800 pt-10">
                <div>
                  <div className="text-5xl font-bold text-white">100<span className="text-red-500 text-3xl">%</span></div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-2">Satisfaction Guaranteed</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white">15<span className="text-red-500 text-3xl">+</span></div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-2">Years In Business</div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { icon: ShieldCheck, title: 'Fully Licensed & Insured', desc: 'Your property is always protected. We carry comprehensive liability coverage on every project — residential and commercial.' },
                { icon: ClipboardList, title: 'Transparent Written Estimates', desc: 'Every project starts with a detailed, itemized written quote. You\'ll know exactly what you\'re paying for before any work begins.' },
                { icon: Star, title: '5-Star Rated on Google', desc: 'Our clients consistently rate us 5 stars. We earn every review through quality craftsmanship and outstanding communication.' },
                { icon: Check, title: '100% Satisfaction Guarantee', desc: 'We don\'t consider a project finished until you\'re completely happy. If something isn\'t right, we\'ll fix it — no questions asked.' },
              ].map((f, i) => (
                <div key={i} className="group relative p-7 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:w-1.5 transition-all duration-300" />
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <f.icon className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1.5">{f.title}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ GUARANTEE ════════════════ */}
      <section className="py-20 md:py-24 bg-neutral-950 border-y border-neutral-800">
        <div className={shell}>
          <div className="grid md:grid-cols-[1fr_auto] items-center gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-red-500 font-semibold uppercase tracking-widest text-xs">Our Commitment</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                The A&amp;N Guarantee.
              </h3>
              <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl">
                Every project comes with our 100% satisfaction guarantee. If you&apos;re not completely happy with the results, we&apos;ll make it right at no additional cost. That&apos;s how confident we are in our work.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-white text-xs font-semibold">Warranty Included</span>
                <span className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-white text-xs font-semibold">5-Star Rated</span>
                <span className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-white text-xs font-semibold">Fully Insured</span>
              </div>
            </div>
            <button onClick={scrollToQuote} className="shrink-0 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════ CTA BANNER 2 — Service Area ════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className={`${shell} relative z-10`}>
          <div className="grid md:grid-cols-[1fr_auto] items-center gap-10">
            <div>
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3 block">Serving the Greater Houston Area</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Your Vision, <span className="text-blue-500">Our Craft.</span>
              </h2>
              <p className="text-neutral-400 text-base max-w-xl leading-relaxed">
                From complete home remodeling to minor repairs — we proudly serve Houston, Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, and surrounding communities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={scrollToQuote} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <a href={`tel:${cleanPhone}`} className="px-8 py-4 border border-neutral-600 hover:border-neutral-400 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> {config.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ REVIEWS ════════════════ */}
      <section id="reviews" className="py-24 md:py-32 bg-black">
        <div className={shell}>
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">Client Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">What Houston Homeowners Say</h2>
            <p className="text-neutral-400 max-w-lg mx-auto">Real reviews from real clients. See why families across Houston trust A&amp;N for their painting and renovation projects.</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={reviewPage} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="grid gap-6 md:grid-cols-3">
              {config.testimonials.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage).map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="group p-6 md:p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-blue-500/30 transition-all duration-300 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-blue-400">Verified Client</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-10 gap-4 items-center">
            <button onClick={prevReviewPage} className="p-2.5 rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-500/10 transition-all" aria-label="Previous">
              <ArrowRight className="h-4 w-4 text-neutral-400 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalReviewPages }).map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === reviewPage ? 'w-8 bg-red-500' : 'w-2 bg-neutral-700'}`} />
              ))}
            </div>
            <button onClick={nextReviewPage} className="p-2.5 rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-500/10 transition-all" aria-label="Next">
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </button>
          </div>

          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm font-semibold hover:border-blue-500 transition-all group">
              <GoogleLogo className="h-4 w-4" />
              Read All Reviews on Google
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════ PROCESS ════════════════ */}
      <section id="process" className="py-24 md:py-32 bg-neutral-950">
        <div className={shell}>
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Three Simple Steps</h2>
            <p className="text-neutral-400 max-w-md mx-auto mt-4">From your first call to project completion, we make the entire process easy and transparent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="group relative text-center p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-blue-500/30 transition-all duration-300">
                <span className="absolute top-4 right-6 text-[80px] font-bold text-white/[0.03] select-none pointer-events-none leading-none">{i + 1}</span>
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-500/10 border border-blue-500/15 mb-6 group-hover:bg-blue-600/20 transition-colors duration-300">
                  <step.icon className="h-7 w-7 text-blue-400" />
                </div>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Step {i + 1}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-neutral-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section id="faq" className="py-24 md:py-32 bg-black">
        <div className={shell}>
          <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-16 items-start">
            <div className="md:sticky md:top-28">
              <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Common Questions</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">Have a question about our painting or renovation services? We&apos;re here to help.</p>
              <a href={`tel:${cleanPhone}`} className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors">
                <Phone className="h-4 w-4" /> {config.phone}
              </a>
            </div>

            <div className="space-y-0">
              {config.faqs.map((faq, i) => (
                <details key={faq.q} className="group border-b border-neutral-800" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-base font-medium text-white hover:text-blue-400 transition-colors">
                    {faq.q}
                    <span className="ml-4 text-xl leading-none text-neutral-500 transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-6 text-sm text-neutral-400 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-red-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-800 to-red-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className={`${shell} relative z-10 text-center`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Let&apos;s Build Something Great.
          </h2>
          <p className="text-red-100 text-lg max-w-2xl mx-auto mb-10">
            From complete home remodeling to a fresh coat of paint — satisfaction guaranteed. Serving Houston and the surrounding 25-mile area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToQuote} className="px-10 py-4 bg-white hover:bg-neutral-100 text-red-700 font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              Get Your Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`tel:${cleanPhone}`} className="px-10 py-4 border-2 border-white/40 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> {config.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />

      {/* ════════════════ MOBILE STICKY BAR ════════════════ */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="flex gap-2 p-2 bg-black/95 backdrop-blur-md border border-neutral-800 shadow-2xl rounded-xl">
          <a href={`tel:${cleanPhone}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-700 transition-colors">
            <Phone className="h-3 w-3" /> Call Us
          </a>
          <button onClick={scrollToQuote} className="flex-1 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-red-700 transition-colors">
            Free Quote
          </button>
        </div>
      </div>
    </div>
  );
}
