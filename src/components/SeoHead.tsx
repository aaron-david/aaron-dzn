import Head from 'next/head';
import { absoluteUrl, languageAlternates, site } from '@/data/site';

type SeoHeadProps = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: readonly string[];
  imagePath?: string;
  imageAlt?: string;
  type?: 'website' | 'profile' | 'article';
  locale?: string;
  contentLanguage?: string;
  includeLanguageAlternates?: boolean;
  children?: React.ReactNode;
};

export function SeoHead({
  title,
  description,
  canonicalPath,
  keywords = site.keywords,
  imagePath = site.defaultImage,
  imageAlt = title,
  type = 'website',
  locale = 'pt_BR',
  contentLanguage = 'pt-BR',
  includeLanguageAlternates = false,
  children
}: SeoHeadProps) {
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(imagePath);
  const fullKeywords = Array.from(new Set([...site.keywords, ...keywords])).join(', ');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Aaron Aznar" />
      <meta name="creator" content="Aaron Aznar" />
      <meta name="publisher" content={site.name} />
      <meta httpEquiv="content-language" content={contentLanguage} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="color-scheme" content="light dark" />
      <meta name="theme-color" content={site.themeColorLight} media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content={site.themeColorDark} media="(prefers-color-scheme: dark)" />
      <meta name="application-name" content={site.name} />
      <meta name="apple-mobile-web-app-title" content={site.name} />
      <meta name="format-detection" content="telephone=yes, email=yes, address=yes" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="author" href="/llms.txt" />
      <link rel="me" href="https://www.linkedin.com/in/aa-dsgn/" />
      <link rel="alternate" type="text/markdown" href={absoluteUrl('/linkedin-profile.md')} />
      <link rel="alternate" type="text/plain" href={absoluteUrl('/llms.txt')} />
      {includeLanguageAlternates
        ? languageAlternates.map((language) => (
            <link
              href={absoluteUrl(language.path)}
              hrefLang={language.hreflang}
              key={language.hreflang}
              rel="alternate"
            />
          ))
        : null}
      {includeLanguageAlternates ? <link href={absoluteUrl('/')} hrefLang="x-default" rel="alternate" /> : null}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(site.defaultImageWidth)} />
      <meta property="og:image:height" content={String(site.defaultImageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={locale} />
      {includeLanguageAlternates
        ? languageAlternates
            .filter((language) => language.ogLocale !== locale)
            .map((language) => (
              <meta content={language.ogLocale} key={language.ogLocale} property="og:locale:alternate" />
            ))
        : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {children}
    </Head>
  );
}
