export const englishArticles = [
  {
    slug: 'my-name-is-aaron-aznar',
    title: 'My name is Aaron Aznar. Yes, it starts with an explanation.',
    description:
      'A personal note about pronunciation, family origins and the practical choice to introduce myself as Aaron Aznar.',
    category: 'Identity',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    publishedLabel: 'August 5, 2026',
    updatedLabel: 'August 5, 2026',
    readingTime: '3 min read',
    hero:
      'My full name carries choices from my parents, Brazilian surnames and a Spanish family reference. In real use, I learned to reduce friction and introduce myself as Aaron Aznar.',
    tags: ['Aaron Aznar', 'Identity', 'Professional name', 'Personal brand', 'Personal story'],
    highlights: [
      'In Portuguese, I pronounce my name as Aaron without separating the two As.',
      'The same name changes with each country and accent.',
      'Aaron Aznar is shorter, easier to remember and easier to recognize.',
      'The full name remains part of the story, while the public introduction is simpler.'
    ],
    sections: [
      {
        heading: 'The first question',
        paragraphs: [
          'There is a question that has followed me since childhood: how do you pronounce your name?',
          'The short answer is Aaron. It is not necessary to pronounce the two As separately. The spelling may look unusual in Brazil, but the pronunciation is simpler than it appears.'
        ]
      },
      {
        heading: 'A name shaped by context',
        paragraphs: [
          'The same name sounds different depending on the country. I heard different versions in Brazil, the United Kingdom, the United States, France and Spain.',
          'Over time, I treated the way I introduce myself almost like a design decision: reduce friction, make recognition easier and let the conversation move to what matters.'
        ]
      },
      {
        heading: 'What remains',
        paragraphs: [
          'My full name carries family choices, origins and stories. Aaron Aznar is the clear, practical version I use professionally.',
          'It is not about hiding the complete name. It is about making the first interaction more direct, human and memorable.'
        ]
      }
    ],
    conclusion:
      'That is the small identity project behind the name: keeping the full story, while presenting a clearer version to the world.'
  },
  {
    slug: 'from-curiosity-to-artificial-intelligence',
    title: 'From curiosity to artificial intelligence: a Brazilian designer pursuing impact',
    description:
      'The professional path of Aaron Aznar, from early digital products to Product Design, Design Systems and AI-assisted UX work.',
    category: 'Career',
    publishedAt: '2026-08-04',
    updatedAt: '2026-08-04',
    publishedLabel: 'August 4, 2026',
    updatedLabel: 'August 4, 2026',
    readingTime: '5 min read',
    hero:
      'A path built across Brazilian cities, international references, user-centered technology, scalable systems and artificial intelligence applied to creative work.',
    tags: ['Product Design', 'UX Design', 'Design Systems', 'Artificial Intelligence', 'Career'],
    highlights: [
      '18+ years of experience in digital design and product design.',
      'Work across B2B, B2C, web platforms, mobile apps, internal systems and design systems.',
      'Experience with Ticket and Accenture Brasil on large digital transformation initiatives.',
      'Continuous research on AI applied to design process, creative productivity and product evolution.'
    ],
    sections: [
      {
        heading: 'Curiosity as a starting point',
        paragraphs: [
          'My work has always been shaped by curiosity about people, technology and the way digital tools become part of everyday life.',
          'Before thinking about interfaces, I was already observing how people interact with services, brands, workflows and systems.'
        ]
      },
      {
        heading: 'From digital projects to UX',
        paragraphs: [
          'Early web and mobile work made it clear that my interest was not only in technology itself, but in the people using it.',
          'That shift led me toward UX, information architecture, prototyping, interface design, accessibility, metrics and the practical impact of product decisions.'
        ]
      },
      {
        heading: 'Product design at scale',
        paragraphs: [
          'At Ticket, I worked on digital platforms for customers, companies, merchants and internal teams. At Accenture Brasil, I contributed to transformation programs for large national and multinational organizations.',
          'Those environments reinforced the importance of technical leadership, design systems, documentation and collaboration between Product, Engineering and Business.'
        ]
      },
      {
        heading: 'Design systems and AI',
        paragraphs: [
          'Design Systems moved from visual libraries to strategic infrastructure for design and engineering operations.',
          'Artificial intelligence became part of the practice as a way to accelerate research, ideation, documentation, prototyping and product evolution while keeping human experience at the center.'
        ]
      }
    ],
    conclusion:
      'The story is still moving: design, supported by responsible AI and a human-centered perspective, remains a practical way to create better digital products.'
  }
] as const;

export type EnglishArticle = (typeof englishArticles)[number];

export function getEnglishArticleBySlug(slug: string) {
  return englishArticles.find((article) => article.slug === slug);
}
