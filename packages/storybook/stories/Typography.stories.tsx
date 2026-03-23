import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Typography, type TypographyVariant } from '@ds/components'
import { semanticTypography } from '@ds/tokens'

const variantOptions = Object.keys(semanticTypography) as TypographyVariant[]

/**
 * O componente **Typography** aplica os estilos definidos em `semanticTypography` (`@ds/tokens`):
 * família, tamanho (escala Minor Third, base 14px), peso, altura de linha e letter-spacing.
 *
 * Cor, alinhamento, truncamento e decorações usam utilitários Tailwind via `typographyLayoutVariants`.
 *
 * ## Uso básico
 * ```tsx
 * import { Typography } from '@ds/components'
 *
 * <Typography variant="h2">Título da página</Typography>
 * <Typography variant="body2" color="muted">Subtexto de apoio</Typography>
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
      options: variantOptions,
      description: 'Chave em semanticTypography (@ds/tokens).',
      table: { defaultValue: { summary: 'body2' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'destructive', 'success', 'warning', 'inherit'],
      description: 'Cor semântica do texto (Tailwind).',
      table: { defaultValue: { summary: 'default' } },
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Sobrescreve o font-weight do token.',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'start', 'end'],
      description: 'Alinhamento do texto.',
    },
    as: {
      control: 'text',
      description: 'Sobrescreve o elemento HTML (ex: "h1", "p", "span", "label").',
    },
    italic: {
      control: 'boolean',
      description: 'Aplica estilo itálico (Tailwind).',
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
      description: 'Limita o texto a N linhas (line-clamp).',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Controle interativo de todas as props. */
export const Playground: Story = {
  args: {
    variant: 'body2',
    children: 'O Design System garante consistência visual em toda a aplicação.',
  },
}

const sectionLabelSx: CSSProperties = {
  marginBottom: '16px',
  display: 'block',
}

/** Escala GovBR (tamanhos aproximados em px com html 16px). */
export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <Typography variant="overline" color="muted" style={sectionLabelSx}>
          Display
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant="display">
            display — 50,16px / light / line-height 1,15
          </Typography>
        </div>
      </section>

      <section>
        <Typography variant="overline" color="muted" style={sectionLabelSx}>
          Headings
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant="h1">h1 — 41,8px / light</Typography>
          <Typography variant="h2">h2 — 34,84px / regular</Typography>
          <Typography variant="h3">h3 — 29,03px / medium</Typography>
          <Typography variant="h4">h4 — 24,19px / semi-bold</Typography>
          <Typography variant="h5">h5 — 20,16px / bold</Typography>
          <Typography variant="h6">h6 — 16,8px / extra-bold / maiúsculas</Typography>
        </div>
      </section>

      <section>
        <Typography variant="overline" color="muted" style={sectionLabelSx}>
          Corpo
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body1">
            body1 — 16,8px / regular / line-height 1,45 — Parágrafo destacado ou introduções.
          </Typography>
          <Typography variant="body2">
            body2 — 14px / regular — Texto padrão de interface e parágrafos.
          </Typography>
        </div>
      </section>

      <section>
        <Typography variant="overline" color="muted" style={sectionLabelSx}>
          UI e componentes
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="label">label — 14px / semi-bold — Rótulos de formulário</Typography>
          <Typography variant="input">input — 16,8px / medium — Texto de campo</Typography>
          <Typography variant="placeholder">placeholder — 14px / regular / itálico</Typography>
          <Typography variant="legend">legend — 16,8px / semi-bold — Legenda de fieldset</Typography>
          <Typography variant="caption">caption — 11,67px / regular — Metadados e notas</Typography>
          <Typography variant="overline">overline — 14px / semi-bold / maiúsculas</Typography>
          <Typography variant="button">button — 16,8px / semi-bold — Rótulo de botão</Typography>
          <Typography variant="code">code — 14px / medium / monospace</Typography>
        </div>
      </section>
    </div>
  ),
}

/** Variações de cor semântica (Tailwind). */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body2" color="default">
        color=&quot;default&quot; — Texto principal
      </Typography>
      <Typography variant="body2" color="muted">
        color=&quot;muted&quot; — Texto secundário
      </Typography>
      <Typography variant="body2" color="primary">
        color=&quot;primary&quot; — Destaque
      </Typography>
      <Typography variant="body2" color="destructive">
        color=&quot;destructive&quot; — Erro / destrutivo
      </Typography>
      <Typography variant="body2" color="success">
        color=&quot;success&quot; — Sucesso
      </Typography>
      <Typography variant="body2" color="warning">
        color=&quot;warning&quot; — Aviso
      </Typography>
    </div>
  ),
}

/**
 * A prop `as` desacopla estilo visual (token) da semântica HTML.
 */
export const SemanticOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Typography variant="caption" color="muted">
          h2 com aparência de token h2, renderizado como único h1 da página
        </Typography>
        <Typography variant="h2" as="h1">
          Título principal da página
        </Typography>
      </div>
      <div>
        <Typography variant="caption" color="muted">
          display com semântica de parágrafo
        </Typography>
        <Typography variant="display" as="p">
          Frase de impacto sem usar heading
        </Typography>
      </div>
      <div>
        <Typography variant="caption" color="muted">
          label como &lt;label&gt; nativo
        </Typography>
        <Typography variant="label" as="label" htmlFor="email-story">
          Endereço de e-mail
        </Typography>
      </div>
    </div>
  ),
}

/** Truncamento e line-clamp. */
export const OverflowControl: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <Typography variant="caption" color="muted">
          truncate — uma linha
        </Typography>
        <Typography variant="body2" truncate>
          Este texto é muito longo e será truncado com reticências após ultrapassar a largura do container
          pai.
        </Typography>
      </div>
      <div>
        <Typography variant="caption" color="muted">
          clamp=&#123;2&#125;
        </Typography>
        <Typography variant="body2" clamp={2}>
          Este texto mais longo será limitado a exatamente duas linhas. O restante será cortado e substituído
          por reticências ao final da segunda linha.
        </Typography>
      </div>
      <div>
        <Typography variant="caption" color="muted">
          clamp=&#123;3&#125;
        </Typography>
        <Typography variant="body2" clamp={3}>
          Três linhas de texto antes do clamp. Útil para cartões e previews mantendo layout estável com um
          pouco mais de contexto visível.
        </Typography>
      </div>
    </div>
  ),
}

/** Exemplo de composição. */
export const ArticleSection: Story = {
  render: () => (
    <article style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="caption" color="primary">
        Design systems
      </Typography>
      <Typography variant="display" as="h1">
        Interfaces consistentes com tokens de design
      </Typography>
      <Typography variant="body1" color="muted">
        Tokens definem a linguagem visual: cores, tipografia, espaçamento e elevação.
      </Typography>
      <Typography variant="body2">
        Centralizar esses valores permite manter consistência entre plataformas e aplicar mudanças globais
        com menos retrabalho.
      </Typography>
      <Typography variant="caption" color="muted">
        Publicado em 23 de março de 2026 · 5 min de leitura
      </Typography>
    </article>
  ),
}

/** Itálico, sublinhado e peso sobrescrito. */
export const Decoration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body2" italic>
        Texto em itálico
      </Typography>
      <Typography variant="body2" underline>
        Texto sublinhado
      </Typography>
      <Typography variant="body2" italic underline>
        Itálico e sublinhado
      </Typography>
      <Typography variant="body2" weight="bold" color="primary">
        weight=&quot;bold&quot; + color=&quot;primary&quot;
      </Typography>
    </div>
  ),
}
