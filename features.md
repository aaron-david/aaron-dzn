# Feature Specification — aarondzn.com

## 1. Visão Geral
Este documento lista os recursos desejados para `aarondzn.com`, incluindo objetivos, valor para o usuário e como cada item se encaixa na experiência do site pessoal e no hub de marca.

## 2. Recursos Principais

### 2.1 Mapa Interativo
- Descrição: um mapa visual que destaca conexões, eventos, aparições e áreas de atuação.
- Valor: ajuda visitantes a perceberem alcance geográfico e contextos de networking.
- Uso: páginas de contato, eventos e perfil.
- Dependências: gráfico interativo, dados estruturados, performance de renderização.

### 2.2 Timeline
- Descrição: linha do tempo da evolução profissional e marcos importantes.
- Valor: mostra crescimento, escolhas estratégicas e narrativa de jornada profissional.
- Uso: seção “Sobre” e páginas de trajetória.
- Dependências: dados de carreira, componentes de visualização cronológica.

### 2.3 AI Search
- Descrição: busca inteligente que entende intenção e encontra conteúdo por tema, projeto, artigo ou frase.
- Valor: permite encontrar rapidamente insights em todo o site.
- Uso: barra de pesquisa global.
- Dependências: embeddings, indexador semântico, API de IA.

### 2.4 Blog
- Descrição: seção de publicações mais formais e atualizadas.
- Valor: reforça autoridade, pensamento e conteúdo vivo.
- Uso: hub de artigos e notas.
- Dependências: CMS, gestão de conteúdo, SEO, page templates.

### 2.5 Articles
- Descrição: peças de conteúdo editorial, reflexões e insights.
- Valor: demonstra raciocínio profundo e posicionamento.
- Uso: conteúdo principal do blog/hub.
- Dependências: tipografia, estrutura de artigo, recomendação de leitura.

### 2.6 GitHub
- Descrição: integração visível com perfil e projetos relevantes do GitHub.
- Valor: mostra maturidade técnica e conexões reais de código.
- Uso: seção de links e dados de perfil.
- Dependências: API do GitHub, dados públicos.

### 2.7 LinkedIn
- Descrição: link direto e visão resumida do perfil profissional.
- Valor: fornece prova social e caminho para conexão profissional.
- Uso: contatos e conexões.
- Dependências: link externo e meta dados claros.

### 2.8 Feedback
- Descrição: mecanismo para visitantes deixarem comentários sobre o site ou conteúdo.
- Valor: coleta insight direto, melhora a relevância do site.
- Uso: formulários de feedback ou seções de reação.
- Dependências: backend para gravação de feedback, moderação.

### 2.9 Reactions
- Descrição: reações rápidas em artigos e projetos (`👍`, `👏`, `💡`, etc.).
- Valor: capta o pulso do engajamento sem formulário extenso.
- Uso: em posts, cases e conteúdo.
- Dependências: API de reação, armazenamento de métricas.

### 2.10 Notes
- Descrição: espaço privado ou público para anotações, aprendizados e insights.
- Valor: permite capturar pensamento contínuo e compartilhar reflexões leves.
- Uso: seção de notas ou “micro-conteúdos”.
- Dependências: CMS ou sistema de conteúdo leve.

### 2.11 Email
- Descrição: formulário de contato ou CTA direto para e-mail.
- Valor: canal tradicional de conexão profissional.
- Uso: página de contato e rodapé.
- Dependências: service de e-mail, validação, proteção anti-spam.

### 2.12 WhatsApp
- Descrição: link de mensagem rápida para contato direto.
- Valor: oferece alternativa imediata de comunicação.
- Uso: contato e convites.
- Dependências: link seguro, possível disponibilidade ou etiqueta de uso.

### 2.13 Downloads
- Descrição: área para baixar arquivos relevantes como CV ou materiais autorizados.
- Valor: torna fácil obter recursos oficiais.
- Uso: seção de recursos ou contato.
- Dependências: storage seguro, controle de acesso se necessário.

### 2.14 CV
- Descrição: link para CV em PDF ou página de resumo profissional.
- Valor: permite revisão rápida de credenciais.
- Uso: destaque em contato e sobre.
- Dependências: geração de PDF ou arquivo estático.

### 2.15 Contact
- Descrição: central de conexão com formulário, links e instruções.
- Valor: converte o visitante em oportunidade.
- Uso: página de contato principal.
- Dependências: envio de mensagem, CTA claros, proteção anti-spam.

### 2.16 CMS
- Descrição: sistema para gerenciamento de conteúdo, multilíngue e updates.
- Valor: mantém o site vivo e editável.
- Uso: blog, artigos, notas, oferta de conteúdo.
- Dependências: headless CMS ou Git-based content management.

### 2.17 Analytics
- Descrição: rastreamento de comportamento e métricas de engajamento.
- Valor: informa decisões de conteúdo e performance.
- Uso: site inteiro, eventos de conversão.
- Dependências: plataforma leve e compliance de privacidade.

### 2.18 Dashboard
- Descrição: painel interno para visualizar métricas, feedback e conteúdo.
- Valor: monitoramento operacional e editorial.
- Uso: administração ou área privada.
- Dependências: autenticação e API de dados.

### 2.19 Bookmarks
- Descrição: funcionalidade para salvar artigos, projetos ou links.
- Valor: permite revisitamento e curadoria pessoal.
- Uso: usuário autenticado ou armazenamento local.
- Dependências: storage cliente ou usuário, backend opcional.

### 2.20 Export PDF
- Descrição: exportar conteúdo ou CV em PDF.
- Valor: entrega material formal para compartilhamento.
- Uso: projetos, artigos ou perfil.
- Dependências: geração de PDF no servidor ou cliente.

### 2.21 Export Markdown
- Descrição: exportar conteúdo em markdown para edição ou compartilhamento.
- Valor: dá flexibilidade editorial e reuso.
- Uso: posts, notas e artigos.
- Dependências: CMS/markdown source e endpoint de exportação.

## 3. Agrupamento e Priorização
- Núcleo: Contact, CV, GitHub, LinkedIn, Blog, Articles, CMS, Analytics.
- Engajamento: Reactions, Feedback, AI Search, Bookmarks.
- Conteúdo rico: Timeline, Mapa Interativo, Notes, Downloads.
- Operações: Dashboard, Export PDF, Export Markdown.

## 4. Recomendações de Implementação
- Iniciar com recursos de valor imediato: Contact, CV, LinkedIn, GitHub, Blog, Articles.
- Adicionar AI Search e Analytics no segundo ciclo.
- Construir Timeline e Mapa Interativo a partir de dados já existentes em About/Projects.
- Usar CMS para alimentar Blog, Articles e Notes.
- Criar Dashboard somente se houver necessidade real de gestão interna.
- Bookmarks e Export podem ser recursos avançados, implementados com armazenamento local ou backend leve.

## 5. Observações Finais
Esses recursos transformam `aarondzn.com` em um hub de marca pessoal robusto, conectando conteúdo narrativo, prova social e canais de contato. A implementação deve seguir a arquitetura de dados e a experiência orientada para networking qualificado.
