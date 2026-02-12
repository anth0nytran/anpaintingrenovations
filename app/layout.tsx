import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const displayFont = Barlow_Condensed({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anpaintingremodeling.com'),
  title: "Painting & Remodeling Contractor in Houston, TX | A&N Painting and Remodeling",
  description: "Houston painting and remodeling experts. Interior & exterior painting, kitchen remodels, full house remodeling, drywall repairs, and more. Insured, free estimates, satisfaction guaranteed.",
  alternates: {
    canonical: '/',
  },
  keywords: ["Houston Painting Contractor", "Kitchen Remodeling Houston", "Home Renovations Houston", "Interior Exterior Painting", "House Remodeling", "A&N Painting and Remodeling", "Houston Home Remodeling", "Drywall Repair Houston"],
  openGraph: {
    title: "Houston Painting & Remodeling Services | A&N Painting and Remodeling",
    description: "Residential and commercial painting, kitchen remodels, and full home renovations in Houston. Insured, free estimates, satisfaction guaranteed.",
    url: 'https://anpaintingremodeling.com',
    siteName: 'A&N Painting and Remodeling',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'A&N Painting and Remodeling - Houston Painting and Remodeling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Houston Painting & Remodeling | A&N Painting and Remodeling",
    description: "Interior & exterior painting, kitchen remodels, and full home renovations in Houston. Insured, free estimates.",
    images: ['/images/hero-bg.webp'],
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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
              "name": "A&N Painting and Remodeling",
              "image": "https://anpaintingremodeling.com/images/hero-bg.webp",
              "@id": "https://anpaintingremodeling.com",
              "url": "https://anpaintingremodeling.com",
              "telephone": "+18322676657",
              "description": "Residential and commercial painting, kitchen remodels, full house remodeling, drywall repairs, and more. Serving Houston and surrounding areas.",
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
                "name": "Painting & Remodeling Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior & Exterior Painting" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Remodels" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full House Remodeling" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drywall Repairs" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Upgrades" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Power Washing" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "A&N Painting and Remodeling",
              "alternateName": ["A&N Painting and Remodeling Houston", "AN Painting and Remodeling"],
              "url": "https://anpaintingremodeling.com"
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
