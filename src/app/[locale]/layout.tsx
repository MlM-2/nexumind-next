// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { Tajawal } from 'next/font/google';
import { routing } from '../../i18n/routing';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

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
        {/* Basic Meta Tags */}
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

        {/* hreflang for multilingual support */}
        <link rel="alternate" href="https://www.nexumind.com/en" hrefLang="en" />
        <link rel="alternate" href="https://www.nexumind.com/ar" hrefLang="ar" />
        <link rel="alternate" href="https://www.nexumind.com" hrefLang="x-default" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.nexumind.com/${locale}`} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Stylesheets */}
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
      "name": siteTitle,
      "alternateName": "NexuMind",
      "description": siteDescription,
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
      <body className={`${tajawal.variable} container-fluid content rounded-bottom-5`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}