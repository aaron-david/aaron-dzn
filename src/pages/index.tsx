import { SeoHead } from '@/components/SeoHead';
import { HeroSection } from '@/components/HeroSection';
import { articles } from '@/data/articles';
import { getWhatsappUrl, profile } from '@/data/profile';
import { absoluteUrl, site } from '@/data/site';

const siteUrl = `${site.url}/`;
const personId = `${site.url}/#person`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: siteUrl,
      inLanguage: ['pt-BR', 'en'],
      publisher: { '@id': personId },
      description: site.defaultDescription
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      alternateName: profile.brand,
      url: siteUrl,
      image: absoluteUrl(profile.image),
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
      },
      knowsLanguage: ['pt-BR', 'en']
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}#profile-page`,
      url: siteUrl,
      name: 'Aaron Aznar, Senior Product Designer',
      headline: 'Senior Product Designer especializado em Product Design, Design Systems e IA aplicada a UX',
      description: site.defaultDescription,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${site.url}/#website` },
      mainEntity: { '@id': personId },
      about: profile.focusAreas.map((area) => ({
        '@type': 'Thing',
        name: area
      })),
      keywords: [...profile.focusAreas, ...profile.skills].join(', '),
      dateModified: profile.source.capturedAt
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}#articles`,
      name: 'Artigos de Aaron Aznar',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}artigos/${article.slug}`,
        item: {
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: { '@id': personId }
        }
      }))
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}#highlights`,
      name: 'Destaques profissionais de Aaron Aznar',
      itemListElement: profile.searchHighlights.map((highlight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DefinedTerm',
          name: highlight.title,
          description: highlight.description,
          keywords: highlight.keywords.join(', ')
        }
      }))
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}#faq`,
      mainEntity: profile.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
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
  const whatsappUrl = getWhatsappUrl('pt-BR');

  return (
    <>
      <SeoHead
        canonicalPath="/"
        description="Aaron Aznar é Senior Product Designer em São Paulo, com experiência em Product Design, UX Strategy, Design Systems, Design Tokens e IA aplicada ao design."
        imageAlt={profile.imageAlt}
        includeLanguageAlternates
        keywords={[...profile.focusAreas, ...profile.skills, ...profile.searchHighlights.flatMap((item) => item.keywords)]}
        locale="pt_BR"
        title="Aaron Aznar | Senior Product Designer"
        type="profile"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SeoHead>
      <main id="conteudo" className="page-root" itemScope itemType="https://schema.org/Person">
        <HeroSection />

        <section className="section" id="highlights">
          <div className="section-heading">
            <p className="section-kicker">Destaques</p>
            <h2>Experiência em produto, sistemas de design e IA aplicada a UX.</h2>
          </div>
          <div className="highlight-card-grid">
            {profile.searchHighlights.map((highlight) => (
              <article
                className="highlight-card"
                itemScope
                itemType="https://schema.org/DefinedTerm"
                key={highlight.title}
              >
                <p className="item-meta">{highlight.keywords.slice(0, 2).join(' · ')}</p>
                <h3 itemProp="name">{highlight.title}</h3>
                <p itemProp="description">{highlight.description}</p>
                <div className="tag-grid dense">
                  {highlight.keywords.map((keyword) => (
                    <span className="tag" itemProp="keywords" key={keyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="faq">
          <div className="section-heading">
            <p className="section-kicker">FAQ</p>
            <h2>Perguntas frequentes sobre atuação, experiência e contato.</h2>
          </div>
          <div className="faq-grid">
            {profile.faq.map((item) => (
              <article
                className="faq-card"
                itemScope
                itemType="https://schema.org/Question"
                key={item.question}
              >
                <h3 itemProp="name">{item.question}</h3>
                <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="section-kicker">Perfil</p>
            <h2>Design de produto para contextos digitais complexos.</h2>
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
            <h2>Contato profissional.</h2>
          </div>
          <div className="contact-grid">
            <a href={whatsappUrl} rel="noreferrer" target="_blank">
              <span>WhatsApp</span>
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
            <h2>Estratégia de Product Design orientada a usuários e negócios.</h2>
          </div>
          <div className="prose-stack">
            <p>{profile.servicesOverview}</p>
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
            <h2>Trajetória em consultoria, produto, UX/UI e direção de arte.</h2>
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
            <h2>Competências em design, produto e tecnologia.</h2>
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
            <h2>Projetos e iniciativas digitais.</h2>
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
              <h2>Formação acadêmica e complementar.</h2>
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
            <h2>Certificações e cursos.</h2>
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
            <h2>Recomendações profissionais.</h2>
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

        <section className="section" id="articles">
          <div className="section-heading">
            <p className="section-kicker">Artigos</p>
            <h2>Textos sobre design, produto e inteligência artificial.</h2>
          </div>
          <div className="article-list">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <div>
                  <p className="item-meta">
                    {article.category} · {article.readingTime}
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <a className="text-link" href={`/artigos/${article.slug}`}>
                  Ler artigo
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="additional">
          <div>
            <div className="section-heading">
              <p className="section-kicker">Voluntariado</p>
              <h2>Voluntariado, cultura e causas.</h2>
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
            <p className="section-kicker">Fonte</p>
            <h2>Conteúdo estruturado para consulta e referência.</h2>
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
