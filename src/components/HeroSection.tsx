import { Button } from './Button';

export function HeroSection() {
  return (
    <section className="hero">
      <p className="eyebrow">Aaron DZN</p>
      <h1>Marca pessoal e networking pensado como produto.</h1>
      <p>
        Um hub digital para contar a jornada profissional, mostrar repertório e
        conectar com líderes, recrutadores, parceiros e organizadores.
      </p>
      <div className="hero-actions">
        <Button href="#about">Saiba mais</Button>
        <Button href="#contact" variant="secondary">
          Entrar em contato
        </Button>
      </div>
    </section>
  );
}
