'use client'

/**
 * Table — Padrão Digital de Governo (GovBR) v3.7
 * Anatomia: barra de título, barra contextual, header, linhas, colunas, paginação (composta).
 * Rolagem: `TableScrollArea` + `thead` sticky; título/contextual/paginação ficam fora da área rolável.
 */
import * as React from 'react'
import { shadows } from '@ds/tokens'
import { cn } from '../utils/cn'
import { alpha } from '../utils/color-alpha'
import { useTableDsColors, getTableColors } from './table-ds-colors'
import { getTableCellPadding } from './table-cell-padding'
import {
  TableSectionContext,
  TableColorsContext,
  TableRowSelectionContext,
  useItamaratyTableSection,
  useTableSection,
  useTableColorsInTable,
  useTableRowSelected,
} from './table-context'
import type { TableCellDividers, TableDensity } from './types'

export type { TableDensity, TableCellDividers, DsTableColors, TablePaddingSlot } from './types'
export { getTableCellPadding, getTableColors }
export {
  TableSectionContext,
  TableColorsContext,
  TableRowSelectionContext,
  useItamaratyTableSection,
  useTableSection,
  useTableRowSelected,
  DEFAULT_TABLE_SECTION,
} from './table-context'
export type { TableSectionState } from './table-context'

export type TableSortDirection = 'asc' | 'desc' | false

const GOV_FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px] focus-visible:ring-offset-background'

/** Sombra do painel expandido (PDF: blur ~6px, offset 1px, camada elevada). */
const TABLE_EXPAND_SHADOW = shadows[3] ?? '0 1px 6px rgba(0,0,0,0.12)'

// ─── TableRoot ─────────────────────────────────────────

export interface TableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: TableDensity
  cellDividers?: TableCellDividers
}

const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>(function TableRoot(
  { density = 'default', cellDividers = 'horizontal', children, className, style, ...rest },
  ref,
) {
  const colors = useTableDsColors()
  return (
    <TableSectionContext.Provider value={{ density, cellDividers }}>
      <TableColorsContext.Provider value={colors}>
        <div
          ref={ref}
          className={cn(
            'flex min-h-0 min-w-0 flex-col overflow-hidden font-body text-base leading-normal text-foreground',
            className,
          )}
          style={{
            border: `1px solid ${colors.dividerStrong}`,
            borderRadius: 4,
            backgroundColor: colors.outerBg,
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      </TableColorsContext.Provider>
    </TableSectionContext.Provider>
  )
})
TableRoot.displayName = 'TableRoot'

// ─── TableTitleBar ─────────────────────────────────────────

export interface TableTitleBarProps {
  title: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function TableTitleBar({ title, actions, className }: TableTitleBarProps) {
  const c = useTableColorsInTable()
  const { density } = useItamaratyTableSection()
  const pad = getTableCellPadding(null, density, 'title')

  return (
    <div
      className={cn('flex shrink-0 items-center justify-between gap-4', className)}
      style={{
        ...pad,
        borderBottom: `1px solid ${c.divider}`,
        backgroundColor: c.titleBg,
        color: c.titleFg,
      }}
    >
      <span
        className="min-w-0 flex-1 truncate font-heading text-up-01 font-semibold leading-snug"
        style={{ color: c.titleFg }}
      >
        {title}
      </span>
      {actions ? (
        <div className="flex shrink-0 items-center gap-1 [&_button]:text-primary">{actions}</div>
      ) : null}
    </div>
  )
}

// ─── TableContextualBar ─────────────────────────────────────────

export interface TableContextualBarProps {
  open: boolean
  children: React.ReactNode
  className?: string
}

function TableContextualBar({ open, children, className }: TableContextualBarProps) {
  const c = useTableColorsInTable()
  const { density } = useItamaratyTableSection()
  const pad = getTableCellPadding(null, density, 'title')

  if (!open) return null

  return (
    <div
      className={cn(
        'flex w-full min-w-0 shrink-0 flex-wrap items-center justify-between gap-4 font-body text-base font-medium',
        '[&>*:first-child]:min-w-0 [&>*:first-child]:flex-1 [&>*:not(:first-child)]:shrink-0',
        className,
      )}
      style={{
        ...pad,
        borderBottom: `1px solid ${c.contextualBorderBottom}`,
        backgroundColor: c.contextualBg,
        color: c.contextualFg,
      }}
    >
      {children}
    </div>
  )
}

// ─── TableContextualAction ─────────────────────────────────────────

export interface TableContextualActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode
  children: React.ReactNode
}

const TableContextualAction = React.forwardRef<HTMLButtonElement, TableContextualActionProps>(
  function TableContextualAction(
    { startIcon, children, type = 'button', className, disabled, ...rest },
    ref,
  ) {
    const c = useTableColorsInTable()
    const fg = c.contextualFg
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex shrink-0 items-center gap-2 rounded border-0 bg-transparent p-1 font-inherit text-base font-medium',
          GOV_FOCUS_RING,
          className,
        )}
        style={{
          color: fg,
          WebkitTextFillColor: fg,
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
        {...rest}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.backgroundColor = alpha(fg, 0.12)
          rest.onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          rest.onMouseLeave?.(e)
        }}
      >
        {startIcon ? <span className="shrink-0 [&_svg]:text-current">{startIcon}</span> : null}
        {children}
      </button>
    )
  },
)
TableContextualAction.displayName = 'TableContextualAction'

