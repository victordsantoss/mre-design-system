import type { CSSProperties } from 'react'
import { spacingLayout } from '@ds/tokens'
import type { TableDensity, TablePaddingSlot } from './types'

const { base, '2x': s2x, '3x': s3x } = spacingLayout

/**
 * Paddings alinhados ao PDF GovBR Table (densidade padrão / baixa / alta).
 * Valores em px a partir de `spacingLayout` (@ds/tokens).
 */
const TABLE_CELL_PADDING: Record<TableDensity, Record<TablePaddingSlot, CSSProperties>> = {
  default: {
    title: { paddingTop: s2x, paddingBottom: s2x, paddingLeft: s2x, paddingRight: s2x },
    header: { paddingTop: s2x, paddingBottom: s2x, paddingLeft: s3x, paddingRight: s3x },
    row: { paddingTop: s2x, paddingBottom: s2x, paddingLeft: s3x, paddingRight: s3x },
    footer: { paddingTop: s2x, paddingBottom: s2x, paddingLeft: s2x, paddingRight: s2x },
  },
  comfortable: {
    title: { paddingTop: s3x, paddingBottom: s3x, paddingLeft: s2x, paddingRight: s2x },
    header: { paddingTop: s3x, paddingBottom: s3x, paddingLeft: s3x, paddingRight: s3x },
    row: { paddingTop: s3x, paddingBottom: s3x, paddingLeft: s3x, paddingRight: s3x },
    footer: { paddingTop: s3x, paddingBottom: s3x, paddingLeft: s2x, paddingRight: s2x },
  },
  compact: {
    title: { paddingTop: base, paddingBottom: base, paddingLeft: s2x, paddingRight: s2x },
    header: { paddingTop: s2x, paddingBottom: s2x, paddingLeft: s3x, paddingRight: s3x },
    row: { paddingTop: base, paddingBottom: base, paddingLeft: s3x, paddingRight: s3x },
    footer: { paddingTop: base, paddingBottom: base, paddingLeft: s2x, paddingRight: s2x },
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
