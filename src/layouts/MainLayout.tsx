import type { ReactNode } from 'react';
import { profile } from '@/data/profile';
import { languageAlternates } from '@/data/site';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a className="site-brand" href="/" aria-label="Aaron DZN - início">
          <strong>{profile.name}</strong>
          <span>{profile.brand}</span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="/#about">Perfil</a>
          <a href="/#experience">Experiência</a>
          <a href="/#skills">Competências</a>
          <a href="/#recommendations">Recomendações</a>
          <a href="/artigos">Artigos</a>
          <a href="/#contact">Contato</a>
          <a className="nav-cta" href={profile.contact.whatsappUrl} rel="noreferrer" target="_blank">
            WhatsApp
          </a>
        </nav>
        <nav className="language-nav" aria-label="Selecionar idioma">
          {languageAlternates.map((language) => (
            <a href={language.path} hrefLang={language.hreflang} key={language.code} lang={language.code}>
              {language.label}
            </a>
          ))}
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        <a href={profile.contact.whatsappUrl} rel="noreferrer" target="_blank">
          {profile.contact.phone}
        </a>
        <span>{profile.contact.location}</span>
      </footer>
    </div>
  );
}
