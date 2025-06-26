import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (
    !pathname.startsWith('/ar') &&
    !pathname.startsWith('/en') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.match(/\.[^\/]+$/)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  const response = intlMiddleware(request);
  
  // Add performance and security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Cache headers for static assets
  if (pathname.startsWith('/img/') || 
      pathname.startsWith('/styles/') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') ||
      pathname.endsWith('.webp')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // API route caching
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    `/(ar|en)/:path*`,
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
