/**
 * Design System — Spacing & Layout Tokens
 *
 * Escala baseada em múltiplos de 4px (base-4 system)
 * Padrão amplamente adotado em design systems profissionais
 */

// ─────────────────────────────────────────────
// Spacing Scale (4px base unit)
// ─────────────────────────────────────────────

export const spacing = {
  px: '1px',
  '0': '0',
  '0.5': '0.125rem',   // 2px
  '1': '0.25rem',      // 4px
  '1.5': '0.375rem',   // 6px
  '2': '0.5rem',       // 8px
  '2.5': '0.625rem',   // 10px
  '3': '0.75rem',      // 12px
  '3.5': '0.875rem',   // 14px
  '4': '1rem',         // 16px
  '5': '1.25rem',      // 20px
  '6': '1.5rem',       // 24px
  '7': '1.75rem',      // 28px
  '8': '2rem',         // 32px
  '9': '2.25rem',      // 36px
  '10': '2.5rem',      // 40px
  '11': '2.75rem',     // 44px
  '12': '3rem',        // 48px
  '14': '3.5rem',      // 56px
  '16': '4rem',        // 64px
  '20': '5rem',        // 80px
  '24': '6rem',        // 96px
  '28': '7rem',        // 112px
  '32': '8rem',        // 128px
  '36': '9rem',        // 144px
  '40': '10rem',       // 160px
  '44': '11rem',       // 176px
  '48': '12rem',       // 192px
  '52': '13rem',       // 208px
  '56': '14rem',       // 224px
  '60': '15rem',       // 240px
  '64': '16rem',       // 256px
  '72': '18rem',       // 288px
  '80': '20rem',       // 320px
  '96': '24rem',       // 384px
} as const

// ─────────────────────────────────────────────
// Border Radius
// ─────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.125rem',      // 2px
  default: '0.25rem',  // 4px
  md: '0.375rem',      // 6px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  '2xl': '1rem',       // 16px
  '3xl': '1.5rem',     // 24px
  full: '9999px',
} as const

// ─────────────────────────────────────────────
// Border Width
// ─────────────────────────────────────────────

export const borderWidth = {
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
} as const

// ─────────────────────────────────────────────
// Breakpoints (Mobile-first)
// ─────────────────────────────────────────────

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ─────────────────────────────────────────────
// Z-Index Scale
// ─────────────────────────────────────────────

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const

// ─────────────────────────────────────────────
// Container Max Widths
// ─────────────────────────────────────────────

export const container = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const layout = {
  spacing,
  borderRadius,
  borderWidth,
  breakpoints,
  zIndex,
  container,
} as const
