import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { articles, getArticleBySlug, type Article } from '@/data/articles';
import { profile } from '@/data/profile';

const siteUrl = 'https://aarondzn.com/';
const personId = `${siteUrl}#person`;

type ArticlePageProps = {
  article: Article;
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: articles.map((article) => ({
    params: { slug: article.slug }
  })),
  fallback: false
});

export const getStaticProps: GetStaticProps<ArticlePageProps> = ({ params }) => {
  const slug = params?.slug;
  const article = typeof slug === 'string' ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article
    }
  };
};

export default function ArticlePage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  const articleUrl = `${siteUrl}artigos/${article.slug}`;
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
        sameAs: [profile.linkedinUrl],
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.contact.city,
          addressRegion: profile.contact.region,
          addressCountry: profile.contact.country
        },
        knowsAbout: profile.skills
      },
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        headline: article.title,
        description: article.description,
        articleSection: article.category,
        keywords: article.tags.join(', '),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'pt-BR',
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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Artigos',
            item: `${siteUrl}artigos`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: articleUrl
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{`${article.title} | Aaron Aznar`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={articleUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main id="conteudo" className="page-root article-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Início</a>
          <span>/</span>
          <a href="/artigos">Artigos</a>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <header className="article-header">
            <p className="eyebrow">{article.category}</p>
            <h1 itemProp="headline">{article.title}</h1>
            <p className="article-deck" itemProp="description">
              {article.hero}
            </p>
            <div className="article-meta">
              <span>Por {profile.name}</span>
              <span>{article.readingTime}</span>
              <span>Publicado em {article.publishedLabel}</span>
              <span>Atualizado em {article.updatedLabel}</span>
            </div>
          </header>

          <section className="article-summary" aria-label="Resumo do artigo">
            <h2>Principais pontos</h2>
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
              <h2>Continuidade</h2>
              <p>{article.conclusion}</p>
            </section>
          </div>

          <footer className="article-footer">
            <div className="tag-grid dense" aria-label="Tags do artigo">
              {article.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="article-cta">
              <div>
                <p className="section-kicker">Contato</p>
                <h2>Quer conversar sobre design, UX, IA ou produto digital?</h2>
              </div>
              <a className="button button-primary" href={profile.contact.whatsappUrl} rel="noreferrer" target="_blank">
                Chamar no WhatsApp
              </a>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
