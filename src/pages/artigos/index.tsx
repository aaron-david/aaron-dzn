import { SeoHead } from '@/components/SeoHead';
import { articles } from '@/data/articles';
import { profile } from '@/data/profile';
import { site } from '@/data/site';

const siteUrl = `${site.url}/`;
const articlesUrl = `${siteUrl}artigos`;
const personId = `${siteUrl}#person`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.headline,
      email: profile.contact.email,
      telephone: profile.contact.phoneRaw,
      sameAs: [profile.linkedinUrl]
    },
    {
      '@type': 'CollectionPage',
      '@id': `${articlesUrl}#collection`,
      url: articlesUrl,
      name: `Artigos de ${profile.name}`,
      description:
        'Artigos sobre Product Design, UX, Design Systems, carreira, produtos digitais e Inteligência Artificial aplicada ao design.',
      author: { '@id': personId },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: articles.length,
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
            author: { '@id': personId },
            keywords: article.tags.join(', ')
          }
        }))
      }
    }
  ]
};

export default function ArticlesIndex() {
  return (
    <>
      <SeoHead
        canonicalPath="/artigos"
        description="Artigos de Aaron Aznar sobre Product Design, UX, Design Systems, carreira, produtos digitais e Inteligência Artificial aplicada ao design."
        imageAlt={profile.imageAlt}
        keywords={[...profile.focusAreas, ...articles.flatMap((article) => article.tags)]}
        locale="pt_BR"
        title="Artigos | Aaron Aznar | Product Design, UX e IA"
        type="website"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SeoHead>
      <main id="conteudo" className="page-root">
        <section className="page-hero compact-hero">
          <p className="eyebrow">Artigos</p>
          <h1>Textos sobre design, produto, carreira e inteligência artificial.</h1>
          <p>
            Artigos autorais com leitura clara, organização por temas e dados estruturados para
            facilitar descoberta e referência.
          </p>
        </section>

        <section className="section article-directory" aria-label="Lista de artigos">
          <div className="article-list">
            {articles.map((article) => (
              <article className="article-card large" key={article.slug}>
                <div>
                  <p className="item-meta">
                    {article.category} · {article.readingTime} · Publicado em {article.publishedLabel}
                  </p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <div className="tag-grid dense" aria-label={`Temas do artigo ${article.title}`}>
                    {article.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a className="button button-primary" href={`/artigos/${article.slug}`}>
                  Ler artigo
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
