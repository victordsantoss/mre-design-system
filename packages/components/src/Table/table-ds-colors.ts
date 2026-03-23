'use client'

import { useSyncExternalStore } from 'react'
import {
  semanticColorsLight,
  semanticColorsDark,
  gray,
  pure,
  blueWarmVivid,
} from '@ds/tokens'
import { alpha } from '../utils/color-alpha'
import type { DsTableColors } from './types'

/** Fundo do header ordenado — opacidade tipo `--surface-opacity-xs` (PDF GovBR Table). */
const HEADER_SORTED_BG_ALPHA = 0.1

export function createTableDsLight(): DsTableColors {
  const paper = semanticColorsLight.background.paper
  const text = semanticColorsLight.text.primary
  const textMuted = semanticColorsLight.text.secondary
  const pm = semanticColorsLight.primary.main
  const pd = semanticColorsLight.primary.dark
  const ct = semanticColorsLight.primary.contrastText
  return {
    outerBg: paper,
    titleFg: text,
    titleBg: paper,
    contextualBg: pd,
    contextualFg: ct,
    contextualBorderBottom: alpha(ct, 0.22),
    headerBg: gray[5],
    headerTextSortable: blueWarmVivid[70],
    headerTextPlain: blueWarmVivid[70],
    headerSortedFg: blueWarmVivid[80],
    headerSortedBg: alpha(blueWarmVivid[80], HEADER_SORTED_BG_ALPHA),
    rowBg: paper,
    rowFg: text,
    rowHover: alpha(pm, 0.08),
    rowSelectedBg: pm,
    /** Texto e ícones em branco sobre fundo primário (GovBR — linha selecionada). */
    rowSelectedFg: pure[0],
    rowIconColor: pm,
    footerBg: paper,
    footerFg: text,
    divider: gray[10],
    dividerStrong: gray[20],
    paginationLabel: text,
    paginationMuted: textMuted,
    paginationSep: gray[20],
    paginationSelectFg: text,
    paginationSelectChevron: pm,
    paginationNavIcon: pm,
    paginationNavHoverBg: alpha(text, 0.08),
    paginationBarBg: pure[0],
  }
}

export function createTableDsDark(): DsTableColors {
  const navy = semanticColorsDark.background.default
  const white = semanticColorsDark.text.primary
  const pl = blueWarmVivid[10]
  return {
    outerBg: navy,
    titleFg: white,
    titleBg: navy,
    contextualBg: navy,
    contextualFg: white,
    contextualBorderBottom: alpha(white, 0.2),
    headerBg: navy,
    headerTextSortable: blueWarmVivid[20],
    headerTextPlain: blueWarmVivid[20],
    headerSortedFg: pure[0],
    headerSortedBg: alpha(pure[0], HEADER_SORTED_BG_ALPHA),
    rowBg: navy,
    rowFg: white,
    rowHover: alpha(white, 0.06),
    /** Mesmo azul do modo claro (`#1351B4`) — linha selecionada idêntica em ambos os temas. */
    rowSelectedBg: blueWarmVivid[70],
    rowSelectedFg: pure[0],
    rowIconColor: pl,
    footerBg: navy,
    footerFg: white,
    divider: alpha(white, 0.14),
    dividerStrong: alpha(white, 0.22),
    paginationLabel: white,
    paginationMuted: alpha(white, 0.72),
    paginationSep: alpha(white, 0.22),
    paginationSelectFg: white,
    paginationSelectChevron: pl,
    paginationNavIcon: pl,
    paginationNavHoverBg: alpha(white, 0.08),
    paginationBarBg: navy,
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof document === 'undefined') return () => {}
  const obs = new MutationObserver(onStoreChange)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => obs.disconnect()
}

function getIsDarkSnapshot(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}

/** Atualiza quando a classe `dark` em `<html>` muda (DesignSystemProvider). */
export function useTableDsColors(): DsTableColors {
  const isDark = useSyncExternalStore(subscribe, getIsDarkSnapshot, () => false)
  return isDark ? createTableDsDark() : createTableDsLight()
}

/**
 * Paridade com API MUI — o argumento `theme` é ignorado; cores seguem classe `.dark` no documento.
 */
export function getTableColors(_theme?: unknown): DsTableColors {
  return getIsDarkSnapshot() ? createTableDsDark() : createTableDsLight()
}
