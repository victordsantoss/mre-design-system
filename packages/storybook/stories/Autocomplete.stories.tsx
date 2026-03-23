import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete, type AutocompleteOption } from '@ds/components'

const SERVICOS: AutocompleteOption[] = [
  'Emissão de Passaporte',
  'Certidão de Nascimento',
  'Cadastro de Pessoa Física (CPF)',
  'Declaração de Imposto de Renda',
]

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)
    return (
      <div className="max-w-md p-4">
        <Autocomplete
          label="Serviço"
          placeholder="Digite para filtrar"
          options={SERVICOS}
          value={value}
          onChange={setValue}
          helperText="Lista GovBR com navegação por teclado."
        />
      </div>
    )
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
