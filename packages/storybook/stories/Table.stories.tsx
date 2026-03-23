import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  TableRoot,
  TableTitleBar,
  TableContextualBar,
  TableContextualAction,
  TableScrollArea,
  TableElement,
  TableHead,
  TableBody,
  TableHeaderCell,
  TableBodyRow,
  TableBodyCell,
  TableExpandCell,
  TableExpandedContentRow,
  TableFooterBar,
  TablePaginationBar,
} from '@ds/components'
import type { TableDensity, TableCellDividers, TableSortDirection } from '@ds/components'
import { cn } from '@ds/components'

const TABLE_DOCS_INTRO = `
Tabela de dados alinhada ao [**componente Table (Tabela)** do Padrão Digital do Governo](https://www.gov.br/ds/components/table?tab=visao-geral) (DS v3.7): anatomia, tokens de cor/tipografia/espaçamento, densidades e rolagem com **cabeçalho fixo** (\`thead\` sticky dentro de \`TableScrollArea\`).

### Anatomia (GovBR)
| Parte | Uso |
|---|---|
| **TableTitleBar** | Opcional — título + ações (até 4 ícones; mais ações via menu, recomendação GovBR) |
| **TableContextualBar** | Opcional — abaixo do título quando há linhas selecionadas |
| **TableHeaderCell** | Cabeçalho obrigatório; ordenação opcional (\`sortDirection\` / \`onSortClick\`) |
| **TableBodyRow** | Hover e estado selecionado |
| **TableExpandCell** + **TableExpandedContentRow** | Expandir linha e painel com sombra (PDF) |
| **TablePaginationBar** | Barra de paginação (footer) |

### Composição com rolagem vertical
Use \`TableRoot\` em coluna com altura máxima (ex.: \`className="flex max-h-[420px] flex-col"\`), depois título/contextual, \`TableScrollArea\` com \`className="min-h-0 flex-1"\`, e por último \`TablePaginationBar\`.

### Densidade
\`comfortable\` (baixa) | \`default\` (padrão) | \`compact\` (alta)

### Divisores
\`horizontal\` (padrão GovBR) | \`grid\` (linhas + colunas)
`.trim()

// ─────────────────────────────────────────────
// Dados de exemplo
// ─────────────────────────────────────────────

interface Servidor {
  id: number
  nome: string
  orgao: string
  cargo: string
  situacao: 'Ativo' | 'Inativo' | 'Cedido'
  dataPosse: string
}

const SERVIDORES: Servidor[] = [
  { id: 1, nome: 'Ana Paula Ferreira',  orgao: 'MRE',  cargo: 'Diplomata',               situacao: 'Ativo',   dataPosse: '15/03/2010' },
  { id: 2, nome: 'Carlos Eduardo Lima', orgao: 'MRE',  cargo: 'Oficial de Chancelaria',   situacao: 'Ativo',   dataPosse: '02/08/2015' },
  { id: 3, nome: 'Márcia Santos',       orgao: 'MF',   cargo: 'Analista',                 situacao: 'Cedido',  dataPosse: '10/01/2018' },
  { id: 4, nome: 'Roberto Almeida',     orgao: 'MRE',  cargo: 'Assistente de Chancelaria', situacao: 'Ativo',  dataPosse: '20/06/2020' },
  { id: 5, nome: 'Fernanda Oliveira',   orgao: 'MRE',  cargo: 'Diplomata',               situacao: 'Inativo', dataPosse: '05/11/2008' },
  { id: 6, nome: 'Paulo Rodrigues',     orgao: 'MJ',   cargo: 'Analista',                situacao: 'Cedido',  dataPosse: '14/04/2019' },
]

/** Lista longa para demonstrar cabeçalho sticky + rolagem só no corpo. */
const SERVIDORES_LONGOS: Servidor[] = [
  ...SERVIDORES,
  ...SERVIDORES.map((s, i) => ({ ...s, id: s.id + 100 + i, nome: `${s.nome} (cópia)` })),
  ...SERVIDORES.map((s, i) => ({ ...s, id: s.id + 200 + i, nome: `${s.nome} (2)` })),
]

