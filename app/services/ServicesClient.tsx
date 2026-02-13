'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Check, Hammer, Paintbrush, Home } from 'lucide-react';
import NextImage from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QuoteForm from '../components/QuoteForm';
import ParallaxCTA from '../components/ParallaxCTA';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';
const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

const services = [
    {
        id: 'painting',
        title: 'Interior & Exterior Painting',
        description: 'Premium residential and commercial painting with expert color matching, meticulous surface preparation, and top-quality paints for a flawless, long-lasting finish.',
        includes: ['Interior Walls & Ceilings', 'Exterior Siding & Stucco', 'Cabinet Refinishing', 'Deck & Fence Staining', 'Color Consultation', 'Pressure Washing Prep'],
        image: '/images/painting.webp',
        imageAlt: 'Professional interior and exterior painting by A&N Painting and Renovations in Houston TX',
    },
    {
        id: 'kitchen-bath',
        title: 'Kitchen & Bath Renovations',
        description: 'Complete kitchen and bathroom renovations from concept to completion. Custom cabinetry, countertops, tile work, fixtures, and full-service design that increases your home\'s value.',
        includes: ['Custom Cabinetry', 'Countertop Installation', 'Tile & Backsplash', 'Vanity Upgrades', 'Shower & Tub Install', 'Lighting & Fixtures'],
        image: '/images/kitchen.webp',
        imageAlt: 'Kitchen and bathroom renovation by A&N Painting and Renovations in Houston TX',
    },
    {
        id: 'renovations',
        title: 'Full Home Renovations',
        description: 'Comprehensive renovations for major projects. We manage every detail — from structural changes to the final coat of paint — ensuring a stress-free process and exceptional results.',
        includes: ['Whole Home Makeovers', 'Drywall & Texturing', 'Flooring Installation', 'Siding & Roofing', 'Door & Window Install', 'Project Management'],
        image: '/images/renovation.JPG',
        imageAlt: 'Full home renovation and remodeling by A&N Painting and Renovations in Houston TX',
    },
];

const steps = [
    { number: '01', title: 'Consultation', body: 'We start with a thorough on-site walkthrough to understand your vision and assess the specific requirements of your space.' },
    { number: '02', title: 'Detailed Proposal', body: 'We deliver a transparent, itemized estimate that outlines scope, materials, and timeline—so you know exactly what to expect.' },
    { number: '03', title: 'Expert Execution', body: 'Our skilled craftsmen work with precision and respect for your home, delivering high-quality results on time and on budget.' },
];

const faqs = [
    { q: 'What areas in Houston do you serve?', a: 'We serve the entire Houston metro area within a 25-mile radius — including Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, Humble, Pasadena, Missouri City, and Baytown.' },
    { q: 'Do you offer free estimates?', a: 'Yes! We provide 100% free, detailed written estimates for all services. No pressure, no obligation — just honest pricing upfront.' },
    { q: 'Are you licensed and insured?', a: 'Absolutely. A&N Painting and Renovations is fully licensed and insured for both residential and commercial projects.' },
    { q: 'How long does a typical project take?', a: 'Timelines depend on the scope of work. A single-room paint job may take 1-2 days, while a full kitchen renovation can take 3-6 weeks. We provide a detailed timeline with every estimate.' },
    { q: 'What types of renovations do you offer?', a: 'We provide complete kitchen renovations, bathroom renovations, full home renovations, drywall repair, cabinet installation, siding, power washing, and more.' },
];

