import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Item, Divider, type ItemDensity } from '@ds/components'

const ITEM_DOCS = `
Bloco compacto e flexível para exibir conteúdo repetido em sequência. Primitiva base de **List**, **Menu**, **Dropdown** e outros componentes compostos.

**Elemento renderizado**:
- Sem \`href\`/\`onClick\`: \`<div>\` (não interativo)
- Com \`onClick\` ou \`onToggle\`: \`<button>\`
- Com \`href\`: \`<a>\`

**Divider**: prop \`divider\` insere um separador na borda inferior.
`.trim()

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: ITEM_DOCS } },
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies ItemDensity[],
      table: { category: 'Layout' },
    },
    selected: { control: 'boolean', table: { category: 'Estado' } },
    active: { control: 'boolean', table: { category: 'Estado' } },
    disabled: { control: 'boolean', table: { category: 'Estado' } },
    divider: { control: 'boolean', table: { category: 'Visual' } },
  },
}

export default meta
type Story = StoryObj<typeof Item>

/* ---------------------------------------------------------------- helpers */

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-warning" fill="currentColor" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/* ---------------------------------------------------------------- stories */

/** Item interativo básico — renderiza como `<button>`. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-80 rounded border border-border bg-background">
      <Item {...args} onClick={fn()}>
        Item de exemplo
      </Item>
    </div>
  ),
  args: {
    density: 'small',
    selected: false,
    active: false,
    disabled: false,
    divider: false,
  },
}

/** Item não interativo — apenas exibe conteúdo (renderiza como `<div>`). */
export const Estatico: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      <Item>Conteúdo estático</Item>
      <Item>Outro conteúdo estático</Item>
    </div>
  ),
}

/** Item como link — renderiza como `<a>`. */
export const ComoLink: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      <Item href="#" divider>Portal Gov.br</Item>
      <Item href="#" divider>Transparência</Item>
      <Item href="#">Acesso à Informação</Item>
    </div>
  ),
}

/** Três densidades: small (alta), medium, large (baixa). */
export const Densidades: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {(['small', 'medium', 'large'] satisfies ItemDensity[]).map((d) => (
        <div key={d} className="rounded border border-border bg-background">
          <p className="px-4 pt-2 text-xs text-muted-foreground">{d}</p>
          <Item density={d} onClick={fn()} divider>Primeiro item</Item>
          <Item density={d} onClick={fn()}>Segundo item</Item>
        </div>
      ))}
    </div>
  ),
}

/** Todos os estados: normal, ativo, selecionado, desabilitado. */
export const Estados: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      <Item onClick={fn()} divider>Normal</Item>
      <Item onClick={fn()} active divider>Ativo</Item>
      <Item onClick={fn()} selected divider>Selecionado</Item>
      <Item onClick={fn()} disabled>Desabilitado</Item>
    </div>
  ),
}

/** Item com suporte visual (ícone à esquerda) e complementar (metadado à direita). */
export const ComAreasDeSuporte: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      {[
        { label: 'João Silva', meta: 'Admin', icon: <UserIcon /> },
        { label: 'Maria Costa', meta: 'Editor', icon: <UserIcon /> },
        { label: 'Carlos Souza', meta: 'Leitor', icon: <UserIcon /> },
      ].map((row, i, arr) => (
        <Item key={row.label} onClick={fn()} divider={i < arr.length - 1}>
          <span className="flex items-center gap-3">
            {row.icon}
            <span className="flex-1 text-sm">{row.label}</span>
            <span className="text-xs text-muted-foreground">{row.meta}</span>
          </span>
        </Item>
      ))}
    </div>
  ),
}

/** Item com suporte visual e texto hierárquico (título + texto secundário). */
export const TextoHierarquico: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      {[
        { title: 'DOCUMENTO PRINCIPAL', text: 'Ofício nº 123/2024', sub: 'Recebido em 10/01/2024' },
        { title: 'ANEXO 01', text: 'Planilha de dados', sub: 'Recebido em 11/01/2024' },
        { title: 'ANEXO 02', text: 'Relatório técnico', sub: 'Recebido em 12/01/2024' },
      ].map((row, i, arr) => (
        <Item key={row.title} density="medium" onClick={fn()} divider={i < arr.length - 1}>
          <span className="flex items-center gap-3">
            <StarIcon />
            <span className="flex-1">
              <span className="block text-xs font-semibold uppercase text-muted-foreground">
                {row.title}
              </span>
              <span className="block text-sm font-normal text-foreground">
                {row.text}
              </span>
              <span className="block text-xs text-muted-foreground">
                {row.sub}
              </span>
            </span>
          </span>
        </Item>
      ))}
    </div>
  ),
}

