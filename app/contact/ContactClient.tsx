'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ShieldCheck, FileText, Zap, Lock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QuoteForm from '../components/QuoteForm';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';
const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

const HOUSTON_CENTER = { lat: 29.7604, lng: -95.3698 };
const SERVICE_RADIUS_MILES = 25;
const DEFAULT_MAP_ZOOM = 9;
const ZOOM_OUT_STEPS = 1;
const EARTH_CIRCUMFERENCE_METERS = 40075016.686;
const TILE_SIZE = 256;
const SERVICE_RADIUS_METERS = SERVICE_RADIUS_MILES * 1609.344;
const LAT_RAD = (HOUSTON_CENTER.lat * Math.PI) / 180;

const getMetersPerPixel = (zoom: number) =>
    (EARTH_CIRCUMFERENCE_METERS * Math.cos(LAT_RAD)) / (TILE_SIZE * 2 ** zoom);

const getRadiusPixelsForZoom = (zoom: number) => SERVICE_RADIUS_METERS / getMetersPerPixel(zoom);

const steps = [
    { number: '01', title: 'Reach Out', body: 'Fill out the form or give us a call. We’ll gather some initial details about your project to ensure we’re the right fit.' },
    { number: '02', title: 'Schedule Visit', body: 'We’ll coordinate a time that works for you to visit your property for a free, comprehensive consultation.' },
    { number: '03', title: 'Receive Quote', body: 'Within 24 hours of our visit, you’ll receive a detailed written proposal with clear pricing and next steps.' },
];

export default function ContactClient() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapZoom, setMapZoom] = useState(DEFAULT_MAP_ZOOM);
    const [radiusPixels, setRadiusPixels] = useState(getRadiusPixelsForZoom(DEFAULT_MAP_ZOOM));

    useEffect(() => {
        const updateMapScale = () => {
            const width = mapRef.current?.clientWidth ?? 0;
            if (!width) return;

            // Keep the circle near the map edges while preserving a true 25-mile radius.
            const targetRadiusPixels = width * 0.46;
            const targetMetersPerPixel = SERVICE_RADIUS_METERS / targetRadiusPixels;
            const rawZoom = Math.log2(
                (EARTH_CIRCUMFERENCE_METERS * Math.cos(LAT_RAD)) / (TILE_SIZE * targetMetersPerPixel),
            );
            const clampedZoom = Math.min(11, Math.max(8, rawZoom));
            const snappedZoom = Math.max(8, Math.min(11, Math.round(clampedZoom) - ZOOM_OUT_STEPS));
            setMapZoom(snappedZoom);
            setRadiusPixels(getRadiusPixelsForZoom(snappedZoom));
        };

        updateMapScale();
        const observer = new ResizeObserver(updateMapScale);
        if (mapRef.current) observer.observe(mapRef.current);
        window.addEventListener('resize', updateMapScale);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateMapScale);
        };
    }, []);

    const mapEmbedSrc = `https://www.google.com/maps?hl=en&ll=${HOUSTON_CENTER.lat},${HOUSTON_CENTER.lng}&z=${mapZoom}&output=embed`;

    return (
        <div className="relative bg-black text-white selection:bg-blue-500/30">
            <Navigation onQuoteClick={() => {
                const el = document.getElementById('contact-form');
                if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }} />

            {/* ════════════════ HERO ════════════════ */}
            <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/project_cta.webp')] bg-cover bg-center opacity-40 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                <div className={`${shell} relative z-10 text-center`}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-full px-5 py-2 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-neutral-300 text-sm font-bold tracking-widest uppercase">Contact Us</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-6 max-w-4xl mx-auto">
                            Request Your Free<br className="hidden md:block" />
                            <span className="text-blue-500">Painting &amp; Renovation Quote</span>
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            Ready to transform your home? Fill out the form below or give us a call. <br className="hidden sm:block" />
                            We provide clear, written estimates and respond within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════ MAIN CONTENT ════════════════ */}
            <section className="py-20 bg-black" id="contact-content">
                <div className={shell}>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* LEFT COLUMN: INFO & MAP */}
                        <div className="space-y-8">
                            {/* Contact Card - Refined */}
                            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-10 lg:p-12">
                                <h3 className="text-2xl font-bold text-white mb-10 tracking-tight">Contact Information</h3>

                                <div className="space-y-10">
                                    <div className="group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Phone className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Phone</span>
                                        </div>
                                        <a href={`tel:${CLEAN_PHONE}`} className="text-3xl md:text-4xl font-bold text-white hover:text-blue-500 transition-colors block pl-7">{PHONE}</a>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MapPin className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Service Area</span>
                                        </div>
                                        <div className="pl-7">
                                            <div className="text-lg font-medium text-white">Houston, TX &amp; Surrounding</div>
                                            <div className="text-sm text-neutral-400 mt-1">25-Mile Radius</div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Hours</span>
                                        </div>
                                        <div className="pl-7">
                                            <div className="text-lg font-medium text-white">Mon-Sat: 7am - 6pm</div>
                                            <div className="text-sm text-neutral-400 mt-1">Sunday: Closed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Boxed Map (Not Extendo) */}
                            <div ref={mapRef} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden aspect-square relative group">
                                <iframe
                                    src={mapEmbedSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 pointer-events-none"
                                />

                                {/* 25 Mile Radius Overlay */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500/55 bg-red-500/10 pointer-events-none z-10 animate-pulse-slow"
                                    style={{
                                        width: `${Math.round(radiusPixels * 2)}px`,
                                        height: `${Math.round(radiusPixels * 2)}px`,
                                    }}
                                    aria-label={`Accurate ${SERVICE_RADIUS_MILES}-mile service radius centered on Houston`}
                                >
                                    <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                                        25 Mile Radius
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pointer-events-none z-20">
                                    <span className="text-white font-bold text-sm tracking-wide">Serving Greater Houston</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FORM (Using QuoteForm Component) */}
                        <div id="contact-form" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Request Your<br /><span className="text-blue-500">Free Quote</span></h2>

                                {/* Trust Badges - Clean Row */}
                                <div className="flex flex-wrap gap-x-8 gap-y-3">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm font-medium text-neutral-300">No pressure, no obligation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm font-medium text-neutral-300">Written estimates</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm font-medium text-neutral-300">Fast response times</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm font-medium text-neutral-300">Privacy guaranteed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Using Shared QuoteForm Component */}
                            <QuoteForm />
                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════ PROCESS ════════════════ */}
            <section className="py-24 bg-neutral-950 border-t border-neutral-900">
                <div className={shell}>
                    <div className="mb-20">
                        <span className="text-blue-500 font-semibold uppercase tracking-widest text-xs mb-4 block">How It Works</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
                            From Concept to <span className="text-blue-500">Completion.</span>
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

            <Footer />
        </div>
    );
}
