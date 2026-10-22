import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { CookieConsent } from "@/components/cookie-consent";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import { CLINIC_ID, SITE_URL, site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { GTM_ID, consentDefaultsSnippet } from "@/lib/gtm";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/** Homepage <title>; also the default for any page that sets none. */
const HOME_TITLE = `${site.name} · Öveçler, Çankaya · 7/24 Açık`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s · ${site.shortName}`,
  },
  description:
    "Çankaya Öveçler'de modern ve şefkatli veteriner kliniği. Muayene, aşı, cerrahi ve 7/24 acil bakım. Hemen arayın: 0536 290 69 58 ya da WhatsApp'tan yazın.",
  keywords: [
    "veteriner Çankaya",
    "veteriner Ankara",
    "Öveçler veteriner",
    "kedi köpek veteriner",
    "acil veteriner",
    "kısırlaştırma",
    "aşılama",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: HOME_TITLE,
    description:
      "Çankaya Öveçler'de modern ve şefkatli veteriner kliniği. Muayene, aşı, cerrahi ve 7/24 acil bakım. Hemen arayın: 0536 290 69 58 ya da WhatsApp'tan yazın.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      "Çankaya Öveçler'de şefkatli veteriner kliniği. 7/24 acil. Arayın: 0536 290 69 58 ya da WhatsApp'tan yazın.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F130F" },
  ],
};

// The one VeterinaryCare node. Every other page references it by CLINIC_ID
// instead of redefining the business, so name/address/phone live only here.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": CLINIC_ID,
  name: site.name,
  // Google Maps spells the listing "Pet İnternal"; tie both names to one entity.
  alternateName: site.alternateName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-icon.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: "+905362906958",
  sameAs: [site.social.instagram, site.mapsCid],
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: "Çankaya",
    addressRegion: "Ankara",
    postalCode: "06460",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: site.mapsCid,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  // The districts that have a landing page under /veteriner/ — all in Çankaya.
  areaServed: [
    { "@type": "City", name: "Ankara" },
    ...locations.map((l) => ({
      "@type": l.district === "Çankaya" ? "AdministrativeArea" : "Place",
      name: l.directionsFrom,
    })),
  ],
  employee: {
    "@type": "Person",
    name: site.vet.name,
    alternateName: site.vet.alternateName,
    jobTitle: site.vet.jobTitle,
    image: `${SITE_URL}${site.vet.image}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: site.vet.alumniOf },
    knowsAbout: site.vet.knowsAbout,
    ...(site.vet.sameAs.length ? { sameAs: site.vet.sameAs } : {}),
  },
};

// Standard GTM loader, inlined in <head> rather than via next/script so it
// ships in the exported HTML and starts fetching before hydration.
const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <head>
        {/* Consent Mode v2 defaults — must run before the container loads */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsSnippet }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
          >
            İçeriğe geç
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsAppFab />
          <MobileCallBar />
          <CookieConsent />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
