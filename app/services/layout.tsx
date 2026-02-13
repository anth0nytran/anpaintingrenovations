import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Houston Painting & Renovation Services | Interior, Exterior, Kitchen & Bath | A&N',
  description: 'Houston\'s top-rated painting and renovation contractor. Interior & exterior painting, kitchen & bath renovations, full home renovations. 15+ years experience, licensed & insured, 100% satisfaction guaranteed. Free estimates — call (832) 267-6657.',
  alternates: { canonical: '/services' },
  keywords: [
    'Houston painting contractor',
    'interior painting Houston TX',
    'exterior painting Houston',
    'kitchen renovation Houston',
    'bathroom renovation Houston TX',
    'home renovation Houston',
    'house painter near me Houston',
    'kitchen remodel Houston TX',
    'drywall repair Houston',
    'cabinet refinishing Houston',
    'home remodeling contractor Houston',
  ],
  openGraph: {
    title: 'Painting & Renovation Services in Houston, TX | A&N Painting and Renovations',
    description: 'Professional interior & exterior painting, kitchen & bath renovations, and complete home renovations in Houston. 15+ years experience. Free estimates, licensed and insured.',
    url: 'https://anpaintingrenovations.com/services',
    images: [
      {
        url: '/images/kitchen.JPG',
        width: 1200,
        height: 630,
        alt: 'Kitchen renovation by A&N Painting and Renovations in Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Painting & Renovation Services | A&N',
    description: 'Interior & exterior painting, kitchen & bath renovations, full home renovations. Licensed, insured, free estimates.',
    images: ['/images/kitchen.JPG'],
  },
};

// FAQ structured data for Google rich results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas in Houston do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve the entire Houston metro area within a 25-mile radius — including Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, Humble, Pasadena, Missouri City, and Baytown.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free estimates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide 100% free, detailed written estimates for all services. No pressure, no obligation — just honest pricing upfront.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you licensed and insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. A&N Painting and Renovations is fully licensed and insured for both residential and commercial projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines depend on the scope of work. A single-room paint job may take 1-2 days, while a full kitchen renovation can take 3-6 weeks. We provide a detailed timeline with every estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of renovations do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide complete kitchen renovations, bathroom renovations, full home renovations, drywall repair, cabinet installation, siding, power washing, and more.',
      },
    },
  ],
};

// Service structured data
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Home Improvement',
  provider: {
    '@type': 'LocalBusiness',
    name: 'A&N Painting and Renovations',
    telephone: '+18322676657',
    url: 'https://anpaintingrenovations.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 29.7604,
      longitude: -95.3698,
    },
    geoRadius: '40233.6',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Painting & Renovation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Interior & Exterior Painting',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Wall & Ceiling Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Siding & Stucco Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cabinet Refinishing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deck & Fence Staining' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Color Consultation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Washing' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Kitchen & Bath Renovations',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Cabinetry Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Countertop Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tile & Backsplash' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shower & Tub Installation' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Full Home Renovations',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Whole Home Makeovers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drywall & Texturing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Siding & Roofing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Door & Window Installation' } },
        ],
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
