import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';
import { profile } from '@/data/profile';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.brand,
  url: 'https://aarondzn.com/',
  sameAs: [profile.linkedinUrl],
  jobTitle: 'Senior Product Designer',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR'
  },
  alumniOf: profile.education.map((education) => ({
    '@type': 'EducationalOrganization',
    name: education.school
  })),
  knowsAbout: profile.focusAreas
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Aaron DZN | Senior Product Designer</title>
        <meta
          name="description"
          content="Portfólio profissional de Aaron Aznar, Senior Product Designer especializado em UX Strategy, Design Systems e AI-Assisted UX/UI Design."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <main className="page-root">
        <HeroSection />

        <section id="about" className="section">
          <div className="section-heading">
            <p className="section-kicker">Perfil</p>
            <h2>Produto, design systems e IA aplicada ao design.</h2>
          </div>
          <div className="prose-stack">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section" id="focus">
          <div className="section-heading">
            <p className="section-kicker">Especialidades</p>
            <h2>Competências aplicadas em produtos enterprise, B2B e B2C.</h2>
          </div>
          <div className="tag-grid" aria-label="Áreas de foco">
            {profile.focusAreas.map((area) => (
              <span className="tag" key={area}>
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p className="section-kicker">Experiência</p>
            <h2>Trajetória em consultoria, produtos digitais e comunicação.</h2>
          </div>
          <div className="timeline">
            {profile.experience.map((item) => (
              <article className="timeline-item" key={`${item.company}-${item.roles}`}>
                <div>
                  <p className="item-meta">{item.period}</p>
                  <h3>{item.roles}</h3>
                  <p className="company-line">
                    {item.company} · {item.location}
                  </p>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <p className="section-kicker">Projetos</p>
            <h2>Iniciativas destacadas do perfil profissional.</h2>
          </div>
          <div className="card-grid">
            {profile.projects.map((project) => (
              <article className="info-card" key={project.name}>
                <p className="item-meta">{project.period}</p>
                <h3>{project.name}</h3>
                <p className="company-line">{project.association}</p>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <p className="section-kicker">Serviços</p>
            <h2>Como o repertório se traduz em valor para times e negócios.</h2>
          </div>
          <div className="service-list">
            {profile.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </section>

        <section className="section split-section" id="education">
          <div>
            <div className="section-heading">
              <p className="section-kicker">Formação</p>
              <h2>Base acadêmica e certificações recentes.</h2>
            </div>
            <div className="mini-list">
              {profile.education.map((education) => (
                <article key={education.school}>
                  <h3>{education.school}</h3>
                  <p>{education.degree}</p>
                  <span>{education.period}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="mini-list">
            {profile.certifications.map((certification) => (
              <article key={certification.name}>
                <h3>{certification.name}</h3>
                <p>{certification.issuer}</p>
                <span>Emitida em {certification.issued}</span>
              </article>
            ))}
            <article>
              <h3>Idiomas</h3>
              <p>{profile.languages.join(' · ')}</p>
            </article>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div>
            <p className="section-kicker">Contato</p>
            <h2>Conecte-se pelo LinkedIn.</h2>
            <p>
              Perfil estruturado a partir de informações profissionais do LinkedIn,
              com foco em experiência, competências e projetos publicáveis.
            </p>
          </div>
          <a className="button button-primary" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
            Abrir LinkedIn
          </a>
        </section>
      </main>
    </>
  );
}
