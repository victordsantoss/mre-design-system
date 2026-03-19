import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@ds/components'

/**
 * O componente **Button** é o principal elemento de ação do Design System.
 *
 * Suporta múltiplas variantes visuais, tamanhos, estado de loading,
 * e composição via `asChild` (Radix Slot pattern).
 *
 * ## Uso básico
 * ```tsx
 * import { Button } from '@ds/components'
 *
 * <Button variant="default" size="md">
 *   Clique aqui
 * </Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'success',
        'warning',
      ],
      description: 'Variante visual do botão',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Tamanho do botão',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    asChild: {
      control: 'boolean',
      description: 'Renderiza como elemento filho (Slot pattern)',
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

/** Botão padrão com estilo primário. */
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

/** Todas as variantes visuais disponíveis. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
}

/** Todos os tamanhos disponíveis. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Button>
    </div>
  ),
}

/** Estado de loading com spinner animado. */
export const Loading: Story = {
  args: {
    children: 'Salvando...',
    loading: true,
  },
}

/** Botão desabilitado. */
export const Disabled: Story = {
  args: {
    children: 'Desabilitado',
    disabled: true,
  },
}

/** Destructive outline — combinação de variantes para ações perigosas com menos ênfase. */
export const DestructiveOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="destructive">Deletar</Button>
      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
        Cancelar assinatura
      </Button>
    </div>
  ),
}

/** Composição com ícone à esquerda. */
export const WithIcon: Story = {
  render: () => (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      Download
    </Button>
  ),
}

/** Uso com `asChild` para renderizar como link. */
export const AsLink: Story = {
  render: () => (
    <Button asChild variant="link">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visitar site
      </a>
    </Button>
  ),
}
