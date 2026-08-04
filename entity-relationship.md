# Entity Relationship Document — aarondzn.com

## 1. Visão Geral
Este documento modela os dados de `aarondzn.com` como um sistema de informações, incluindo entidades, atributos, relacionamentos, IDs, enums, tags, metadados, versões e histórico.

## 2. Entidades Principais

### 2.1 Person
- ID: `person_id`
- Atributos:
  - `name`
  - `display_name`
  - `headline`
  - `short_bio`
  - `long_bio`
  - `location`
  - `primary_role`
  - `secondary_roles` (array)
  - `values` (array)
  - `personal_traits` (array)
  - `contact_email`
  - `social_links` (array de objetos `{type, url}`)
  - `created_at`
  - `updated_at`
  - `version`

### 2.2 Page
- ID: `page_id`
- Atributos:
  - `title`
  - `slug`
  - `description`
  - `type` (enum)
  - `status` (enum)
  - `content_summary`
  - `primary_url`
  - `breadcrumb`
  - `seo_title`
  - `seo_description`
  - `meta_tags` (array)
  - `canonical_url`
  - `created_at`
  - `updated_at`
  - `version`

### 2.3 Section
- ID: `section_id`
- Atributos:
  - `page_id` (FK)
  - `title`
  - `type` (enum)
  - `content`
  - `order`
  - `summary`
  - `created_at`
  - `updated_at`
  - `version`

### 2.4 Project
- ID: `project_id`
- Atributos:
  - `title`
  - `slug`
  - `role`
  - `challenge`
  - `approach`
  - `outcome`
  - `impact`
  - `timeline`
  - `tags` (array)
  - `status` (enum)
  - `published_at`
  - `created_at`
  - `updated_at`
  - `version`

### 2.5 ContentItem
- ID: `content_item_id`
- Atributos:
  - `title`
  - `slug`
  - `type` (enum)
  - `format` (enum)
  - `summary`
  - `body`
  - `published_at`
  - `status` (enum)
  - `tags` (array)
  - `reference_link`
  - `created_at`
  - `updated_at`
  - `version`

### 2.6 Offering
- ID: `offering_id`
- Atributos:
  - `name`
  - `description`
  - `category` (enum)
  - `deliverables` (array)
  - `alignment_notes`
  - `availability` (enum)
  - `created_at`
  - `updated_at`
  - `version`

### 2.7 Testimonial
- ID: `testimonial_id`
- Atributos:
  - `source_name`
  - `source_role`
  - `source_organization`
  - `text`
  - `context`
  - `media_type` (enum)
  - `link`
  - `created_at`
  - `updated_at`
  - `version`

### 2.8 ContactRequest
- ID: `request_id`
- Atributos:
  - `name`
  - `email`
  - `organization`
  - `role`
  - `reason` (enum)
  - `message`
  - `preferred_contact_method`
  - `status` (enum)
  - `received_at`
  - `updated_at`

### 2.9 FactData
- ID: `fact_id`
- Atributos:
  - `key`
  - `value`
  - `category` (enum)
  - `description`
  - `source`
  - `updated_at`
  - `version`

## 3. Relacionamentos

- `Person` 1:N `Page`
- `Page` 1:N `Section`
- `Page` N:M `Project` (via `PageProject`)
- `Page` N:M `ContentItem` (via `PageContent`)
- `Page` N:M `Offering` (via `PageOffering`)
- `Project` N:M `Testimonial` (via `ProjectTestimonial`)
- `ContentItem` N:M `Tag` (via `ContentTag`)
- `Project` N:M `Tag` (via `ProjectTag`)
- `Offering` N:M `Tag` (via `OfferingTag`)
- `Person` 1:N `ContactRequest`
- `Person` 1:N `FactData`

## 4. IDs e Enums

### 4.1 IDs
- `person_id`: UUID
- `page_id`: UUID
- `section_id`: UUID
- `project_id`: UUID
- `content_item_id`: UUID
- `offering_id`: UUID
- `testimonial_id`: UUID
- `request_id`: UUID
- `fact_id`: UUID
- `tag_id`: UUID

