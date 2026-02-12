import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painting, Remodeling & Renovation Services in Houston, TX | A&N',
  description: 'Expert interior & exterior painting, kitchen & bath remodeling, and full home renovations in Houston, TX. Licensed, insured, 100% satisfaction guaranteed. Free estimates.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Painting, Remodeling & Renovation Services in Houston | A&N',
    description: 'Professional painting, kitchen remodeling, and complete home renovations serving Houston and surrounding areas. Free estimates, licensed & insured.',
    url: 'https://anpaintingremodeling.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
