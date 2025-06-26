/* eslint-disable @next/next/no-css-tags */
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
// import CSSLoader from '../components/CSSLoader'; // Removed as it causes CSS loading issues
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { routing } from '../../i18n/routing';
import { Roboto } from 'next/font/google';
import { Tajawal } from 'next/font/google';
import BootstrapLoader from '../components/BootstrapLoader/BootstrapLoader';
import { Metadata } from 'next';


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
});


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isArabic = locale === 'ar';

  const siteTitle = isArabic ? "NexuMind - حلول الذكاء الاصطناعي" : "NexuMind - AI Solutions";
  const siteDescription = isArabic
    ? "فتح آفاق جديدة مع حلول الذكاء الاصطناعي المتطورة لعملك."
    : "Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business.";

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: isArabic ? ["ذكاء اصطناعي", "حلول تقنية", "برمجة"] : ["AI", "artificial intelligence", "tech solutions"],
    metadataBase: new URL('https://www.nexumind.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/',
      },
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: `/${locale}`,
      siteName: 'NexuMind',
      images: [
        {
          url: '/img/og-image.png',
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      locale: isArabic ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      site: '@nexumind',
      creator: '@nexumind',
      images: ['/img/og-image.png'],
    },
    icons: {
      icon: '/img/favicon.ico',
    },
  };
}


export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  
  const isArabic = locale === 'ar';
  
  // Get messages for the current locale
  const messages = (await import(`../../locales/${locale}.json`)).default;

  // Translated metadata
  const siteTitle = isArabic ? "NexuMind - حلول الذكاء الاصطناعي" : "NexuMind - AI Solutions";
  const siteDescription = isArabic 
    ? "فتح آفاق جديدة مع حلول الذكاء الاصطناعي المتطورة لعملك." 
    : "Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business.";

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={isArabic ? "ذكاء اصطناعي, حلول تقنية, برمجة" : "AI, artificial intelligence, tech solutions"} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={`https://www.nexumind.com/${locale}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={siteTitle} />
        <meta property="og:locale" content={isArabic ? 'ar_SA' : 'en_US'} />
        <meta property="og:site_name" content="NexuMind" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content="/img/og-image.png" />
        <meta name="twitter:site" content="@nexumind" />
        <meta name="twitter:creator" content="@nexumind" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//www.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* hreflang for multilingual support */}
        <link rel="alternate" href="https://www.nexumind.com/en" hrefLang="en" />
        <link rel="alternate" href="https://www.nexumind.com/ar" hrefLang="ar" />
        <link rel="alternate" href="https://www.nexumind.com" hrefLang="x-default" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.nexumind.com/${locale}`} />

        {/* Favicon */}
        <link rel="icon" href="/img/favicon.ico" sizes="any" />  
        
        {/* Critical CSS - Load Bootstrap CSS based on language direction */}
        <BootstrapLoader isArabic={isArabic} />
        <noscript>
          <link
            rel="stylesheet"
            href={
              isArabic
                ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css'
                : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
            }
          />
        </noscript>
        
        {/* Custom CSS - must load before performance optimizations */}
        <link
          rel="stylesheet"
          href={isArabic ? "/styles/style-ar.css" : "/styles/style-en.css"}
        />
        


        {/* Schema.org */}
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["WebSite", "Organization"],
      "@id": `https://www.nexumind.com/#${isArabic ? 'ar' : 'en'}`,
      "url": `https://www.nexumind.com/${locale}`,
      "name": "NexuMind - AI Solutions",
      "alternateName": "NexuMind",
      "description": "Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business.",
      "inLanguage": locale,
      "logo": "https://www.nexumind.com/img/logo.png",
      "sameAs": [
        "https://x.com/NexuMind",
        "https://www.linkedin.com/company/nexumind",
        "https://www.instagram.com/nexumindai"
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": `https://www.nexumind.com/${locale}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "@id": `https://www.nexumind.com/${locale}/#home`,
            "name": isArabic ? "الرئيسية" : "Home",
            "url": `https://www.nexumind.com/${locale}`,
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/en",
                "inLanguage": "en",
                "name": "Home"
              },
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/ar",
                "inLanguage": "ar",
                "name": "الرئيسية"
              }
            ]
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "@id": `https://www.nexumind.com/${locale}/#about`,
            "name": isArabic ? "من نحن" : "About Us",
            "url": `https://www.nexumind.com/${locale}/aboutUs`,
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/en/aboutUs",
                "inLanguage": "en",
                "name": "About Us"
              },
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/ar/aboutUs",
                "inLanguage": "ar",
                "name": "من نحن"
              }
            ]
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "@id": `https://www.nexumind.com/${locale}/#services`,
            "name": isArabic ? "خدماتنا" : "Our Services",
            "url": `https://www.nexumind.com/${locale}/services`,
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/en/services",
                "inLanguage": "en",
                "name": "Our Services"
              },
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/ar/services",
                "inLanguage": "ar",
                "name": "خدماتنا"
              }
            ]
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "@id": `https://www.nexumind.com/${locale}/#terms`,
            "name": isArabic ? "الشروط والأحكام" : "Terms",
            "url": `https://www.nexumind.com/${locale}/terms`,
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/en/terms",
                "inLanguage": "en",
                "name": "Terms and Conditions"
              },
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/ar/terms",
                "inLanguage": "ar",
                "name": "الشروط والأحكام"
              }
            ]
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "@id": `https://www.nexumind.com/${locale}/#privacy`,
            "name": isArabic ? "الخصوصية" : "Privacy",
            "url": `https://www.nexumind.com/${locale}/privacy`,
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/en/privacy",
                "inLanguage": "en",
                "name": "Privacy Policy"
              },
              {
                "@type": "WebPage",
                "url": "https://www.nexumind.com/ar/privacy",
                "inLanguage": "ar",
                "name": "سياسة الخصوصية"
              }
            ]
          }
        ]
      }
    })
  }}
/>
      </head>
      <body className={`${roboto.variable} ${tajawal.variable} content rounded-bottom-5`} style={{marginLeft: "1px", marginRight: "1px" ,overflowX: "hidden"}}>
      <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
          <Footer />
          </NextIntlClientProvider>
    
      </body>

    </html>
  );
}