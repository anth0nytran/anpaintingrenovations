import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact A&N Painting and Renovations | Free Estimates Houston, TX',
  description: 'Get a free painting or renovation estimate in Houston, TX. Call (832) 267-6657 or fill out our online form. Interior & exterior painting, kitchen & bath renovations, full home renovations. We respond within 24 hours. Serving Houston, Katy, Sugar Land, Pearland, Cypress, The Woodlands.',
  alternates: { canonical: '/contact' },
  keywords: [
    'free painting estimate Houston',
    'free renovation estimate Houston TX',
    'Houston painting contractor contact',
    'home renovation quote Houston',
    'kitchen renovation estimate Houston',
    'painting company near me Houston',
    'contractor Houston TX phone number',
  ],
  openGraph: {
    title: 'Get a Free Estimate | A&N Painting and Renovations Houston',
    description: 'Request a free, no-obligation painting or renovation estimate. Call (832) 267-6657 or submit our online form. Serving Houston, Katy, Sugar Land, Pearland, Cypress, and surrounding areas.',
    url: 'https://anpaintingrenovations.com/contact',
    images: [
      {
        url: '/images/hero-v2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact A&N Painting and Renovations for a free estimate in Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact A&N Painting and Renovations | Free Estimates Houston',
    description: 'Call (832) 267-6657 or request a free estimate online. Interior & exterior painting, kitchen & bath renovations, full home renovations.',
    images: ['/images/hero-v2.jpeg'],
  },
};

// ContactPoint structured data for Google rich results
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'A&N Painting and Renovations',
  telephone: '+18322676657',
  url: 'https://anpaintingrenovations.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+18322676657',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English', 'Spanish'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:00',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
