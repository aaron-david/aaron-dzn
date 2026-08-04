import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';
import { profile } from '@/data/profile';

const siteUrl = 'https://aarondzn.com/';
const personId = `${siteUrl}#person`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      alternateName: profile.brand,
      url: siteUrl,
      sameAs: [profile.linkedinUrl],
      email: profile.contact.email,
      telephone: profile.contact.phoneRaw,
      jobTitle: profile.headline,
      description: `${profile.intro} ${profile.summary.join(' ')}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.contact.city,
        addressRegion: profile.contact.region,
        addressCountry: profile.contact.country
      },
      alumniOf: profile.education.map((education) => ({
        '@type': 'EducationalOrganization',
        name: education.school
      })),
      knowsAbout: profile.skills,
      hasCredential: profile.certifications.map((certification) => ({
        '@type': 'EducationalOccupationalCredential',
        name: certification.name,
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: certification.issuer
        }
      })),
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Product Designer',
        skills: profile.skills.join(', ')
      }
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}#profile-page`,
      url: siteUrl,
      name: `${profile.name} - ${profile.headline}`,
      mainEntity: { '@id': personId },
      dateModified: profile.source.capturedAt
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}#experience`,
      name: 'Experiência profissional',
      itemListElement: profile.experience.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'OrganizationRole',
          roleName: item.role,
          description: item.description.join('\n\n'),
          member: { '@id': personId },
          memberOf: {
            '@type': 'Organization',
            name: item.company
          }
        }
      }))
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}#recommendations`,
      name: 'Recomendações recebidas',
      numberOfItems: profile.recommendations.length,
      itemListElement: profile.recommendations.map((recommendation, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          name: `Recomendação de ${recommendation.author}`,
          author: {
            '@type': 'Person',
            name: recommendation.author
          },
          reviewBody: recommendation.body,
          itemReviewed: { '@id': personId }
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Aaron Aznar | Senior Product Designer | Aaron DZN</title>
        <meta
          name="description"
          content="Perfil profissional estruturado de Aaron Aznar: Product Design, UX Strategy, Design Systems, IA aplicada ao design, 65 competências e 32 recomendações recebidas."
        />
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" type="text/markdown" href={`${siteUrl}linkedin-profile.md`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="page-root" itemScope itemType="https://schema.org/Person">
        <HeroSection />

        <section id="about" className="section">
          <div className="section-heading">
            <p className="section-kicker">Perfil</p>
            <h2>Produto, design systems e IA aplicada ao design.</h2>
          </div>
          <div className="prose-stack">
            {profile.summary.map((paragraph) => (
              <p key={paragraph} itemProp="description">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="compact-list" aria-label="Principais qualificações">
            {profile.keyQualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section" id="contact">
          <div className="section-heading">
            <p className="section-kicker">Contato</p>
            <h2>Dados profissionais publicados para contato direto.</h2>
          </div>
          <div className="contact-grid">
            <a href={`tel:${profile.contact.phoneRaw}`}>
              <span>Telefone</span>
              {profile.contact.phone}
            </a>
            <a href={`mailto:${profile.contact.email}`} itemProp="email">
              <span>Email</span>
              {profile.contact.email}
            </a>
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              <span>LinkedIn</span>
              linkedin.com/in/aa-dsgn
            </a>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span>Cidade</span>
              <span itemProp="addressLocality">{profile.contact.city}</span>,{' '}
              <span itemProp="addressRegion">{profile.contact.region}</span>,{' '}
              <span itemProp="addressCountry">{profile.contact.country}</span>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <p className="section-kicker">Serviços</p>
            <h2>Estratégia de Product Design orientada a usuários e negócio.</h2>
          </div>
          <div className="prose-stack">
            <p>{profile.servicesOverview}</p>
            <p>
              {profile.availability}. {profile.pricing}.
            </p>
          </div>
          <div className="service-list" aria-label="Serviços prestados">
            {profile.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p className="section-kicker">Experiência</p>
            <h2>Trajetória completa em consultoria, produto, UX/UI e direção de arte.</h2>
          </div>
          <div className="timeline">
            {profile.experience.map((item, index) => (
              <article
                className="timeline-item"
                key={`${item.company}-${item.role}-${index}`}
                itemProp="worksFor"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <div>
                  <p className="item-meta">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="company-line">
                    <span itemProp="name">{item.company}</span> · {item.location}
                  </p>
                  {'employmentType' in item ? <p className="sub-meta">{item.employmentType}</p> : null}
                  {'skills' in item ? <p className="sub-meta">{item.skills}</p> : null}
                </div>
                <div className="body-copy">
                  {item.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <p className="section-kicker">Competências</p>
            <h2>65 competências mapeadas no LinkedIn.</h2>
          </div>
          <div className="tag-grid dense" aria-label="Competências">
            {profile.skills.map((skill) => (
              <span className="tag" key={skill} itemProp="knowsAbout">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <p className="section-kicker">Projetos</p>
            <h2>14 iniciativas publicadas no perfil.</h2>
          </div>
          <div className="card-grid">
            {profile.projects.map((project, index) => (
              <article className="info-card" key={`${project.name}-${index}`}>
                <p className="item-meta">{project.period}</p>
                <h3>{project.name}</h3>
                {'association' in project ? <p className="company-line">{project.association}</p> : null}
                {'description' in project ? <p>{project.description}</p> : null}
                {'details' in project ? (
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="education">
          <div>
            <div className="section-heading">
              <p className="section-kicker">Formação</p>
              <h2>Base acadêmica.</h2>
            </div>
            <div className="mini-list">
              {profile.education.map((education) => (
                <article key={education.school}>
                  <h3>{education.school}</h3>
                  <p>{education.degree}</p>
                  <span>{education.period}</span>
                  {'skills' in education ? <span>{education.skills}</span> : null}
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="section-kicker">Idiomas e curso</p>
            <div className="mini-list">
              {profile.languages.map((language) => (
                <article key={language.name}>
                  <h3>{language.name}</h3>
                  <p>{language.proficiency}</p>
                </article>
              ))}
              {profile.courses.map((course) => (
                <article key={course.name}>
                  <h3>{course.name}</h3>
                  <p>Associado a {course.association}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="section-heading">
            <p className="section-kicker">Certificados</p>
            <h2>12 licenças e certificados.</h2>
          </div>
          <div className="card-grid">
            {profile.certifications.map((certification) => (
              <article className="info-card" key={certification.name}>
                <p className="item-meta">Emitida em {certification.issued}</p>
                <h3>{certification.name}</h3>
                <p className="company-line">{certification.issuer}</p>
                {'credential' in certification ? <p>Código da credencial: {certification.credential}</p> : null}
                {'skills' in certification ? <p>Competências: {certification.skills}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="recommendations">
          <div className="section-heading">
            <p className="section-kicker">Recomendações</p>
            <h2>32 recomendações recebidas.</h2>
          </div>
          <div className="recommendation-list">
            {profile.recommendations.map((recommendation, index) => (
              <article className="recommendation" key={`${recommendation.author}-${index}`}>
                <div>
                  <p className="item-meta">#{index + 1}</p>
                  <h3>{recommendation.author}</h3>
                  <p className="company-line">{recommendation.headline}</p>
                  <p className="sub-meta">{recommendation.relationship}</p>
                </div>
                <blockquote>
                  {recommendation.body.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="additional">
          <div>
            <div className="section-heading">
              <p className="section-kicker">Voluntariado</p>
              <h2>Cultura, artes e ação social.</h2>
            </div>
            <div className="mini-list">
              {profile.volunteering.map((item) => (
                <article key={item.role}>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                  <span>{item.period}</span>
                  <span>{item.cause}</span>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="section-kicker">Causas</p>
            <div className="service-list compact">
              {profile.causes.map((cause) => (
                <span key={cause}>{cause}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section source-section" id="source">
          <div>
            <p className="section-kicker">Fonte estruturada</p>
            <h2>Conteúdo em HTML, JSON-LD e Markdown.</h2>
            <p>
              Extraído de {profile.source.name} em {profile.source.capturedAt}. O arquivo Markdown
              público replica o conteúdo estruturado usado nesta página.
            </p>
          </div>
          <a className="button button-primary" href={profile.markdownUrl}>
            Abrir Markdown
          </a>
        </section>
      </main>
    </>
  );
}
