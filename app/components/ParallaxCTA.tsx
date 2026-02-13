'use client';

import { useEffect, useRef } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import NextImage from 'next/image';

interface ParallaxCTAProps {
    title: React.ReactNode;
    description: string;
    primaryBtnText?: string;
    secondaryBtnText?: string;
    onPrimaryClick: () => void;
    phone: string;
    phoneHref: string;
    smallText?: string;
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
}

export default function ParallaxCTA({
    title,
    description,
    primaryBtnText = 'Get Your Free Estimate',
    secondaryBtnText = 'Call Now',
    onPrimaryClick,
    phone,
    phoneHref,
    smallText = 'Trusted by Homeowners Across Houston',
    className = '',
    imageSrc = '/images/project_cta.webp',
    imageAlt = 'Luxury home renovation background',
}: ParallaxCTAProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

    useEffect(() => {
        let raf = 0;
        let currentShift = 0;
        let targetShift = 0;
        let isActive = false;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        const computeTarget = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            const viewportCenter = vh * 0.5;
            const sectionCenter = rect.top + rect.height * 0.5;
            const delta = sectionCenter - viewportCenter;

            const maxShift = 52;
            const sensitivity = 0.08;
            targetShift = Math.max(-maxShift, Math.min(maxShift, -delta * sensitivity));
        };

        const update = () => {
            const bg = bgRef.current;
            raf = 0;
            if (!bg || !isActive) {
                return;
            }

            // Ease toward target smoothly.
            currentShift += (targetShift - currentShift) * 0.12;
            bg.style.transform = `translate3d(0, ${currentShift.toFixed(2)}px, 0) scale(1.08)`;

            if (Math.abs(targetShift - currentShift) > 0.1) {
                raf = window.requestAnimationFrame(update);
            }
        };

        const schedule = () => {
            if (!isActive) return;
            computeTarget();
            if (!raf) {
                raf = window.requestAnimationFrame(update);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                isActive = !!entry?.isIntersecting;
                if (!isActive && raf) {
                    window.cancelAnimationFrame(raf);
                    raf = 0;
                }
                if (isActive) {
                    schedule();
                }
            },
            { root: null, rootMargin: '200px 0px 200px 0px', threshold: 0 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        schedule();

        return () => {
            if (raf) {
                window.cancelAnimationFrame(raf);
            }
            observer.disconnect();
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return (
        <section ref={sectionRef} className={`relative py-24 md:py-32 overflow-hidden ${className}`}>
            {/* Smooth parallax background */}
            <div ref={bgRef} className="absolute -inset-10 z-0 pointer-events-none will-change-transform" aria-hidden="true">
                <NextImage
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="100vw"
                />
            </div>

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Texture Overlay (optional, matching existing style) */}
            <div className="absolute inset-0 opacity-[0.05] z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Content */}
            <div className={`${shell} relative z-10 text-center`}>
                {smallText && (
                    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4 block">
                        {smallText}
                    </span>
                )}

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
                    {title}
                </h2>

                <p className="text-neutral-200 text-lg max-w-2xl mx-auto mb-10 drop-shadow-md font-medium">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onPrimaryClick}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/40"
                    >
                        {primaryBtnText} <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                        href={`tel:${phoneHref}`}
                        className="px-8 py-4 border border-white/30 hover:bg-white/10 hover:border-white text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                        <Phone className="w-4 h-4" /> {secondaryBtnText === 'Call Now' ? 'Call Now' : phone}
                    </a>
                </div>
            </div>
        </section>
    );
}
