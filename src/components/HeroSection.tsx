import { Button } from './Button';
import { profile } from '@/data/profile';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{profile.brand}</p>
        <h1>{profile.heroTitle}</h1>
        <p className="hero-subtitle">{profile.heroSubtitle}</p>
        <p>{profile.intro}</p>
        <div className="hero-contact" aria-label="Contato principal">
          <a href={profile.contact.whatsappUrl} rel="noreferrer" target="_blank">
            WhatsApp {profile.contact.phone}
          </a>
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          <span>{profile.contact.location}</span>
        </div>
        <div className="hero-actions">
          <Button href="#experience">Ver experiência</Button>
          <Button href="/artigos" variant="secondary">
            Artigos
          </Button>
          <Button href="#recommendations" variant="secondary">
            Recomendações
          </Button>
          <Button href={profile.contact.whatsappUrl} variant="secondary">
            Conversar no WhatsApp
          </Button>
          <Button href={profile.markdownUrl} variant="secondary">
            Markdown
          </Button>
        </div>
      </div>
      <div className="hero-panel" aria-label="Resumo profissional">
        {profile.metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
