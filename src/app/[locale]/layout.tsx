import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string }; 
}) {
  const { locale } =  await params;

  if (!hasLocale(routing.locales, locale)) {
    // redirect('/en');
  }

  setRequestLocale(locale);
  const isArabic = locale === 'ar';

  return (
    <div className={`${tajawal.variable} container-fluid content rounded-bottom-5`} dir={isArabic ? 'rtl' : 'ltr'} lang={locale}>
            <link
        rel="stylesheet"
        href={isArabic ? "/styles/style-ar.css" : "/styles/style-en.css"}
      />

      <NextIntlClientProvider>
        <NavBar />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
