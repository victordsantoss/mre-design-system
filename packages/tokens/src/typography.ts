/**
 * Design System — Typography Tokens
 *
 * Escala tipográfica baseada em modular scale (ratio ~1.25)
 * Nomenclatura semântica: xs, sm, base, lg, xl, 2xl, ...
 */

// ─────────────────────────────────────────────
// Font Families
// ─────────────────────────────────────────────

export const fontFamily = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  mono: [
    'JetBrains Mono',
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
} as const

// ─────────────────────────────────────────────
// Font Sizes (rem-based for accessibility)
// ─────────────────────────────────────────────

export const fontSize = {
  xs: '0.75rem',       // 12px
  sm: '0.875rem',      // 14px
  base: '1rem',        // 16px
  lg: '1.125rem',      // 18px
  xl: '1.25rem',       // 20px
  '2xl': '1.5rem',     // 24px
  '3xl': '1.875rem',   // 30px
  '4xl': '2.25rem',    // 36px
  '5xl': '3rem',       // 48px
  '6xl': '3.75rem',    // 60px
} as const

// ─────────────────────────────────────────────
// Line Heights
// ─────────────────────────────────────────────

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  // Specific for font sizes
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
} as const

// ─────────────────────────────────────────────
// Font Weights
// ─────────────────────────────────────────────

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

// ─────────────────────────────────────────────
// Letter Spacing (Tracking)
// ─────────────────────────────────────────────

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// ─────────────────────────────────────────────
// Text Styles (Composições pré-definidas)
// ─────────────────────────────────────────────

export const textStyles = {
  // Display (Hero, landing)
  'display-2xl': { fontSize: fontSize['6xl'], lineHeight: lineHeight.none, fontWeight: fontWeight.bold, letterSpacing: letterSpacing.tighter },
  'display-xl': { fontSize: fontSize['5xl'], lineHeight: lineHeight.none, fontWeight: fontWeight.bold, letterSpacing: letterSpacing.tighter },
  'display-lg': { fontSize: fontSize['4xl'], lineHeight: lineHeight.tight, fontWeight: fontWeight.bold, letterSpacing: letterSpacing.tight },

  // Headings
  'heading-xl': { fontSize: fontSize['3xl'], lineHeight: lineHeight.tight, fontWeight: fontWeight.semibold, letterSpacing: letterSpacing.tight },
  'heading-lg': { fontSize: fontSize['2xl'], lineHeight: lineHeight.snug, fontWeight: fontWeight.semibold, letterSpacing: letterSpacing.normal },
  'heading-md': { fontSize: fontSize.xl, lineHeight: lineHeight.snug, fontWeight: fontWeight.semibold, letterSpacing: letterSpacing.normal },
  'heading-sm': { fontSize: fontSize.lg, lineHeight: lineHeight.normal, fontWeight: fontWeight.semibold, letterSpacing: letterSpacing.normal },
  'heading-xs': { fontSize: fontSize.base, lineHeight: lineHeight.normal, fontWeight: fontWeight.semibold, letterSpacing: letterSpacing.normal },

  // Body
  'body-lg': { fontSize: fontSize.lg, lineHeight: lineHeight.relaxed, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
  'body-md': { fontSize: fontSize.base, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
  'body-sm': { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
  'body-xs': { fontSize: fontSize.xs, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },

  // Labels
  'label-lg': { fontSize: fontSize.base, lineHeight: lineHeight.normal, fontWeight: fontWeight.medium, letterSpacing: letterSpacing.normal },
  'label-md': { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontWeight: fontWeight.medium, letterSpacing: letterSpacing.normal },
  'label-sm': { fontSize: fontSize.xs, lineHeight: lineHeight.normal, fontWeight: fontWeight.medium, letterSpacing: letterSpacing.wide },

  // Code
  'code-lg': { fontSize: fontSize.base, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
  'code-md': { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
  'code-sm': { fontSize: fontSize.xs, lineHeight: lineHeight.normal, fontWeight: fontWeight.normal, letterSpacing: letterSpacing.normal },
} as const

export const typography = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textStyles,
} as const
