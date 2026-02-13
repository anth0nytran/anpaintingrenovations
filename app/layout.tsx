import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Oswald({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anpaintingrenovations.com'),
  title: {
    default: "Houston Painting & Renovations Contractor | A&N Painting and Renovations",
    template: "%s | A&N Painting and Renovations",
  },
  description: "Transform your home with A&N Painting and Renovations. Expert interior/exterior painting, kitchen & bath remodels, and home makeovers in Houston. Free estimates. Call (832) 267-6657.",
  alternates: {
    canonical: '/',
  },
  keywords: [
    "Houston painting contractor",
    "painting company Houston TX",
    "kitchen renovation Houston",
    "bathroom renovation Houston TX",
    "home renovation Houston",
    "interior painting Houston",
    "exterior painting Houston TX",
    "house painter near me Houston",
    "home remodeling contractor Houston",
    "drywall repair Houston",
    "cabinet refinishing Houston TX",
    "kitchen remodel Houston",
    "full home renovation Houston TX",
    "commercial painting Houston",
    "residential painter Houston",
    "A&N Painting and Renovations",
  ],
  openGraph: {
    title: "Houston's #1 Painting & Renovation Contractor | A&N Painting and Renovations",
    description: "15+ years of expert painting, kitchen & bath renovations, and full home renovations in Houston TX. 5-star rated, licensed & insured, 100% satisfaction guaranteed. Free estimates.",
    url: 'https://anpaintingrenovations.com',
    siteName: 'A&N Painting and Renovations',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-v2.jpeg',
        width: 1200,
        height: 630,
        alt: 'A&N Painting and Renovations — Houston TX painting, kitchen renovations, and home remodeling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Houston Painting & Renovations | A&N Painting and Renovations",
    description: "Interior & exterior painting, kitchen & bath renovations, full home renovations. 15+ years, licensed & insured. Free estimates in Houston TX.",
    images: ['/images/hero-v2.jpeg'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/images/real_logo.png',
    shortcut: '/images/real_logo.png',
    apple: '/images/real_logo.png',
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Houston',
    'geo.position': '29.7604;-95.3698',
    'ICBM': '29.7604, -95.3698',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "A&N Painting and Renovations",
              "image": "https://anpaintingrenovations.com/images/hero-v2.jpeg",
              "@id": "https://anpaintingrenovations.com",
              "url": "https://anpaintingrenovations.com",
              "telephone": "+18322676657",
              "description": "Residential and commercial painting, kitchen and bath renovations, full home renovations, drywall repairs, and more. Serving Houston and surrounding areas.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.7604,
                "longitude": -95.3698
              },
              "areaServed": [
                { "@type": "City", "name": "Houston" },
                { "@type": "City", "name": "Katy" },
                { "@type": "City", "name": "Sugar Land" },
                { "@type": "City", "name": "Cypress" },
                { "@type": "City", "name": "Spring" },
                { "@type": "City", "name": "The Woodlands" },
                { "@type": "City", "name": "Humble" },
                { "@type": "City", "name": "Pearland" },
                { "@type": "City", "name": "Pasadena" },
                { "@type": "City", "name": "Baytown" },
                { "@type": "City", "name": "Missouri City" },
                { "@type": "City", "name": "League City" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "07:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Painting & Renovation Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior & Exterior Painting" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen & Bath Renovations" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Home Renovations" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drywall Repairs" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Upgrades" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Power Washing" } }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "47",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Maria G." },
                  "reviewBody": "Jaime and his crew did an amazing job painting our entire home. The attention to detail was outstanding and the whole process was smooth from start to finish. Highly recommend!"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Robert T." },
                  "reviewBody": "We hired A&N for a full kitchen renovation and couldn't be happier. Clear estimate upfront, no surprises, and the finished result exceeded our expectations."
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Sarah M." },
                  "reviewBody": "Professional, on time, and great communication throughout the entire project. Our bathroom renovation looks incredible. Will definitely hire again!"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "A&N Painting and Renovations",
              "alternateName": ["A&N Painting and Renovations Houston", "AN Painting and Renovations"],
              "url": "https://anpaintingrenovations.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://anpaintingrenovations.com/services?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Do you offer free estimates?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We provide 100% free, clear written estimates for all services including interior painting, kitchen renovations, and full home renovations in Houston, TX. No pressure, no obligation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What areas in Houston do you serve?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We serve the entire Houston metro area within a 25-mile radius — including Katy, Sugar Land, Pearland, Cypress, Spring, The Woodlands, Humble, Pasadena, Missouri City, and Baytown."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are you licensed and insured?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. A&N Painting and Renovations is fully licensed and insured for both residential and commercial projects. Your property and peace of mind are always protected."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What painting services do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We specialize in both interior and exterior painting — from single accent walls to full exterior makeovers. Our team uses premium paints and meticulous prep work for a flawless, long-lasting finish."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What types of renovations do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide complete kitchen renovations, bathroom renovations, full home renovations, drywall repair, cabinet installation, siding, power washing, and more. No project is too big or too small."
                  }
                }
              ]
            })
          }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html >
  );
}
