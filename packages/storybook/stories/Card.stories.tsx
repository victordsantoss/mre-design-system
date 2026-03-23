import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardHeaderIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  Button,
  Input,
} from '@ds/components'

const DOCS = ``.trim()

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    /** Fundo neutro para a superfície branca + sombra do card lerem bem (evita branco sobre branco). */
    backgrounds: { default: 'gray' },
    docs: { description: { component: DOCS } },
  },
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Card interativo (hover + foco)',
      table: { category: 'Comportamento' },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desativado',
      table: { category: 'Estado' },
    },
    dragged: {
      control: 'boolean',
      description: 'Feedback de arraste',
      table: { category: 'Estado' },
    },
    fixedHeight: {
      control: 'boolean',
      description: 'Altura fixa do conteúdo (sem scroll interno)',
      table: { category: 'Layout' },
    },
    contentHeight: {
      control: 'number',
      description: 'Px da área de conteúdo com fixedHeight',
      table: { category: 'Layout' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Playground: Story = {
  args: {
    hover: false,
    disabled: false,
    dragged: false,
    fixedHeight: false,
  },
  render: (args) => (
    <Card {...args} className="w-[min(100%,380px)]">
      <CardHeader>
        <CardTitle>Cartão</CardTitle>
        <CardDescription>Exemplo no Playground.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gov-sm text-muted-foreground">Conteúdo.</p>
      </CardContent>
    </Card>
  ),
}

export const SimplesEComplexo: Story = {
  name: 'Simples e complexo',
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center items-start">
      <Card className="w-[280px]">
        <CardContent>
          <p className="text-gov-base font-medium">Card simples</p>
          <p className="text-gov-sm text-muted-foreground mt-1">Apenas a área de conteúdo.</p>
        </CardContent>
      </Card>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Novo projeto</CardTitle>
          <CardDescription>Configure as opções do projeto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input label="Nome do projeto" placeholder="Meu projeto" density="medium" />
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button emphasis="tertiary" type="button">Cancelar</Button>
          <Button emphasis="primary" type="button">Criar</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Card mínimo vs. card com áreas de título, conteúdo e ações (blocos formatados).',
      },
    },
  },
}

export const AnatomiaComIcone: Story = {
  name: 'Área de títulos com ícone',
  render: () => (
    <Card className="w-[360px]">
      <CardHeader className="flex flex-row items-start gap-1">
        <CardHeaderIcon className="rounded-md bg-primary/10 text-primary" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </CardHeaderIcon>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-gov-lg">Documento</CardTitle>
          <CardDescription>Ícone com padding 8px (token); título e descrição ao lado.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gov-sm text-muted-foreground">Área de conteúdo.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Exemplo de **área de títulos** com ícone usando `CardHeaderIcon` (sangria e padding conforme GovBR).',
      },
    },
  },
}

export const MidiaSangrando: Story = {
  name: 'Mídia (sangria)',
  render: () => (
    <Card className="w-[320px] overflow-hidden">
      <CardMedia
        height={140}
        className="rounded-none bg-gradient-to-br from-primary/25 via-primary/10 to-muted"
        aria-label="Ilustração de capa"
        role="img"
      />
      <CardHeader>
        <CardTitle className="text-gov-lg">Com imagem</CardTitle>
        <CardDescription>Mídia pode ocupar a largura total da superfície (exceção às margens internas).</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button emphasis="tertiary" type="button">Saiba mais</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Exceção GovBR: fotos/ilustrações podem “sangrar” nas bordas do card.' },
    },
  },
}

export const AlturaFlexivelEFixa: Story = {
  name: 'Dimensões: flexível e fixa',
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center items-start">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Flexível — altura pelo conteúdo</p>
        <Card className="w-[260px]">
          <CardContent>
            <p className="text-gov-sm">Pouco texto.</p>
          </CardContent>
        </Card>
        <Card className="w-[260px] mt-3">
          <CardContent>
            <p className="text-gov-sm">
              Mais conteúdo aumenta a altura do card sem rolagem interna, alinhado ao princípio de simplicidade.
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Fixa — mesma altura de conteúdo (overflow oculto)</p>
        <Card className="w-[260px]" fixedHeight contentHeight={100}>
          <CardContent>
            <p className="text-gov-sm">
              Texto longo que pode ser cortado quando a área de conteúdo tem altura fixa menor que o necessário.
              Use para alinhar vários cards em grade.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**Flexível:** recomendado quando o volume de conteúdo é imprevisível. **Fixa:** padroniza alturas em grades; excesso fica oculto (sem scrollbar no card).',
      },
    },
  },
}

export const AreaDeRespiro: Story = {
  name: 'Área de respiro',
  render: () => (
    <div className="flex flex-wrap gap-6 p-4 rounded-lg border border-dashed border-border">
      <Card className="w-[200px]">
        <CardContent><p className="text-gov-sm font-medium">Card A</p></CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardContent><p className="text-gov-sm font-medium">Card B</p></CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Espaço mínimo entre cards (ex.: `gap-6` / tokens da escala de layout) evita confusão de áreas de toque.',
      },
    },
  },
}

