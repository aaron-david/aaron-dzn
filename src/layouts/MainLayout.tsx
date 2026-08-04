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

const localizedNavigation: Record<LanguageCode, NavItem[]> = {
  'pt-BR': [
    { href: '/#about', label: 'Perfil' },
    { href: '/#experience', label: 'Experiência' },
    { href: '/#skills', label: 'Competências' },
    { href: '/#recommendations', label: 'Recomendações' },
    { href: '/artigos', label: 'Artigos' },
    { href: '/#contact', label: 'Contato' }
  ],
  en: [
    { href: '/en#about', label: 'Profile' },
    { href: '/en#experience', label: 'Experience' },
    { href: '/en#skills', label: 'Expertise' },
    { href: '/artigos', label: 'Articles' },
    { href: '/en#contact', label: 'Contact' }
  ],
  es: [
    { href: '/es#about', label: 'Perfil' },
    { href: '/es#experience', label: 'Experiencia' },
    { href: '/es#skills', label: 'Especialidades' },
    { href: '/artigos', label: 'Artículos' },
    { href: '/es#contact', label: 'Contacto' }
  ],
  nl: [
    { href: '/nl#about', label: 'Profiel' },
    { href: '/nl#experience', label: 'Ervaring' },
    { href: '/nl#skills', label: 'Expertise' },
    { href: '/artigos', label: 'Artikelen' },
    { href: '/nl#contact', label: 'Contact' }
  ]
};

function getCurrentLanguage(pathname: string): LanguageCode {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/nl')) return 'nl';
  return 'pt-BR';
}

function getLanguageTarget(pathname: string, languagePath: string) {
  const section = pathname.includes('#') ? `#${pathname.split('#')[1]}` : '';
  const supportedSection = ['#about', '#experience', '#skills', '#articles', '#contact', '#highlights'].includes(section)
    ? section
    : '';

  return languagePath === '/' ? `/${supportedSection}` : `${languagePath}${supportedSection}`;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const currentLanguage = getCurrentLanguage(router.asPath);
  const navItems = localizedNavigation[currentLanguage];
  const whatsappUrl = getWhatsappUrl(currentLanguage);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <Link className="site-brand" href="/" aria-label="Aaron DZN - início">
          <strong>{profile.name}</strong>
          <span>{profile.brand}</span>
        </Link>
        <nav className="site-nav" aria-label="Navegação principal">
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
          <nav className="language-nav" aria-label="Selecionar idioma">
            {languageAlternates.map((language) => {
              const isActive = language.code === currentLanguage;

              return (
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${language.name}: ${isActive ? 'idioma atual' : 'ver esta página neste idioma'}`}
                  className={isActive ? 'is-active' : undefined}
                  href={getLanguageTarget(router.asPath, language.path)}
                  hrefLang={language.hreflang}
                  key={language.code}
                  lang={language.code}
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
