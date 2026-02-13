'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Star, Check, ClipboardList, Hammer, ArrowRight, Paintbrush, Home } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';
import ParallaxCTA from './components/ParallaxCTA';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const config = {
  businessName: 'A&N Painting and Renovations',
  businessOwner: 'Jaime Guillen',
  city: 'Houston, TX',
  phone: '(832) 267-6657',
  primaryService: 'Painting & Renovations',
  services: ['Interior & Exterior Painting', 'Kitchen & Bath Renovations', 'Full Home Renovations'],

  testimonials: [
    { quote: "Jaime and his crew did an amazing job painting our entire home. The attention to detail was outstanding and the whole process was smooth from start to finish. Highly recommend!", name: 'Maria G.', highlight: 'Attention to detail was outstanding' },
    { quote: "We hired A&N for a full kitchen renovation and couldn't be happier. Clear estimate upfront, no surprises, and the finished result exceeded our expectations.", name: 'Robert T.', highlight: 'The finished result exceeded our expectations' },
    { quote: "Professional, on time, and great communication throughout the entire project. Our bathroom renovation looks incredible. Will definitely hire again!", name: 'Sarah M.', highlight: 'Professional, on time, and great communication' },
    { quote: "From the free estimate to the final walkthrough, everything was handled with care. Fair pricing and quality work. Satisfaction guaranteed is right!", name: 'David L.', highlight: 'Fair pricing and quality work' },
    { quote: "A&N completely transformed our living space. The drywall repairs and fresh paint made our home feel brand new. Highly recommend for any renovation project.", name: 'Jennifer W.', highlight: 'Completely transformed our living space' },
    { quote: "Great experience from start to finish. The crew was respectful, cleaned up every day, and delivered exactly what was promised. Will be calling them back for more work!", name: 'Michael R.', highlight: 'Delivered exactly what was promised' },
  ],

  faqs: [
    { q: 'Do you offer free estimates?', a: 'Yes! We provide 100% free, clear written estimates for all services including interior painting, kitchen renovations, and full home renovations in Houston, TX. No pressure, no obligation.' },
    { q: 'What areas in Houston do you serve?', a: 'We serve the entire Houston metro area within a 25-mile radius — including Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, Humble, Pasadena, Missouri City, and Baytown.' },
    { q: 'Are you licensed and insured?', a: 'Absolutely. A&N Painting and Renovations is fully licensed and insured for both residential and commercial projects. Your property and peace of mind are always protected.' },
    { q: 'Do you handle both residential and commercial projects?', a: 'Yes. We provide painting and renovation services for homeowners, property managers, landlords, and commercial businesses throughout the greater Houston area.' },
    { q: 'What painting services do you offer?', a: 'We specialize in both interior and exterior painting — from single accent walls to full exterior makeovers. Our team uses premium paints and meticulous prep work for a flawless, long-lasting finish.' },
    { q: 'What types of renovations do you offer?', a: 'We provide complete kitchen renovations, bathroom renovations, full home renovations, drywall repair, cabinet installation, siding, power washing, and more. No project is too big or too small.' },
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
export default function ANPaintingRenovations() {
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), []);
  const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(config.testimonials.length / reviewsPerPage);
  const nextReviewPage = () => setReviewPage((p) => (p + 1) % totalReviewPages);
  const prevReviewPage = () => setReviewPage((p) => (p - 1 + totalReviewPages) % totalReviewPages);

  const scrollToQuote = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // navLinks removed — using shared Navigation component

  const coreServices = [
    { name: 'Interior & Exterior Painting', icon: Paintbrush, desc: 'Premium residential and commercial painting services in Houston. Expert color matching, meticulous surface preparation, and top-quality paints for a flawless, long-lasting finish inside and out.', image: '/images/painting.webp', link: '/services#painting' },
    { name: 'Kitchen & Bath Renovations', icon: Home, desc: 'Complete kitchen and bathroom renovations that increase your home\'s value. Custom cabinets, countertops, fixtures, tile work, and full-service design from concept to completion.', image: '/images/kitchen.webp', link: '/services#kitchen-bath' },
    { name: 'Full Home Renovations', icon: Hammer, desc: 'Comprehensive home renovations for Houston homeowners. From single-room upgrades to whole-house transformations - drywall, siding, flooring, and everything in between.', image: '/images/renovation.JPG', link: '/services#renovations' },
  ];

  const steps = [
    { title: 'Request Your Free Estimate', body: 'Call, text, or fill out our form. We respond within hours to schedule a walkthrough at your convenience.', icon: ClipboardList },
    { title: 'Review Your Written Quote', body: 'We assess your project on-site and provide a detailed, itemized written estimate. No pressure, no hidden costs.', icon: Check },
    { title: 'We Deliver Results', body: 'Our experienced crew completes your project on time and on budget. We don\'t stop until you\'re 100% satisfied.', icon: Hammer },
  ];



  return (
    <div id="top" className="relative bg-black text-white">

      {/* ════════════════ NAV ════════════════ */}
      <Navigation onQuoteClick={scrollToQuote} />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <NextImage src="/images/hero_background1.webp" alt="Premium kitchen renovation by A&N Painting and Renovations in Houston TX" fill className="object-cover" priority quality={82} sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className={`${shell} relative z-20 pt-28 pb-20 lg:pt-36 lg:pb-0 flex-1 lg:flex lg:items-center`}>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center w-full lg:pb-20">

            {/* Left — Hero Copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Houston&apos;s Trusted Contractor</span>
              </div>

              <h1 className="font-bold leading-[1.05] tracking-tight text-white">
                <span className="block text-2xl sm:text-3xl lg:text-4xl mb-4 font-medium tracking-wide">A&amp;N Painting and Renovations</span>
                <span className="text-5xl sm:text-6xl lg:text-7xl block">
                  Houston&apos;s Premier<br />
                  <span className="text-red-600">Painting</span> &amp; <span className="text-blue-500">Renovations.</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-neutral-300 max-w-lg">
                Houston&apos;s top-rated contractor. Specializing in <strong className="text-white font-semibold">interior &amp; exterior painting</strong>, <strong className="text-white font-semibold">luxury kitchen remodels</strong>, and <strong className="text-white font-semibold">complete home makeovers</strong>. Licensed, insured, and committed to excellence.
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
              <QuoteForm />
            </motion.div>
          </div>
        </div>

        {/* Review ticker */}
        <div className="relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-md py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {config.testimonials.concat(config.testimonials).map((r, i) => (
              <div key={i} className="mx-10 flex items-center gap-3 opacity-80">
                <div className="flex text-amber-400">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-current" />)}</div>
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
            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs">Our Expert Services</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-4">Painting, Kitchens &amp; <span className="text-blue-500">Renovations</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mt-4">Trusted by homeowners across Houston for expert painting, kitchen and bath renovations, and full home renovations. Every project backed by our 100% satisfaction guarantee.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {coreServices.map((svc) => (
              <div key={svc.name} className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-red-500/30 transition-all duration-500 flex flex-col">
                {/* Photo-ready area */}
                <div className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden">
                  <NextImage
                    src={svc.image}
                    alt={svc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={82}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-7 md:p-9 flex-1 flex flex-col relative z-20 bg-neutral-900 border-t border-white/5">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{svc.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{svc.desc}</p>
                  <Link href={svc.link} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500 transition-colors self-start group/btn">
                    Explore Service <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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
      <ParallaxCTA
        imageSrc="/images/ctas.webp"
        title={<>Ready to Transform<br className="hidden sm:block" /> Your Space?</>}
        description="Get a free, no-obligation estimate from Houston's most trusted painting and renovation team. Transparent pricing. No hidden fees."
        primaryBtnText="Get Your Free Estimate"
        secondaryBtnText="Call Now"
        onPrimaryClick={scrollToQuote}
        phone={config.phone}
        phoneHref={cleanPhone}
        smallText="Trusted by Homeowners Across Houston"
      />

      {/* ════════════════ WHY US ════════════════ */}
      <section id="why-us" className="py-24 md:py-32 bg-black">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">Why Homeowners Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Why Houston Chooses<br /><span className="text-blue-500">A&amp;N Renovations.</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-12">
                We&apos;ve built our reputation on clear communication, fair pricing, and delivering exactly what we promise. That&apos;s why A&amp;N is Houston&apos;s trusted choice for painting and home improvements.
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


      {/* ════════════════ CTA BANNER 2 — Service Area ════════════════ */}
      <ParallaxCTA
        imageSrc="/images/ctas2.webp"
        title={<>Your Vision, <span className="text-blue-500">Our Craft.</span></>}
        description="From complete home renovations to minor repairs, we proudly serve Houston, Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, and surrounding communities."
        primaryBtnText="Book Consultation"
        secondaryBtnText={config.phone}
        onPrimaryClick={scrollToQuote}
        phone={config.phone}
        phoneHref={cleanPhone}
        smallText="Serving the Greater Houston Area"
      />

      {/* ════════════════ FAQ ════════════════ */}
      <section id="faq" className="py-24 md:py-32 bg-black">
        <div className={shell}>
          <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-16 items-start">
            <div className="md:sticky md:top-28">
              <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Frequently Asked <span className="text-blue-500">Questions</span></h2>
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
      <ParallaxCTA
        title="Let's Build Something Great."
        description="From complete home renovations to a fresh coat of paint, satisfaction guaranteed. Serving Houston and the surrounding 25-mile area."
        primaryBtnText="Get Your Free Quote"
        secondaryBtnText={config.phone}
        onPrimaryClick={scrollToQuote}
        phone={config.phone}
        phoneHref={cleanPhone}
        smallText=""
      />

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
