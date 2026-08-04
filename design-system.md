# Design System — aarondzn.com

## 1. Visão Geral
Este Design System define a linguagem visual e comportamental de `aarondzn.com`, incluindo tokens, tipografia, layout, componentes e temas dinâmicos. O objetivo é garantir consistência, acessibilidade e adaptação de marca em todos os pontos do site.

## 2. Tokens

### 2.1 Cores
- `color-primary`: cor principal da marca
- `color-primary-strong`: variação intensa da cor principal
- `color-primary-soft`: variação suave da cor principal
- `color-neutral-100` / `color-neutral-900`: escala de neutros para superfícies e textos
- `color-background`: cor de fundo principal
- `color-surface`: cor de superfície de cartões e seções
- `color-border`: cor de borda e separação
- `color-text-primary`: texto principal
- `color-text-secondary`: texto secundário
- `color-info`, `color-success`, `color-warning`, `color-danger`
- `color-muted`: textos de suporte e metadados

### 2.2 Tipografia
- `font-family-base`: família tipográfica principal
- `font-family-mono`: família tipográfica monoespaçada para dados e código
- `font-weight-regular`, `font-weight-medium`, `font-weight-bold`
- `font-size-xs`, `font-size-sm`, `font-size-md`, `font-size-lg`, `font-size-xl`, `font-size-2xl`, `font-size-3xl`, `font-size-4xl`
- `line-height-tight`, `line-height-normal`, `line-height-loose`
- `letter-spacing-normal`, `letter-spacing-wide`

### 2.3 Espaçamento
- `space-xxs`, `space-xs`, `space-sm`, `space-md`, `space-lg`, `space-xl`, `space-2xl`
- `space-inline-xs`, `space-block-xs` para margens/paddings específicos

### 2.4 Radius
- `radius-none`
- `radius-sm`
- `radius-md`
- `radius-lg`
- `radius-round`

### 2.5 Elevação
- `shadow-none`
- `shadow-sm`
- `shadow-md`
- `shadow-lg`
- `shadow-peak`

### 2.6 Motion
- `duration-fast`, `duration-regular`, `duration-slow`
- `easing-standard`, `easing-decelerate`, `easing-accelerate`, `easing-bounce`
- `motion-fade`, `motion-slide`, `motion-scale`

### 2.7 Grid
- `grid-columns`: 12 colunas
- `grid-gutter`: espaço entre colunas
- `grid-margin`: margens laterais responsivas
- `container-width-sm`, `container-width-md`, `container-width-lg`

### 2.8 Ícones
- Conjunto de ícones tipográficos e de sistema para navegação, ações, estados e mídia
- Ícones devem ser fornecidos em SVG e adaptáveis a cor de preenchimento via `currentColor`
- Token de tamanho: `icon-sm`, `icon-md`, `icon-lg`

## 3. Color Engine e Temas Dinâmicos

### 3.1 Motor de Cor
- A cor principal do visitante é o token `color-primary`
- As variações derivadas são geradas automaticamente:
  - `color-primary-strong`
  - `color-primary-soft`
  - `color-primary-contrast`
- A lógica de derivação deve considerar contraste e acessibilidade, gerando cores legíveis para texto e elementos interativos.

### 3.2 Dark Mode
- Tema `light` e `dark`
- Tokens adaptativos:
  - `background`, `surface`, `text-primary`, `text-secondary`, `border`
- Preferência do usuário via CSS `prefers-color-scheme`
- Persistência da escolha do usuário em `localStorage`

### 3.3 Tema Dinâmico
- O visitante escolhe a cor principal da marca em uma interface de seleção.
- A aplicação retematiza automaticamente usando tokens derivados.
- O tema dinâmico afeta:
  - botões primários
  - links
  - destaques e marcas de navegação
  - gradientes e bordas focais
  - elementos de suprimento visual em cards e seções
- O sistema define um `theme palette` baseado na cor escolhida, mantendo contraste acessível para dark/light.

## 4. Tipografia

### 4.1 Escala Tipográfica
- `display` — títulos maiores e dramáticos
- `heading-1` a `heading-6` — hierarquia de títulos
- `body-large` — parágrafos principais
- `body-regular` — texto padrão
- `caption` — texto auxiliar e metadados

### 4.2 Hierarquia
- Headline principal em `heading-1`
- Subtítulos e seções em `heading-2` / `heading-3`
- Parágrafos em `body-regular`
- Destaques ou citações em `body-large`

### 4.3 Acessibilidade tipográfica
- Tamanho mínimo de leitura para corpo de texto
- Contraste de texto conforme WCAG 2.1 AA
- Ajuste responsivo da escala em telas menores