// ─── TableScrollArea ─────────────────────────────────────────

export interface TableScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string
}

const TableScrollArea = React.forwardRef<HTMLDivElement, TableScrollAreaProps>(
  function TableScrollArea({ maxHeight, style, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('min-h-0 min-w-0 flex-1 overflow-auto', className)}
        style={{ maxHeight, ...style }}
        {...rest}
      >
        <div className="inline-block min-w-full align-middle">{children}</div>
      </div>
    )
  },
)
TableScrollArea.displayName = 'TableScrollArea'

// ─── TableElement ─────────────────────────────────────────

export type TableElementProps = React.TableHTMLAttributes<HTMLTableElement>

const TableElement = React.forwardRef<HTMLTableElement, TableElementProps>(function TableElement(
  { className, ...rest },
  ref,
) {
  return <table ref={ref} className={cn('w-full min-w-max border-collapse text-left', className)} {...rest} />
})
TableElement.displayName = 'TableElement'

// ─── TableHead / TableBody ─────────────────────────────────────────

const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableHead({ className, style, ...rest }, ref) {
    const c = useTableColorsInTable()
    return (
      <thead
        ref={ref}
        className={cn('sticky top-0 z-[1]', className)}
        style={{
          backgroundColor: c.headerBg,
          boxShadow: `0 1px 0 0 ${c.divider}`,
          ...style,
        }}
        {...rest}
      />
    )
  },
)
TableHead.displayName = 'TableHead'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...rest }, ref) {
    return <tbody ref={ref} className={cn(className)} {...rest} />
  },
)
TableBody.displayName = 'TableBody'

// ─── Sort icons ─────────────────────────────────────────

function IconSortAsc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <polyline points="6 14 12 8 18 14" />
    </svg>
  )
}

function IconSortDesc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <polyline points="6 10 12 16 18 10" />
    </svg>
  )
}

function IconSortNeutral() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 opacity-50"
      aria-hidden
    >
      <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
    </svg>
  )
}

// ─── TableHeaderCell ─────────────────────────────────────────

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: TableSortDirection
  onSortClick?: () => void
}

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell(
    { sortable = false, sortDirection = false, onSortClick, children, className, style, ...rest },
    ref,
  ) {
    const c = useTableColorsInTable()
    const { density, cellDividers } = useItamaratyTableSection()
    const pad = getTableCellPadding(null, density, 'header')
    const showV = cellDividers === 'grid'
    const isSorted = sortDirection === 'asc' || sortDirection === 'desc'
    const isSortable = sortable || typeof onSortClick === 'function'

    const headerFg = isSorted ? c.headerSortedFg : isSortable ? c.headerTextSortable : c.headerTextPlain
    const headerCellBg = isSorted ? c.headerSortedBg : c.headerBg

    const sortControl = isSortable ? (
      <button
        type="button"
        onClick={onSortClick}
        className={cn(
          'inline-flex w-full min-w-0 items-center gap-1 rounded-sm text-left font-heading text-base font-semibold',
          onSortClick ? 'cursor-pointer' : 'cursor-default',
          GOV_FOCUS_RING,
        )}
        style={{ color: headerFg }}
      >
        <span className="min-w-0 truncate">{children}</span>
        {sortDirection === 'asc' ? (
          <IconSortAsc />
        ) : sortDirection === 'desc' ? (
          <IconSortDesc />
        ) : (
          <IconSortNeutral />
        )}
      </button>
    ) : (
      <span className="font-heading text-base font-semibold" style={{ color: headerFg }}>
        {children}
      </span>
    )

    return (
      <th
        ref={ref}
        scope="col"
        {...rest}
        className={cn('align-middle', showV && 'border-r last:border-r-0', className)}
        style={{
          ...pad,
          borderBottom: `2px solid ${c.divider}`,
          backgroundColor: headerCellBg,
          ...(showV ? { borderRightWidth: 1, borderRightStyle: 'solid', borderRightColor: c.divider } : {}),
          ...style,
        }}
      >
        {sortControl}
      </th>
    )
  },
)
TableHeaderCell.displayName = 'TableHeaderCell'

// ─── TableBodyRow ─────────────────────────────────────────

export interface TableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  rowHover?: boolean
}

const TableBodyRow = React.forwardRef<HTMLTableRowElement, TableBodyRowProps>(function TableBodyRow(
  { selected = false, rowHover = true, className, style, children, ...rest },
  ref,
) {
  const c = useTableColorsInTable()
  return (
    <TableRowSelectionContext.Provider value={selected}>
      <tr
        ref={ref}
        {...rest}
        className={cn('transition-colors duration-100', className)}
        style={{
          backgroundColor: selected ? c.rowSelectedBg : c.rowBg,
          color: selected ? c.rowSelectedFg : c.rowFg,
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!selected && rowHover) e.currentTarget.style.backgroundColor = c.rowHover
          rest.onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          if (!selected && rowHover) e.currentTarget.style.backgroundColor = c.rowBg
          rest.onMouseLeave?.(e)
        }}
      >
        {children}
      </tr>
    </TableRowSelectionContext.Provider>
  )
})
TableBodyRow.displayName = 'TableBodyRow'