export const Estados: Story = {
  name: 'Estados',
  render: () => (
    <div className="flex flex-wrap gap-4 items-stretch justify-center">
      <Card hover className="w-[200px] cursor-pointer">
        <CardContent>
          <p className="text-gov-sm font-medium">Hover / interativo</p>
          <p className="text-gov-xs text-muted-foreground mt-1">Passe o foco ou clique.</p>
        </CardContent>
      </Card>
      <Card disabled className="w-[200px]">
        <CardContent>
          <p className="text-gov-sm font-medium">Desabilitado</p>
          <p className="text-gov-xs text-muted-foreground mt-1">`--status-disabled-background`</p>
        </CardContent>
      </Card>
      <Card dragged className="w-[200px]">
        <CardContent>
          <p className="text-gov-sm font-medium">Arrastando</p>
          <p className="text-gov-xs text-muted-foreground mt-1">`--status-dragged-background`</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Estados usuais: interativo, hover, pressionado (via CSS no interativo), desabilitado, arrastando. Conteúdo interno deve refletir o estado do container quando aplicável.',
      },
    },
  },
}

export const ExpandirConteudo: Story = {
  name: 'Conteúdo oculto (expandir)',
  render: function ExpandDemo() {
    const [open, setOpen] = useState(false)
    return (
      <Card className="w-[340px]">
        <CardHeader>
          <CardTitle className="text-gov-lg">Resumo</CardTitle>
          <CardDescription>Informação principal sempre visível.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gov-sm text-muted-foreground">
            Use botão terciário “Expandir” para detalhes complementares, com moderação (simplicidade).
          </p>
          {open && (
            <div className="mt-3 rounded-md bg-[var(--color-card-back)] p-3 text-gov-sm text-foreground border border-border">
              Detalhes extras: metadados, histórico ou texto longo que não precisa estar sempre visível.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button emphasis="tertiary" type="button" onClick={() => setOpen((o) => !o)}>
            {open ? 'Recolher' : 'Expandir'}
          </Button>
        </CardFooter>
      </Card>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Padrão GovBR: superfície complementar sem alterar a largura do card; evite rolagem interna.',
      },
    },
  },
}

export const VersoAlternado: Story = {
  name: 'Conteúdo no verso (alternância)',
  render: function FlipDemo() {
    const [back, setBack] = useState(false)
    return (
      <div className="w-[300px]">
        <Card className="overflow-hidden">
          <div
            className={`transition-opacity duration-gov-base ${back ? 'hidden' : 'block'}`}
          >
            <CardHeader>
              <CardTitle className="text-gov-lg">Frente</CardTitle>
              <CardDescription>Informação principal.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gov-sm">Clique para ver o verso (fundo `--color-card-back` / gray-2).</p>
            </CardContent>
            <CardFooter>
              <Button emphasis="tertiary" type="button" onClick={() => setBack(true)}>Ver detalhes</Button>
            </CardFooter>
          </div>
          <div
            className={`bg-[var(--color-card-back)] ${back ? 'block' : 'hidden'}`}
          >
            <CardHeader>
              <CardTitle className="text-gov-lg">Verso</CardTitle>
              <CardDescription>Texto complementar.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gov-sm text-foreground">Menos relevante que a frente; contraste com o fundo ajuda o usuário.</p>
            </CardContent>
            <CardFooter>
              <Button emphasis="tertiary" type="button" onClick={() => setBack(false)}>Voltar</Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Alternância frente/verso com identificador explícito; em produção prefira transições (flip, fade) e critérios de acessibilidade.',
      },
    },
  },
}

export const ComportamentoBloco: Story = {
  name: 'Botões em bloco (contexto)',
  render: () => (
    <Card className="w-[min(100%,320px)]">
      <CardContent className="pb-2">
        <p className="text-gov-sm text-muted-foreground">Em formulários, ações com `Button block` ocupam a largura útil (recomendado em toque).</p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button block emphasis="primary" type="button">Confirmar</Button>
        <Button block emphasis="tertiary" type="button">Cancelar</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'O **card** não tem prop `block`; o comportamento bloco aplica-se ao **botão** dentro da área de ações.' },
    },
  },
}

export const Estatisticas: Story = {
  name: 'Grade (métricas)',
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center">
      {[
        { title: 'Receita', value: 'R$ 45.231', hint: '+20,1%' },
        { title: 'Assinantes', value: '+2.350', hint: '+180,1%' },
      ].map((row) => (
        <Card key={row.title} className="w-[200px]">
          <CardHeader className="pb-0">
            <CardDescription>{row.title}</CardDescription>
            <CardTitle className="text-gov-2xl tabular-nums">{row.value}</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-gov-xs text-success">{row.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Vários cards com **altura flexível**; respiro horizontal via `gap`.' },
    },
  },
}
