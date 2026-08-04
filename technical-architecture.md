# Technical Architecture Document — aarondzn.com

## Visão Geral
A arquitetura técnica de `aarondzn.com` foi projetada para suportar uma presença pessoal elegante, rápida e confiável, com foco em conteúdo narrativo, SEO técnico, multilíngue e operação leve.

## 1. Front-end

### Stack
- `Next.js`
- `React`
- `TypeScript`
- `Contentlayer` ou `MDX`
- `Tailwind CSS` ou `CSS Modules`
- `next-intl` / `next-i18next`

### Por que
- Suporte a SSG/SSR/ISR para SEO e performance.
- Roteamento simples para páginas e i18n.
- Tipagem forte para evolução segura.
- Conteúdo tipado em markdown para narrativa viva.
- Estilo modular e reutilizável.

## 2. Back-end

### Arquitetura
- Serverless Functions (`Vercel`, `Netlify`, `AWS Lambda`)
- Endpoints REST simples
- Integração com serviços externos

### Por que
- Baixa manutenção operacional.
- Ideal para um site pessoal com necessidades específicas.
- Permite endpoints de formulário, preview e webhooks.

## 3. Banco de Dados

### Opções
- Conteúdo versionado em Git + Markdown
- `Supabase` / `PlanetScale` / `Neon` para dados transacionais
- `SQLite` para protótipo

### Por que
- Git + markdown é suficiente para conteúdo principal.
- Banco serverless é útil para contatos e histórico.
- Permite escalabilidade sem complexidade.

## 4. IA

### Uso
- Geração assistida de metadados e resumos
- Sugestões de títulos e descrições
- Análise de tom e consistência
- Extração semântica de conteúdo

### Tecnologias
- `OpenAI` / `Azure OpenAI`
- `LangChain` ou `OpenAI SDK`
- Banco de vetores leve para busca semântica

### Por que
- Agrega valor à criação de conteúdo.
- Automatiza metadados e análise semântica.
- Mantém o conteúdo humano mas com suporte inteligente.

## 5. APIs

### Arquitetura
- API routes no `Next.js`
- Endpoints para:
  - envio de formulário
  - preview de conteúdo
  - webhook de CMS
  - sitemap dinâmico

### Por que
- Simplicidade e confiabilidade.
- Baixo overhead para um site pessoal.
- Fácil integração com serviços externos.

## 6. Deploy

### Plataforma
- `Vercel`
- Alternativa: `Netlify` ou `Cloudflare Pages`

### Por que
- Integração nativa com `Next.js`.
- Deploy automático por commit.
- CDN global e edge cache.

## 7. Analytics

### Recomendado
- `Plausible` ou `Fathom`
- `Google Analytics 4` opcional

### Eventos
- clique em contato
- visualização de projeto
- engajamento de conteúdo
- mudança de idioma

### Por que
- Privacidade e leveza.
- Métricas suficientes sem sobrecarregar o site.

## 8. Segurança

### Itens
- HTTPS obrigatório
- CSP rigoroso
- validação de formulário
- proteção contra spam (`hCaptcha`, `reCAPTCHA`, honeypot)
- variáveis de ambiente seguras
- headers de segurança
- rate limiting em APIs

### Por que
- Reduz superfície de ataque.
- Garante confiança e proteção de dados.
- Imprescindível mesmo em site pessoal.

## 9. Cache

### Estratégia
- CDN para assets estáticos
- `Cache-Control` em respostas
- ISR / revalidação incremental
- cache de CMS e IA
- cache de API quando aplicável

### Por que
- performance e custo dependem do cache.
- conteúdo estático pode ficar disponível globalmente.
- reduz latência e carga em backend.

## 10. Autenticação

### Uso
- apenas para administração/CMS
- OAuth para editores

### Por que
- Visitantes não precisam login.
- Mantém o site leve.
- Controla apenas o acesso de edição.

## 11. CMS

### Opções
- `Sanity` ou `Contentful`
- `TinaCMS` / `Netlify CMS`
- `Contentlayer` + Markdown

### Por que
- Conteúdo vivo precisa de gestão estruturada.
- CMS Git-based é ideal para versionamento e controle.
- Headless CMS é bom para editor não técnico.

## 12. Busca

### Estratégia
- índice estático no build
- busca cliente com `Fuse.js`
- alternativa: `Algolia`

### Por que
- Site pequeno/médio não exige infraestrutura pesada.
- Busca local é rápida e simples.
- Algolia é opção para necessidades avançadas.

## 13. Performance

### Práticas
- páginas estáticas
- pré-renderização
- otimização de imagens
- fontes com `font-display: swap`
- JS mínimo em páginas estáticas
- análise do Lighthouse

### Por que
- Performance é experiência e credibilidade.
- Site pessoal deve carregar rápido.
- Menos JS significa menos atrito.

## 14. Offline

### Recomendado
- PWA leve
- `service worker`
- cache de páginas principais

### Por que
- melhora confiabilidade.
- permite leitura em condições instáveis.
- diferencial discreto para portfólio.

## 15. SEO

### Componentes
- SSG + sitemap
- `hreflang`
- `canonical`
- `JSON-LD`
- headings semânticos
- metadados por página/idioma
- URLs limpas

### Por que
- Foco em legibilidade para robôs.
- SEO técnico garante descoberta correta.
- Estrutura semântica ajuda agentes automatizados.

## 16. Internacionalização

### Idiomas
- `pt-BR`
- `en`
- `es`
- `nl`

### Abordagem
- URLs localizadas: `/pt-br`, `/en`, `/es`, `/nl`
- conteúdo traduzido no CMS
- metadata segmentada por idioma
- seletor de idioma explícito
- fallback para `pt-BR`

### Por que
- presença internacional e identidade brasileira.
- rotas localizadas facilitam SEO.
- garante experiência consistente em todos os idiomas.

## Resumo das Escolhas Principais
- Front-end: `Next.js + TypeScript` — SEO, i18n, SSG e desempenho.
- Back-end: serverless functions — simplicidade e custo baixo.
- Banco: Git + headless CMS para conteúdo; banco serverless para dados dinâmicos.
- IA: OpenAI para metadados e extração semântica.
- Deploy: `Vercel` — fluxo integrado e CDN global.
- Analytics: `Plausible`/`Fathom` — leveza e privacidade.
- Busca: índice estático + `Fuse.js`, com `Algolia` como alternativa.
- SEO: foco em estrutura e metadados claros.
- i18n: rota local e metadata por idioma.

## Conclusão
Essa arquitetura equilibra agilidade, controle editorial, experiência premium e manutenção enxuta. O resultado é um site pessoal pronto para crescer como hub de marca, com visibilidade e credibilidade técnica.
