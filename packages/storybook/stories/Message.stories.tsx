import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Message } from '@ds/components'
import type { MessageSeverity } from '@ds/components'

const MESSAGE_DOCS = [
  '## Message (Mensagem)',
  '',
  'O **Message (Mensagem)** é um componente de interface que tem como finalidade proporcionar *feedback* ao utilizador sobre o que ocorre no sistema — alinhado ao Padrão Digital de Governo (GovBR) e às diretrizes de interface do **Ministério das Relações Exteriores (MRE / Itamaraty)**.',
  '',
  '### Visão geral',
  '',
  'Utilize o Message quando houver necessidade de transmitir informação em decorrência de interações com o sistema ou de eventos previamente programados. O componente implementa **dois tipos** na API:',
  '',
  '| API | Uso GovBR |',
  '|-----|-----------|',
  '| `variant="standard"` | **Mensagem tipo padrão** — contexto global (página ou secção). |',
  '| `variant="feedback"` | **Mensagem tipo contextual** — associada a um campo ou componente. |',
  '',
  '### Códigos',
  '',
  '```tsx',
  "import { Message } from '@ds/components'",
  "import '@ds/components/styles.css'",
  '',
  '<Message severity="info" variant="standard" title="Título">',
  '  Texto obrigatório da mensagem.',
  '</Message>',
  '',
  '<Message severity="error" variant="feedback">',
  '  Mensagem contextual ao campo.',
  '</Message>',
  '```',
  '',
  '### Acessibilidade',
  '',
  '- **Tipo padrão** (`standard`): `role="alert"` e `aria-live="assertive"` por omissão — leitura imediata por leitores de ecrã.',
  '- **Tipo contextual** (`feedback`): `role="status"` e `aria-live="polite"`.',
  '- **Botão fechar**: foco automático quando visível; `aria-label="Fechar mensagem"`.',
  '- **Ícones decorativos**: `aria-hidden` nos SVGs padrão.',
  '- O conteúdo **não** desaparece automaticamente.',
  '',
  '### Uso',
  '',
  '**Exemplo de Message (tipo padrão):** bloco com superfície semântica, ícone opcional à esquerda, título opcional, texto obrigatório e botão fechar opcional (apenas no tipo padrão).',
  '',
  '**Exemplo de Message (tipo contextual):** faixa compacta junto ao elemento relacionado (ex.: validação de campo). **Não** utilize `closable` no tipo contextual — o botão fechar não é aplicado (GovBR).',
  '',
  '### Anatomia',
  '',
  '| ID | Nome | Fundamento | Obrigatório |',
  '|----|------|------------|-------------|',
  '| 1 | Superfície do Message | Superfície | Sim |',
  '| 2 | Ícones | Iconografia | Não (`hideIcon`) |',
  '| 3 | Título | Tipografia | Não |',
  '| 4 | Mensagem | Tipografia | Sim (`children`) |',
  '| 5 | Botão fechar | Button (terciário) | Não — só tipo padrão |',
  '',
  '**Posição dos ícones:** ícones semânticos à **esquerda** da superfície; o botão fechar no **topo à direita**.',
  '',
  '**Título:** use `titleInline` para título na **mesma linha** que a mensagem; sem a prop, o título fica **acima** do texto.',
  '',
  '### Tipos',
  '',
  '1. **Mensagem tipo padrão** — feedback de contexto global (processo ou interação da página/secção).',
  '2. **Mensagem tipo contextual** — feedback ligado a um elemento (ex.: validação de campo).',
  '',
  '### Comportamentos',
  '',
  '- **Responsividade:** a superfície usa largura total do contentor; o texto quebra linha e a altura acompanha. O ícone semântico mantém-se alinhado ao centro vertical da superfície em layouts em flexão.',
  '- **Posicionamento:** mensagem global tipicamente entre cabeçalho e *breadcrumb*; mensagem direcionada junto ao elemento ou ação (ex.: conteúdo de um separador).',
  '- **Estados semânticos:** `info` (informativo), `success`, `warning`, `error` — cores e ícones mapeados a partir dos **tokens** `@ds/tokens` (`blueWarmVivid`, `greenCoolVivid`, `yellowVivid`, `redVivid`, `gray`, `pure`).',
  '',
  '### Melhores práticas',
  '',
  '- Textos **curtos, claros e objetivos**.',
  '- Evite várias mensagens **tipo padrão** em simultâneo; prefira **contextuais** para ênfase local.',
  '- Para erros com detalhes técnicos, use corpo em estilo padrão e complementos (código, data) com ênfase tipográfica diferenciada (ex.: itálico em `children`).',
  '',
  '### Especificações (tokens)',
  '',
  'Cores e espaçamentos seguem primitivos exportados em `@ds/tokens` (ex.: `blueWarmVivid[10]` / `[60]`, `greenCoolVivid[5]` / `[50]`, `yellowVivid[5]` / `[20]`, `redVivid[10]` / `[50]`, `gray[80]`, `pure[0]`). No CSS do DS: `--spacing-scale-3x`, `--spacing-scale-2x`, `--spacing-scale-base`, `--spacing-scale-half`, `--font-size-scale-up-01`, `--font-size-scale-base`, `--icon-size-base`, `--icon-size-lg`.',
].join('\n')

