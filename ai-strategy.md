# AI Strategy Document — aarondzn.com

## 1. Objetivo
Planejar toda a inteligência artificial do site para apoiar descoberta, pesquisa, geração de conteúdo, síntese de informações e respostas confiáveis sobre Aaron DZN. O foco é inteligência assistiva alinhada à marca, sem substituir o conteúdo humano.

## 2. Componentes de IA

### 2.1 Chat
- Descrição: assistente conversacional integrado ao site para responder perguntas sobre Aaron, o portfólio e o conteúdo.
- Função principal: fornecer orientação aos visitantes, explicar narrativa e destacar pontos relevantes.
- Modo de uso: caixa de chat com contexto limitado ao conteúdo do site e informações estruturadas.
- Restrições: não deve inventar eventos, trabalhos ou declarações não suportadas. Deve indicar claramente quando não souber.

### 2.2 Busca Semântica
- Descrição: motor de busca que entende intenções e consulta conteúdo por significado, não apenas palavras-chave.
- Função principal: localizar projetos, artigos, notas e seções relevantes usando similaridade semântica.
- Modo de uso: campo de busca global que retorna resultados ordenados por relevância e contexto.
- Enriquecimento: sugere termos relacionados, categorias e possíveis tópicos de exploração.

### 2.3 RAG (Retrieval-Augmented Generation)
- Descrição: geração de respostas combinada com dados reais do site e das fontes documentadas.
- Função principal: fornece respostas com base em evidências extraídas do conteúdo e do conhecimento confiável.
- Implementação: buscar documentos relevantes via embeddings, recuperar excertos e usar um LLM para sintetizar a resposta.

### 2.4 Memória
- Descrição: manter contexto de conversas e interações anteriores para oferecer diálogo mais coeso.
- Função principal: lembrar preferências do visitante durante a sessão e manter estados de busca vinculados à conversa.
- Tipo de memória: memória de sessão para chat e contexto de navegação; opcional memória de histórico leve para personalização no mesmo navegador.

### 2.5 Embeddings
- Descrição: representação numérica de texto para comparar significado entre perguntas e conteúdo.
- Função principal: alimentar busca semântica e RAG.
- Implementação: gerar embeddings para páginas, seções, artigos, projetos e snippets de texto.
- Atualização: reprocessar embeddings quando novo conteúdo for publicado ou atualizado.

### 2.6 Vetorização
- Descrição: armazenar embeddings em um índice vetorial para busca e recuperação rápida.
- Função principal: buscar conteúdos similares ao input do usuário.
- Tecnologias: Pinecone, Weaviate, Supabase Vector, Milvus ou um índice local leve.
- Indicadores: latência de busca baixa e boa relevância nos retornos.

### 2.7 Prompt Engineering
- Descrição: projetar prompts que guiem o modelo para responder com precisão e no tom correto.
- Princípios:
  - fornecer contexto de fonte antes de gerar resposta
  - esclarecer o papel do assistente como “assistente de informações sobre Aaron DZN”
  - incluir regras para citar fontes e evitar suposições
  - limitar outputs a itens verificáveis quando possível
- Exemplos:
  - "Use apenas os dados confirmados no site e no material documentado. Se não houver informação suficiente, diga que não há dados disponíveis."
  - "Responda de forma humana, profissional e sem exageros. Cite a seção ou artigo quando suportado."

### 2.8 Ferramentas
- Chat widget com integração ao backend RAG
- API de embeddings
- Índice vetorial para busca semântica
- Infraestrutura de logs de conversação
- API de conteúdo para recuperar documentos e metadados
- UI de feedback de resposta (útil/não útil)

## 3. Fontes de Dados
- Conteúdo do site: páginas, artigos, projetos, notas, timeline, fatos e dados.
- Metadados: títulos, descrições, tags, datas, idiomas.
- Documentos estruturados: portfólio, About, Atuação, conteúdo editorial.
- Dados externos validados: perfil público do GitHub, perfil público do LinkedIn, materiais próprios autorizados.
- Base factual: informações explícitas fornecidas pelo proprietário.

