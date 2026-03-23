import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@ds/components'
import type { InputDensity, InputStatus } from '@ds/components'

const INPUT_DOCS_INTRO = `
Campo de texto alinhado ao [componente Input do Design System do Governo](https://www.gov.br/ds/components/input) e ao vocabulário visual do GovBR: borda cinza, foco azul (**#1351B4**), densidades **32 / 40 / 48 px**, estado **destaque** (fundo cinza, 56 px) e feedback **success / error / warning / info**.

### Comportamento
- Rótulo **acima** do campo (ou **inline** com \`inline\`).
- Texto auxiliar abaixo com \`helperText\` ou \`statusMessage\`.
- **Acessibilidade:** \`aria-invalid\`, \`aria-describedby\` no helper, \`aria-required\` quando \`required\`.

### Uso
\`\`\`tsx
<Input label="Nome completo" placeholder="Digite seu nome" />
<Input label="CPF" status="error" statusMessage="CPF inválido" required />
\`\`\`
`.trim()

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: INPUT_DOCS_INTRO,
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
    label: { control: 'text', table: { category: 'Conteúdo' } },
    placeholder: { control: 'text', table: { category: 'Conteúdo' } },
    helperText: { control: 'text', table: { category: 'Conteúdo' } },
    statusMessage: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Digite seu nome',
    density: 'medium',
    highlight: false,
    required: false,
    disabled: false,
    inline: false,
    helperText: 'Informe o nome como consta no documento.',
  },
}

export const Densidades: Story = {
  name: 'Densidades',
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {(['small', 'medium', 'large'] as const).map((density) => (
        <div key={density}>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            {density === 'small' ? 'Small (32px)' : density === 'medium' ? 'Medium (40px) — padrão' : 'Large (48px)'}
          </p>
          <Input
            label="Protocolo"
            density={density}
            placeholder="Nº de protocolo"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Três densidades disponíveis para o campo de texto.' },
    },
  },
}

export const InputDestaque: Story = {
  name: 'Input destaque',
  render: () => (
    <div className="max-w-md">
      <Input
        label="Pesquisar serviço"
        highlight
        placeholder="Digite o nome do serviço"
        helperText="Variante destaque — alinhada ao input-highlight GovBR."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Variante destaque: fundo cinza, 56 px de altura, sem borda até o foco.' },
    },
  },
}

export const ComIcone: Story = {
  name: 'Com ícone inicial',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Busca"
        placeholder="Pesquisar..."
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        }
      />
      <Input
        label="E-mail institucional"
        placeholder="usuario@gov.br"
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        }
      />
    </div>
  ),
}

export const EstadosDeValidacao: Story = {
  name: 'Estados de validação',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      {(['success', 'error', 'warning', 'info'] as const).map((status) => (
        <Input
          key={status}
          label={`Status: ${status}`}
          value={status === 'success' ? 'João da Silva' : status === 'error' ? 'erro' : ''}
          readOnly
          status={status}
          statusMessage={
            status === 'success'
              ? 'Campo válido.'
              : status === 'error'
              ? 'Campo obrigatório não preenchido.'
              : status === 'warning'
              ? 'Verifique os dados informados.'
              : 'Informação adicional sobre o campo.'
          }
        />
      ))}
    </div>
  ),
}

export const EstadoDesabilitado: Story = {
  name: 'Estado desabilitado',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input label="Campo desabilitado" value="Conteúdo somente leitura" disabled />
      <Input label="Campo desabilitado sem valor" placeholder="Não editável" disabled />
    </div>
  ),
}

export const RotuloInline: Story = {
  name: 'Rótulo inline',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Input label="UF" inline placeholder="Ex.: DF" />
      <Input label="CEP" inline placeholder="00000-000" />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Rótulo posicionado à esquerda do campo com `inline`.' },
    },
  },
}

export const ObrigatorioAuxiliar: Story = {
  name: 'Obrigatório e auxiliar',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        required
        helperText="Informe o CPF sem pontuação."
      />
      <Input
        label="Data de nascimento"
        type="date"
        required
        helperText="Formato DD/MM/AAAA."
      />
    </div>
  ),
}

export const FormularioCompleto: Story = {
  name: 'Formulário completo',
  render: () => {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')

    const nomeError = nome.length > 0 && nome.length < 3 ? 'Nome muito curto.' : undefined
    const emailError = email.length > 0 && !email.includes('@') ? 'E-mail inválido.' : undefined

    return (
      <form className="flex flex-col gap-5 max-w-md" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          status={nomeError ? 'error' : nome.length >= 3 ? 'success' : undefined}
          statusMessage={nomeError}
          helperText={!nomeError ? 'Como consta no documento oficial.' : undefined}
        />
        <Input
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="000.000.000-00"
          required
        />
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          status={emailError ? 'error' : email.includes('@') ? 'success' : undefined}
          statusMessage={emailError}
          placeholder="usuario@gov.br"
        />
        <button
          type="submit"
          className="mt-2 h-10 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px] transition-colors"
        >
          Enviar
        </button>
      </form>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Formulário com validação em tempo real e feedback por status.' },
    },
  },
}
