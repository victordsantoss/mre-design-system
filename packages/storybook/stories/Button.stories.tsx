import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button, CircleButton } from '@ds/components'
import type { ButtonEmphasis, ButtonDensity, ButtonIntent } from '@ds/components'

const BUTTON_DOCS = [
  '## Button (Botão)',
  '',
  'O **Button** é o componente de interface para **ações** e **navegação local** — alinhado ao Padrão Digital de Governo (GovBR) e às diretrizes do **Ministério das Relações Exteriores (MRE / Itamaraty)**. Hierarquia visual (**ênfase**), tamanho (**densidade**), cor semântica (**intenção**) e estados (incl. **loading**) seguem tokens do DS.',
  '',
  '### Visão geral',
  '',
  'Use o botão para submeter formulários, confirmar escolhas, abrir fluxos ou disparar operações. Combine **uma ação principal** (`emphasis="primary"`) com ações secundárias/terciárias na mesma vista.',
  '',
  '| Dimensão | Props principais |',
  '|----------|------------------|',
  '| **Ênfase** | `primary` · `secondary` · `tertiary` |',
  '| **Densidade** | `small` (32px) · `medium` (40px) · `large` (48px) |',
  '| **Intenção** | `default` · `danger` · `success` · `warning` · `info` |',
  '| **Layout** | `block` — largura total |',
  '| **Composição** | `startIcon` · `endIcon` · `asChild` (Radix Slot) |',
  '',
  '**CircleButton:** variante circular para ícone apenas — **obrigatório** `aria-label` (acessibilidade).',
  '',
  '### Códigos',
  '',
  '```tsx',
  "import { Button, CircleButton } from '@ds/components'",
  "import '@ds/components/styles.css'",
  '',
  '<Button emphasis="primary" density="medium" type="button">',
  '  Salvar',
  '</Button>',
  '',
  '<Button emphasis="secondary" intent="danger" type="button">',
  '  Excluir',
  '</Button>',
  '',
  '<CircleButton aria-label="Fechar" density="medium" intent="danger">',
  '  ×',
  '</CircleButton>',
  '```',
  '',
  '### Acessibilidade',
  '',
  '- **Foco GovBR:** `focus-visible:ring-[3px] ring-ring ring-offset-[4px]`.',
  '- **Rótulo:** texto visível no `Button` (obrigatório); em **CircleButton**, use sempre `aria-label`.',
  '- **Estado desabilitado:** `disabled` — `pointer-events: none` e opacidade reduzida.',
  '- **Loading:** spinner visível; evite alterar só a cor — mantenha o rótulo ou combine com texto de estado quando fizer sentido.',
  '- Ícones decorativos: `aria-hidden` nos SVGs quando o significado está no texto.',
  '',
  '### Uso',
  '',
  '- **Primário:** ação mais importante do contexto (ex.: *Submeter*, *Confirmar*).',
  '- **Secundário:** ação alternativa sem competir com o primário (ex.: *Cancelar* com borda).',
  '- **Terciário:** ações de menor peso (links de ação, *Saiba mais*).',
  '- **Intenções** (`danger`, `success`, etc.): reforçam o significado sem substituir um rótulo claro.',
  '',
  '### Anatomia',
  '',
  '| ID | Nome | Fundamento | Obrigatório |',
  '|----|------|------------|-------------|',
  '| 1 | Superfície do botão | Superfície / cor | Sim |',
  '| 2 | Rótulo | Tipografia | Sim (exceto CircleButton só com ícone) |',
  '| 3 | Ícone início / fim | Iconografia | Não (`startIcon` / `endIcon`) |',
  '| 4 | Indicador de progresso | Estado | Não (`loading`) |',
  '',
  '### Comportamentos',
  '',
  '- **Hover / ativo:** transições rápidas (`duration-ds-fast`); cores de hover definidas por ênfase e intenção.',
  '- **`block`:** útil em formulários mobile ou CTAs em coluna única.',
  '- **`asChild`:** delega estilos a um filho (ex.: `Link`) mantendo aparência de botão.',
  '',
  '### Melhores práticas',
  '',
  '- Rótulos em **infinitivo** ou imperativo claro, **uma ou duas palavras** quando possível.',
  '- Não use vários botões **primários** na mesma secção sem hierarquia explícita.',
  '- Respeite **área de proteção** entre botões adjacentes (escala de espaçamento GovBR).',
  '',
  '### Especificações (tokens)',
  '',
  'Tipografia e ícone: `--font-size-scale-up-01`, `--font-weight-semi-bold`, `--font-lineheight-low`, `--icon-size-base`. Espaçamento interno: `--spacing-scale-3x`, `--spacing-scale-base`. Forma: `rounded-pill` (`--surface-rounder-pill`). Cores semânticas via variáveis CSS do preset (`--color-primary`, `--color-destructive`, etc.), alinhadas a primitivos `@ds/tokens` (ex.: `blueWarmVivid`, `redVivid`, `greenCoolVivid`).',
].join('\n')

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Botão — GovBR / MRE',
      description: { component: BUTTON_DOCS },
    },
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'] satisfies ButtonEmphasis[],
      description: 'Hierarquia visual: primária > secundária > terciária',
      table: { category: 'Aparência', defaultValue: { summary: 'primary' } },
    },
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies ButtonDensity[],
      description: 'Alta (32px) | padrão (40px) | baixa (48px) — rótulo e ícone mantêm tamanho',
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
      description: 'Comportamento bloco — largura 100% (só botão padrão)',
      table: { category: 'Layout' },
    },
    loading: {
      control: 'boolean',
      description: 'Estado progresso — spinner no botão',
      table: { category: 'Estado' },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
      table: { category: 'Estado' },
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Button>

const IconDownload = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)

const IconChevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const IconPaperclip = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)

export const Playground: Story = {
  args: {
    children: 'Salvar',
    emphasis: 'primary',
    density: 'medium',
    intent: 'default',
  },
}

export const RotuloObrigatorio: Story = {
  name: 'Rótulo (obrigatório)',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button emphasis="primary">Entrar</Button>
      <Button emphasis="secondary">Cancelar</Button>
      <Button emphasis="tertiary">Cadastrar</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Verbetes no infinitivo, uma ou duas palavras quando possível. Sem quebra de linha no rótulo.',
      },
    },
  },
}

export const IconeOpcional: Story = {
  name: 'Ícone (opcional)',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button startIcon={IconDownload}>Baixar</Button>
      <Button emphasis="secondary" endIcon={IconChevronRight}>Avançar</Button>
      <Button emphasis="tertiary" startIcon={IconPaperclip}>Anexar</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'O ícone opcional reforça a ação. Rótulo e ícone permanecem centralizados; o espaçamento entre eles segue o token de layout.',
      },
    },
  },
}

export const TiposPadraoECircular: Story = {
  name: 'Tipos: padrão e circular',
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Botão padrão — ação pelo rótulo; ícone opcional</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button emphasis="primary">Enviar</Button>
          <Button emphasis="secondary" startIcon={IconPaperclip}>Anexar</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Botão circular — só ícone; aria-label obrigatório</p>
        <div className="flex flex-wrap gap-3 items-center">
          <CircleButton aria-label="Adicionar" density="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </CircleButton>
          <CircleButton aria-label="Fechar" intent="danger" density="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CircleButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Dois tipos no DS: **padrão** (mais comum) e **circular** para ações auxiliares ou quando o ícone bastam — com uso frequente dentro de outros componentes.',
      },
    },
  },
}

export const Enfases: Story = {
  name: 'Ênfases',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Primária — ação crucial (ex.: salvar no formulário)</p>
        <Button emphasis="primary">Salvar</Button>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Secundária — menor prioridade que a primária (ex.: ao lado de Salvar)</p>
        <Button emphasis="secondary">Salvar rascunho</Button>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Terciária — suporte, opcional, múltipla escolha</p>
        <Button emphasis="tertiary">Cancelar</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Hierarquia visual em fundo claro ou escuro. Primária: uso limitado a ações estratégicas. Secundária: não objetivo principal da página. Terciária: baixo destaque.',
      },
    },
  },
}

export const PosicionamentoHorizontal: Story = {
  name: 'Posicionamento (horizontal)',
  render: () => (
    <div className="w-full max-w-xl rounded border border-border p-4">
      <p className="mb-3 text-sm text-muted-foreground">Maior ênfase à direita: terciário → secundário → primário</p>
      <div className="flex justify-end gap-3 flex-wrap">
        <Button emphasis="tertiary">Cancelar</Button>
        <Button emphasis="secondary">Salvar rascunho</Button>
        <Button emphasis="primary">Enviar</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Com três ênfases: primária à direita, depois secundária e terciária. Só secundária + terciária: secundária à direita. Primária + terciária: primária à direita.',
      },
    },
  },
}

export const PosicionamentoVertical: Story = {
  name: 'Posicionamento (vertical)',
  render: () => (
    <div className="w-full max-w-xs rounded border border-border p-4">
      <p className="mb-3 text-sm text-muted-foreground">Em coluna, o mais relevante fica abaixo</p>
      <div className="flex flex-col gap-3 items-stretch">
        <Button emphasis="tertiary">Cancelar</Button>
        <Button emphasis="secondary">Salvar rascunho</Button>
        <Button emphasis="primary">Enviar</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Quando a disposição for vertical (ex.: telas estreitas), o botão de maior relevância aparece mais abaixo.',
      },
    },
  },
}

