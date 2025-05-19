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

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      <head>
        {/* Load the appropriate CSS based on language direction */}
        <link
          rel="stylesheet"
          href={isArabic ? "/styles/style-ar.css" : "/styles/style-en.css"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
        />
        <meta property="og:title" content="NexuMind" />
        <meta
          property="og:description"
          content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
        />
        <meta property="og:url" content="https://www.nexumind.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="NexuMind" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nexumind.com" />
        <meta property="twitter:title" content="NexuMind" />
        <meta
          property="twitter:description"
          content="Unlocking unprecedented potential with cutting-edge artificial intelligence solutions for your business."
        />
        <meta property="twitter:image" content="/img/og-image.png" />
        <meta property="twitter:image:type" content="image/png" />
        <meta property="twitter:image:alt" content="NexuMind" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.nexumind.com",
              "name": "NexuMind",
              "alternateName": "NexuMind",
              "inLanguage": "en",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "@id": "https://www.nexumind.com",
                    "name": "Home",
                    "url": "https://www.nexumind.com",
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
                    "@id": "https://www.nexumind.com/aboutUs",
                    "name": "About Us",
                    "url": "https://www.nexumind.com/aboutUs",
                    "hasPart": [
                      {
                        "@type": "WebPage",
                        "url": "https://www.nexumind.com/en/aboutUs",
                        "inLanguage": "en",
                        "name": "aboutUs"
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
                    "@id": "https://www.nexumind.com/terms",
                    "name": "Terms and Conditions",
                    "url": "https://www.nexumind.com/terms",
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
                    "@id": "https://www.nexumind.com/privacy",
                    "name": "Privacy Policy",
                    "url": "https://www.nexumind.com/privacy",
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