### 4.2 Enums
- `PageType`: `home`, `about`, `portfolio`, `content`, `offering`, `contact`, `fact_data`
- `PageStatus`: `draft`, `published`, `archived`
- `SectionType`: `hero`, `summary`, `timeline`, `testimonial`, `project_gallery`, `content_list`, `cta`, `metadata`, `fact_block`
- `ProjectStatus`: `draft`, `published`, `archived`
- `ContentType`: `article`, `interview`, `talk`, `reflection`, `mentorship`, `podcast`
- `ContentFormat`: `text`, `video`, `audio`, `presentation`, `mixed`
- `OfferingCategory`: `product`, `design`, `strategy`, `architecture`, `leadership`, `mentoring`, `speaking`
- `OfferingAvailability`: `available`, `by_request`, `closed`
- `TestimonialMediaType`: `text`, `video`, `audio`, `presentation`
- `ContactReason`: `networking`, `talk`, `mentorship`, `collaboration`, `event`, `other`
- `ContactStatus`: `new`, `reviewed`, `replied`, `archived`
- `FactCategory`: `professional`, `personal`, `career`, `public_profile`, `credentials`

## 5. Tags e Taxonomia

### 5.1 Tag
- ID: `tag_id`
- Atributos:
  - `name`
  - `slug`
  - `category` (enum)
  - `created_at`
  - `updated_at`

### 5.2 Taxonomia de Tags
- `produto`
- `design`
- `estratégia`
- `arquitetura`
- `mentoria`
- `palestra`
- `liderança`
- `decisão`
- `jornada`
- `aprendizado`

### 5.3 Uso de Tags
- Associar `Tag` a `Project`, `ContentItem`, `Offering`.
- Usar tags para filtrar e categorizar conteúdo vivo e portfólio.

## 6. Metadados

### 6.1 Metadados de Páginas
- `seo_title`
- `seo_description`
- `canonical_url`
- `meta_tags` (array de strings ou objetos)
- `open_graph_image`
- `twitter_card`
- `publish_date`
- `modified_date`

### 6.2 Metadados de Conteúdo
- `summary`
- `tags`
- `format`
- `reference_link`
- `author` (FK para `person_id`)
- `language`

### 6.3 Metadados de Projetos
- `timeline`
- `impact_metrics`
- `tools`
- `team_size`
- `role`

### 6.4 Metadados de Ofertas
- `intended_audience`
- `delivery_mode`
- `duration`
- `investment_hint`

## 7. Versões e Histórico

### 7.1 Controle de Versão
- Todos os registros principais incluem `version`.
- `version` é um inteiro incrementado a cada alteração publicada.
- `created_at` e `updated_at` rastreiam alterações imutáveis.

### 7.2 Histórico de Alterações
- Cada entidade pode ter uma tabela de histórico dedicada: `ProjectHistory`, `ContentItemHistory`, `PageHistory`, `OfferingHistory`, `PersonHistory`, `TestimonialHistory`, `FactDataHistory`.
- A tabela de histórico armazena:
  - `history_id`: UUID
  - `entity_id`: UUID
  - `version`
  - `changed_at`
  - `changed_by` (opcional)
  - `change_type`: `create`, `update`, `delete`
  - `snapshot` (JSON do estado completo)

### 7.3 Auditoria de Conteúdo
- `ContactRequest` armazena `received_at` e `status` para rastrear fluxo.
- `FactData` armazena `updated_at` e `version` para consistência.
- `Page` e `Section` podem usar `updated_at` para reconstrução de breadcrumb/SEO.

## 8. Diagrama de Relacionamento (Textual)

- `Person` → `Page` (1:N)
- `Page` → `Section` (1:N)
- `Page` ↔ `Project` (N:M)
- `Page` ↔ `ContentItem` (N:M)
- `Page` ↔ `Offering` (N:M)
- `Project` ↔ `Testimonial` (N:M)
- `Project` ↔ `Tag` (N:M)
- `ContentItem` ↔ `Tag` (N:M)
- `Offering` ↔ `Tag` (N:M)
- `Person` → `ContactRequest` (1:N)
- `Person` → `FactData` (1:N)
- `Person` → `Page` (1:N)

## 9. Considerações Arquiteturais
- A modelagem favorece conteúdo rico e navegável, com histórico versionado para atualizações seguras.
- As tabelas N:M permitem categorizações flexíveis sem duplicar conteúdo.
- O uso de metadados e fatos garante que páginas estejam prontas para robôs e agentes.
- A separação entre `ContentItem` e `Project` preserva o valor do hub de marca versus o portfólio.
- A entidade `Offering` permite controlar disponibilidade e alinhamento sem expor preços sensíveis.

## 10. Notas de Implementação
- Use UUIDs para garantir unicidade e compatibilidade em sistemas distribuídos.
- Prefira JSON para `meta_tags`, `social_links`, `deliverables` e `impact_metrics` quando necessário.
- Mantenha o modelo de histórico leve com snapshots apenas para entidades editáveis importantes.
- Considere `Tag` como uma entidade compartilhada para consistência de taxonomia.
