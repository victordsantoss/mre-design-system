'use client'

import * as React from 'react'
import type { DsTableColors, TableCellDividers, TableDensity } from './types'

export interface TableSectionState {
  density: TableDensity
  cellDividers: TableCellDividers
}

export const DEFAULT_TABLE_SECTION: TableSectionState = {
  density: 'default',
  cellDividers: 'horizontal',
}

export const TableSectionContext = React.createContext<TableSectionState>(DEFAULT_TABLE_SECTION)

export const TableColorsContext = React.createContext<DsTableColors | null>(null)

export function useItamaratyTableSection(): TableSectionState {
  return React.useContext(TableSectionContext)
}

/** @deprecated Prefira `useItamaratyTableSection` (paridade com o pacote MUI). */
export const useTableSection = useItamaratyTableSection

export function useTableColorsInTable(): DsTableColors {
  const c = React.useContext(TableColorsContext)
  if (!c) throw new Error('Componentes de Table devem ficar dentro de TableRoot.')
  return c
}