const SITUACAO_COLOR: Record<Servidor['situacao'], string> = {
  Ativo:   'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success/10 text-success',
  Inativo: 'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive',
  Cedido:  'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-warning/20 text-[#967117]',
}

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof TableRoot> = {
  title: 'Components/Table',
  component: TableRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: TABLE_DOCS_INTRO },
    },
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['comfortable', 'default', 'compact'] satisfies TableDensity[],
      description: 'Espaçamento interno — PDF: baixa | padrão | alta',
      table: { category: 'Table' },
    },
    cellDividers: {
      control: 'select',
      options: ['horizontal', 'grid'] satisfies TableCellDividers[],
      description: 'Divisores de célula',
      table: { category: 'Table' },
    },
  },
}

export default meta
type Story = StoryObj<typeof TableRoot>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

const tableStickyShell = 'flex max-h-[min(420px,55vh)] flex-col'

const MAX_HEIGHT_BY_PRESET = {
  sm: 'flex max-h-[280px] flex-col',
  md: 'flex max-h-[min(420px,55vh)] flex-col',
  lg: 'flex max-h-[min(520px,70vh)] flex-col',
} as const

type MaxHeightPreset = keyof typeof MAX_HEIGHT_BY_PRESET

type TablePlaygroundArgs = React.ComponentProps<typeof TableRoot> & {
  /** Controles só do Playground (não são props do DOM do TableRoot). */
  playgroundTitle: string
  showTitleBar: boolean
  showTitleActions: boolean
  showContextualBar: boolean
  /** Volume de dados: curto, longo (rolagem + sticky) ou vazio. */
  dataVolume: 'short' | 'long' | 'empty'
  showDataPosseColumn: boolean
  bodyRowHover: boolean
  highlightFirstRowSelected: boolean
  /** Ordenação interativa nas três primeiras colunas (estado local). */
  interactiveSort: boolean
  showExpandOnFirstRows: boolean
  maxHeightPreset: MaxHeightPreset
  showPagination: boolean
  paginationPageSize: number
  showFooterBar: boolean
  footerHint: string
}

