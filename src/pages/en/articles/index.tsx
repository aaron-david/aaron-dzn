import { SeoHead } from '@/components/SeoHead';
import { englishArticles } from '@/data/englishArticles';
import { profile } from '@/data/profile';
import { site } from '@/data/site';

const siteUrl = `${site.url}/`;
const articlesUrl = `${site.url}/en/articles`;
const personId = `${site.url}/#person`;

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
      name: `Articles by ${profile.name}`,
      description:
        'Articles by Aaron Aznar on Product Design, UX, Design Systems, career, digital products and artificial intelligence applied to design.',
      author: { '@id': personId },
      inLanguage: 'en',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: englishArticles.length,
        itemListElement: englishArticles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${articlesUrl}/${article.slug}`,
          item: {
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { '@id': personId },
            keywords: article.tags.join(', '),
            inLanguage: 'en'
          }
        }))
      }
    }
  ]
};

export default function EnglishArticlesIndex() {
  return (
    <>
      <SeoHead
        canonicalPath="/en/articles"
        contentLanguage="en"
        description="Articles by Aaron Aznar on Product Design, UX, Design Systems, career, digital products and artificial intelligence applied to design."
        imageAlt={profile.imageAlt}
        keywords={[...profile.focusAreas, ...englishArticles.flatMap((article) => article.tags)]}
        locale="en_US"
        title="Articles | Aaron Aznar | Product Design, UX and AI"
        type="website"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SeoHead>
      <main id="conteudo" className="page-root">
        <section className="page-hero compact-hero">
          <p className="eyebrow">Articles</p>
          <h1>Writing on design, product, career and artificial intelligence.</h1>
          <p>
            English article routes keep the current language while presenting selected writing with
            clear summaries, structured data and direct article pages.
          </p>
        </section>

        <section className="section article-directory" aria-label="Article list">
          <div className="article-list">
            {englishArticles.map((article) => (
              <article className="article-card large" key={article.slug}>
                <div>
                  <p className="item-meta">
                    {article.category} · {article.readingTime} · Published on {article.publishedLabel}
                  </p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <div className="tag-grid dense" aria-label={`Topics for ${article.title}`}>
                    {article.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a className="button button-primary" href={`/en/articles/${article.slug}`}>
                  Read article
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