const meta: Meta<typeof Message> = {
  /**
   * Manter `Components/Message` para o ID estável `components-message` / `components-message--docs`
   * (URLs e favoritos do Storybook). O nome em português está na documentação acima.
   */
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      subtitle: 'Mensagem — GovBR / MRE',
      description: { component: MESSAGE_DOCS },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'] satisfies MessageSeverity[],
      description: 'Estado semântico (informativo, sucesso, alerta, erro)',
      table: { category: 'Aparência' },
    },
    variant: {
      control: 'select',
      options: ['standard', 'feedback'],
      description: 'Padrão (global) ou contextual (associado a componente)',
      table: { category: 'Aparência' },
    },
    titleInline: {
      control: 'boolean',
      description: 'Título na mesma linha que a mensagem (tipo padrão)',
      table: { category: 'Conteúdo' },
    },
    closable: {
      control: 'boolean',
      description: 'Botão fechar — apenas tipo **padrão** (ignorado no contextual)',
      table: { category: 'Comportamento' },
    },
    hideIcon: { control: 'boolean', table: { category: 'Aparência' } },
    title: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Message>

export const Playground: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    title: 'Título da mensagem',
    titleInline: false,
    children: 'Mensagem de feedback ao utilizador sobre um evento do sistema.',
    closable: false,
    hideIcon: false,
  },
}

export const MensagemTipoPadrao: Story = {
  name: 'Mensagem tipo padrão — estados',
  render: () => (
    <div className="flex max-w-3xl flex-col gap-0">
      <Message severity="info" title="Estado informativo">
        Utilize para informação neutra ou orientação geral ao utilizador.
      </Message>
      <Message severity="success" title="Estado sucesso">
        Finalização de tarefa ou conclusão bem-sucedida.
      </Message>
      <Message severity="warning" title="Estado alerta">
        Advertência para evitar erros ou chamar atenção sem bloquear.
      </Message>
      <Message severity="error" title="Estado erro">
        Erro do sistema ou da validação que requer correção.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Superfície clara semântica por severidade — tokens GovBR via `@ds/tokens`.',
      },
    },
  },
}

export const MensagemTipoContextual: Story = {
  name: 'Mensagem tipo contextual',
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-gov-sm font-medium text-foreground" htmlFor="ex-email">
          E-mail
        </label>
        <input
          id="ex-email"
          type="email"
          className="h-10 rounded-md border border-border px-3 text-gov-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="nome@exemplo.gov.br"
        />
        <Message severity="error" variant="feedback">
          Formato de e-mail inválido.
        </Message>
      </div>
      <p className="text-gov-sm text-muted-foreground">
        Exemplo de validação de campo — padrão GovBR para mensagem contextual.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Contextual: fundo sólido semântico, tipografia `--font-size-scale-base` / médio. O botão fechar **não** é mostrado, mesmo com `closable`.',
      },
    },
  },
}

export const ContextualIgnoraBotaoFechar: Story = {
  name: 'Contextual — sem botão fechar (GovBR)',
  render: () => (
    <Message severity="success" variant="feedback" closable>
      Mesmo com <code className="rounded bg-muted px-1">closable</code>, o tipo contextual não exibe o botão fechar.
    </Message>
  ),
}