function PlaygroundView(args: TablePlaygroundArgs) {
  const {
    density,
    cellDividers,
    className,
    playgroundTitle,
    showTitleBar,
    showTitleActions,
    showContextualBar,
    dataVolume,
    showDataPosseColumn,
    bodyRowHover,
    highlightFirstRowSelected,
    interactiveSort,
    showExpandOnFirstRows,
    maxHeightPreset,
    showPagination,
    paginationPageSize,
    showFooterBar,
    footerHint,
  } = args

  const baseData =
    dataVolume === 'long' ? SERVIDORES_LONGOS : dataVolume === 'empty' ? [] : SERVIDORES

  type SortKey = keyof Pick<Servidor, 'nome' | 'orgao' | 'cargo'>
  const [sortKey, setSortKey] = useState<SortKey>('nome')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(paginationPageSize)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  React.useEffect(() => {
    setPageSize(paginationPageSize)
  }, [paginationPageSize])

  const sorted = React.useMemo(() => {
    if (!interactiveSort) return baseData
    return [...baseData].sort((a, b) => {
      const cmp = a[sortKey].localeCompare(b[sortKey], 'pt-BR')
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [baseData, interactiveSort, sortKey, sortDir])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const paged = showPagination
    ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sorted

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortDirFor = (key: SortKey): TableSortDirection =>
    interactiveSort && sortKey === key ? sortDir : false

  const shell = cn(MAX_HEIGHT_BY_PRESET[maxHeightPreset], className)
  const colCount =
    (showExpandOnFirstRows ? 1 : 0) + 3 + (showDataPosseColumn ? 1 : 0) + 1 /* situação */

  const titleActions = showTitleActions ? (
    <>
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded text-primary hover:bg-primary/10"
        aria-label="Filtrar"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded text-primary hover:bg-primary/10"
        aria-label="Exportar"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      </button>
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded text-primary hover:bg-primary/10"
        aria-label="Atualizar"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </button>
    </>
  ) : undefined

  return (
    <TableRoot density={density} cellDividers={cellDividers} className={shell}>
      {showTitleBar ? (
        <TableTitleBar title={playgroundTitle} actions={titleActions} />
      ) : null}
      {showContextualBar ? (
        <TableContextualBar open>
          <span>Barra contextual de exemplo (GovBR)</span>
          <TableContextualAction onClick={() => undefined}>Ação</TableContextualAction>
        </TableContextualBar>
      ) : null}
      <TableScrollArea className="min-h-0 flex-1">
        <TableElement>
          <TableHead>
            <tr>
              {showExpandOnFirstRows ? (
                <TableHeaderCell className="w-12">
                  <span className="sr-only">Expandir</span>
                </TableHeaderCell>
              ) : null}
              <TableHeaderCell
                sortDirection={interactiveSort ? sortDirFor('nome') : false}
                onSortClick={interactiveSort ? () => handleSort('nome') : undefined}
              >
                Nome
              </TableHeaderCell>
              <TableHeaderCell
                sortDirection={interactiveSort ? sortDirFor('orgao') : false}
                onSortClick={interactiveSort ? () => handleSort('orgao') : undefined}
              >
                Órgão
              </TableHeaderCell>
              <TableHeaderCell
                sortDirection={interactiveSort ? sortDirFor('cargo') : false}
                onSortClick={interactiveSort ? () => handleSort('cargo') : undefined}
              >
                Cargo
              </TableHeaderCell>
              <TableHeaderCell>Situação</TableHeaderCell>
              {showDataPosseColumn ? <TableHeaderCell>Data de posse</TableHeaderCell> : null}
            </tr>
          </TableHead>
          <TableBody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  Nenhum registro (volume &quot;vazio&quot;).
                </td>
              </tr>
            ) : (
              paged.map((s, index) => (
                <React.Fragment key={s.id}>
                  <TableBodyRow
                    selected={highlightFirstRowSelected && index === 0}
                    rowHover={bodyRowHover}
                  >
                    {showExpandOnFirstRows ? (
                      <TableExpandCell
                        expanded={expandedId === s.id}
                        onToggle={() =>
                          setExpandedId((id) => (id === s.id ? null : s.id))
                        }
                        aria-label={
                          expandedId === s.id
                            ? `Recolher detalhes de ${s.nome}`
                            : `Expandir detalhes de ${s.nome}`
                        }
                      />
                    ) : null}
                    <TableBodyCell>{s.nome}</TableBodyCell>
                    <TableBodyCell>{s.orgao}</TableBodyCell>
                    <TableBodyCell>{s.cargo}</TableBodyCell>
                    <TableBodyCell>
                      <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                    </TableBodyCell>
                    {showDataPosseColumn ? (
                      <TableBodyCell>{s.dataPosse}</TableBodyCell>
                    ) : null}
                  </TableBodyRow>
                  {showExpandOnFirstRows && expandedId === s.id ? (
                    <TableExpandedContentRow colSpan={colCount}>
                      <p className="mb-2 text-sm text-muted-foreground">Detalhe expandido</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Data de posse: {s.dataPosse}</li>
                        <li>ID interno: {s.id}</li>
                      </ul>
                    </TableExpandedContentRow>
                  ) : null}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </TableElement>
      </TableScrollArea>
      {showPagination && baseData.length > 0 ? (
        <TablePaginationBar
          page={safePage}
          pageCount={pageCount}
          totalItems={sorted.length}
          pageSize={pageSize}
          pageSizeOptions={[3, 5, 10, 25]}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPageSize(n)
            setPage(1)
          }}
        />
      ) : null}
      {showFooterBar ? (
        <TableFooterBar>
          <span className="text-sm text-muted-foreground">{footerHint}</span>
        </TableFooterBar>
      ) : null}
    </TableRoot>
  )
}

export const Playground: StoryObj<TablePlaygroundArgs> = {
  render: (args) => <PlaygroundView {...args} />,
  args: {
    density: 'default',
    cellDividers: 'horizontal',
    playgroundTitle: 'Servidores — Playground',
    showTitleBar: true,
    showTitleActions: true,
    showContextualBar: false,
    dataVolume: 'short',
    showDataPosseColumn: true,
    bodyRowHover: true,
    highlightFirstRowSelected: false,
    interactiveSort: false,
    showExpandOnFirstRows: false,
    maxHeightPreset: 'md',
    showPagination: false,
    paginationPageSize: 5,
    showFooterBar: false,
    footerHint: 'Rodapé opcional — resumo ou ações secundárias.',
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['comfortable', 'default', 'compact'] satisfies TableDensity[],
      description: 'Densidade das células (PDF GovBR)',
      table: { category: 'TableRoot' },
    },
    cellDividers: {
      control: 'select',
      options: ['horizontal', 'grid'] satisfies TableCellDividers[],
      description: 'Divisores horizontais ou grade completa',
      table: { category: 'TableRoot' },
    },
    className: {
      control: 'text',
      description: 'Classes extras no container (mescla com altura do preset)',
      table: { category: 'TableRoot' },
    },
    playgroundTitle: {
      control: 'text',
      description: 'Texto da barra de título',
      table: { category: 'Playground' },
    },
    showTitleBar: {
      control: 'boolean',
      table: { category: 'Playground' },
    },
    showTitleActions: {
      control: 'boolean',
      description: 'Três ícones de ação na barra de título',
      table: { category: 'Playground' },
    },
    showContextualBar: {
      control: 'boolean',
      description: 'Barra contextual fixa de exemplo (abaixo do título)',
      table: { category: 'Playground' },
    },
    dataVolume: {
      control: 'inline-radio',
      options: ['short', 'long', 'empty'],
      description: 'Quantidade de linhas',
      table: { category: 'Playground' },
    },
    showDataPosseColumn: {
      control: 'boolean',
      table: { category: 'Playground' },
    },
    bodyRowHover: {
      control: 'boolean',
      description: 'Hover nas linhas do corpo',
      table: { category: 'Playground' },
    },
    highlightFirstRowSelected: {
      control: 'boolean',
      description: 'Primeira linha visível em estado selecionado',
      table: { category: 'Playground' },
    },
    interactiveSort: {
      control: 'boolean',
      description: 'Ordenação clicável em Nome, Órgão e Cargo',
      table: { category: 'Playground' },
    },
    showExpandOnFirstRows: {
      control: 'boolean',
      description: 'Coluna expandir + painel com sombra',
      table: { category: 'Playground' },
    },
    maxHeightPreset: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Altura máxima do bloco (rolagem + thead sticky)',
      table: { category: 'Playground' },
    },
    showPagination: {
      control: 'boolean',
      table: { category: 'Playground' },
    },
    paginationPageSize: {
      control: { type: 'number', min: 3, max: 25, step: 1 },
      description: 'Itens por página (tamanho inicial)',
      if: { arg: 'showPagination', eq: true },
      table: { category: 'Playground' },
    },
    showFooterBar: {
      control: 'boolean',
      table: { category: 'Playground' },
    },
    footerHint: {
      control: 'text',
      if: { arg: 'showFooterBar', eq: true },
      table: { category: 'Playground' },
    },
  },
}

export const ComOrdenacao: Story = {
  name: 'Com ordenação',
  render: () => {
    type SortKey = keyof Pick<Servidor, 'nome' | 'orgao' | 'cargo'>
    const [sortKey, setSortKey] = useState<SortKey>('nome')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

    const handleSort = (key: SortKey) => {
      if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      else { setSortKey(key); setSortDir('asc') }
    }

    const sorted = [...SERVIDORES].sort((a, b) => {
      const cmp = a[sortKey].localeCompare(b[sortKey], 'pt-BR')
      return sortDir === 'asc' ? cmp : -cmp
    })

    const dir = (key: SortKey): TableSortDirection =>
      sortKey === key ? sortDir : false

    return (
      <TableRoot className={tableStickyShell}>
        <TableTitleBar title="Servidores — ordenação por coluna" />
        <TableScrollArea className="min-h-0 flex-1">
          <TableElement>
            <TableHead>
              <tr>
                <TableHeaderCell sortDirection={dir('nome')} onSortClick={() => handleSort('nome')}>Nome</TableHeaderCell>
                <TableHeaderCell sortDirection={dir('orgao')} onSortClick={() => handleSort('orgao')}>Órgão</TableHeaderCell>
                <TableHeaderCell sortDirection={dir('cargo')} onSortClick={() => handleSort('cargo')}>Cargo</TableHeaderCell>
                <TableHeaderCell>Situação</TableHeaderCell>
                <TableHeaderCell>Data de posse</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {sorted.map((s) => (
                <TableBodyRow key={s.id}>
                  <TableBodyCell>{s.nome}</TableBodyCell>
                  <TableBodyCell>{s.orgao}</TableBodyCell>
                  <TableBodyCell>{s.cargo}</TableBodyCell>
                  <TableBodyCell>
                    <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                  </TableBodyCell>
                  <TableBodyCell>{s.dataPosse}</TableBodyCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </TableElement>
        </TableScrollArea>
      </TableRoot>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Clique no cabeçalho para ordenar; segundo clique inverte a direção.' },
    },
  },
}

export const ComSelecao: Story = {
  name: 'Com seleção de linhas',
  render: () => {
    const [selected, setSelected] = useState<Set<number>>(new Set())

    const toggleAll = () => {
      if (selected.size === SERVIDORES.length) setSelected(new Set())
      else setSelected(new Set(SERVIDORES.map((s) => s.id)))
    }

    const toggle = (id: number) =>
      setSelected((prev) => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })

    const allSelected = selected.size === SERVIDORES.length
    const someSelected = selected.size > 0 && !allSelected

    return (
      <TableRoot className={tableStickyShell}>
        <TableTitleBar title="Servidores — seleção" />
        <TableContextualBar open={selected.size > 0}>
          <span className="font-semibold">{selected.size} selecionado(s)</span>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white"
              onClick={() => setSelected(new Set())}
            >
              Limpar seleção
            </button>
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white">
              Exportar selecionados
            </button>
          </div>
        </TableContextualBar>
        <TableScrollArea className="min-h-0 flex-1">
          <TableElement>
            <TableHead>
              <tr>
                <TableHeaderCell className="w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected }}
                    onChange={toggleAll}
                    aria-label="Selecionar todos"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </TableHeaderCell>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>Órgão</TableHeaderCell>
                <TableHeaderCell>Cargo</TableHeaderCell>
                <TableHeaderCell>Situação</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {SERVIDORES.map((s) => (
                <TableBodyRow key={s.id} selected={selected.has(s.id)}>
                  <TableBodyCell>
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggle(s.id)}
                      aria-label={`Selecionar ${s.nome}`}
                      className={cn(
                        'h-4 w-4 rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        selected.has(s.id)
                          ? 'border-white/80 bg-primary accent-white'
                          : 'border-gray-300 text-primary accent-primary',
                      )}
                    />
                  </TableBodyCell>
                  <TableBodyCell>{s.nome}</TableBodyCell>
                  <TableBodyCell>{s.orgao}</TableBodyCell>
                  <TableBodyCell>{s.cargo}</TableBodyCell>
                  <TableBodyCell>
                    <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                  </TableBodyCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </TableElement>
        </TableScrollArea>
        <TableFooterBar>
          <span className="text-sm text-gray-500">
            {selected.size} de {SERVIDORES.length} selecionados
          </span>
        </TableFooterBar>
      </TableRoot>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Seleção individual e em massa com barra contextual GovBR.' },
    },
  },
}

export const ComPaginacao: Story = {
  name: 'Com paginação',
  render: () => {
    const PAGE_SIZE = 3
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE)
    const pageCount = Math.max(1, Math.ceil(SERVIDORES.length / pageSize))
    const pageData = SERVIDORES.slice((page - 1) * pageSize, page * pageSize)

    return (
      <TableRoot className={tableStickyShell}>
        <TableTitleBar title="Servidores — paginação" />
        <TableScrollArea className="min-h-0 flex-1">
          <TableElement>
            <TableHead>
              <tr>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>Órgão</TableHeaderCell>
                <TableHeaderCell>Cargo</TableHeaderCell>
                <TableHeaderCell>Situação</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {pageData.map((s) => (
                <TableBodyRow key={s.id}>
                  <TableBodyCell>{s.nome}</TableBodyCell>
                  <TableBodyCell>{s.orgao}</TableBodyCell>
                  <TableBodyCell>{s.cargo}</TableBodyCell>
                  <TableBodyCell>
                    <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                  </TableBodyCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </TableElement>
        </TableScrollArea>
        <TablePaginationBar
          page={page}
          pageCount={pageCount}
          totalItems={SERVIDORES.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(n) => { setPageSize(n); setPage(1) }}
        />
      </TableRoot>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Barra de paginação completa GovBR — navegação por página.' },
    },
  },
}

export const Densidades: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['comfortable', 'default', 'compact'] as const).map((density) => (
        <div key={density}>
          <p className="mb-2 text-xs uppercase tracking-wide text-gray-400">{density}</p>
          <TableRoot density={density} className="max-h-56 flex flex-col">
            <TableScrollArea className="min-h-0 flex-1">
              <TableElement>
                <TableHead>
                  <tr>
                    <TableHeaderCell>Nome</TableHeaderCell>
                    <TableHeaderCell>Cargo</TableHeaderCell>
                    <TableHeaderCell>Situação</TableHeaderCell>
                  </tr>
                </TableHead>
                <TableBody>
                  {SERVIDORES.slice(0, 3).map((s) => (
                    <TableBodyRow key={s.id}>
                      <TableBodyCell>{s.nome}</TableBodyCell>
                      <TableBodyCell>{s.cargo}</TableBodyCell>
                      <TableBodyCell>
                        <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                      </TableBodyCell>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </TableElement>
            </TableScrollArea>
          </TableRoot>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Três densidades disponíveis: comfortable, default e compact.' },
    },
  },
}

export const DivisoresGrid: Story = {
  name: 'Divisores em grade',
  render: () => (
    <TableRoot cellDividers="grid" className={tableStickyShell}>
      <TableTitleBar title="Servidores — grade completa" />
      <TableScrollArea className="min-h-0 flex-1">
        <TableElement>
          <TableHead>
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Órgão</TableHeaderCell>
              <TableHeaderCell>Cargo</TableHeaderCell>
              <TableHeaderCell>Situação</TableHeaderCell>
              <TableHeaderCell>Data de posse</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {SERVIDORES.map((s) => (
              <TableBodyRow key={s.id}>
                <TableBodyCell>{s.nome}</TableBodyCell>
                <TableBodyCell>{s.orgao}</TableBodyCell>
                <TableBodyCell>{s.cargo}</TableBodyCell>
                <TableBodyCell>
                  <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                </TableBodyCell>
                <TableBodyCell>{s.dataPosse}</TableBodyCell>
              </TableBodyRow>
            ))}
          </TableBody>
        </TableElement>
      </TableScrollArea>
    </TableRoot>
  ),
  parameters: {
    docs: {
      description: { story: '`cellDividers="grid"` adiciona divisores verticais entre as colunas.' },
    },
  },
}

export const TabelaVazia: Story = {
  name: 'Tabela vazia',
  render: () => (
    <TableRoot className={tableStickyShell}>
      <TableTitleBar title="Servidores" />
      <TableScrollArea className="min-h-0 flex-1">
        <TableElement>
          <TableHead>
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Órgão</TableHeaderCell>
              <TableHeaderCell>Cargo</TableHeaderCell>
              <TableHeaderCell>Situação</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                Nenhum registro encontrado.
              </td>
            </tr>
          </TableBody>
        </TableElement>
      </TableScrollArea>
    </TableRoot>
  ),
  parameters: {
    docs: {
      description: { story: 'Estado vazio — colSpan no único `<td>` centraliza a mensagem.' },
    },
  },
}

export const RolagemCabeçalhoSticky: Story = {
  name: 'Rolagem — cabeçalho sticky',
  render: () => (
    <TableRoot className={tableStickyShell}>
      <TableTitleBar title="Lista longa — thead permanece visível ao rolar" />
      <TableScrollArea className="min-h-0 flex-1">
        <TableElement>
          <TableHead>
            <tr>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Órgão</TableHeaderCell>
              <TableHeaderCell>Cargo</TableHeaderCell>
              <TableHeaderCell>Situação</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {SERVIDORES_LONGOS.map((s) => (
              <TableBodyRow key={s.id}>
                <TableBodyCell>{s.nome}</TableBodyCell>
                <TableBodyCell>{s.orgao}</TableBodyCell>
                <TableBodyCell>{s.cargo}</TableBodyCell>
                <TableBodyCell>
                  <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                </TableBodyCell>
              </TableBodyRow>
            ))}
          </TableBody>
        </TableElement>
      </TableScrollArea>
    </TableRoot>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Com `TableRoot` em coluna com altura limitada e `TableScrollArea` flexível, só o corpo rola; o `thead` usa `position: sticky` (GovBR — rolagem vertical).',
      },
    },
  },
}

export const AgrupamentoColunas: Story = {
  name: 'Agrupamento de colunas',
  render: () => (
    <TableRoot className={tableStickyShell}>
      <TableTitleBar title="Indicadores — cabeçalhos em dois níveis" />
      <TableScrollArea className="min-h-0 flex-1">
        <TableElement>
          <TableHead>
            <tr>
              <TableHeaderCell rowSpan={2} className="align-bottom">
                Região
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} className="text-center">
                2023
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} className="text-center">
                2024
              </TableHeaderCell>
            </tr>
            <tr>
              <TableHeaderCell>Meta</TableHeaderCell>
              <TableHeaderCell>Realizado</TableHeaderCell>
              <TableHeaderCell>Meta</TableHeaderCell>
              <TableHeaderCell>Realizado</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            <TableBodyRow>
              <TableBodyCell>Norte</TableBodyCell>
              <TableBodyCell>120</TableBodyCell>
              <TableBodyCell>118</TableBodyCell>
              <TableBodyCell>125</TableBodyCell>
              <TableBodyCell>130</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>Sul</TableBodyCell>
              <TableBodyCell>90</TableBodyCell>
              <TableBodyCell>92</TableBodyCell>
              <TableBodyCell>95</TableBodyCell>
              <TableBodyCell>93</TableBodyCell>
            </TableBodyRow>
          </TableBody>
        </TableElement>
      </TableScrollArea>
    </TableRoot>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabela complexa com `colSpan` / `rowSpan` no `<th>` (W3C *Tables with irregular headers*; usar com parcimônia e `scope` adequado).',
      },
    },
  },
}

export const ExpandirLinha: Story = {
  name: 'Expandir linha',
  render: () => {
    const [open, setOpen] = useState<number | null>(null)
    const colCount = 5

    return (
      <TableRoot className={tableStickyShell}>
        <TableTitleBar title="Servidores — detalhe expandido" />
        <TableScrollArea className="min-h-0 flex-1">
          <TableElement>
            <TableHead>
              <tr>
                <TableHeaderCell className="w-12">
                  <span className="sr-only">Expandir linha</span>
                </TableHeaderCell>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>Órgão</TableHeaderCell>
                <TableHeaderCell>Cargo</TableHeaderCell>
                <TableHeaderCell>Situação</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {SERVIDORES.slice(0, 4).map((s) => (
                <React.Fragment key={s.id}>
                  <TableBodyRow>
                    <TableExpandCell
                      expanded={open === s.id}
                      onToggle={() => setOpen((v) => (v === s.id ? null : s.id))}
                      aria-label={open === s.id ? 'Recolher detalhes' : 'Expandir detalhes'}
                    />
                    <TableBodyCell>{s.nome}</TableBodyCell>
                    <TableBodyCell>{s.orgao}</TableBodyCell>
                    <TableBodyCell>{s.cargo}</TableBodyCell>
                    <TableBodyCell>
                      <span className={SITUACAO_COLOR[s.situacao]}>{s.situacao}</span>
                    </TableBodyCell>
                  </TableBodyRow>
                  {open === s.id ? (
                    <TableExpandedContentRow colSpan={colCount}>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Data de posse: {s.dataPosse}</li>
                        <li>Conteúdo adicional em lista, conforme recomendação GovBR para painel expandido.</li>
                      </ul>
                    </TableExpandedContentRow>
                  ) : null}
                </React.Fragment>
              ))}
            </TableBody>
          </TableElement>
        </TableScrollArea>
      </TableRoot>
    )
  },
  parameters: {
    docs: {
      description: {
        story: '`TableExpandCell` + `TableExpandedContentRow` aplicam sombra no painel expandido (especificação GovBR).',
      },
    },
  },
}
