import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button, CircleButton } from '@ds/components'
import type { ButtonEmphasis, ButtonDensity, ButtonIntent } from '@ds/components'

/**
 * O componente **Button** segue o Padrão Digital de Governo (GovBR).
 *
 * ### Ênfases
 * - **primary** — ação principal; fundo azul sólido
 * - **secondary** — ação secundária; contorno azul
 * - **tertiary** — ação terciária; sem borda, apenas texto
 *
 * ### Densidades
 * `xsmall` (24px) | `small` (32px) | `medium` (40px, padrão) | `large` (48px)
 *
 * ### Intenções
 * `default` | `danger` | `success` | `warning` | `info`
 *
 * ```tsx
 * import { Button, CircleButton } from '@ds/components'
 *
 * <Button emphasis="primary" density="medium">Ação principal</Button>
 * <Button emphasis="secondary" intent="danger">Cancelar</Button>
 * <CircleButton aria-label="Fechar">×</CircleButton>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botão GovBR com suporte a ênfases, densidades e intenções.',
      },
    },
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'] satisfies ButtonEmphasis[],
      description: 'Nível de ênfase visual',
      table: { category: 'Aparência', defaultValue: { summary: 'primary' } },
    },
    density: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'] satisfies ButtonDensity[],
      description: 'Tamanho / densidade (altura)',
      table: { category: 'Aparência', defaultValue: { summary: 'medium' } },
    },
    intent: {
      control: 'select',
      options: ['default', 'danger', 'success', 'warning', 'info'] satisfies ButtonIntent[],
      description: 'Intenção semântica (cor)',
      table: { category: 'Aparência', defaultValue: { summary: 'default' } },
    },
    block: {
      control: 'boolean',
      description: 'Largura total do container',
      table: { category: 'Layout' },
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento (spinner)',
      table: { category: 'Estado' },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { category: 'Estado' },
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'Ação principal',
    emphasis: 'primary',
    density: 'medium',
    intent: 'default',
  },
}

export const Enfases: Story = {
  name: 'Ênfases',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button emphasis="primary">Primário</Button>
      <Button emphasis="secondary">Secundário</Button>
      <Button emphasis="tertiary">Terciário</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Três ênfases: primário (fundo sólido), secundário (contorno), terciário (texto).' },
    },
  },
}

export const Intencoes: Story = {
  name: 'Intenções',
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'tertiary'] as const).map((emphasis) => (
        <div key={emphasis} className="flex flex-wrap gap-3 items-center">
          <span className="w-20 text-xs text-gray-400 capitalize">{emphasis}</span>
          {(['default', 'danger', 'success', 'warning', 'info'] as const).map((intent) => (
            <Button key={intent} emphasis={emphasis} intent={intent}>
              {intent.charAt(0).toUpperCase() + intent.slice(1)}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Matriz ênfase × intenção — todas as combinações.' },
    },
  },
}

export const Densidades: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button density="xsmall">XSmall</Button>
      <Button density="small">Small</Button>
      <Button density="medium">Medium</Button>
      <Button density="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Quatro densidades disponíveis: xsmall (24px), small (32px), medium (40px), large (48px).' },
    },
  },
}

export const ComIcones: Story = {
  name: 'Com ícones',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        }
      >
        Download
      </Button>
      <Button
        emphasis="secondary"
        endIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        }
      >
        Próximo
      </Button>
      <Button
        emphasis="tertiary"
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        }
      >
        Editar
      </Button>
    </div>
  ),
}

export const BotaoCircular: Story = {
  name: 'Botão circular (CircleButton)',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <CircleButton density="xsmall" aria-label="Adicionar (xsmall)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-3 w-3">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </CircleButton>
      <CircleButton density="small" aria-label="Adicionar (small)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </CircleButton>
      <CircleButton density="medium" aria-label="Adicionar (medium)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </CircleButton>
      <CircleButton density="large" emphasis="secondary" aria-label="Fechar (large)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-5 w-5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </CircleButton>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: '`CircleButton` — ícone circular com `aria-label` obrigatório.' },
    },
  },
}

export const BlocoTotal: Story = {
  name: 'Bloco (largura total)',
  render: () => (
    <div className="w-80 flex flex-col gap-3">
      <Button block>Ação principal — bloco</Button>
      <Button block emphasis="secondary">Ação secundária — bloco</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: '`block` faz o botão ocupar toda a largura disponível.' },
    },
  },
}

export const EstadoLoading: Story = {
  name: 'Estado loading',
  render: () => {
    const [loading, setLoading] = useState(false)
    return (
      <div className="flex gap-3 items-center">
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true)
            setTimeout(() => setLoading(false), 2000)
          }}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button emphasis="secondary" loading={loading}>Secundário</Button>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Clique para simular o carregamento (2 segundos).' },
    },
  },
}

export const Desabilitado: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button disabled>Primário</Button>
      <Button emphasis="secondary" disabled>Secundário</Button>
      <Button emphasis="tertiary" disabled>Terciário</Button>
    </div>
  ),
}

export const Posicionamento: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Alinhado à direita — padrão modais/formulários GovBR */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
        <Button emphasis="tertiary">Cancelar</Button>
        <Button emphasis="secondary">Salvar rascunho</Button>
        <Button emphasis="primary">Enviar</Button>
      </div>
      {/* Centralizado */}
      <div className="flex justify-center gap-3">
        <Button emphasis="secondary">Voltar</Button>
        <Button emphasis="primary">Continuar</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Padrões de posicionamento GovBR: primário à direita, terciário à esquerda.' },
    },
  },
}
