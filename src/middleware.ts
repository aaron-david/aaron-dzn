import { NextResponse, type NextRequest } from 'next/server';

const languageCookieName = 'aarondzn-language';

function acceptsEnglish(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const primaryLanguage = acceptLanguage.split(',')[0]?.trim().toLowerCase() ?? '';

  return primaryLanguage.startsWith('en');
}

function withLanguageVary(response: NextResponse) {
  response.headers.set('Vary', 'Accept-Language, Cookie');

  return response;
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const storedLanguage = request.cookies.get(languageCookieName)?.value;

  if (storedLanguage === 'pt-BR') {
    return withLanguageVary(NextResponse.next());
  }

  if (storedLanguage === 'en' || acceptsEnglish(request)) {
    const url = request.nextUrl.clone();
    url.pathname = '/en';

    return withLanguageVary(NextResponse.redirect(url));
  }

  return withLanguageVary(NextResponse.next());
}

export const config = {
  matcher: '/'
};
