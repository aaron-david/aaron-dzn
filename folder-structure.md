# Estrutura de Pastas — aarondzn.com

## Visão Geral
Esta estrutura de pastas define a organização do projeto front-end e do conteúdo de `aarondzn.com`. Ela separa layouts, componentes, lógica de IA, conteúdo editorial e sistemas de tokens para manter o projeto modular e escalável.

```
src/
├── ai/
├── articles/
├── assets/
├── components/
├── content/
├── database/
├── features/
├── hooks/
├── layouts/
├── pages/
├── prompts/
├── services/
├── shared/
├── styles/
├── tokens/
├── utils/
```

## Diretórios

### `src/`
Ponto de entrada principal do projeto. Contém toda a aplicação, incluindo pages, componentes, estilos e lógica de domínio.

### `components/`
Componentes reutilizáveis de interface, como botões, cards, formulários, modais e blocos de conteúdo.

### `pages/`
Rotas de página da aplicação. Cada arquivo representa uma página ou rota de URL.

### `layouts/`
Layouts de página e wrappers estruturais que definem a composição básica de header, footer, navegação e containers.

### `features/`
Recursos específicos do produto, como timeline, mapa interativo, busca semântica, chat e feedback.

### `shared/`
Recursos compartilhados entre várias partes da aplicação, como constantes, tipos, dados de configuração e componentes gerais.

### `services/`
Lógica de integração com APIs, CMS, back-end e serviços externos.

### `database/`
Modelos e scripts para persistência de dados, definições de entidades, migrações ou fixtures.

### `content/`
Conteúdo do site em formato estruturado. Pode incluir páginas em markdown, dados de portfólio e ícones de conteúdo.

### `articles/`
Artigos e publicações, idealmente em markdown ou MDX, para a seção de blog e hub de conteúdo.

### `assets/`
Imagens, ícones, fontes e outros recursos estáticos.

### `tokens/`
Design tokens, cores, tipografia, espaçamento e definições de tema.

### `prompts/`
Prompts e templates para IA, RAG, chat e geração de metadados.

### `ai/`
Lógica de IA, embeddings, vetorização, pesquisa semântica, chat e memória.

### `utils/`
Funções utilitárias e helpers gerais usados no projeto.

### `hooks/`
Hooks customizados do React para lidar com estado, tema, dados e interações.

### `styles/`
Arquivos de estilo globais, configurações de Tailwind/CSS, temas e utilitários de estilo.
