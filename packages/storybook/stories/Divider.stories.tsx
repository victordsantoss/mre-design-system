import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Divider, type DividerOrientation, type DividerThickness } from '@ds/components'

const DIVIDER_DOCS = `
Separador visual entre seções de conteúdo. Puramente decorativo — ignorado por leitores de tela.

**Orientações**: \`horizontal\` (padrão) e \`vertical\` (requer container flex).
**Espessuras**: \`sm\` (1px), \`md\` (2px), \`lg\` (4px).
**Estilos**: sólido (padrão) ou \`dashed\` (tracejado).
`.trim()

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: DIVIDER_DOCS } },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'] satisfies DividerOrientation[],
      table: { category: 'Layout' },
    },
    thickness: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies DividerThickness[],
      table: { category: 'Estilo' },
    },
    dashed: { control: 'boolean', table: { category: 'Estilo' } },
    inverted: { control: 'boolean', table: { category: 'Estilo' } },
    children: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

/* ---------------------------------------------------------------- stories */

/** Divider horizontal padrão — 1px sólido. */
export const Horizontal: Story = {
  render: (args) => (
    <div className="w-full p-6">
      <p className="mb-0 text-sm text-foreground">Seção A</p>
      <Divider {...args} />
      <p className="mt-0 text-sm text-foreground">Seção B</p>
    </div>
  ),
  args: {
    orientation: 'horizontal',
    thickness: 'sm',
    dashed: false,
  },
}

/** Divider vertical — requer container flex (já incluso no wrapper). */
export const Vertical: Story = {
  render: (args) => (
    <div className="flex items-center p-6">
      <span className="text-sm text-foreground">Esquerda</span>
      <Divider {...args} />
      <span className="text-sm text-foreground">Direita</span>
    </div>
  ),
  args: {
    orientation: 'vertical',
    thickness: 'sm',
  },
}

/** Divider tracejado horizontal. */
export const Tracejado: Story = {
  render: () => (
    <div className="w-full p-6">
      <p className="text-sm text-foreground">Seção A</p>
      <Divider dashed />
      <p className="text-sm text-foreground">Seção B</p>
    </div>
  ),
}

/** Comparação das três espessuras. */
export const Espessuras: Story = {
  render: () => (
    <div className="w-full space-y-0 p-6">
      {(['sm', 'md', 'lg'] satisfies DividerThickness[]).map((t) => (
        <div key={t}>
          <p className="text-xs text-muted-foreground">{t}</p>
          <Divider thickness={t} />
        </div>
      ))}
    </div>
  ),
}

/** Divider horizontal com rótulo central. */
export const ComConteudo: Story = {
  render: () => (
    <div className="w-full p-6">
      <Divider>ou</Divider>
    </div>
  ),
}

/** Divider vertical com rótulo central. */
export const VerticalComConteudo: Story = {
  render: () => (
    <div className="flex h-32 items-center p-6">
      <span className="text-sm text-foreground">Esquerda</span>
      <Divider orientation="vertical">•</Divider>
      <span className="text-sm text-foreground">Direita</span>
    </div>
  ),
}

/** Divider invertido para fundos escuros. */
export const Invertido: Story = {
  render: () => (
    <div className="w-full rounded-lg bg-[#071D41] p-6">
      <p className="text-sm text-white">Seção A</p>
      <Divider inverted />
      <p className="text-sm text-white">Seção B</p>
    </div>
  ),
}

/** Todas as combinações: orientação × espessura × estilo. */
export const TodosOsEstilos: Story = {
  render: () => (
    <div className="w-full space-y-8 p-6">
      {/* Horizontais */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
          Horizontal
        </p>
        <div className="space-y-0">
          {(['sm', 'md', 'lg'] satisfies DividerThickness[]).map((t) => (
            <div key={`h-${t}`}>
              <Divider thickness={t} />
              <Divider thickness={t} dashed />
            </div>
          ))}
        </div>
      </section>

      {/* Verticais */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
          Vertical
        </p>
        <div className="flex h-12 items-center gap-0">
          {(['sm', 'md', 'lg'] satisfies DividerThickness[]).map((t) => (
            <React.Fragment key={`v-${t}`}>
              <span className="px-2 text-xs text-muted-foreground">{t}</span>
              <Divider orientation="vertical" thickness={t} />
              <span className="px-2 text-xs text-muted-foreground">{t} dashed</span>
              <Divider orientation="vertical" thickness={t} dashed />
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  ),
}
