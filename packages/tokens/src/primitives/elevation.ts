/**
 * Elevação / sombras / scrim — GovBR (MRE DS)
 * Valores usados em cards, modais, drawer e overlays. Espelhar em `globals.css` como `--shadow-sm`, `--shadow-card`, `--shadow-popover`, `--color-overlay`, etc.
 */
import { blueWarmVivid } from './colors'

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = hex.replace('#', '')
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  }
}

const primaryRgb = hexToRgb(blueWarmVivid[70])

/** `rgba` da cor primária interativa com opacidade — hover/active em superfícies (ex.: card) */
export function primaryInteractiveAlpha(alpha: number): string {
  return `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},${alpha})`
}

/** Sombras nomeadas (preset Tailwind / CSS custom properties) */
export const elevation = {
  /** `--shadow-sm` — card, superfícies */
  shadowSm: '0 1px 2px 0 rgba(7, 29, 65, 0.08)',
  /** `shadow-card-md` / CSS `--shadow-card` — card em repouso (superfície sobre fundo claro) */
  shadowMd: '0 2px 8px 0 rgba(7, 29, 65, 0.12)',
  popover: '0 4px 16px 0 rgba(7, 29, 65, 0.16)',
  modal: '0 8px 32px 0 rgba(7, 29, 65, 0.20)',
  /** Menu off-canvas */
  drawer: '4px 0 16px rgba(0, 0, 0, 0.16)',
} as const

/** Scrim modal / backdrop — `--color-overlay` (claro | escuro no tema) */
export const scrim = {
  light: 'rgba(7, 29, 65, 0.72)',
  dark: 'rgba(7, 29, 65, 0.85)',
} as const

/** Overlays sem sólido em superfície interativa */
export const interactiveSurfaceOverlay = {
  cardHover: primaryInteractiveAlpha(0.08),
  cardActive: primaryInteractiveAlpha(0.16),
} as const
