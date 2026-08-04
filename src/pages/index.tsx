import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aaron DZN | Marca Pessoal</title>
        <meta
          name="description"
          content="Presença digital de marca pessoal de Aaron DZN. Portfólio, narrativa e conexão profissional."
        />
      </Head>
      <main className="page-root">
        <HeroSection />

        <section id="about" className="section">
          <h2>Sobre</h2>
          <p>
            Histórias, escolhas e decisões que orientam a marca pessoal. Um
            site projetado para transmitir clareza, credibilidade e personalidade.
          </p>
        </section>

        <section className="section" id="portfolio">
          <h2>Portfólio</h2>
          <p>Projetos, casos e reflexões sobre produto, design e arquitetura.</p>
        </section>

        <section className="section" id="contact">
          <h2>Contato</h2>
          <p>Conexões qualificadas para conversas, mentorias e colaborações.</p>
        </section>
      </main>
    </>
  );
}
