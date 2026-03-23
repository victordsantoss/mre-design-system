import type { CSSProperties } from 'react'
import type { TableDensity, TablePaddingSlot } from './types'

const TABLE_CELL_PADDING: Record<TableDensity, Record<TablePaddingSlot, CSSProperties>> = {
  default: {
    title: { padding: '16px 16px' },
    header: { padding: '16px 24px' },
    row: { padding: '16px 24px' },
    footer: { padding: '16px 16px' },
  },
  comfortable: {
    title: { padding: '24px 16px' },
    header: { padding: '24px 24px' },
    row: { padding: '24px 24px' },
    footer: { padding: '24px 16px' },
  },
  compact: {
    title: { padding: '8px 16px' },
    header: { padding: '8px 24px' },
    row: { padding: '8px 24px' },
    footer: { padding: '8px 16px' },
  },
}

/**
 * Paridade com `getTableCellPadding(theme, density, slot)` do pacote MUI — `theme` ignorado.
 */
export function getTableCellPadding(
  _theme: unknown,
  density: TableDensity,
  slot: TablePaddingSlot,
): CSSProperties {
  return TABLE_CELL_PADDING[density][slot]
}
