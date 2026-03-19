import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@ds/components'

/**
 * O componente **Typography** é o sistema tipográfico central do Design System.
 *
 * Encapsula todas as variantes de texto — display, headings, body, labels e code —
 * com semântica HTML correta por padrão e flexibilidade total via props.
 *
 * ## Princípios
 * - **Semântica**: cada variante usa o elemento HTML adequado por padrão
 * - **Override**: prop `as` desacopla estilo visual de semântica
 * - **Tokens**: integrado com `@ds/tokens` via Tailwind CSS custom properties
 * - **Responsividade**: prop `responsive` escala texto via breakpoints mobile-first
 *
 * ## Uso básico
 * ```tsx
 * import { Typography } from '@ds/components'
 *
 * <Typography variant="heading-lg">Título da página</Typography>
 * <Typography variant="body-md" color="muted">Subtexto de apoio</Typography>
 * ```
 */
const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-2xl', 'display-xl', 'display-lg',
        'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs',
        'body-lg', 'body-md', 'body-sm', 'body-xs',
        'label-lg', 'label-md', 'label-sm',
        'code-lg', 'code-md', 'code-sm',
      ],
      description: 'Estilo tipográfico. Cada variante define tamanho, peso e line-height.',
      table: { defaultValue: { summary: 'body-md' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'destructive', 'success', 'warning', 'inherit'],
      description: 'Cor semântica do texto via CSS custom properties.',
      table: { defaultValue: { summary: 'default' } },
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Sobrescreve o font-weight da variante.',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'start', 'end'],
      description: 'Alinhamento do texto.',
    },
    as: {
      control: 'text',
      description: 'Sobrescreve o elemento HTML renderizado (ex: "h1", "p", "span", "label").',
    },
    italic: {
      control: 'boolean',
      description: 'Aplica estilo itálico.',
    },
    underline: {
      control: 'boolean',
      description: 'Aplica sublinhado.',
    },
    truncate: {
      control: 'boolean',
      description: 'Trunca o texto em uma linha com reticências.',
    },
    clamp: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6],
      description: 'Limita o texto a N linhas com reticências (CSS line-clamp).',
    },
    responsive: {
      control: 'boolean',
      description: 'Ativa escala responsiva mobile-first para variantes display e heading.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────

/** Controle interativo de todas as props. */
export const Playground: Story = {
  args: {
    variant: 'body-md',
    children: 'O Design System garante consistência visual em toda a aplicação.',
  },
}

// ─────────────────────────────────────────────
// Escala tipográfica completa
// ─────────────────────────────────────────────

/** Visão geral de toda a escala tipográfica em um só lugar. */
export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Display */}
      <section>
        <Typography variant="label-sm" color="muted" style={{ marginBottom: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Display
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant="display-2xl">Display 2XL — 60px / Bold</Typography>
          <Typography variant="display-xl">Display XL — 48px / Bold</Typography>
          <Typography variant="display-lg">Display LG — 36px / Bold</Typography>
        </div>
      </section>

      {/* Headings */}
      <section>
        <Typography variant="label-sm" color="muted" style={{ marginBottom: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Headings
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant="heading-xl">Heading XL — 30px / Semibold</Typography>
          <Typography variant="heading-lg">Heading LG — 24px / Semibold</Typography>
          <Typography variant="heading-md">Heading MD — 20px / Semibold</Typography>
          <Typography variant="heading-sm">Heading SM — 18px / Semibold</Typography>
          <Typography variant="heading-xs">Heading XS — 16px / Semibold</Typography>
        </div>
      </section>

      {/* Body */}
      <section>
        <Typography variant="label-sm" color="muted" style={{ marginBottom: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Body
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body-lg">Body LG — 18px / Normal / Relaxed — Ideal para leitura de artigos e conteúdos longos.</Typography>
          <Typography variant="body-md">Body MD — 16px / Normal — Texto padrão de interface, parágrafos e descrições gerais.</Typography>
          <Typography variant="body-sm">Body SM — 14px / Normal — Textos secundários, tooltips e metadados.</Typography>
          <Typography variant="body-xs">Body XS — 12px / Normal — Textos de suporte, avisos e rodapés.</Typography>
        </div>
      </section>

      {/* Labels */}
      <section>
        <Typography variant="label-sm" color="muted" style={{ marginBottom: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Labels
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="label-lg">Label LG — 16px / Medium — Rótulos de formulários, títulos de seção</Typography>
          <Typography variant="label-md">Label MD — 14px / Medium — Labels padrão de campos e filtros</Typography>
          <Typography variant="label-sm">Label SM — 12px / Medium / Wide — Badges, status e categorias</Typography>
        </div>
      </section>

      {/* Code */}
      <section>
        <Typography variant="label-sm" color="muted" style={{ marginBottom: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Code
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="code-lg">const greeting = "Olá, Design System!"</Typography>
          <Typography variant="code-md">npm install @ds/components</Typography>
          <Typography variant="code-sm">{"<Typography variant=\"body-md\" />"}</Typography>
        </div>
      </section>
    </div>
  ),
}

// ─────────────────────────────────────────────
// Cores semânticas
// ─────────────────────────────────────────────

/** Todas as variações de cor disponíveis. */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body-md" color="default">color="default" — Texto principal da interface</Typography>
      <Typography variant="body-md" color="muted">color="muted" — Texto secundário e de apoio</Typography>
      <Typography variant="body-md" color="primary">color="primary" — Destaque e ações principais</Typography>
      <Typography variant="body-md" color="destructive">color="destructive" — Erros, alertas e ações destrutivas</Typography>
      <Typography variant="body-md" color="success">color="success" — Confirmações e estados de sucesso</Typography>
      <Typography variant="body-md" color="warning">color="warning" — Avisos e estados de atenção</Typography>
    </div>
  ),
}

// ─────────────────────────────────────────────
// Override semântico com `as`
// ─────────────────────────────────────────────

/**
 * O `as` desacopla estilo visual de semântica HTML.
 * Útil quando o nível hierárquico de heading já está definido
 * na página mas o estilo visual precisa ser diferente.
 */
export const SemanticOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Typography variant="label-sm" color="muted">heading-lg renderizado como h1 (única âncora de página)</Typography>
        <Typography variant="heading-lg" as="h1">Título Principal da Página</Typography>
      </div>
      <div>
        <Typography variant="label-sm" color="muted">display-xl com estilo visual mas semântica de parágrafo</Typography>
        <Typography variant="display-xl" as="p">Frase de impacto sem criar h1</Typography>
      </div>
      <div>
        <Typography variant="label-sm" color="muted">label-md como &lt;label&gt; nativo para formulários</Typography>
        <Typography variant="label-md" as="label" htmlFor="email">
          Endereço de e-mail
        </Typography>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────
// Responsividade
// ─────────────────────────────────────────────

/**
 * Com `responsive={true}` as variantes de display e heading
 * escalam usando breakpoints mobile-first (sm / lg).
 * Redimensione a janela para visualizar o efeito.
 */
export const ResponsiveScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="label-sm" color="muted">Com responsive=&#123;true&#125;</Typography>
      <Typography variant="display-2xl" responsive>Título responsivo — cresce em telas maiores</Typography>
      <Typography variant="heading-lg" responsive>Subtítulo que escala com o viewport</Typography>
      <Typography variant="label-sm" color="muted" style={{ marginTop: '16px' }}>Sem responsive (tamanho fixo)</Typography>
      <Typography variant="display-2xl">Título fixo — sempre 60px</Typography>
    </div>
  ),
}

// ─────────────────────────────────────────────
// Overflow: truncate e clamp
// ─────────────────────────────────────────────

/** Controle de overflow para textos longos. */
export const OverflowControl: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <Typography variant="label-sm" color="muted">truncate — uma linha</Typography>
        <Typography variant="body-md" truncate>
          Este texto é muito longo e será truncado com reticências após ultrapassar a largura do container pai.
        </Typography>
      </div>
      <div>
        <Typography variant="label-sm" color="muted">clamp=&#123;2&#125; — duas linhas</Typography>
        <Typography variant="body-md" clamp={2}>
          Este texto mais longo será limitado a exatamente duas linhas. O restante do conteúdo que não couber
          será cortado e substituído por reticências ao final da segunda linha visível.
        </Typography>
      </div>
      <div>
        <Typography variant="label-sm" color="muted">clamp=&#123;3&#125; — três linhas</Typography>
        <Typography variant="body-md" clamp={3}>
          Três linhas de texto disponíveis antes do clamp ser aplicado. Isso é útil para cartões de conteúdo,
          previews de artigo e qualquer situação onde você precisa manter um layout consistente mas exibir
          algum contexto do conteúdo ao usuário antes do clamp entrar em ação.
        </Typography>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────
// Composição real
// ─────────────────────────────────────────────

/** Exemplo de uso em uma seção de artigo real. */
export const ArticleSection: Story = {
  render: () => (
    <article style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="label-sm" color="primary">Design Systems</Typography>
      <Typography variant="display-lg" as="h1">
        Construindo interfaces consistentes com tokens de design
      </Typography>
      <Typography variant="body-lg" color="muted">
        Tokens de design são os valores atômicos que definem a linguagem visual de um produto:
        cores, tipografia, espaçamento e elevação.
      </Typography>
      <Typography variant="body-md">
        Ao centralizar esses valores em um único lugar, equipes de produto conseguem
        manter consistência visual entre plataformas, acelerar o desenvolvimento de
        novas features e facilitar a aplicação de mudanças globais de tema.
      </Typography>
      <Typography variant="body-sm" color="muted">
        Publicado em 19 de março de 2026 · 5 min de leitura
      </Typography>
    </article>
  ),
}

// ─────────────────────────────────────────────
// Decoração
// ─────────────────────────────────────────────

/** Props de decoração: italic e underline. */
export const Decoration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body-md" italic>Texto em itálico para ênfase ou citações</Typography>
      <Typography variant="body-md" underline>Texto sublinhado para links e destaques</Typography>
      <Typography variant="body-md" italic underline>Itálico e sublinhado combinados</Typography>
      <Typography variant="body-md" weight="bold" color="primary">
        Bold + primary — chamada para ação em linha
      </Typography>
    </div>
  ),
}