/** Item expansível — controla o estado de expansão externamente. */
export const Expansivel: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div className="w-80 rounded border border-border bg-background">
        <Item
          density="medium"
          onToggle={() => setExpanded((v) => !v)}
          expanded={expanded}
        >
          <span className="text-sm font-semibold">Serviços Consulares</span>
        </Item>
        {expanded && (
          <div className="bg-muted">
            <Item density="medium" href="#" divider>Passaporte</Item>
            <Item density="medium" href="#" divider>Visto</Item>
            <Item density="medium" href="#">Autenticação</Item>
          </div>
        )}
        <Divider />
        <Item density="medium" onClick={fn()}>
          <span className="text-sm">Outros serviços</span>
        </Item>
      </div>
    )
  },
}

/** Lista de seleção — múltiplos itens com estado selecionado controlado. */
export const Selecao: Story = {
  render: () => {
    const options = ['Brasília', 'São Paulo', 'Rio de Janeiro', 'Buenos Aires']
    const [selected, setSelected] = useState<string>('Brasília')
    return (
      <div className="w-80 rounded border border-border bg-background">
        {options.map((opt, i) => (
          <Item
            key={opt}
            onClick={() => setSelected(opt)}
            selected={selected === opt}
            divider={i < options.length - 1}
          >
            <span className="flex items-center gap-3">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${selected === opt ? 'bg-primary' : 'bg-border'}`}
                aria-hidden="true"
              />
              <span className="text-sm">{opt}</span>
            </span>
          </Item>
        ))}
      </div>
    )
  },
}

/* ────────────────────────────────────────────────────────────────
   Casos de uso das imagens do spec
────────────────────────────────────────────────────────────────── */

/**
 * Recomendável: todos os itens com a mesma altura (mesma quantidade de linhas de conteúdo).
 * Uso com cautela: itens com alturas variáveis — dificulta a leitura "escaneada".
 */
export const AlturaConsistenteVsVariavel: Story = {
  render: () => {
    const Icon = () => (
      <span className="h-8 w-8 shrink-0 rounded bg-muted" aria-hidden="true" />
    )
    const Avatar = () => (
      <span className="h-8 w-8 shrink-0 rounded-full bg-muted" aria-hidden="true" />
    )

    const itemsConsistent = [
      { text: 'Texto principal do item', sub: 'Texto secundário' },
      { text: 'Texto principal do item', sub: 'Texto secundário' },
      { text: 'Texto principal do item', sub: 'Texto secundário' },
      { text: 'Texto principal do item', sub: 'Texto secundário' },
    ]
    const itemsVariable = [
      { text: 'Texto principal', sub: 'Texto secundário' },
      { text: 'Texto principal com mais conteúdo\ne mais uma linha de detalhe', sub: 'Texto secundário com mais informação' },
      { text: 'Texto', sub: '' },
      { text: 'Texto principal do item\ncom duas linhas de texto', sub: 'Texto secundário com bastante conteúdo adicional que ocupa mais espaço' },
    ]

    return (
      <div className="flex gap-8 p-6">
        {/* Recomendável */}
        <div className="flex-1">
          <div className="mb-3 rounded bg-success px-3 py-1.5">
            <span className="text-sm font-semibold text-white">Recomendável</span>
          </div>
          <div className="rounded border border-border bg-background">
            {itemsConsistent.map((row, i) => (
              <Item key={i} density="medium" onClick={fn()} divider={i < itemsConsistent.length - 1}>
                <span className="flex items-center gap-3">
                  <Icon />
                  <span className="flex-1">
                    <span className="block text-sm">{row.text}</span>
                    <span className="block text-xs text-muted-foreground">{row.sub}</span>
                  </span>
                  <Avatar />
                </span>
              </Item>
            ))}
          </div>
        </div>

        {/* Uso com cautela */}
        <div className="flex-1">
          <div className="mb-3 rounded bg-warning px-3 py-1.5">
            <span className="text-sm font-semibold text-foreground">Uso com cautela</span>
          </div>
          <div className="rounded border border-border bg-background">
            {itemsVariable.map((row, i) => (
              <Item key={i} density="medium" onClick={fn()} divider={i < itemsVariable.length - 1}>
                <span className="flex items-center gap-3">
                  <Icon />
                  <span className="flex-1">
                    <span className="block whitespace-pre-line text-sm">{row.text}</span>
                    {row.sub && <span className="block text-xs text-muted-foreground">{row.sub}</span>}
                  </span>
                  <Avatar />
                </span>
              </Item>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Diferentes layouts de Item conforme o spec:
 * ícone (suporte visual) + textos (área principal) + avatar (suporte complementar),
 * com variações horizontais e verticais.
 */
export const LayoutsDeItem: Story = {
  render: () => {
    const Sq = ({ sm }: { sm?: boolean }) => (
      <span className={`shrink-0 rounded bg-muted ${sm ? 'h-6 w-6' : 'h-8 w-8'}`} aria-hidden="true" />
    )
    const Circle = ({ sm }: { sm?: boolean }) => (
      <span className={`shrink-0 rounded-full bg-muted ${sm ? 'h-6 w-6' : 'h-8 w-8'}`} aria-hidden="true" />
    )
    const Lines = ({ n = 2 }: { n?: number }) => (
      <span className="flex flex-1 flex-col gap-1">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={`block h-2 rounded bg-muted ${i === 0 ? 'w-3/4' : 'w-1/2'}`} />
        ))}
      </span>
    )

    return (
      <div className="space-y-8 p-6">
        {/* Linha 1: layouts horizontais (3 variações) */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Horizontal</p>
          <div className="flex gap-4">
            {/* sq + linhas + circle */}
            <div className="flex-1 rounded border border-border bg-background">
              {[0, 1, 2].map((i) => (
                <Item key={i} density="medium" onClick={fn()} divider={i < 2}>
                  <span className="flex items-center gap-3">
                    <Sq />
                    <Lines n={2} />
                    <Circle />
                  </span>
                </Item>
              ))}
            </div>

            {/* circle + linhas (sem suporte complementar) */}
            <div className="flex-1 rounded border border-border bg-background">
              {[0, 1, 2].map((i) => (
                <Item key={i} density="medium" onClick={fn()} divider={i < 2}>
                  <span className="flex items-center gap-3">
                    <Circle />
                    <Lines n={1} />
                  </span>
                </Item>
              ))}
            </div>

            {/* sq + linhas (3 linhas) + circle */}
            <div className="flex-1 rounded border border-border bg-background">
              {[0, 1, 2].map((i) => (
                <Item key={i} density="medium" onClick={fn()} divider={i < 2}>
                  <span className="flex items-center gap-3">
                    <Sq />
                    <Lines n={3} />
                    <Circle sm />
                  </span>
                </Item>
              ))}
            </div>
          </div>
        </div>

        {/* Linha 2: layouts verticais (ícone em cima + texto + circle em baixo) */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Vertical</p>
          <div className="flex gap-4">
            {[0, 1, 2].map((col) => (
              <div key={col} className="flex-1 rounded border border-border bg-background">
                {[0, 1, 2].map((i) => (
                  <Item key={i} density="medium" onClick={fn()} divider={i < 2}>
                    <span className="flex flex-col items-center gap-2 text-center">
                      <Sq sm />
                      <Lines n={2} />
                      <Circle sm />
                    </span>
                  </Item>
                ))}
              </div>
            ))}

            {/* sq esquerda + textos à direita empilhados + circle */}
            <div className="flex-1 rounded border border-border bg-background">
              {[0, 1, 2].map((i) => (
                <Item key={i} density="medium" onClick={fn()} divider={i < 2}>
                  <span className="flex gap-3">
                    <span className="flex flex-col gap-2">
                      <Sq sm />
                      <Circle sm />
                    </span>
                    <Lines n={3} />
                  </span>
                </Item>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Boas práticas com Divider:
 * ✅ Faça — use Divider para separar **grupos** de itens.
 * ❌ Não faça — não use Divider entre cada item individual (layout poluído).
 */
export const BoasPraticasDivider: Story = {
  render: () => {
    const Icon = () => (
      <span className="h-7 w-7 shrink-0 rounded bg-muted" aria-hidden="true" />
    )
    const Avatar = () => (
      <span className="h-7 w-7 shrink-0 rounded-full bg-muted" aria-hidden="true" />
    )
    const Row = ({ label }: { label: string }) => (
      <span className="flex items-center gap-3">
        <Icon />
        <span className="flex-1 text-sm">{label}</span>
        <Avatar />
      </span>
    )

    const groupA = ['Item A1', 'Item A2', 'Item A3', 'Item A4']
    const groupB = ['Item B1', 'Item B2', 'Item B3', 'Item B4']

    return (
      <div className="flex gap-8 p-6">
        {/* Faça: divider entre grupos */}
        <div className="flex-1">
          <div className="mb-3 rounded bg-success px-3 py-1.5">
            <span className="text-sm font-semibold text-white">Faça</span>
          </div>
          <div className="rounded border border-border bg-background">
            {groupA.map((label) => (
              <Item key={label} density="medium" onClick={fn()}>
                <Row label={label} />
              </Item>
            ))}
            <Divider />
            {groupB.map((label) => (
              <Item key={label} density="medium" onClick={fn()}>
                <Row label={label} />
              </Item>
            ))}
          </div>
        </div>

        {/* Não faça: divider entre cada item */}
        <div className="flex-1">
          <div className="mb-3 rounded bg-destructive px-3 py-1.5">
            <span className="text-sm font-semibold text-white">Não faça</span>
          </div>
          <div className="rounded border border-border bg-background">
            {[...groupA, ...groupB].map((label) => (
              <Item key={label} density="medium" onClick={fn()} divider>
                <Row label={label} />
              </Item>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Comportamento hover:
 * - **Superfície interativa**: o item inteiro é clicável — hover cobre toda a área.
 * - **Elemento interativo**: o item é estático; apenas o botão interno tem hover.
 */
export const ComportamentoHover: Story = {
  render: () => {
    const Icon = () => (
      <span className="h-7 w-7 shrink-0 rounded bg-muted" aria-hidden="true" />
    )

    return (
      <div className="space-y-8 p-6">
        {/* Superfície interativa */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
            Superfície interativa — hover em toda a área
          </p>
          <p className="mb-3 text-xs text-muted-foreground">
            Use quando o item inteiro tem uma ação (navegação, seleção).
          </p>
          <div className="w-96 rounded border border-border bg-background">
            <Item density="medium" onClick={fn()} divider>
              <span className="flex items-center gap-3">
                <Icon />
                <span className="flex-1 text-sm">Item completamente interativo</span>
                <span className="text-xs text-muted-foreground">metadado</span>
              </span>
            </Item>
            {/* Simula hover visualmente */}
            <Item density="medium" active>
              <span className="flex items-center gap-3">
                <Icon />
                <span className="flex-1 text-sm">Item no estado hover (simulado)</span>
                <span className="text-xs text-primary">metadado</span>
              </span>
            </Item>
          </div>
        </div>

        {/* Elemento interativo */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
            Elemento interativo — hover apenas no botão interno
          </p>
          <p className="mb-3 text-xs text-muted-foreground">
            Use quando o item tem apenas um elemento com ação (ex: botão de ação rápida).
          </p>
          <div className="w-96 rounded border border-border bg-background">
            <Item density="medium" divider>
              <span className="flex items-center gap-3">
                <Icon />
                <span className="flex-1 text-sm">Item estático com ação isolada</span>
                {/* Botão interno: único elemento interativo */}
                <button
                  type="button"
                  aria-label="Ação rápida"
                  onClick={fn()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
              </span>
            </Item>
            <Item density="medium">
              <span className="flex items-center gap-3">
                <Icon />
                <span className="flex-1 text-sm">Outro item estático</span>
                <button
                  type="button"
                  aria-label="Ação rápida"
                  onClick={fn()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
              </span>
            </Item>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Estado selecionado com destaque forte — fundo primary, texto e ícone brancos.
 * Padrão de lista de seleção com feedback visual prominente.
 */
export const EstadoSelecionadoDestacado: Story = {
  render: () => {
    const [sel, setSel] = useState<number>(1)
    const items = [
      'Ministério das Relações Exteriores',
      'Palácio do Itamaraty',
      'Embaixada em Washington',
      'Consulado em Lisboa',
    ]

    return (
      <div className="w-96 space-y-6 p-6">
        {/* Seleção com destaque forte (fundo primary + texto branco) */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
            Selecionado — destaque forte
          </p>
          <div className="rounded border border-border bg-background">
            {items.map((label, i) => {
              const isSelected = sel === i
              return (
                <Item
                  key={label}
                  density="medium"
                  onClick={() => setSel(i)}
                  divider={i < items.length - 1}
                  className={isSelected ? 'bg-primary text-white hover:bg-primary' : ''}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded text-xs font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'}`}>
                      {i + 1}
                    </span>
                    <span className={`flex-1 text-sm font-medium ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {label}
                    </span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                </Item>
              )
            })}
          </div>
        </div>

        {/* Comparação: hover (esquerda) + selecionado (direita) */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
            Hover vs Selecionado
          </p>
          <div className="flex gap-3">
            <div className="flex-1 rounded border border-border bg-background">
              <Item density="medium" active>
                <span className="flex items-center gap-3">
                  <span className="h-7 w-7 shrink-0 rounded bg-muted" aria-hidden="true" />
                  <span className="flex-1 text-sm text-primary">Hover</span>
                </span>
              </Item>
            </div>
            <div className="flex-1 rounded border border-border bg-background">
              <Item density="medium" className="bg-primary hover:bg-primary">
                <span className="flex items-center gap-3">
                  <span className="h-7 w-7 shrink-0 rounded bg-white/20" aria-hidden="true" />
                  <span className="flex-1 text-sm text-white">Selecionado</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </Item>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/** Item com Divider como separador de grupos. */
export const ComDividerDeGrupo: Story = {
  render: () => (
    <div className="w-80 rounded border border-border bg-background">
      <Item onClick={fn()} divider>Início</Item>
      <Item onClick={fn()} divider>Documentos</Item>
      <Divider />
      <Item onClick={fn()} divider>Configurações</Item>
      <Item onClick={fn()} disabled>Ajuda (em breve)</Item>
    </div>
  ),
}
