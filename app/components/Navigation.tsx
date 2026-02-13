'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';

const serviceLinks = [
  { label: 'Interior & Exterior Painting', href: '/services#painting', desc: 'Residential & commercial painting' },
  { label: 'Kitchen & Bath Renovations', href: '/services#kitchen-bath', desc: 'Custom kitchen and bathroom renovations' },
  { label: 'Full Home Renovations', href: '/services#renovations', desc: 'Complete home renovation services' },
];

export default function Navigation({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    }
    setMobileMenuOpen(false);
  };

  const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.35)]'
          : 'bg-black/70 backdrop-blur-sm border-neutral-900/70'
      }`}
    >
      <div className={`${shell} relative flex items-center justify-between py-2.5`}>
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <NextImage src="/images/real_logo.svg" alt="A&N Painting and Renovations" width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="text-white font-semibold tracking-wide text-xs sm:text-sm md:text-base whitespace-nowrap">
              A&amp;N Painting &amp; Renovations
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav - Absolutely Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-white' : 'text-neutral-300 hover:text-white'}`}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname.startsWith('/services') ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
            >
              Services <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-80"
                >
                  <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/50 rounded-xl shadow-2xl overflow-hidden p-2">
                    {serviceLinks.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex flex-col px-4 py-3 text-sm rounded-lg hover:bg-neutral-800 transition-colors group"
                      >
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{s.label}</span>
                        <span className="text-neutral-500 text-xs mt-0.5">{s.desc}</span>
                      </Link>
                    ))}
                    <div className="mt-1 pt-2 border-t border-neutral-800">
                      <Link href="/services" onClick={() => setServicesOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-blue-400 hover:text-blue-300 font-semibold rounded-lg hover:bg-neutral-800 transition-colors">
                        View All Services &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/services#gallery" className={`text-sm font-medium transition-colors ${pathname === '/services' ? 'text-white' : 'text-neutral-300 hover:text-white'}`}>
            Gallery
          </Link>

          <Link href="/contact" className={`text-sm font-medium transition-colors ${pathname === '/contact' ? 'text-white' : 'text-neutral-300 hover:text-white'}`}>
            Contact
          </Link>
        </div>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex-1 flex justify-end items-center gap-5">
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a href={`tel:${CLEAN_PHONE}`} className="flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors">
              <Phone className="h-4 w-4 text-blue-500" /> {PHONE}
            </a>
            <button onClick={handleQuoteClick} className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all">
              Free Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-neutral-900 border-t border-neutral-800">
            <div className="flex flex-col p-6 space-y-4">
              <Link href="/" className="text-lg font-semibold text-neutral-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/services" className="text-lg font-semibold text-neutral-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
              <Link href="/services#gallery" className="text-lg font-semibold text-neutral-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <div className="pl-4 space-y-3 border-l border-neutral-800">
                {serviceLinks.map(s => (
                  <Link key={s.href} href={s.href} className="block text-sm text-neutral-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {s.label}
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="text-lg font-semibold text-neutral-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <button onClick={handleQuoteClick} className="mt-4 w-full py-4 bg-red-600 text-white font-bold rounded-lg">
                Get a Free Quote
              </button>
              <a href={`tel:${CLEAN_PHONE}`} className="block text-center text-sm font-semibold text-white mt-2">
                Call Us: {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
