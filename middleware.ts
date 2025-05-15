import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Request path:', pathname);

  // الشرط: إذا لم يبدأ المسار بـ /ar أو /en و ليس ملف (امتداد) و ليس api أو _next
  if (
    !pathname.startsWith('/ar') &&
    !pathname.startsWith('/en') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.match(/\.[^\/]+$/)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    console.log('Redirecting to:', url.pathname);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    `/(ar|en)/:path*`,
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
