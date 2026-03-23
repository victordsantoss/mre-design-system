import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  TableRoot,
  TableTitleBar,
  TableContextualBar,
  TableScrollArea,
  TableElement,
  TableHead,
  TableBody,
  TableHeaderCell,
  TableBodyRow,
  TableBodyCell,
  TableFooterBar,
  TablePaginationBar,
} from '@ds/components'
import type { TableDensity, TableCellDividers, TableSortDirection } from '@ds/components'

const TABLE_DOCS_INTRO = `
Tabela de dados alinhada ao [**componente Tabela** do Design System do Governo](https://www.gov.br/ds/comum-nacional/componentes/tabela), com anatomia completa, listagens, paginação, seleção e acessibilidade (DS v3.7).

### Anatomia (GovBR)
| Parte | Uso |
|---|---|
| **TableTitleBar** | Opcional — título + ações (busca, exportar etc.) |
| **TableContextualBar** | Opcional — aparece com linhas selecionadas; ações em massa |
| **TableHeaderCell** | Cabeçalho com ordenação e scope="col" |
| **TableBodyRow** | Linha com hover e estado selecionado (azul médio) |
| **TablePaginationBar** | Rodapé de paginação completo GovBR |

### Densidade
\`comfortable\` (mais ar) | \`default\` | \`compact\` (alta densidade)

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

export const Playground: Story = {
  render: (args) => (
    <TableRoot {...args}>
      <TableTitleBar title="Servidores" />
      <TableScrollArea>
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
  args: {
    density: 'default',
    cellDividers: 'horizontal',
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
      <TableRoot>
        <TableTitleBar title="Servidores — ordenação por coluna" />
        <TableScrollArea>
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
      <TableRoot>
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
        <TableScrollArea>
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
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
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
      <TableRoot>
        <TableTitleBar title="Servidores — paginação" />
        <TableScrollArea>
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
          <TableRoot density={density}>
            <TableScrollArea>
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
    <TableRoot cellDividers="grid">
      <TableTitleBar title="Servidores — grade completa" />
      <TableScrollArea>
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
    <TableRoot>
      <TableTitleBar title="Servidores" />
      <TableScrollArea>
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
              <td colSpan={4} className="py-12 text-center text-sm text-gray-400">
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