export const Densidades: Story = {
  name: 'Densidade',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button density="small">Alta (32px)</Button>
      <Button density="medium">Padrão (40px)</Button>
      <Button density="large">Baixa (48px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Alta** reduz a altura; **padrão** é o default; **baixa** aumenta. Rótulo e ícone mantêm tamanho e centralização; espaçamento entre ícone e rótulo não muda.',
      },
    },
  },
}

export const DensidadesCirculares: Story = {
  name: 'Densidade (botão circular)',
  render: () => (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col items-center gap-1">
        <CircleButton density="small" aria-label="Alta densidade">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </CircleButton>
        <span className="text-xs text-muted-foreground">32×32</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <CircleButton density="medium" aria-label="Padrão">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </CircleButton>
        <span className="text-xs text-muted-foreground">40×40</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <CircleButton density="large" aria-label="Baixa densidade">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </CircleButton>
        <span className="text-xs text-muted-foreground">48×48</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'No circular, densidade baixa aumenta altura e largura; densidade alta reduz ambas.',
      },
    },
  },
}

export const ComportamentoBloco: Story = {
  name: 'Comportamento bloco',
  render: () => (
    <div className="grid w-full max-w-md gap-6">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Sem bloco</p>
        <div className="flex gap-2">
          <Button>Primário</Button>
          <Button emphasis="secondary">Secundário</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Com bloco (largura total do container)</p>
        <div className="flex flex-col gap-2">
          <Button block emphasis="primary">Continuar</Button>
          <Button block emphasis="secondary">Voltar</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Grade — útil em toque</p>
        <div className="grid grid-cols-1 gap-2">
          <Button block emphasis="primary">Confirmar</Button>
          <Button block emphasis="tertiary">Cancelar</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Só o **botão padrão** usa `block`. Recomendado em dispositivos por toque. Pode combinar com qualquer densidade e ênfase; na mesma tela podem coexistir botões com e sem bloco.',
      },
    },
  },
}

export const ComportamentoToggle: Story = {
  name: 'Comportamento toggle',
  render: function ToggleDemo() {
    const [visivel, setVisivel] = useState(true)
    return (
      <div className="flex flex-col gap-2 items-start">
        <Button emphasis="secondary" type="button" onClick={() => setVisivel((v) => !v)}>
          {visivel ? 'Ocultar' : 'Mostrar'}
        </Button>
        <p className="text-sm text-muted-foreground max-w-sm">
          {visivel ? 'Conteúdo visível — clique para alternar o rótulo para a ação oposta.' : 'Conteúdo oculto.'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternância de rótulo e/ou ícone para ações opostas a cada clique (ex.: Mostrar / Ocultar).',
      },
    },
  },
}

export const EstadoProgresso: Story = {
  name: 'Estado progresso (loading)',
  render: () => {
    const [loading, setLoading] = useState(false)
    return (
      <div className="flex flex-col gap-3 items-start">
        <p className="text-sm text-muted-foreground max-w-md">
          Opcional: indica requisição em andamento após a interação. O rótulo pode permanecer ou ser substituído pelo spinner conforme o fluxo.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            Salvar
          </Button>
          <Button emphasis="secondary" loading={loading}>
            Salvar rascunho
          </Button>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Clique em **Salvar** para simular ~2s de progresso.' },
    },
  },
}

export const Estados: Story = {
  name: 'Estados',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <Button>Interativo (padrão)</Button>
        <Button emphasis="secondary" disabled>Desabilitado</Button>
        <Button emphasis="tertiary" disabled>Terciário desabilitado</Button>
      </div>
      <p className="text-xs text-muted-foreground max-w-xl">
        Estados previstos no guia: interativo, hover, pressionado, desabilitado, ativado e progresso (loading).
        Hover e pressionado são tratados por CSS; desabilitado e loading por props.
      </p>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Feedback visual conforme interação. Combine com tokens de cor em temas claro/escuro.',
      },
    },
  },
}

export const AreaDeProtecao: Story = {
  name: 'Área de proteção',
  render: () => (
    <div className="rounded border border-dashed border-border p-6 max-w-md">
      <p className="mb-4 text-sm text-muted-foreground">
        Mantenha espaçamento mínimo entre botões e outros componentes (escala de layout do fundamento Espaçamento) para não confundir áreas de toque.
      </p>
      <div className="flex gap-6 flex-wrap">
        <Button emphasis="primary">Ação A</Button>
        <Button emphasis="secondary">Ação B</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Use `gap` ou margens da escala GovBR (`spacing` / `--spacing-scale-*`) de forma consistente.',
      },
    },
  },
}

export const Intencoes: Story = {
  name: 'Intenções semânticas',
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
    layout: 'padded',
    docs: {
      description: { story: 'Matriz técnica ênfase × intenção (danger, success, warning, info).' },
    },
  },
}