// ─── TableBodyCell ─────────────────────────────────────────

export type TableBodyCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

const TableBodyCell = React.forwardRef<HTMLTableCellElement, TableBodyCellProps>(function TableBodyCell(
  { className, style, ...rest },
  ref,
) {
  const c = useTableColorsInTable()
  const { density, cellDividers } = useItamaratyTableSection()
  const rowSelected = useTableRowSelected()
  const pad = getTableCellPadding(null, density, 'row')
  const showV = cellDividers === 'grid'
  const fg = rowSelected ? c.rowSelectedFg : c.rowFg

  return (
    <td
      ref={ref}
      {...rest}
      className={cn(
        'align-middle font-body text-base font-medium',
        rowSelected &&
          'text-inherit [&_a]:!text-inherit [&_button]:!text-inherit [&_span]:!text-inherit [&_svg]:!text-current',
        showV && 'border-r last:border-r-0',
        className,
      )}
      style={{
        ...pad,
        borderBottom: `1px solid ${c.divider}`,
        color: fg,
        ...(showV ? { borderRightWidth: 1, borderRightStyle: 'solid', borderRightColor: c.divider } : {}),
        ...style,
      }}
    />
  )
})
TableBodyCell.displayName = 'TableBodyCell'

// ─── TableExpandCell ─────────────────────────────────────────

function IconChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function IconChevronUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export interface TableExpandCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children'> {
  expanded: boolean
  onToggle: () => void
  'aria-label': string
}

const TableExpandCell = React.forwardRef<HTMLTableCellElement, TableExpandCellProps>(function TableExpandCell(
  { expanded, onToggle, 'aria-label': ariaLabel, className, style, ...rest },
  ref,
) {
  const c = useTableColorsInTable()
  const { density, cellDividers } = useItamaratyTableSection()
  const rowSelected = useTableRowSelected()
  const pad = getTableCellPadding(null, density, 'row')
  const showV = cellDividers === 'grid'
  const iconFg = rowSelected ? c.rowSelectedFg : c.rowIconColor

  return (
    <td
      ref={ref}
      {...rest}
      className={cn('w-12 align-middle', rowSelected && 'text-inherit', showV && 'border-r', className)}
      style={{
        ...pad,
        borderBottom: `1px solid ${c.divider}`,
        color: iconFg,
        ...(showV ? { borderRightWidth: 1, borderRightStyle: 'solid', borderRightColor: c.divider } : {}),
        ...style,
      }}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-label={ariaLabel}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded transition-colors',
          GOV_FOCUS_RING,
        )}
        style={{ color: iconFg }}
      >
        {expanded ? <IconChevronUp /> : <IconChevronDown />}
      </button>
    </td>
  )
})
TableExpandCell.displayName = 'TableExpandCell'

// ─── TableExpandedContentRow — linha de detalhe com sombra GovBR ─────────────────────────────────────────

export interface TableExpandedContentRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Número de colunas da tabela (para `colSpan`). */
  colSpan: number
  children: React.ReactNode
}

/**
 * Linha de conteúdo expandido abaixo da linha principal; aplica sombra do PDF (hierarquia visual).
 */
const TableExpandedContentRow = React.forwardRef<HTMLTableRowElement, TableExpandedContentRowProps>(
  function TableExpandedContentRow({ colSpan, children, className, style, ...rest }, ref) {
    const c = useTableColorsInTable()
    const { density } = useItamaratyTableSection()
    const pad = getTableCellPadding(null, density, 'row')
    return (
      <tr ref={ref} className={cn(className)} {...rest} style={style}>
        <td
          colSpan={colSpan}
          className="p-0 align-top"
          style={{
            borderBottom: `1px solid ${c.divider}`,
            boxShadow: TABLE_EXPAND_SHADOW,
            backgroundColor: c.rowBg,
            color: c.rowFg,
          }}
        >
          <div className="font-body text-base font-medium" style={pad}>
            {children}
          </div>
        </td>
      </tr>
    )
  },
)
TableExpandedContentRow.displayName = 'TableExpandedContentRow'

// ─── TableFooterBar ─────────────────────────────────────────

export interface TableFooterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function TableFooterBar({ children, className, style, ...rest }: TableFooterBarProps) {
  const c = useTableColorsInTable()
  const { density } = useItamaratyTableSection()
  const pad = getTableCellPadding(null, density, 'footer')

  return (
    <div
      role="toolbar"
      className={cn(
        'flex shrink-0 flex-wrap items-center justify-end gap-4 border-t font-body text-base font-medium',
        className,
      )}
      style={{
        ...pad,
        borderTopColor: c.divider,
        backgroundColor: c.footerBg,
        color: c.footerFg,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export {
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
}
