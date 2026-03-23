'use client'
/**
 * Table — Padrão Digital de Governo (GovBR)
 * Paridade de API com @itamaraty-ds/components (MUI). Cores alinhadas a `palette.ds.table`.
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { alpha } from '../utils/color-alpha'
import { useTableDsColors, getTableColors } from './table-ds-colors'
import { getTableCellPadding } from './table-cell-padding'
import {
  TableSectionContext,
  TableColorsContext,
  useItamaratyTableSection,
  useTableSection,
  useTableColorsInTable,
} from './table-context'
import type { TableCellDividers, TableDensity } from './types'

export type { TableDensity, TableCellDividers, DsTableColors, TablePaddingSlot } from './types'
export { getTableCellPadding, getTableColors }
export {
  TableSectionContext,
  TableColorsContext,
  useItamaratyTableSection,
  useTableSection,
  DEFAULT_TABLE_SECTION,
} from './table-context'
export type { TableSectionState } from './table-context'

export type TableSortDirection = 'asc' | 'desc' | false

// ─────────────────────────────────────────────
// TableRoot
// ─────────────────────────────────────────────

export interface TableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: TableDensity
  cellDividers?: TableCellDividers
}

const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>(
  function TableRoot({ density = 'default', cellDividers = 'horizontal', children, className, style, ...rest }, ref) {
    const colors = useTableDsColors()
    return (
      <TableSectionContext.Provider value={{ density, cellDividers }}>
        <TableColorsContext.Provider value={colors}>
          <div
            ref={ref}
            className={cn('overflow-hidden', className)}
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
  },
)
TableRoot.displayName = 'TableRoot'

// ─────────────────────────────────────────────
// TableTitleBar
// ─────────────────────────────────────────────

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
      className={cn('flex items-center justify-between gap-4', className)}
      style={{
        ...pad,
        borderBottom: `1px solid ${c.divider}`,
        backgroundColor: c.titleBg,
        color: c.titleFg,
      }}
    >
      <span
        className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gov-base font-semibold leading-snug"
        style={{ color: c.titleFg }}
      >
        {title}
      </span>
      {actions ? (
        <div className="flex shrink-0 items-center gap-1 [&_button]:text-primary">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

// ─────────────────────────────────────────────
// TableContextualBar
// ─────────────────────────────────────────────

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
        'flex w-full min-w-0 flex-wrap items-center justify-between gap-4 text-base font-medium',
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

// ─────────────────────────────────────────────
// TableContextualAction
// ─────────────────────────────────────────────

export interface TableContextualActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode
  children: React.ReactNode
}

const TableContextualAction = React.forwardRef<HTMLButtonElement, TableContextualActionProps>(
  function TableContextualAction({ startIcon, children, type = 'button', className, disabled, ...rest }, ref) {
    const c = useTableColorsInTable()
    const fg = c.contextualFg
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex shrink-0 items-center gap-2 rounded border-0 bg-transparent p-1 font-inherit text-base font-medium',
          'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2',
          className,
        )}
        style={{
          color: fg,
          WebkitTextFillColor: fg,
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          outlineColor: fg,
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

// ─────────────────────────────────────────────
// TableScrollArea
// ─────────────────────────────────────────────

export interface TableScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string
}

const TableScrollArea = React.forwardRef<HTMLDivElement, TableScrollAreaProps>(
  function TableScrollArea({ maxHeight, style, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('w-full overflow-auto', className)}
        style={{ maxHeight, ...style }}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
TableScrollArea.displayName = 'TableScrollArea'

// ─────────────────────────────────────────────
// TableElement
// ─────────────────────────────────────────────

export type TableElementProps = React.TableHTMLAttributes<HTMLTableElement>

const TableElement = React.forwardRef<HTMLTableElement, TableElementProps>(
  function TableElement({ className, ...rest }, ref) {
    return (
      <table
        ref={ref}
        className={cn('w-full border-collapse text-left', className)}
        {...rest}
      />
    )
  },
)
TableElement.displayName = 'TableElement'

// ─────────────────────────────────────────────
// TableHead / TableBody
// ─────────────────────────────────────────────

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, style, ...rest }, ref) => {
  const c = useTableColorsInTable()
  return (
    <thead
      ref={ref}
      className={cn(className)}
      style={{ backgroundColor: c.headerBg, ...style }}
      {...rest}
    />
  )
})
TableHead.displayName = 'TableHead'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => (
  <tbody ref={ref} className={cn(className)} {...rest} />
))
TableBody.displayName = 'TableBody'

// ─────────────────────────────────────────────
// TableHeaderCell
// ─────────────────────────────────────────────

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: TableSortDirection
  onSortClick?: () => void
}

const SortAscIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 shrink-0" aria-hidden="true">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
)
const SortDescIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 shrink-0" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
)
const SortNeutralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true">
    <polyline points="8 9 12 4 16 9" /><polyline points="16 15 12 20 8 15" />
  </svg>
)

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell(
    { sortable = false, sortDirection = false, onSortClick, children, className, style, ...rest },
    ref,
  ) {
    const c = useTableColorsInTable()
    const { density, cellDividers } = useItamaratyTableSection()
    const pad = getTableCellPadding(null, density, 'header')
    const showV = cellDividers === 'grid'

    const content = sortable ? (
      <button
        type="button"
        onClick={onSortClick}
        className={cn(
          'inline-flex items-center gap-1 rounded-sm text-gov-base font-semibold',
          onSortClick ? 'cursor-pointer' : 'cursor-default',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        )}
        style={{ color: c.headerTextSortable }}
      >
        <span className="overflow-hidden text-ellipsis">{children}</span>
        {sortDirection === 'asc' ? <SortAscIcon /> :
         sortDirection === 'desc' ? <SortDescIcon /> :
         <SortNeutralIcon />}
      </button>
    ) : (
      <span className="text-gov-base font-semibold" style={{ color: c.headerTextPlain }}>
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
          backgroundColor: c.headerBg,
          ...(showV ? { borderRightColor: c.divider } : {}),
          ...style,
        }}
      >
        {content}
      </th>
    )
  },
)
TableHeaderCell.displayName = 'TableHeaderCell'

// ─────────────────────────────────────────────
// TableBodyRow
// ─────────────────────────────────────────────

export interface TableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  rowHover?: boolean
}

const TableBodyRow = React.forwardRef<HTMLTableRowElement, TableBodyRowProps>(
  function TableBodyRow({ selected = false, rowHover = true, className, style, ...rest }, ref) {
    const c = useTableColorsInTable()
    return (
      <tr
        ref={ref}
        {...rest}
        className={cn('transition-colors duration-[100ms]', className)}
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
      />
    )
  },
)
TableBodyRow.displayName = 'TableBodyRow'

// ─────────────────────────────────────────────
// TableBodyCell
// ─────────────────────────────────────────────

export type TableBodyCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

const TableBodyCell = React.forwardRef<HTMLTableCellElement, TableBodyCellProps>(
  function TableBodyCell({ className, style, ...rest }, ref) {
    const c = useTableColorsInTable()
    const { density, cellDividers } = useItamaratyTableSection()
    const pad = getTableCellPadding(null, density, 'row')
    const showV = cellDividers === 'grid'

    return (
      <td
        ref={ref}
        {...rest}
        className={cn('align-middle text-gov-base font-medium', showV && 'border-r last:border-r-0', className)}
        style={{
          ...pad,
          borderBottom: `1px solid ${c.divider}`,
          color: c.rowFg,
          ...(showV ? { borderRightColor: c.divider } : {}),
          ...style,
        }}
      />
    )
  },
)
TableBodyCell.displayName = 'TableBodyCell'

// ─────────────────────────────────────────────
// TableExpandCell
// ─────────────────────────────────────────────

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const ChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

export interface TableExpandCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children'> {
  expanded: boolean
  onToggle: () => void
  'aria-label': string
}

const TableExpandCell = React.forwardRef<HTMLTableCellElement, TableExpandCellProps>(
  function TableExpandCell({ expanded, onToggle, 'aria-label': ariaLabel, className, style, ...rest }, ref) {
    const c = useTableColorsInTable()
    const { density, cellDividers } = useItamaratyTableSection()
    const pad = getTableCellPadding(null, density, 'row')
    const showV = cellDividers === 'grid'

    return (
      <td
        ref={ref}
        {...rest}
        className={cn('w-12 align-middle', showV && 'border-r', className)}
        style={{
          ...pad,
          borderBottom: `1px solid ${c.divider}`,
          ...(showV ? { borderRightColor: c.divider } : {}),
          ...style,
        }}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={ariaLabel}
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          style={{ color: c.rowIconColor }}
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </td>
    )
  },
)
TableExpandCell.displayName = 'TableExpandCell'

// ─────────────────────────────────────────────
// TableFooterBar
// ─────────────────────────────────────────────

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
      className={cn('flex flex-wrap items-center justify-end gap-4 border-t text-gov-base font-medium', className)}
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
  TableFooterBar,
}
