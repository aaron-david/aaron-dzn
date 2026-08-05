import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { SeoHead } from '@/components/SeoHead';
import { englishArticles, getEnglishArticleBySlug, type EnglishArticle } from '@/data/englishArticles';
import { getWhatsappUrl, profile } from '@/data/profile';
import { absoluteUrl, site } from '@/data/site';

const siteUrl = `${site.url}/`;
const articlesUrl = `${site.url}/en/articles`;
const personId = `${site.url}/#person`;

type EnglishArticlePageProps = {
  article: EnglishArticle;
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: englishArticles.map((article) => ({
    params: { slug: article.slug }
  })),
  fallback: false
});

export const getStaticProps: GetStaticProps<EnglishArticlePageProps> = ({ params }) => {
  const slug = params?.slug;
  const article = typeof slug === 'string' ? getEnglishArticleBySlug(slug) : undefined;

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article
    }
  };
};

export default function EnglishArticlePage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  const articleUrl = `${articlesUrl}/${article.slug}`;
  const whatsappUrl = getWhatsappUrl('en');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        url: siteUrl,
        image: absoluteUrl(profile.image),
        jobTitle: profile.headline,
        email: profile.contact.email,
        telephone: profile.contact.phoneRaw,
        sameAs: [profile.linkedinUrl],
        knowsAbout: profile.skills
      },
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        image: absoluteUrl(profile.image),
        headline: article.title,
        description: article.description,
        articleSection: article.category,
        keywords: article.tags.join(', '),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'en',
        author: { '@id': personId },
        publisher: {
          '@type': 'Organization',
          name: profile.brand,
          url: siteUrl
        },
        about: article.tags.map((tag) => ({
          '@type': 'Thing',
          name: tag
        }))
      }
    ]
  };

  return (
    <>
      <SeoHead
        canonicalPath={`/en/articles/${article.slug}`}
        contentLanguage="en"
        description={article.description}
        imageAlt={profile.imageAlt}
        keywords={[...article.tags, ...profile.focusAreas, ...profile.skills.slice(0, 24)]}
        locale="en_US"
        title={`${article.title} | Aaron Aznar`}
        type="article"
      >
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        <meta property="article:author" content={profile.name} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag) => (
          <meta content={tag} key={tag} property="article:tag" />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SeoHead>
      <main id="conteudo" className="page-root article-page" lang="en">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/en">Home</a>
          <span>/</span>
          <a href="/en/articles">Articles</a>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <header className="article-header">
            <p className="eyebrow">{article.category}</p>
            <h1 itemProp="headline">{article.title}</h1>
            <p className="article-deck" itemProp="description">
              {article.hero}
            </p>
            <div className="article-meta">
              <span>By {profile.name}</span>
              <span>{article.readingTime}</span>
              <span>Published on {article.publishedLabel}</span>
              <span>Updated on {article.updatedLabel}</span>
            </div>
          </header>

          <section className="article-summary" aria-label="Article summary">
            <h2>Key points</h2>
            <ul>
              {article.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <div className="article-content" itemProp="articleBody">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <section>
              <h2>Continuity</h2>
              <p>{article.conclusion}</p>
            </section>
          </div>

          <footer className="article-footer">
            <div className="tag-grid dense" aria-label="Article tags">
              {article.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="article-cta">
              <div>
                <p className="section-kicker">Contact</p>
                <h2>Want to talk about design, UX, AI or digital products?</h2>
              </div>
              <a className="button button-primary" href={whatsappUrl} rel="noreferrer" target="_blank">
                Start a conversation on WhatsApp
              </a>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
