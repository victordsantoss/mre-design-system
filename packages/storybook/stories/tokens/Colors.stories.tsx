import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

/**
 * Paleta de cores do **Padrão Digital de Governo (GovBR)** adotada pelo
 * Design System do MRE / Itamaraty.
 *
 * Tokens primitivos e semânticos definidos em `@ds/tokens`.
 * CSS custom properties injetadas via `@ds/components/styles.css`.
 */

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────

function Swatch({ name, hex, cssVar, dark }: { name: string; hex: string; cssVar?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded border border-gray-200 shadow-sm"
        style={{ backgroundColor: hex }}
        title={hex}
      />
      <p className="text-xs font-semibold text-gray-800">{name}</p>
      <p className="text-xs font-mono text-gray-500">{hex}</p>
      {cssVar && <p className="text-xs font-mono text-gray-400">{cssVar}</p>}
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-base font-semibold text-gray-800">{title}</h2>
      {description && <p className="mb-4 text-sm text-gray-500">{description}</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Componente visual da paleta
// ─────────────────────────────────────────────

function ColorPalette() {
  return (
    <div className="p-6 font-sans">

      <Section
        title="Cores semânticas — Light"
        description="Mapeadas como CSS custom properties em globals.css."
      >
        <Swatch name="Primary"       hex="#1351B4" cssVar="--color-primary" />
        <Swatch name="Secondary"     hex="#071D41" cssVar="--color-secondary" />
        <Swatch name="Success"       hex="#168821" cssVar="--color-success" />
        <Swatch name="Warning"       hex="#FFCD07" cssVar="--color-warning" />
        <Swatch name="Destructive"   hex="#E52207" cssVar="--color-destructive" />
        <Swatch name="Info / Ring"   hex="#155BCB" cssVar="--color-info / --color-ring" />
      </Section>

      <Section
        title="Backgrounds e superfícies"
        description="Paleta de superfícies para light mode."
      >
        <Swatch name="Background"      hex="#FFFFFF" cssVar="--color-background" />
        <Swatch name="Alt Background"  hex="#F8F8F8" cssVar="--color-background-alt" />
        <Swatch name="Foreground"      hex="#333333" cssVar="--color-foreground" />
        <Swatch name="Muted"           hex="#E8E8E8" cssVar="--color-muted" />
        <Swatch name="Border"          hex="#CCCCCC" cssVar="--color-border" />
        <Swatch name="Input"           hex="#CCCCCC" cssVar="--color-input" />
      </Section>

      <Section
        title="Escala Blue Warm Vivid (blueWarmVivid)"
        description="Escala primitiva principal — azul institucional GovBR."
      >
        <Swatch name="10"  hex="#E8F1FF" />
        <Swatch name="20"  hex="#C5D4EB" />
        <Swatch name="30"  hex="#ADCDFF" />
        <Swatch name="40"  hex="#6EA7E0" />
        <Swatch name="50"  hex="#2670E8" />
        <Swatch name="60"  hex="#155BCB" />
        <Swatch name="70"  hex="#1351B4" />
        <Swatch name="80"  hex="#0C326F" />
        <Swatch name="90"  hex="#071D41" />
      </Section>

      <Section
        title="Escala Green Cool Vivid (greenCoolVivid)"
        description="Escala primitiva — sucesso GovBR."
      >
        <Swatch name="5"   hex="#E3F5E1" />
        <Swatch name="10"  hex="#C7E5C2" />
        <Swatch name="20"  hex="#92D185" />
        <Swatch name="30"  hex="#5EBD4F" />
        <Swatch name="40"  hex="#2EA11C" />
        <Swatch name="50"  hex="#168821" />
        <Swatch name="60"  hex="#155C14" />
        <Swatch name="70"  hex="#19311A" />
      </Section>

      <Section
        title="Escala Yellow Vivid (yellowVivid)"
        description="Escala primitiva — aviso GovBR."
      >
        <Swatch name="5"   hex="#FFF9E5" />
        <Swatch name="10"  hex="#FEF2BF" />
        <Swatch name="20"  hex="#FFCD07" />
        <Swatch name="30"  hex="#E89600" />
        <Swatch name="40"  hex="#C26400" />
        <Swatch name="50"  hex="#8B4800" />
      </Section>

      <Section
        title="Escala Red Vivid (redVivid)"
        description="Escala primitiva — erro / destructive GovBR."
      >
        <Swatch name="10"  hex="#FDE0DB" />
        <Swatch name="20"  hex="#F8B8AD" />
        <Swatch name="30"  hex="#F68066" />
        <Swatch name="40"  hex="#F2533A" />
        <Swatch name="50"  hex="#E52207" />
        <Swatch name="60"  hex="#B21A01" />
        <Swatch name="70"  hex="#6B1105" />
      </Section>

      <Section
        title="Escala Gray (neutral)"
        description="Tons de cinza para textos, bordas e superfícies."
      >
        <Swatch name="2"   hex="#F8F8F8" />
        <Swatch name="5"   hex="#EDEDED" />
        <Swatch name="10"  hex="#E8E8E8" />
        <Swatch name="20"  hex="#CCCCCC" />
        <Swatch name="30"  hex="#A3A3A3" />
        <Swatch name="40"  hex="#888888" />
        <Swatch name="50"  hex="#666666" />
        <Swatch name="60"  hex="#555555" />
        <Swatch name="70"  hex="#444444" />
        <Swatch name="80"  hex="#333333" />
        <Swatch name="90"  hex="#1B1B1B" />
      </Section>

      <Section
        title="Dark mode — semânticas"
        description="Valores das CSS custom properties em .dark."
      >
        <Swatch name="Background" hex="#071D41" cssVar="--color-background (dark)" dark />
        <Swatch name="Primary"    hex="#C5D4EB" cssVar="--color-primary (dark)"    dark />
        <Swatch name="Foreground" hex="#FFFFFF" cssVar="--color-foreground (dark)" dark />
      </Section>

    </div>
  )
}

// ─────────────────────────────────────────────
// Meta / Story
// ─────────────────────────────────────────────

const meta: Meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Paleta completa do Padrão Digital de Governo (GovBR) — primitivos e semânticos.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Paleta: Story = {
  name: 'Paleta GovBR completa',
  render: () => <ColorPalette />,
}

export const Semanticas: Story = {
  name: 'Cores semânticas em uso',
  render: () => (
    <div className="p-6 font-sans flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="mb-3 text-base font-semibold">Botões</h2>
        <div className="flex flex-wrap gap-3">
          <div className="h-10 rounded-full bg-primary px-6 flex items-center text-white text-sm font-semibold">Primary</div>
          <div className="h-10 rounded-full bg-success px-6 flex items-center text-white text-sm font-semibold">Success</div>
          <div className="h-10 rounded-full bg-destructive px-6 flex items-center text-white text-sm font-semibold">Destructive</div>
          <div className="h-10 rounded-full bg-warning px-6 flex items-center text-gray-800 text-sm font-semibold">Warning</div>
          <div className="h-10 rounded-full bg-info px-6 flex items-center text-white text-sm font-semibold">Info</div>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-base font-semibold">Badges / tints</h2>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">Ativo</span>
          <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">Inativo</span>
          <span className="rounded-full bg-warning/20 px-3 py-1 text-sm font-semibold text-[#967117]">Pendente</span>
          <span className="rounded-full bg-info/10 px-3 py-1 text-sm font-semibold text-info">Informativo</span>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-base font-semibold">Focus ring</h2>
        <div className="flex gap-4">
          <button className="h-10 rounded-full bg-primary px-6 text-white text-sm font-semibold focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px] outline-none">
            Clique ou use Tab
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400">Outline 3px, offset 4px, cor <code>#155BCB</code> (--color-ring)</p>
      </div>
    </div>
  ),
}
