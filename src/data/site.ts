export const site = {
  name: 'Aaron DZN',
  url: 'https://aarondzn.com',
  defaultImage: '/images/aaron-aznar-linkedin.png',
  defaultImageWidth: 800,
  defaultImageHeight: 800,
  themeColorLight: '#f6f7f8',
  themeColorDark: '#0f172a',
  defaultDescription:
    'Aaron Aznar, Senior Product Designer em São Paulo: Product Design, UX Strategy, Design Systems, Design Tokens e Inteligência Artificial aplicada ao design.',
  keywords: [
    'Aaron Aznar',
    'Aaron DZN',
    'aa-dsgn',
    'Senior Product Designer',
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'UX Strategy',
    'Product Design',
    'Design Systems',
    'Design Tokens',
    'AI-Assisted UX/UI Design',
    'Inteligência Artificial aplicada ao design',
    'IA aplicada ao Design',
    'Figma',
    'Governança de Design Systems',
    'Design de produtos digitais',
    'Produtos digitais B2B',
    'Produtos digitais B2C',
    'Accenture Brasil',
    'Ticket',
    'São Paulo Product Designer',
    'Product Designer Brasil',
    'UX Designer São Paulo',
    'Design Lead',
    'Digital Full-stack'
  ]
} as const;

export const languageAlternates = [
  {
    code: 'pt-BR',
    hreflang: 'pt-BR',
    label: 'PT',
    name: 'Português',
    path: '/',
    ogLocale: 'pt_BR'
  },
  {
    code: 'en',
    hreflang: 'en',
    label: 'EN',
    name: 'English',
    path: '/en',
    ogLocale: 'en_US'
  },
  {
    code: 'es',
    hreflang: 'es',
    label: 'ES',
    name: 'Español',
    path: '/es',
    ogLocale: 'es_ES'
  },
  {
    code: 'nl',
    hreflang: 'nl',
    label: 'NL',
    name: 'Nederlands',
    path: '/nl',
    ogLocale: 'nl_NL'
  }
] as const;

export type LanguageCode = (typeof languageAlternates)[number]['code'];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${site.url}${normalizedPath === '/' ? '/' : normalizedPath}`;
}
