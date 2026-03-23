import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@ds/components'
import type { InputDensity, InputStatus } from '@ds/components'

const SELECT_DOCS_INTRO = `
Campo **Select** (lista suspensa) alinhado ao [componente Select do Design System do Governo](https://www.gov.br/ds/components/select) e ao mesmo vocabulário visual do **Input**: borda cinza, foco azul (**#1351B4**), chevron na cor primária, densidades **32 / 40 / 48 px**, estado **destaque** (fundo cinza) e feedback **success / error / warning / info**.

### Comportamento
- Rótulo **acima** do campo (ou **inline** com \`inline\`).
- Valor vazio com **placeholder** em cinza.
- **Acessibilidade:** \`aria-invalid\`, \`aria-describedby\` no helper, \`aria-required\` quando \`required\`.

### Uso
Passe \`options={[{ value, label }]}\` e controle \`value\` + \`onChange\`. Valores podem ser \`string\` ou \`number\`.
`.trim()

const UFS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'RS', label: 'Rio Grande do Sul' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: SELECT_DOCS_INTRO,
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
      description: 'Campo destaque — 56px, fundo cinza, sem borda até o foco',
      table: { category: 'Aparência' },
    },
    status: {
      control: 'select',
      options: [undefined, 'success', 'error', 'warning', 'info'] satisfies (InputStatus | undefined)[],
      description: 'Estado de validação',
      table: { category: 'Estado' },
    },
    disabled: { control: 'boolean', table: { category: 'Estado' } },
    required: { control: 'boolean', table: { category: 'Estado' } },
    inline: { control: 'boolean', description: 'Rótulo à esquerda', table: { category: 'Layout' } },
    placeholder: { control: 'text', table: { category: 'Conteúdo' } },
    helperText: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Select>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | ''>('')
    return (
      <div className="max-w-md flex flex-col gap-2">
        <Select
          {...args}
          options={UFS}
          value={value}
          onChange={(v) => setValue(v === '' ? '' : String(v))}
        />
        <p className="text-xs text-gray-400">Valor: {value === '' ? '∅' : value}</p>
      </div>
    )
  },
  args: {
    label: 'Unidade federativa',
    placeholder: 'Selecione o estado',
    density: 'medium',
    highlight: false,
    required: false,
    disabled: false,
    inline: false,
    helperText: 'Lista de exemplo com siglas.',
  },
}

export const Densidades: Story = {
  render: () => {
    const [a, setA] = useState('')
    const [b, setB] = useState('SP')
    const [c, setC] = useState('')
    const blocks: { label: string; density: InputDensity; value: string; set: (v: string | '') => void }[] = [
      { label: 'Small (32px)', density: 'small', value: a, set: setA },
      { label: 'Medium (40px) — padrão', density: 'medium', value: b, set: setB },
      { label: 'Large (48px)', density: 'large', value: c, set: setC },
    ]
    return (
      <div className="flex flex-col gap-6 max-w-md">
        {blocks.map(({ label, density, value, set }) => (
          <div key={density}>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{label}</p>
            <Select
              label="Estado"
              density={density}
              options={UFS}
              value={value}
              onChange={(v) => set(v === '' ? '' : String(v))}
              placeholder="Selecione"
            />
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Três densidades com o mesmo conjunto de opções.' },
    },
  },
}

export const EstadosDeValidacao: Story = {
  name: 'Estados de validação',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      {(['success', 'error', 'warning', 'info'] as const).map((status) => (
        <Select
          key={status}
          label={`Status: ${status}`}
          options={UFS}
          value="SP"
          onChange={() => {}}
          status={status}
          statusMessage={
            status === 'success'
              ? 'Campo válido.'
              : status === 'error'
              ? 'Selecione uma opção obrigatória.'
              : status === 'warning'
              ? 'Revise a seleção.'
              : 'Informação adicional.'
          }
        />
      ))}
    </div>
  ),
}

export const Destaque: Story = {
  render: () => {
    const [v, setV] = useState<string | ''>('')
    return (
      <div className="max-w-md">
        <Select
          label="Serviço"
          highlight
          placeholder="Escolha um serviço"
          options={[
            { value: '1', label: 'Emissão de documento' },
            { value: '2', label: 'Agendamento' },
            { value: '3', label: 'Consulta processual' },
          ]}
          value={v}
          onChange={(x) => setV(x === '' ? '' : String(x))}
          helperText="Variante destaque — alinhada ao input-highlight GovBR."
        />
      </div>
    )
  },
}

export const ValoresNumericos: Story = {
  name: 'Valores numéricos',
  render: () => {
    const [n, setN] = useState<number | ''>('')
    return (
      <div className="max-w-xs flex flex-col gap-2">
        <Select
          label="Quantidade"
          options={[
            { value: 10, label: '10 itens' },
            { value: 25, label: '25 itens' },
            { value: 50, label: '50 itens' },
          ]}
          value={n}
          onChange={(v) => setN(v === '' ? '' : Number(v))}
          placeholder="Selecione"
        />
        <p className="text-xs text-gray-400">Valor numérico: {n === '' ? '∅' : n}</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Opções com `value` numérico; o `onChange` devolve o tipo original da opção escolhida.' },
    },
  },
}

export const RotuloInline: Story = {
  name: 'Rótulo inline',
  render: () => {
    const [v, setV] = useState('')
    return (
      <div className="max-w-lg">
        <Select
          label="UF"
          inline
          options={UFS}
          value={v}
          onChange={(x) => setV(x === '' ? '' : String(x))}
          placeholder="—"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Rótulo posicionado à esquerda com `inline`.' },
    },
  },
}

export const Desabilitado: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Select
        label="Estado (desabilitado)"
        options={UFS}
        value="SP"
        onChange={() => {}}
        disabled
      />
      <Select
        label="Estado (desabilitado vazio)"
        options={UFS}
        value=""
        onChange={() => {}}
        disabled
        placeholder="Não disponível"
      />
    </div>
  ),
}
