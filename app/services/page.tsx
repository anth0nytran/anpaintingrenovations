'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Paintbrush, Home, Hammer, Check } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';
const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

export default function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="relative bg-black text-white">
      <Navigation onQuoteClick={() => window.location.href = '/contact'} />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className={`${shell} relative z-10`}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-red-500 font-semibold uppercase tracking-widest text-xs mb-5 block">What We Do</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
              Painting. Remodeling.<br /><span className="text-blue-500">Done Right.</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
              Three core services. One standard of excellence. Every project backed by 15+ years of experience and our 100% satisfaction guarantee.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="flex flex-wrap gap-3 mt-10">
            {[
              { label: 'Painting', href: '#painting', icon: Paintbrush },
              { label: 'Kitchen & Bath', href: '#kitchen-bath', icon: Home },
              { label: 'Renovations', href: '#renovations', icon: Hammer },
            ].map(s => (
              <a key={s.href} href={s.href} className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-700 hover:border-red-500 hover:bg-red-500/5 rounded-lg text-sm font-semibold text-neutral-300 hover:text-white transition-all">
                <s.icon className="h-4 w-4 text-blue-400" /> {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SERVICE 01 — PAINTING ════════════════ */}
      <section id="painting" className="py-24 md:py-32 bg-black scroll-mt-20 border-t border-neutral-800/50">
        <div className={shell}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[80px] md:text-[100px] font-bold leading-none text-white/[0.04] select-none">01</span>
                <div>
                  <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest block mb-1">Service</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Interior &amp; Exterior Painting
                  </h2>
                </div>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed mb-4 max-w-lg">
                Premium residential and commercial painting services across Houston. From accent walls to full exterior transformations — flawless results, every time.
              </p>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-lg">
                We use top-quality paints, meticulous surface preparation, and protect your property throughout the entire process. Your home or business deserves a finish that lasts.
              </p>

              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all uppercase tracking-wider group">
                Get a Free Painting Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Interior Painting',
                  'Exterior Painting',
                  'Color Consultation',
                  'Surface Preparation',
                  'Cabinet Refinishing',
                  'Trim & Door Painting',
                  'Commercial Painting',
                  'Pressure Wash & Prep',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-neutral-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ SERVICE 02 — KITCHEN & BATH ════════════════ */}
      <section id="kitchen-bath" className="py-24 md:py-32 bg-neutral-950 scroll-mt-20 border-t border-neutral-800/50">
        <div className={shell}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Features FIRST on desktop (left), content second (right) — reversed layout */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Kitchen Remodels',
                  'Bathroom Renovations',
                  'Custom Cabinetry',
                  'Countertop Installation',
                  'Tile & Backsplash',
                  'Fixture Upgrades',
                  'Plumbing Coordination',
                  'Full Design Service',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-neutral-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[80px] md:text-[100px] font-bold leading-none text-white/[0.04] select-none">02</span>
                <div>
                  <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest block mb-1">Service</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Kitchen &amp; Bath Remodeling
                  </h2>
                </div>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed mb-4 max-w-lg">
                Complete kitchen and bathroom renovations that boost your home&apos;s value and transform your daily living. Custom cabinets, countertops, tile, and fixtures — handled from design to final walkthrough.
              </p>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-lg">
                Our team coordinates every trade so you get a single point of contact. No surprises, no hidden costs — just a stunning result delivered on time and on budget.
              </p>

              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all uppercase tracking-wider group">
                Get a Free Remodeling Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ SERVICE 03 — FULL RENOVATIONS ════════════════ */}
      <section id="renovations" className="py-24 md:py-32 bg-black scroll-mt-20 border-t border-neutral-800/50">
        <div className={shell}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[80px] md:text-[100px] font-bold leading-none text-white/[0.04] select-none">03</span>
                <div>
                  <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest block mb-1">Service</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Full Home Renovations
                  </h2>
                </div>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed mb-4 max-w-lg">
                From single-room upgrades to whole-house transformations — drywall, siding, flooring, framing, and everything in between. One contractor, one standard, start to finish.
              </p>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-lg">
                Whether you&apos;re updating a dated property, prepping for sale, or building your dream home — we manage every detail so you don&apos;t have to.
              </p>

              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all uppercase tracking-wider group">
                Get a Free Renovation Estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Whole-House Remodeling',
                  'Drywall & Texturing',
                  'Flooring Installation',
                  'Siding & Exterior',
                  'Doors & Windows',
                  'Framing & Structural',
                  'Power Washing',
                  'Property Prep & Flip',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-neutral-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ TRUST STRIP ════════════════ */}
      <section className="py-16 bg-neutral-950 border-t border-neutral-800/50">
        <div className={shell}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '100%', label: 'Satisfaction Guaranteed' },
              { value: '5.0', label: 'Google Rating' },
              { value: '24hr', label: 'Response Time' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-800 to-red-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className={`${shell} relative z-10 text-center`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-red-100 text-lg max-w-xl mx-auto mb-10">
            Free estimates. No obligation. Serving Houston, Katy, Sugar Land, Pearland, Cypress, The Woodlands, and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-white hover:bg-neutral-100 text-red-700 font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              Get Your Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${CLEAN_PHONE}`} className="px-10 py-4 border-2 border-white/40 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="flex gap-2 p-2 bg-black/95 backdrop-blur-md border border-neutral-800 shadow-2xl rounded-xl">
          <a href={`tel:${CLEAN_PHONE}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-700 transition-colors">
            <Phone className="h-3 w-3" /> Call Us
          </a>
          <Link href="/contact" className="flex-1 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-red-700 transition-colors text-center">
            Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
