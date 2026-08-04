import type { ReactNode } from 'react';
import { profile } from '@/data/profile';

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
