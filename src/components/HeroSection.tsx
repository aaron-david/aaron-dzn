import { Button } from './Button';
import { profile } from '@/data/profile';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{profile.brand}</p>
        <h1>{profile.heroTitle}</h1>
        <p>{profile.intro}</p>
        <div className="hero-actions">
          <Button href="#experience">Ver experiência</Button>
          <Button href={profile.linkedinUrl} variant="secondary">
            LinkedIn
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