## 5. Grid e Layout

### 5.1 Sistema de Grid
- Layout baseado em 12 colunas para desktop
- Pontos de corte responsivos para tablet e mobile
- Containers com largura máxima e margens laterais fluidas

### 5.2 Layout de Página
- Estrutura modular de seções
- Margens verticais claras entre seções
- Composição de conteúdo com cards e listas em grid
- Alinhamento e espaçamento consistentes usando tokens de espaçamento

## 6. Componentes

### 6.1 Fundacionais
- `Button`
- `Link`
- `Text`
- `Heading`
- `Card`
- `Badge`
- `Tag`
- `Avatar`
- `Icon`
- `Tooltip`
- `Divider`

### 6.2 Composição
- `Hero`
- `Section`
- `ProjectCard`
- `ContentTile`
- `TestimonialBlock`
- `FeatureGrid`
- `Quote`
- `ContactForm`
- `LanguageSwitcher`
- `ThemePicker`
- `Breadcrumb`

### 6.3 Interativos
- `NavBar`
- `SideNav`
- `Tabs`
- `Accordion`
- `Modal`
- `Popover`
- `ThemeToggle`
- `ColorPicker`

## 7. Acessibilidade

### Princípios
- WCAG 2.1 AA em contraste de cor
- navegação por teclado completa
- foco visível em componentes interativos
- labels claros e assistivos para formulários
- uso apropriado de roles ARIA
- leitura lógica de conteúdo em ordem de tabulação

### Estratégia
- botões e links com foco e hover distintos
- imagens com `alt` descritivo
- componentes complexos com `aria-expanded`, `aria-controls`, `aria-label`
- suporte a leitores de tela e navegação por teclado no `ColorPicker`

## 8. Dark Mode

### Tokens adaptativos
- `background-primary`
- `surface-primary`
- `text-primary`
- `text-secondary`
- `border-muted`
- `shadow-surface`

### Comportamento
- dark mode ajusta automaticamente valores de fundo e texto
- cor principal derivada permanece legível
- variações de superfície usam opacidade e brilho controlado

## 9. Dynamic Theme

### Fluxo
1. visitante escolhe `color-primary`
2. o engine calcula:
   - `color-primary-strong`
   - `color-primary-soft`
   - `color-primary-contrast`
   - `color-primary-border`
3. theme tokens são aplicados globalmente
4. dark/light switch ajusta o mesmo conjunto de tokens

### Aplicações
- botões e CTAs
- navegação e indicadores ativos
- destaques de texto e links
- bordas e sombras de cards
- elementos de marca e gráficos simples

### Regras de acessibilidade
- contraste mínimo 4.5:1 para texto
- contraste mínimo 3:1 para elementos de UI grandes
- fallback automático para cores neutras se o contraste for insuficiente

## 10. Icons

### Guia
- ícones SVG escaláveis
- adaptação por `currentColor`
- tamanhos responsivos: `icon-sm`, `icon-md`, `icon-lg`
- linguagem visual alinhada à marca pessoal

### Tipos
- navegação
- ações primárias
- estados e feedback
- mídias sociais
- conteúdo e formato

## 11. Motion

### Tokens
- `motion-duration-fast`: 120ms
- `motion-duration-regular`: 240ms
- `motion-duration-slow`: 360ms
- `motion-easing-standard`: `cubic-bezier(0.4, 0, 0.2, 1)`
- `motion-easing-decelerate`: `cubic-bezier(0.0, 0.0, 0.2, 1)`
- `motion-easing-accelerate`: `cubic-bezier(0.4, 0.0, 1, 1)`

### Aplicações
- transições suaves em hover/focus
- entrada de seções e cards
- troca de tabs e modais
- feedback visual em formulários

## 12. Versão e Governança

### Documentação
- registrar tokens e componentes em um catálogo
- incluir guidelines de uso de temas e cores
- manter exemplos de variações de marca

### Governança
- alterações de token passam por revisão
- componentes atualizados com controle de versão
- tema dinâmico validado para acessibilidade

## 13. Implementação do Theme Picker

### Requisitos
- seletor de cor principal
- preview instantâneo da paleta
- persistência do tema do visitante
- integração com dark mode
- fallback seguro para cores neutras

### Resultado esperado
- o visitante define a cor da marca
- o site retematiza automaticamente todos os elementos de UI
- a experiência permanece acessível e coerente

## 14. Conclusão
Este Design System garante que `aarondzn.com` seja visualmente consistente, acessível e expansível. O motor de cor dinâmico e a escolha do visitante criam uma experiência única, enquanto os tokens e componentes mantém estabilidade e previsibilidade para o produto.
