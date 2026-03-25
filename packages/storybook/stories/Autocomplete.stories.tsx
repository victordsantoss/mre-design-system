import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete, type AutocompleteOption } from '@ds/components'
import type { InputDensity, InputStatus } from '@ds/components'

const SERVICOS: AutocompleteOption[] = [
  'Emissão de Passaporte',
  'Certidão de Nascimento',
  'Cadastro de Pessoa Física (CPF)',
  'Declaração de Imposto de Renda',
  'Título de Eleitor',
  'Carteira de Trabalho Digital',
  'Acesso ao Gov.br',
  'Nota Fiscal Eletrônica',
]

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de texto com lista de sugestões filtrada em tempo real. Alinhado ao vocabulário visual do **Input GovBR**: mesmas densidades, estados de validação e feedback via `Message`.',
      },
    },
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies InputDensity[],
      description: 'Altura do campo: 32px | 40px | 48px',
      table: { category: 'Aparência' },
    },
    highlight: {
      control: 'boolean',
      description: 'Campo destaque — 56px, fundo cinza',
      table: { category: 'Aparência' },
    },
    status: {
      control: 'select',
      options: [undefined, 'success', 'error', 'warning', 'info'] satisfies (InputStatus | undefined)[],
      description: 'Estado de validação',
      table: { category: 'Estado' },
    },
    loading: {
      control: 'boolean',
      description: 'Exibe estado de carregamento na lista',
      table: { category: 'Estado' },
    },
    disabled: { control: 'boolean', table: { category: 'Estado' } },
    required: { control: 'boolean', table: { category: 'Estado' } },
    inline: {
      control: 'boolean',
      description: 'Rótulo à esquerda',
      table: { category: 'Layout' },
    },
    label: { control: 'text', table: { category: 'Conteúdo' } },
    placeholder: { control: 'text', table: { category: 'Conteúdo' } },
    helperText: { control: 'text', table: { category: 'Conteúdo' } },
    statusMessage: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)
    return (
      <div className="max-w-md">
        <Autocomplete
          {...args}
          options={SERVICOS}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
  args: {
    label: 'Serviço',
    placeholder: 'Digite para filtrar',
    density: 'medium',
    highlight: false,
    required: false,
    disabled: false,
    loading: false,
    inline: false,
    helperText: 'Lista GovBR com navegação por teclado.',
  },
}

export const ComEstados: Story = {
  name: 'Estados e densidade',
  render: () => {
    const [v1, setV1] = useState<AutocompleteOption | null>(null)
    const [v2, setV2] = useState<AutocompleteOption | null>(null)
    return (
      <div className="flex max-w-lg flex-col gap-6 p-4">
        <Autocomplete
          label="Carregando"
          options={[]}
          value={v1}
          onChange={setV1}
          loading
        />
        <Autocomplete
          label="Erro"
          options={SERVICOS}
          value={v2}
          onChange={setV2}
          density="small"
          status="error"
          statusMessage="Selecione um serviço válido."
        />
      </div>
    )
  },
}
