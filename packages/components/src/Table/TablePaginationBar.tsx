'use client'

import * as React from 'react'
import { cn } from '../utils/cn'
import { useItamaratyTableSection, useTableColorsInTable } from './table-context'
import { getTableCellPadding } from './table-cell-padding'

export interface TablePaginationBarLabels {
  show: string
  page: string
  itemsRange: (from: number, to: number, total: number) => string
  prev: string
  next: string
}

const defaultLabels: TablePaginationBarLabels = {
  show: 'Exibir',
  page: 'Página',
  itemsRange: (from, to, total) => `${from}-${to} de ${total} itens`,
  prev: 'Página anterior',
  next: 'Próxima página',
}

export interface TablePaginationBarProps {
  page: number
  pageCount: number
  totalItems: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  labels?: Partial<TablePaginationBarLabels>
  className?: string
}

function PaginationVDivider({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="mx-3 inline-block h-5 w-px shrink-0 self-center"
      style={{ backgroundColor: color }}
    />
  )
}

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-[1.35rem] w-[1.35rem]" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-[1.35rem] w-[1.35rem]" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function TablePaginationBar({
  page,
  pageCount,
  totalItems,
  pageSize,
  pageSizeOptions = [5, 10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  labels: labelsProp,
  className,
}: TablePaginationBarProps) {
  const c = useTableColorsInTable()
  const { density } = useItamaratyTableSection()
  const pad = getTableCellPadding(null, density, 'footer')
  const labels = { ...defaultLabels, ...labelsProp }

  const safePageCount = Math.max(1, pageCount)
  const safePage = Math.min(Math.max(1, page), safePageCount)
  const from = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, totalItems)

  const pageOptions = React.useMemo(
    () => Array.from({ length: safePageCount }, (_, i) => i + 1),
    [safePageCount],
  )

  const selectClass = cn(
    'cursor-pointer border-0 bg-transparent py-0 pl-0 pr-1 text-base font-medium leading-normal',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  )

  const navBtnClass = cn(
    'inline-flex items-center justify-center rounded p-1.5 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
  )

  return (
    <nav
      role="navigation"
      aria-label="Paginação da tabela"
      className={cn(
        'flex min-h-12 flex-nowrap items-center gap-0 text-base',
        className,
      )}
      style={{
        ...pad,
        borderTop: `1px solid ${c.divider}`,
        backgroundColor: c.paginationBarBg,
        color: c.paginationLabel,
      }}
    >
      <div className="flex min-w-0 flex-nowrap items-center gap-2">
        <span className="whitespace-nowrap text-base font-normal leading-normal" style={{ color: c.paginationLabel }}>
          {labels.show}
        </span>
        <select
          aria-label={labels.show}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={selectClass}
          style={{
            minWidth: 40,
            color: c.paginationSelectFg,
          }}
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <PaginationVDivider color={c.paginationSep} />
        <span className="whitespace-nowrap text-base font-normal leading-normal" style={{ color: c.paginationMuted }}>
          {labels.itemsRange(from, to, totalItems)}
        </span>
      </div>

      <div className="min-w-2 flex-1" />

      <div className="flex shrink-0 flex-nowrap items-center gap-2">
        <span className="whitespace-nowrap text-base font-normal leading-normal" style={{ color: c.paginationLabel }}>
          {labels.page}
        </span>
        <select
          aria-label={labels.page}
          value={safePage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className={selectClass}
          style={{
            minWidth: 48,
            color: c.paginationSelectFg,
          }}
        >
          {pageOptions.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <PaginationVDivider color={c.paginationSep} />
        <div className="ml-0.5 flex shrink-0 items-center">
          <button
            type="button"
            aria-label={labels.prev}
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
            className={navBtnClass}
            style={{ color: c.paginationNavIcon }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = c.paginationNavHoverBg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={safePage >= safePageCount}
            onClick={() => onPageChange(safePage + 1)}
            className={navBtnClass}
            style={{ color: c.paginationNavIcon }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = c.paginationNavHoverBg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </nav>
  )
}
