import Head from 'next/head';
import { articles } from '@/data/articles';
import { profile } from '@/data/profile';

const siteUrl = 'https://aarondzn.com/';
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
      <Head>
        <title>Artigos | Aaron Aznar</title>
        <meta
          name="description"
          content="Artigos de Aaron Aznar sobre Product Design, UX, Design Systems, carreira, produtos digitais e Inteligência Artificial aplicada ao design."
        />
        <link rel="canonical" href={articlesUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main id="conteudo" className="page-root">
        <section className="page-hero compact-hero">
          <p className="eyebrow">Artigos</p>
          <h1>Reflexões sobre design, produto, carreira e Inteligência Artificial.</h1>
          <p>
            Textos autorais organizados para leitura humana e também com metadados estruturados
            para mecanismos de busca e robôs de indexação.
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
