import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact A&N Painting and Remodeling | Free Estimates in Houston, TX',
  description: 'Get a free estimate for painting, kitchen remodeling, or home renovations in Houston, TX. Call (832) 267-6657 or fill out our online form. We respond within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact A&N Painting and Remodeling | Free Estimates Houston',
    description: 'Request a free, no-obligation estimate. Call (832) 267-6657 or submit our online form. Serving Houston, Katy, Sugar Land, and surrounding areas.',
    url: 'https://anpaintingremodeling.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