// Gallery images — swap src paths to your real project photos.
// orientation: 'vertical' for portrait shots, 'horizontal' for landscape.
const galleryRow1 = [
    { src: '/images/gallery/0197f739-86e5-7668-89f5-a75bf53a4352.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/0197f739-8dea-7668-89f5-b582b692a257.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/0198ee95-ddb4-711a-8f33-a910dbbeb171.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/0198ee95-df6b-711a-8f33-b4773aef6917.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/0198ee95-e36b-711a-8f33-c7293dd1c3e6.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c48-815e-7dd8-aa83-d2c1e151e9a0.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c48-84db-7dd8-aa83-d81fce1bdb45.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c48-8b25-7dd8-aa83-ee72be66cdd1.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c48-90ff-7dd8-aa83-fda137d10ae3.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c48-a3ae-7dd8-aa84-2a264617afb6.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c48-cedb-7dd8-aa84-73f49d9c3436.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c48-d423-7dd8-aa84-7c224e7b40b3.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c48-e496-7dd8-aa84-90fff55858b4.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c48-f574-7dd8-aa84-abda2e4cf770.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c4a-18f7-7dd8-aa84-fc024c74dbe6.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019a5c4a-2687-7dd8-aa85-1fdfcf7f9296.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019a5c4b-45b5-7dd8-aa85-26d1ddab5d6f.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
];

const galleryRow2 = [
    { src: '/images/gallery/019a5c4b-548b-7dd8-aa85-3a682fecd99a.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019abbc8-da92-7994-92c8-20154d66fe89.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019abbc8-e78e-7994-92c8-52f7c2625b12.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019ac350-2761-700d-9d1d-b9a9e6398e0d.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019ac350-3cec-700d-9d1e-2d9c67fdc29e.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019b74fc-5cc4-7447-a0fe-fb6be722190f.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019b74fc-66c1-7447-a0ff-1437cd21f69e.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019c364e-2555-7aaf-8153-25fd473e0558.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019c364e-26b8-7aaf-8153-2acaabc9df18.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/019c364e-2832-7aaf-8153-30c76cdd17b6.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/019c364e-2d92-7aaf-8153-5218cc8c3f9b.JPG', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/IMG_0960.png', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/IMG_1634.jpeg', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/IMG_1636.jpeg', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },
    { src: '/images/gallery/IMG_3123.png', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'vertical' as const },
    { src: '/images/gallery/IMG_5710.png', alt: 'Renovation project by A&N Painting and Renovations', orientation: 'horizontal' as const },

];

export default function ServicesClient() {
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

    const scrollToQuote = () => {
        const el = document.getElementById('quote-form');
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative bg-black text-white">
            <Navigation onQuoteClick={scrollToQuote} />

            {/* ════════════════ HERO ════════════════ */}
            <section className="relative min-h-screen flex flex-col overflow-hidden">
                <div className="absolute inset-0">
                    <NextImage src="/images/services_hero.webp" alt="Painting and renovation services in Houston TX — interior painting, kitchen remodeling, home renovations by A&N" fill className="object-cover" priority quality={82} sizes="100vw" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className={`${shell} relative z-20 pt-28 pb-20 lg:pt-36 lg:pb-0 flex-1 lg:flex lg:items-center`}>
                    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center w-full lg:pb-20">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-7">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Now Booking Houston Projects</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                                Premier Painting &amp;<br />
                                <span className="text-blue-500">Renovation Services.</span>
                            </h1>

                            <p className="text-lg sm:text-xl leading-relaxed text-neutral-300 max-w-lg">
                                From precision painting to complete home renovations, every project is backed by 15+ years of experience and our 100% satisfaction guarantee.
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

                        <motion.div id="quote-form" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                            <QuoteForm />
                        </motion.div>
                    </div>
                </div>

                <div className="relative z-20 border-t border-b border-white/10 bg-neutral-900/80 backdrop-blur-md">
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                        {[
                            { icon: Paintbrush, label: 'Interior & Exterior Painting', href: '#painting' },
                            { icon: Home, label: 'Kitchen & Bath Renovations', href: '#kitchen-bath' },
                            { icon: Hammer, label: 'Full Home Renovations', href: '#renovations' },
                        ].map(s => (
                            <a key={s.label} href={s.href} className="flex flex-col items-center justify-center gap-2 py-4 sm:py-7 text-blue-400 hover:bg-white/5 hover:text-blue-300 transition-all group px-1">
                                <s.icon className="h-5 w-5 sm:h-7 sm:w-7 text-blue-500 group-hover:text-blue-400 transition-colors" />
                                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-center leading-tight">{s.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════ SERVICES ════════════════ */}
            <section id="all-services" className="py-16 md:py-20 bg-neutral-950">
                <div className={shell}>
                    <div className="text-center mb-14">
                        <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">Our Core Services</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Expert <span className="text-blue-500">Painting &amp; Renovations</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto mt-4">
                            Personalized renovation and quality craftsmanship designed to bring your vision to life. Every project backed by our 100% satisfaction guarantee.
                        </p>
                    </div>

                    <div className="space-y-16 md:space-y-20">
                        {services.map((svc, i) => {
                            const isEven = i % 2 === 1;
                            return (
                                <div key={svc.id} id={svc.id} className="scroll-mt-24">
                                    <div className={`grid gap-8 lg:gap-16 lg:grid-cols-2 items-start ${isEven ? 'lg:[direction:rtl]' : ''}`}>
                                        {/* Photo */}
                                        <div className={isEven ? 'lg:[direction:ltr]' : ''}>
                                            <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden group">
                                                <NextImage
                                                    src={svc.image}
                                                    alt={svc.imageAlt}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    quality={82}
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </div>
                                        </div>

                                        {/* Content — sticky so it follows scroll alongside the tall photo */}
                                        <div className={`lg:sticky lg:top-28 lg:py-4 ${isEven ? 'lg:[direction:ltr]' : ''}`}>
                                            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">0{i + 1}</span>
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
                                                {svc.title}.
                                            </h3>
                                            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                                                {svc.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 mb-10">
                                                {svc.includes.map(item => (
                                                    <div key={item} className="flex items-center gap-2.5 text-sm text-neutral-300">
                                                        <Check className="w-4 h-4 text-blue-500 shrink-0" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={scrollToQuote}
                                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all group/btn bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional services */}
                    <div className="mt-14 text-center">
                        <p className="text-neutral-500 text-sm">
                            Also offering:{' '}
                            <span className="text-neutral-300">Drywall Repair</span> &middot;{' '}
                            <span className="text-neutral-300">Power Washing</span> &middot;{' '}
                            <span className="text-neutral-300">Bathroom Upgrades</span> &middot;{' '}
                            <span className="text-neutral-300">Cabinet Installation</span> &middot;{' '}
                            <span className="text-neutral-300">Siding</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ════════════════ CTA BANNER ════════════════ */}
            <ParallaxCTA
                imageSrc="/images/cta3.webp"
                title={<>Let&apos;s Talk About <span className="text-blue-500">Your Project</span></>}
                description="Whether it's a dream kitchen, a fresh coat of paint, or a complete home transformation, we're ready to help you create something lasting."
                primaryBtnText="Get Your Free Estimate"
                secondaryBtnText="Call Now"
                onPrimaryClick={scrollToQuote}
                phone={PHONE}
                phoneHref={CLEAN_PHONE}
                smallText="Trusted by Homeowners Across Houston"
            />

            {/* ════════════════ PROCESS ════════════════ */}
            <section className="py-24 md:py-32 bg-neutral-950">
                <div className={shell}>
                    <div className="mb-20">
                        <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">How It Works</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
                            Our Process Makes <span className="text-blue-500">Renovation Easy.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 md:gap-12">
                        {steps.map((step, i) => (
                            <div key={step.title} className="group relative pt-8 border-t border-neutral-800 hover:border-blue-500 transition-colors duration-500">
                                <div className="absolute top-0 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />

                                <div className="text-6xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors mb-6 font-display">
                                    0{i + 1}
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════ PROJECT GALLERY ════════════════ */}
            <section id="gallery" className="py-16 md:py-20 bg-neutral-950 overflow-hidden">
                <div className={shell}>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">Our Work</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                                Recent <span className="text-blue-500">Projects</span>
                            </h2>
                        </div>
                        <button onClick={scrollToQuote} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all shrink-0 group/btn">
                            Start Your Project <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Scrolling gallery — row 1 (scrolls left) */}
                <div className="relative mb-4">
                    <div className="flex gap-4 animate-[scrollLeft_100s_linear_infinite]" style={{ width: 'max-content' }}>
                        {[...galleryRow1, ...galleryRow1].map((img, i) => (
                            <div key={i} className="relative shrink-0 h-64 sm:h-80 rounded-xl overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="h-full w-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrolling gallery — row 2 (scrolls right) */}
                <div className="relative">
                    <div className="flex gap-4 animate-[scrollRight_120s_linear_infinite]" style={{ width: 'max-content' }}>
                        {[...galleryRow2, ...galleryRow2].map((img, i) => (
                            <div key={i} className="relative shrink-0 h-64 sm:h-80 rounded-xl overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="h-full w-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Keyframes */}
                <style jsx>{`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
            </section>

            {/* ════════════════ FAQ ════════════════ */}
            <section className="py-16 md:py-20 bg-black">
                <div className={shell}>
                    <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-12 items-start">
                        <div className="md:sticky md:top-28">
                            <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">FAQ</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                Common <span className="text-blue-500">Questions</span>
                            </h2>
                            <p className="text-neutral-400 leading-relaxed mb-8">Have a question about our painting or renovation services? We&apos;re here to help.</p>
                            <a href={`tel:${CLEAN_PHONE}`} className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors">
                                <Phone className="h-4 w-4" /> {PHONE}
                            </a>
                        </div>

                        <div>
                            {faqs.map((faq, i) => (
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
                imageSrc="/images/cta4.webp"
                title="Ready to Get Started?"
                description="From a fresh coat of paint to a complete home renovation, satisfaction guaranteed. Serving Houston and the surrounding 25-mile area."
                primaryBtnText="Get Your Free Quote"
                secondaryBtnText={PHONE}
                onPrimaryClick={scrollToQuote}
                phone={PHONE}
                phoneHref={CLEAN_PHONE}
                smallText=""
            />

            <Footer />

            {/* Mobile Sticky Bar */}
            <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
                <div className="flex gap-2 p-2 bg-black/95 backdrop-blur-md border border-neutral-800 shadow-2xl rounded-xl">
                    <a href={`tel:${CLEAN_PHONE}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-700 transition-colors">
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
