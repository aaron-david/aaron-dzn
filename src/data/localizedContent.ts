export const localizedContent = {
  en: {
    htmlLang: 'en',
    path: '/en',
    ogLocale: 'en_US',
    title: 'Aaron Aznar | Senior Product Designer',
    description:
      'Aaron Aznar is a Senior Product Designer in São Paulo focused on Product Design, UX Strategy, Design Systems, Design Tokens and AI-assisted UX/UI design.',
    imageAlt:
      'Aaron Aznar, Senior Product Designer specializing in Product Design, UX Strategy, Design Systems and AI-assisted design.',
    eyebrow: 'Senior Product Designer',
    headline: 'Product Design, Design Systems and AI-assisted UX for complex digital products.',
    intro:
      'I design and evolve digital products for enterprise, B2B and B2C contexts, connecting user experience, business goals, scalable systems and emerging AI workflows.',
    summaryTitle: 'A designer connecting people, systems and emerging technology.',
    summary: [
      'My work combines UX Strategy, Product Design, Design Systems and Artificial Intelligence applied to design operations. I help teams transform complexity into clear digital experiences.',
      'Across more than 18 years, I have contributed to products, platforms, mobile apps, internal tools and design governance initiatives for national and global organizations.'
    ],
    highlightTitle: 'Highlights',
    highlightHeading: 'Experience across product, design systems and AI-assisted UX.',
    profileTitle: 'A designer connecting people, systems and emerging technology.',
    expertiseTitle: 'Product design, UX strategy and scalable design systems.',
    experienceTitle: 'Experience with Accenture Brasil, Ticket and digital transformation.',
    articlesTitle: 'Writing on design, product and artificial intelligence.',
    contactTitle: 'Professional contact.',
    contactAriaLabel: 'Main contact details',
    articlesIntro:
      'Selected writing is currently available in Portuguese, with topics connected to design, product and artificial intelligence.',
    highlights: [
      '18+ years in digital and product design.',
      'Design Systems, Design Tokens and UX governance.',
      'AI-assisted workflows for research, ideation, documentation and interface design.',
      'Experience with Accenture Brasil, Ticket and large digital transformation programs.'
    ],
    highlightCards: [
      {
        title: 'Senior Product Designer',
        description:
          '18+ years creating and evolving B2B, B2C and enterprise digital products in complex corporate environments.',
        keywords: ['Product Design', 'UX Strategy', 'Digital products', 'Design Lead']
      },
      {
        title: 'Design Systems and Design Tokens',
        description:
          'Experience creating, documenting, governing and scaling design systems for product and engineering teams.',
        keywords: ['Design Systems', 'Design Tokens', 'Figma', 'Governance']
      },
      {
        title: 'AI-Assisted UX/UI Design',
        description:
          'Use of artificial intelligence to accelerate research, ideation, documentation, prototyping and interface evolution.',
        keywords: ['Artificial Intelligence', 'AI Specialist', 'UX/UI', 'Creative productivity']
      },
      {
        title: 'Accenture Brasil and Ticket',
        description:
          'Work across digital transformation, web platforms, mobile apps, internal systems, B2B products and B2C products.',
        keywords: ['Accenture Brasil', 'Ticket', 'Digital transformation', 'Mobile apps']
      },
      {
        title: '32 received recommendations',
        description:
          'Public LinkedIn recommendations highlight collaboration, technical excellence, leadership, creativity and delivery quality.',
        keywords: ['LinkedIn recommendations', 'Technical leadership', 'Collaboration', 'Visual Design']
      },
      {
        title: '65 mapped skills',
        description:
          'Published skills include Product Discovery, UX Strategy, Motion Design, interaction design, UX research and usability.',
        keywords: ['Product Discovery', 'UX Research', 'Usability', 'Motion Design']
      }
    ],
    expertiseTags: [
      'Product Design',
      'UX Strategy',
      'Design Systems',
      'Design Systems Governance',
      'Design Tokens',
      'AI-Assisted UX/UI Design',
      'Information Architecture',
      'B2B and B2C Products',
      'Enterprise Products',
      'Technical Leadership',
      'Motion Design',
      'Experience Design',
      'Product Discovery',
      'User Research',
      'Usability',
      'Interaction Design',
      'Interface Design',
      'Prototyping',
      'Journey Mapping',
      'Design Documentation',
      'Component Libraries',
      'Figma',
      'Accessibility',
      'Design Operations',
      'Product Strategy',
      'Digital Transformation',
      'Web Platforms',
      'Mobile Apps'
    ],
    sections: {
      profile: 'Profile',
      expertise: 'Core expertise',
      experience: 'Experience snapshot',
      articles: 'Articles',
      contact: 'Contact'
    },
    experience: [
      {
        title: 'Design Associate Manager',
        company: 'Accenture Brasil',
        body: 'Led and contributed to Product Design, UX Strategy, Design Systems and AI initiatives for financial services, telecom, technology, streaming, retail, journalism and mining clients.'
      },
      {
        title: 'UX/UI Designer',
        company: 'Ticket',
        body: 'Worked on digital platforms for customers, companies, merchants and internal teams, including web platforms, mobile apps, research, information architecture and interface evolution.'
      }
    ],
    articleCta: 'Read a featured article in English',
    contactCta: 'Start a conversation on WhatsApp'
  }
} as const;

export type LocalizedPageCode = keyof typeof localizedContent;
