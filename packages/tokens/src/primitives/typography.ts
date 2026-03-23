/**
 * Typography Primitive Tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Tipografia
 *
 * Família tipográfica: Rawline (Raleway, sans-serif como fallback)
 * Escala de tamanho: Minor Third (razão 1.2) com base em 14px (1em)
 * Escala de peso: 9 pesos (100 a 900)
 * Alturas de linha: 3 níveis (low 1.15 | medium 1.45 | high 1.85)
 */

// ---------------------------------------------------------------------------
// Font Families — --font-family-base
// ---------------------------------------------------------------------------

export const fontFamilies = {
  /** Rawline — fonte oficial do GovBR | --font-family-base */
  base: '"Rawline", "Raleway", sans-serif',
  /** Alias semântico para uso em corpo de texto */
  body: '"Rawline", "Raleway", sans-serif',
  /** Alias semântico para uso em títulos */
  heading: '"Rawline", "Raleway", sans-serif',
  /** Fonte monoespaçada — blocos de código */
  mono: '"Courier New", Courier, monospace',
} as const

// ---------------------------------------------------------------------------
// Font Weights — --fontweight-*
// GovBR define 9 pesos para cobrir toda a hierarquia com uma só família
// ---------------------------------------------------------------------------

export const fontWeights = {
  /** 100 — --fontweight-thin */
  thin: 100,
  /** 200 — --fontweight-extra-light */
  extraLight: 200,
  /** 300 — --fontweight-light | h1 */
  light: 300,
  /** 400 — --fontweight-regular | body, h2 */
  regular: 400,
  /** 500 — --fontweight-medium | h3, input */
  medium: 500,
  /** 600 — --fontweight-semi-bold | h4, label */
  semiBold: 600,
  /** 700 — --fontweight-bold | h5 */
  bold: 700,
  /** 800 — --fontweight-extra-bold | h6 (uppercase) */
  extraBold: 800,
  /** 900 — --fontweight-black */
  black: 900,
} as const

// ---------------------------------------------------------------------------
// Font Sizes — escala Minor Third (1.2×) com base 14px
// Os valores em rem são relativos ao htmlFontSize padrão de 16px
//   rem = px / 16
// ---------------------------------------------------------------------------

/**
 * Escala completa de tamanhos GovBR em unidades relativas (rem).
 */
export const fontSizes = {
  /** 8.10px  → 0.506rem — --font-size-scale-down-03 */
  'down-03': '0.506rem',
  /** 9.72px  → 0.608rem — --font-size-scale-down-02 */
  'down-02': '0.608rem',
  /** 11.67px → 0.729rem — --font-size-scale-down-01 | h6 (mobile) */
  'down-01': '0.729rem',
  /** 14px    → 0.875rem — --font-size-scale-base | label, placeholder, code */
  base: '0.875rem',
  /** 16.8px  → 1.05rem  — --font-size-scale-up-01  | h6, body/paragraph, input */
  'up-01': '1.05rem',
  /** 20.16px → 1.26rem  — --font-size-scale-up-02  | h5 */
  'up-02': '1.26rem',
  /** 24.19px → 1.512rem — --font-size-scale-up-03  | h4 */
  'up-03': '1.512rem',
  /** 29.03px → 1.814rem — --font-size-scale-up-04  | h3 */
  'up-04': '1.814rem',
  /** 34.84px → 2.178rem — --font-size-scale-up-05  | h2 */
  'up-05': '2.178rem',
  /** 41.8px  → 2.613rem — --font-size-scale-up-06  | h1 */
  'up-06': '2.613rem',
  /** 50.16px → 3.135rem — --font-size-scale-up-07  | display */
  'up-07': '3.135rem',
} as const

/**
 * Valores em pixels para uso em contextos não-CSS (ex.: cálculos JS, stories).
 */
export const fontSizesPx = {
  'down-03': 8.10,
  'down-02': 9.72,
  'down-01': 11.67,
  base: 14,
  'up-01': 16.8,
  'up-02': 20.16,
  'up-03': 24.19,
  'up-04': 29.03,
  'up-05': 34.84,
  'up-06': 41.8,
  'up-07': 50.16,
} as const

// ---------------------------------------------------------------------------
// Line Heights — --font-lineheight-*
// Regra GovBR:
//   • Tamanhos acima do base (>14px) → low (1.15)
//   • Tamanhos até o base (≤14px)   → medium (1.45)
// ---------------------------------------------------------------------------

export const lineHeights = {
  /** 1.15 — --font-lineheight-low   | headings e tamanhos grandes */
  low: 1.15,
  /** 1.45 — --font-lineheight-medium | body, labels e tamanhos pequenos */
  medium: 1.45,
  /** 1.85 — --font-lineheight-high  | uso especial (destaque/legibilidade máxima) */
  high: 1.85,
} as const

// ---------------------------------------------------------------------------
// Letter Spacing
// GovBR não define escala própria; mantemos valores recomendados de UX
// ---------------------------------------------------------------------------

export const letterSpacings = {
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  /** Usado em h6 e h5 (mobile) que têm text-transform: uppercase */
  uppercase: '0.08em',
} as const
