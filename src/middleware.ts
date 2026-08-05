import { NextResponse, type NextRequest } from 'next/server';

const languageCookieName = 'aarondzn-language';

function acceptsPortuguese(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const primaryLanguage = acceptLanguage.split(',')[0]?.trim().toLowerCase() ?? '';

  return primaryLanguage.startsWith('pt');
}

function getManualLanguage(request: NextRequest) {
  const language = request.nextUrl.searchParams.get('lang');

  return language === 'pt-BR' || language === 'en' ? language : null;
}

function withLanguageVary(response: NextResponse) {
  response.headers.set('Vary', 'Accept-Language, Cookie');

  return response;
}

function getLanguagePath(language: 'pt-BR' | 'en') {
  return language === 'en' ? '/en' : '/';
}

function withManualLanguageCookie(response: NextResponse, language: 'pt-BR' | 'en') {
  response.cookies.set(languageCookieName, language, {
    maxAge: 31536000,
    path: '/',
    sameSite: 'lax'
  });

  return withLanguageVary(response);
}

function handleManualLanguage(request: NextRequest, language: 'pt-BR' | 'en') {
  const languagePath = getLanguagePath(language);

  if (request.nextUrl.pathname === languagePath) {
    return withManualLanguageCookie(NextResponse.next(), language);
  }

  const url = request.nextUrl.clone();
  url.pathname = languagePath;
  url.searchParams.set('lang', language);

  return withManualLanguageCookie(NextResponse.redirect(url), language);
}

export function middleware(request: NextRequest) {
  const manualLanguage = getManualLanguage(request);

  if (manualLanguage) {
    return handleManualLanguage(request, manualLanguage);
  }

  if (request.nextUrl.pathname === '/' && !acceptsPortuguese(request)) {
    const url = request.nextUrl.clone();
    url.pathname = '/en';

    return withLanguageVary(NextResponse.redirect(url));
  }

  return withLanguageVary(NextResponse.next());
}

export const config = {
  matcher: ['/', '/en']
};