## 4. Como Responder Perguntas Sobre Mim
- Priorizar respostas baseadas em conteúdo do site.
- Capturar a narrativa de carreira e posicionamento pessoal conforme descrito em “Sobre”, “Portfólio” e “Atuação”.
- Referenciar projetos e experiências quando questionado sobre habilidades ou histórico.
- Usar linguagem que reforce confiança, clareza e autenticidade.
- Evitar qualquer afirmação não suportada por fontes.

## 5. Como Evitar Alucinações
- Usar RAG para estruturar respostas a partir de evidência real.
- Limitar o modelo a dados recuperados e metadados confiáveis.
- Incluir o prompt de instrução "Use apenas dados suportados por fontes indexadas. Se não houver resposta confiável, admita a limitação."
- Implementar checagem de veracidade básica no backend: se a similaridade for baixa, retornar “Não encontrei informações confiáveis”.
- Separar claramente conteúdo gerado de conteúdo citado.

## 6. Como Citar Fontes
- Sempre incluir referências explícitas quando a resposta usa conteúdo do site.
- Exemplo: “De acordo com a seção ‘Sobre’ do site...” ou “No artigo ‘X’...”.
- Para respostas derivadas de busca semântica, indicar o título da página ou artigo e o trecho correspondente.
- Usar links diretos para conteúdo quando possível.

## 7. Como Atualizar Conhecimento
- Workflow de atualização:
  1. novo conteúdo é publicado no CMS ou em markdown
  2. conteúdo é versionado e sincronizado
  3. embeddings são recalculados para os itens alterados
  4. índice vetorial é atualizado
  5. o chat e a busca usam o índice atualizado em tempo real ou via revalidação
- Periodicidade: atualização de embeddings sempre que houver alterações significativas; reindexação completa em intervalos definidos.
- Monitoramento: verificação de integridade do índice e logs de consultas pendentes.

## 8. Arquitetura Recomendada
- Frontend: `Next.js` com chat widget e barra de busca.
- Backend: serverless API para RAG, embeddings, busca e logs.
- Embeddings: OpenAI Embeddings ou alternativa compatível.
- Índice vetorial: Supabase Vector / Pinecone / Weaviate.
- LLM: OpenAI GPT-4.1 / GPT-4o / modelo relevante com bom suporte a instruções.
- CMS: conteúdo estruturado de site com campo adicional para suporte de IA.

## 9. Exemplos de Fluxo

### 9.1 Busca Semântica
- Usuário digita “Como ele pensa sobre arquitetura de software?”
- Frontend envia query para backend.
- Backend gera embedding da consulta.
- Índice vetorial retorna os documentos mais similares.
- RAG seleciona trechos relevantes e gera resposta com citações.
- Frontend exibe resultados com links para as fontes.

### 9.2 Chat
- Usuário pede “Quais foram os principais projetos de produto?”
- Chat backend usa contexto de sessão e busca semântica.
- Recupera projetos relevantes e metadados.
- Gera resposta humana, concisa e referenciada.
- Se a informação não for suficiente, diz: “Ainda não há detalhes suficientes no site para responder com precisão.”

## 10. Regras de Qualidade
- Resposta deve ser fiel, clara e útil.
- Não inventar dados sobre carreira, projetos, datas ou títulos.
- Revisar respostas mais longas para evitar ambiguidade.
- Fornecer fonte sempre que possível.
- Manter o tom alinhado com a marca pessoal: profissional, reflexivo, direto.

## 11. Considerações Éticas
- Privacidade do visitante: não armazenar conteúdo pessoal sem consentimento.
- Transparência: indicar que o assistente é baseado em IA e usa fontes do site.
- Respeito à propriedade intelectual: citar apenas fontes autorizadas.
- Segurança: não permitir geração de conteúdo sensível ou informações pessoais não públicas.

## 12. Conclusão
A IA do `aarondzn.com` deve ser planejada como suporte contextual, não como substituto de conteúdo humano. Com RAG, embeddings e busca semântica, o site ganha recursos inteligentes sem perder controle editorial e factualidade.
