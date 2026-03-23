/**
 * Border / surface tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo — superfícies (borda, arredondamento)
 *
 * Custom properties: --surface-width-*, --surface-border-{solid|dashed}-*, --surface-rounder-*;
 * cor padrão de borda de superfície: --gray-40
 */

import { gray } from './colors'

export type SurfaceBorderStyle = 'solid' | 'dashed'

export const surfaceWidthVariables = {
  none: '--surface-width-none',
  sm: '--surface-width-sm',
  md: '--surface-width-md',
  lg: '--surface-width-lg',
} as const

export type SurfaceWidthKey = keyof typeof surfaceWidthVariables

export const surfaceWidth = {
  none: 0,
  sm: 1,
  md: 2,
  lg: 4,
} as const

export const surfaceBorderDefaultColorVariable = '--gray-40' as const
export const surfaceBorderDefaultColorHex = gray[40]

export const surfaceBorderVariables = {
  solid: {
    none: '--surface-border-solid-none',
    sm: '--surface-border-solid-sm',
    md: '--surface-border-solid-md',
    lg: '--surface-border-solid-lg',
  },
  dashed: {
    none: '--surface-border-dashed-none',
    sm: '--surface-border-dashed-sm',
    md: '--surface-border-dashed-md',
    lg: '--surface-border-dashed-lg',
  },
} as const

export function getSurfaceBorderVariable(
  style: SurfaceBorderStyle,
  width: SurfaceWidthKey,
): (typeof surfaceBorderVariables)[SurfaceBorderStyle][SurfaceWidthKey] {
  return surfaceBorderVariables[style][width]
}

export type SurfaceBorderSide = 'top' | 'right' | 'bottom' | 'left' | 'all'

export type SurfaceRounderCorner = 'all' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export const surfaceRounderVariables = {
  none: '--surface-rounder-none',
  sm: '--surface-rounder-sm',
  md: '--surface-rounder-md',
  lg: '--surface-rounder-lg',
  pill: '--surface-rounder-pill',
} as const

export type SurfaceRounderKey = keyof typeof surfaceRounderVariables

/** px; `pill` = cápsula (R = A/2 no GovBR) — preferir `var(--surface-rounder-pill)` no CSS quando existir */
export const surfaceRounder = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  pill: '50%',
} as const

/** @deprecated Use `surfaceRounder`. */
export const borderRadius = surfaceRounder

export const borderWidths = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4,
} as const