export const TituloNaMesmaLinha: Story = {
  name: 'Título na mesma linha',
  render: () => (
    <div className="max-w-2xl">
      <Message severity="info" title="Nota:" titleInline>
        o prazo de entrega foi atualizado para 15 dias úteis.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Prop `titleInline` — opção A da anatomia (título + mensagem na mesma linha, com quebra responsiva).' },
    },
  },
}

export const ComBotaoFechar: Story = {
  name: 'Botão fechar (tipo padrão)',
  render: () => {
    const [visivel, setVisivel] = useState(true)
    return (
      <div className="max-w-xl">
        {visivel ? (
          <Message
            severity="info"
            title="Sessão a expirar"
            closable
            onClose={() => setVisivel(false)}
          >
            Guarde o trabalho antes do fim da sessão.
          </Message>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-gov-sm text-muted-foreground">Mensagem fechada.</p>
            <button
              type="button"
              className="text-gov-sm font-medium text-primary underline"
              onClick={() => setVisivel(true)}
            >
              Reexibir
            </button>
          </div>
        )}
      </div>
    )
  },
}

export const FechamentoInterno: Story = {
  name: 'Fechamento não controlado',
  render: () => (
    <div className="max-w-xl space-y-4">
      <Message severity="success" title="Concluído" closable>
        Operação registada com sucesso.
      </Message>
      <Message severity="warning" title="Atenção" closable>
        Verifique os dados antes de submeter.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Sem `onClose`: o componente oculta-se internamente ao fechar.' },
    },
  },
}

export const SemTitulo: Story = {
  name: 'Sem título',
  render: () => (
    <div className="max-w-xl space-y-0">
      <Message severity="success">Operação concluída com sucesso.</Message>
      <Message severity="error">Não foi possível concluir o pedido.</Message>
      <Message severity="warning">Confirme os dados introduzidos.</Message>
      <Message severity="info">O sistema será atualizado esta noite.</Message>
    </div>
  ),
}

export const ErroComInformacaoComplementar: Story = {
  name: 'Erro com detalhe complementar',
  render: () => (
    <div className="max-w-xl">
      <Message severity="error" title="Falha ao processar o pedido">
        <span className="text-gov-base font-normal not-italic">
          O serviço temporário não respondeu.
        </span>{' '}
        <span className="text-gov-sm italic text-foreground/90">
          Código ERR-504 · 2025-03-23 14:32 UTC
        </span>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Corpo principal em estilo padrão; informação complementar com ênfase diferenciada (ex.: itálico), conforme melhores práticas GovBR.',
      },
    },
  },
}

export const ConteudoRico: Story = {
  name: 'Conteúdo rico',
  render: () => (
    <div className="max-w-xl">
      <Message severity="warning" title="Documentos em falta">
        <p>Para continuar, são necessários:</p>
        <ul className="mt-2 list-disc pl-5 text-gov-sm">
          <li>Identificação oficial com foto</li>
          <li>Comprovativo de morada recente</li>
        </ul>
      </Message>
    </div>
  ),
}

export const SemIcone: Story = {
  name: 'Sem ícone',
  render: () => (
    <div className="max-w-xl space-y-4">
      <Message severity="info" title="Nota" hideIcon>
        Campo opcional — pode deixar em branco.
      </Message>
      <Message severity="error" hideIcon>
        Ocorreu um erro. Tente novamente.
      </Message>
    </div>
  ),
}

export const PosicionamentoDirecionado: Story = {
  name: 'Uso direcionado (exemplo)',
  render: () => (
    <div className="max-w-lg rounded-md border border-border p-4">
      <div className="flex gap-2 border-b border-border pb-2">
        <button type="button" className="text-gov-sm font-semibold text-primary">
          Geral
        </button>
        <button type="button" className="text-gov-sm text-muted-foreground">
          Anexos
        </button>
      </div>
      <Message className="mt-4" severity="success" title="Guardado">
        As alterações do separador Geral foram guardadas.
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de mensagem **direcionada** a uma área da página (ex.: ação num separador), em vez de alerta global.',
      },
    },
  },
}

export const Responsividade: Story = {
  name: 'Largura do contentor',
  render: () => (
    <div className="w-full max-w-xs border border-dashed border-border p-2 sm:max-w-md">
      <Message severity="info" title="Texto longo">
        Esta mensagem demonstra a quebra de linha quando o contentor é mais estreito que o texto,
        mantendo o ícone alinhado ao centro vertical da superfície.
      </Message>
    </div>
  ),
}
