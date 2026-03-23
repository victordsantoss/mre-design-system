/**
 * Table Types — Padrão Digital de Governo (GovBR)
 * Paridade de tipos com @itamaraty-ds/components / `DsTableColors` do tema MUI.
 */

/** Densidade — padrão | confortável | compacta */
export type TableDensity = 'default' | 'comfortable' | 'compact'

/**
 * Divisores entre colunas — referência gov.br (telas): só linhas horizontais.
 * `grid` mantém grade com bordas verticais (documentação / casos densos).
 */
export type TableCellDividers = 'horizontal' | 'grid'

/** Slots de padding — alinhados ao tema MUI `getTableCellPadding` */
export type TablePaddingSlot = 'title' | 'header' | 'row' | 'footer'

/** Cores da tabela GovBR — espelha `palette.ds.table` do pacote tema MUI */
export interface DsTableColors {
  outerBg: string
  titleFg: string
  titleBg: string
  contextualBg: string
  contextualFg: string
  contextualBorderBottom: string
  headerBg: string
  headerTextSortable: string
  headerTextPlain: string
  rowBg: string
  rowFg: string
  rowHover: string
  rowSelectedBg: string
  rowSelectedFg: string
  rowIconColor: string
  footerBg: string
  footerFg: string
  divider: string
  dividerStrong: string
  paginationLabel: string
  paginationMuted: string
  paginationSep: string
  paginationSelectFg: string
  paginationSelectChevron: string
  paginationNavIcon: string
  paginationNavHoverBg: string
  paginationBarBg: string
}
