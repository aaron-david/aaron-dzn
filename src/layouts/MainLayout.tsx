import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getWhatsappUrl, profile } from '@/data/profile';
import { languageAlternates, type LanguageCode } from '@/data/site';

type MainLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  href: string;
  label: string;
};

const languageStorageKey = 'aarondzn-language';

const localizedNavigation: Record<LanguageCode, NavItem[]> = {
  'pt-BR': [
    { href: '/?lang=pt-BR#about', label: 'Perfil' },
    { href: '/?lang=pt-BR#experience', label: 'Experiência' },
    { href: '/?lang=pt-BR#skills', label: 'Competências' },
    { href: '/?lang=pt-BR#recommendations', label: 'Recomendações' },
    { href: '/artigos', label: 'Artigos' },
    { href: '/?lang=pt-BR#contact', label: 'Contato' }
  ],
  en: [
    { href: '/en#about', label: 'Profile' },
    { href: '/en#experience', label: 'Experience' },
    { href: '/en#skills', label: 'Expertise' },
    { href: '/en/articles', label: 'Articles' },
    { href: '/en#contact', label: 'Contact' }
  ]
};

const layoutCopy: Record<
  LanguageCode,
  {
    brandAriaLabel: string;
    skipLink: string;
    mainNavigationLabel: string;
    languageNavigationLabel: string;
    currentLanguageLabel: string;
    switchLanguageLabel: string;
  }
> = {
  'pt-BR': {
    brandAriaLabel: 'Aaron DZN - início',
    skipLink: 'Pular para o conteúdo',
    mainNavigationLabel: 'Navegação principal',
    languageNavigationLabel: 'Selecionar idioma',
    currentLanguageLabel: 'idioma atual',
    switchLanguageLabel: 'ver esta página neste idioma'
  },
  en: {
    brandAriaLabel: 'Aaron DZN - home',
    skipLink: 'Skip to content',
    mainNavigationLabel: 'Main navigation',
    languageNavigationLabel: 'Choose language',
    currentLanguageLabel: 'current language',
    switchLanguageLabel: 'view this page in this language'
  }
};

function getCurrentLanguage(pathname: string): LanguageCode {
  if (pathname.startsWith('/en')) return 'en';
  return 'pt-BR';
}

function getLanguageTarget(pathname: string, language: (typeof languageAlternates)[number]) {
  const section = pathname.includes('#') ? `#${pathname.split('#')[1]}` : '';
  const supportedSection = ['#about', '#experience', '#skills', '#articles', '#contact', '#highlights'].includes(section)
    ? section
    : '';
  const languageQuery = `?lang=${encodeURIComponent(language.code)}`;

  return `${language.path}${languageQuery}${supportedSection}`;
}

function storeLanguagePreference(language: LanguageCode) {
  try {
    window.localStorage.setItem(languageStorageKey, language);
    window.document.cookie = `${languageStorageKey}=${language}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // Ignore storage failures so language navigation still works.
  }
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const currentLanguage = getCurrentLanguage(router.asPath);
  const copy = layoutCopy[currentLanguage];
  const navItems = localizedNavigation[currentLanguage];
  const whatsappUrl = getWhatsappUrl(currentLanguage);
  const homeHref = '/?lang=pt-BR';

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        {copy.skipLink}
      </a>
      <header className="site-header">
        <Link className="site-brand" href={homeHref} aria-label={copy.brandAriaLabel}>
          <strong>{profile.name}</strong>
          <span>{profile.brand}</span>
        </Link>
        <nav className="site-nav" aria-label={copy.mainNavigationLabel}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={whatsappUrl} rel="noreferrer" target="_blank">
            WhatsApp
          </a>
        </nav>
        <div className="header-tools">
          <nav className="language-nav" aria-label={copy.languageNavigationLabel}>
            {languageAlternates.map((language) => {
              const isActive = language.code === currentLanguage;

              return (
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${language.name}: ${
                    isActive ? copy.currentLanguageLabel : copy.switchLanguageLabel
                  }`}
                  className={isActive ? 'is-active' : undefined}
                  href={getLanguageTarget(router.asPath, language)}
                  hrefLang={language.hreflang}
                  key={language.code}
                  lang={language.code}
                  onClick={() => storeLanguagePreference(language.code)}
                >
                  {language.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle language={currentLanguage} />
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        <a href={whatsappUrl} rel="noreferrer" target="_blank">
          {profile.contact.phone}
        </a>
        <span>{profile.contact.location}</span>
      </footer>
    </div>
  );
}
