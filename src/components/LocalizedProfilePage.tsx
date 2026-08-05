import Image from 'next/image';
import { SeoHead } from '@/components/SeoHead';
import { localizedContent, type LocalizedPageCode } from '@/data/localizedContent';
import { getWhatsappUrl, profile } from '@/data/profile';
import { absoluteUrl, site } from '@/data/site';

type LocalizedProfilePageProps = {
  locale: LocalizedPageCode;
};

export function LocalizedProfilePage({ locale }: LocalizedProfilePageProps) {
  const copy = localizedContent[locale];
  const personId = `${site.url}/#person`;
  const whatsappUrl = getWhatsappUrl(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        alternateName: profile.brand,
        url: absoluteUrl(copy.path),
        image: absoluteUrl(profile.image),
        sameAs: [profile.linkedinUrl, site.url],
        email: profile.contact.email,
        telephone: profile.contact.phoneRaw,
        jobTitle: copy.eyebrow,
        description: copy.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.contact.city,
          addressRegion: profile.contact.region,
          addressCountry: profile.contact.country
        },
        knowsAbout: copy.expertiseTags,
        knowsLanguage: ['pt-BR', 'en']
      },
      {
        '@type': 'ProfilePage',
        '@id': `${absoluteUrl(copy.path)}#profile-page`,
        url: absoluteUrl(copy.path),
        name: copy.title,
        headline: copy.headline,
        description: copy.description,
        inLanguage: copy.htmlLang,
        mainEntity: { '@id': personId },
        about: copy.expertiseTags.map((area) => ({
          '@type': 'Thing',
          name: area
        })),
        keywords: [...copy.expertiseTags, ...copy.highlights].join(', '),
        dateModified: profile.source.capturedAt
      },
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl(copy.path)}#highlights`,
        name: copy.highlightTitle,
        itemListElement: copy.highlightCards.map((highlight, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'DefinedTerm',
            name: highlight.title,
            description: highlight.description,
            keywords: highlight.keywords.join(', ')
          }
        }))
      }
    ]
  };

  return (
    <>
      <SeoHead
        canonicalPath={copy.path}
        contentLanguage={copy.htmlLang}
        description={copy.description}
        imageAlt={copy.imageAlt}
        includeLanguageAlternates
        keywords={[
          ...copy.expertiseTags,
          ...copy.highlights,
          ...copy.highlightCards.flatMap((highlight) => highlight.keywords)
        ]}
        locale={copy.ogLocale}
        title={copy.title}
        type="profile"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SeoHead>
      <main className="page-root localized-page" id="conteudo" lang={copy.htmlLang}>
        <section className="localized-hero">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.headline}</h1>
            <p>{copy.intro}</p>
            <div className="hero-contact" aria-label={copy.contactAriaLabel}>
              <a href={whatsappUrl} rel="noreferrer" target="_blank">
                WhatsApp {profile.contact.phone}
              </a>
              <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
              <span>{profile.contact.location}</span>
            </div>
          </div>
          <div className="localized-photo">
            <Image
              alt={copy.imageAlt}
              height={800}
              priority
              sizes="(max-width: 720px) 100vw, 320px"
              src={profile.image}
              width={800}
            />
          </div>
        </section>

        <section className="section" id="highlights">
          <div className="section-heading">
            <p className="section-kicker">{copy.highlightTitle}</p>
            <h2>{copy.highlightHeading}</h2>
          </div>
          <div className="highlight-card-grid">
            {copy.highlightCards.map((highlight) => (
              <article
                className="highlight-card"
                itemScope
                itemType="https://schema.org/DefinedTerm"
                key={highlight.title}
              >
                <p className="item-meta">{highlight.keywords.slice(0, 2).join(' · ')}</p>
                <h3 itemProp="name">{highlight.title}</h3>
                <p itemProp="description">{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading">
            <p className="section-kicker">{copy.sections.profile}</p>
            <h2>{copy.profileTitle}</h2>
          </div>
          <div className="prose-stack">
            {copy.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <p className="section-kicker">{copy.sections.expertise}</p>
            <h2>{copy.expertiseTitle}</h2>
          </div>
          <div className="tag-grid dense" aria-label={copy.sections.expertise}>
            {copy.expertiseTags.map((skill) => (
              <span className="tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p className="section-kicker">{copy.sections.experience}</p>
            <h2>{copy.experienceTitle}</h2>
          </div>
          <div className="card-grid">
            {copy.experience.map((item) => (
              <article className="info-card" key={`${item.company}-${item.title}`}>
                <p className="item-meta">{item.company}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section source-section" id="articles">
          <div>
            <p className="section-kicker">{copy.sections.articles}</p>
            <h2>{copy.articlesTitle}</h2>
            <p>{copy.articlesIntro}</p>
          </div>
          <a className="button button-primary" href="/en/articles/from-curiosity-to-artificial-intelligence">
            {copy.articleCta}
          </a>
        </section>

        <section className="section source-section" id="contact">
          <div>
            <p className="section-kicker">{copy.sections.contact}</p>
            <h2>{copy.contactTitle}</h2>
            <p>
              {profile.contact.email} · {profile.contact.location}
            </p>
          </div>
          <a className="button button-primary" href={whatsappUrl} rel="noreferrer" target="_blank">
            {copy.contactCta}
          </a>
        </section>
      </main>
    </>
  );
}
