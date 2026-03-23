import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Message } from '@ds/components'
import type { MessageSeverity } from '@ds/components'

const MESSAGE_DOCS_INTRO = `
Componente de **feedback ao usuário** sobre eventos do sistema, alinhado ao [br-message do Design System do Governo](https://www.gov.br/ds/components/message).

### Variantes
- **standard** — bloco com fundo claro, borda lateral colorida, ícone, título opcional e botão fechar.
- **feedback** — inline contextual com fundo sólido (ao lado de inputs ou em formulários).

### Severidades
\`success\` | \`error\` | \`warning\` | \`info\`

### Acessibilidade
- \`role="alert"\` (standard) — lido imediatamente pelo screen reader.
- \`role="status"\` (feedback) — polite.
- Foco automático no botão fechar quando exibido.
- Não desaparece automaticamente.
`.trim()

const meta: Meta<typeof Message> = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: MESSAGE_DOCS_INTRO,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'] satisfies MessageSeverity[],
      description: 'Nível de severidade da mensagem',
      table: { category: 'Aparência' },
    },
    variant: {
      control: 'select',
      options: ['standard', 'feedback'],
      description: 'Variante de exibição',
      table: { category: 'Aparência' },
    },
    closable: { control: 'boolean', table: { category: 'Comportamento' } },
    hideIcon: { control: 'boolean', table: { category: 'Aparência' } },
    title: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Message>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    title: 'Título da mensagem',
    children: 'Mensagem de feedback ao usuário sobre um evento do sistema.',
    closable: false,
    hideIcon: false,
  },
}

export const TipoPadrao: Story = {
  name: 'Tipo padrão — todas as severidades',
  render: () => (
    <div className="flex flex-col gap-0">
      <Message severity="success" title="Operação realizada com sucesso">
        Seu formulário foi enviado e está sendo processado.
      </Message>
      <Message severity="error" title="Ocorreu um erro">
        Não foi possível concluir a operação. Verifique os dados e tente novamente.
      </Message>
      <Message severity="warning" title="Atenção">
        O prazo para envio expira em 2 dias. Revise as informações antes de prosseguir.
      </Message>
      <Message severity="info" title="Informação">
        O sistema ficará indisponível para manutenção das 22h às 24h desta sexta-feira.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Variante padrão com as quatro severidades disponíveis.' },
    },
  },
}

export const SemTitulo: Story = {
  name: 'Sem título',
  render: () => (
    <div className="flex flex-col gap-0">
      <Message severity="success">Operação realizada com sucesso.</Message>
      <Message severity="error">Não foi possível concluir a operação.</Message>
      <Message severity="warning">Verifique os dados antes de prosseguir.</Message>
      <Message severity="info">O sistema será atualizado em breve.</Message>
    </div>
  ),
}

export const TipoFeedback: Story = {
  name: 'Tipo feedback (inline)',
  render: () => (
    <div className="flex flex-wrap gap-2 items-start">
      <Message severity="success" variant="feedback">Campo válido</Message>
      <Message severity="error" variant="feedback">Campo obrigatório</Message>
      <Message severity="warning" variant="feedback">Revise os dados</Message>
      <Message severity="info" variant="feedback">Informação adicional</Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Variante inline com fundo sólido — usada ao lado de inputs e dentro de formulários.' },
    },
  },
}

export const Closable: Story = {
  name: 'Com botão fechar',
  render: () => {
    const [visivel, setVisivel] = useState(true)
    return (
      <div className="max-w-xl">
        {visivel ? (
          <Message
            severity="info"
            title="Sessão expirando"
            closable
            onClose={() => setVisivel(false)}
          >
            Sua sessão expirará em 5 minutos. Salve seus dados para não perder o progresso.
          </Message>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Mensagem fechada.</p>
            <button
              className="text-sm text-primary underline"
              onClick={() => setVisivel(true)}
            >
              Reexibir
            </button>
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Modo controlado: `closable` + `onClose` para fechar externamente.' },
    },
  },
}

export const FechamentoAutonomo: Story = {
  name: 'Fechamento autônomo',
  render: () => (
    <div className="flex flex-col gap-0 max-w-xl">
      <Message severity="success" title="Arquivo enviado" closable>
        O arquivo foi processado e está disponível na sua área de trabalho.
      </Message>
      <Message severity="warning" title="Dados incompletos" closable>
        Preencha todos os campos obrigatórios para continuar.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Sem `onClose`: o componente gerencia sua própria visibilidade internamente.' },
    },
  },
}

export const ConteudoRico: Story = {
  name: 'Conteúdo rico',
  render: () => (
    <div className="max-w-xl">
      <Message severity="warning" title="Documentos pendentes">
        <p>Para continuar com sua solicitação, os seguintes documentos são necessários:</p>
        <ul className="mt-2 list-disc pl-5 text-sm">
          <li>Cópia autenticada do RG ou CNH</li>
          <li>Comprovante de residência (últimos 3 meses)</li>
          <li>Declaração de regularidade fiscal</li>
        </ul>
        <p className="mt-2 text-sm">
          Envie os documentos pelo{' '}
          <a href="#" className="underline font-medium">Portal de Documentos</a>.
        </p>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'O `children` aceita qualquer conteúdo React — listas, links, parágrafos.' },
    },
  },
}

export const SemIcone: Story = {
  name: 'Sem ícone',
  render: () => (
    <div className="flex flex-col gap-0 max-w-xl">
      <Message severity="info" title="Nota informativa" hideIcon>
        Este campo não é obrigatório para a conclusão do cadastro.
      </Message>
      <Message severity="error" hideIcon>
        Ocorreu um erro inesperado. Tente novamente mais tarde.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: '`hideIcon` remove o ícone lateral.' },
    },
  },
}

export const TodasAsSeveridades: Story = {
  name: 'Feedback — todas as severidades',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      {(['success', 'error', 'warning', 'info'] as const).map((severity) => (
        <div key={severity} className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-foreground">
            Campo de exemplo
          </label>
          <input
            type="text"
            placeholder="Digite algo..."
            className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-primary"
          />
          <Message severity={severity} variant="feedback">
            {severity === 'success'
              ? 'Preenchimento correto.'
              : severity === 'error'
              ? 'Campo inválido.'
              : severity === 'warning'
              ? 'Verifique o valor.'
              : 'Dica de preenchimento.'}
          </Message>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Variante feedback posicionada abaixo de inputs — padrão GovBR.' },
    },
  },
}
