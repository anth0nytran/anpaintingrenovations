'use client';

import { ArrowRight } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';

const PHONE = '(832) 267-6657';
const CLEAN_PHONE = '8322676657';

export default function Footer() {
  const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';

  return (
    <footer className="bg-black border-t border-neutral-800 pt-20 pb-10">
      <div className={shell}>
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-16 mb-16">
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <NextImage src="/images/real_logo.svg" alt="A&N Painting and Renovations" width={56} height={56} className="h-14 w-14 object-contain" />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Houston&apos;s trusted painting and renovations contractor. Licensed, insured, and committed to transforming your home with quality craftsmanship.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/services#painting" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Painting</Link></li>
              <li><Link href="/services#kitchen-bath" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Kitchen &amp; Bath</Link></li>
              <li><Link href="/services#renovations" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Renovations</Link></li>
              <li><Link href="/contact" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Service Areas</h3>
            <ul className="space-y-3">
              {['Houston', 'Sugar Land', 'The Woodlands', 'Katy', 'Pearland', 'Cypress'].map(item => (
                <li key={item} className="text-sm text-neutral-500">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-4">
              <a href={`tel:${CLEAN_PHONE}`} className="block text-xl font-bold text-white hover:text-blue-400 transition-colors">{PHONE}</a>
              <Link href="/contact" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                Get a Quote <ArrowRight className="w-3 h-3" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-neutral-500">Mon-Sat 7am - 6pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="text-xs text-neutral-600 text-center">&copy; {new Date().getFullYear()} A&amp;N Painting and Renovations. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
