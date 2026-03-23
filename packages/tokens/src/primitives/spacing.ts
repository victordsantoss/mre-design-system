/**
 * Spacing Tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Espaçamento
 *
 * Sistema de espaçamento com duas escalas:
 *   • Layout Scale  — base 8px, múltiplos inteiros (uso geral)
 *   • Ajuste Scale  — base 4px, meios-passos (apenas texto e ícones)
 *
 * CSS custom properties oficiais mapeadas:
 *   --spacing-scale-default → 0px
 *   --spacing-scale-half    → 4px
 *   --spacing-scale-base    → 8px
 *   --spacing-scale-baseh   → 12px
 *   --spacing-scale-2x      → 16px
 *   --spacing-scale-2xh     → 20px
 *   --spacing-scale-3x      → 24px
 *   --spacing-scale-3xh     → 28px
 *   --spacing-scale-4x      → 32px
 *   --spacing-scale-4xh     → 36px
 *   --spacing-scale-5x      → 40px
 *   --spacing-scale-5xh     → 44px
 *   --spacing-scale-6x      → 48px
 *   --spacing-scale-7x      → 56px
 *   --spacing-scale-8x      → 64px
 *   --spacing-scale-9x      → 72px
 *   --spacing-scale-10x     → 80px
 */

/** Unidade base do sistema de espaçamento GovBR */
const BASE = 8

/**
 * Escala de Layout — múltiplos inteiros de 8px.
 * Usada para margens, paddings e distâncias entre componentes.
 */
export const spacingLayout = {
  /** 0px  — sem espaçamento (default) */
  default: 0,
  /** 8px  — --spacing-scale-base */
  base: BASE,
  /** 16px — --spacing-scale-2x */
  '2x': BASE * 2,
  /** 24px — --spacing-scale-3x */
  '3x': BASE * 3,
  /** 32px — --spacing-scale-4x */
  '4x': BASE * 4,
  /** 40px — --spacing-scale-5x */
  '5x': BASE * 5,
  /** 48px — --spacing-scale-6x */
  '6x': BASE * 6,
  /** 56px — --spacing-scale-7x */
  '7x': BASE * 7,
  /** 64px — --spacing-scale-8x */
  '8x': BASE * 8,
  /** 72px — --spacing-scale-9x */
  '9x': BASE * 9,
  /** 80px — --spacing-scale-10x */
  '10x': BASE * 10,
} as const

/**
 * Escala de Ajuste — meios-passos de 4px.
 * Exclusiva para ajustes finos em tipografia e ícones.
 *
 * Nota: nunca usar para espaçamento entre componentes.
 */
export const spacingAdjust = {
  /** 4px  — --spacing-scale-half */
  half: BASE / 2,
  /** 12px — --spacing-scale-baseh */
  baseh: BASE * 1.5,
  /** 20px — --spacing-scale-2xh */
  '2xh': BASE * 2.5,
  /** 28px — --spacing-scale-3xh */
  '3xh': BASE * 3.5,
  /** 36px — --spacing-scale-4xh */
  '4xh': BASE * 4.5,
  /** 44px — --spacing-scale-5xh */
  '5xh': BASE * 5.5,
} as const

/**
 * Escala unificada (Layout + Ajuste) em ordem crescente.
 * Útil para autocomplete e iteração em stories de tokens.
 */
export const spacing = {
  default: spacingLayout.default,
  half: spacingAdjust.half,
  base: spacingLayout.base,
  baseh: spacingAdjust.baseh,
  '2x': spacingLayout['2x'],
  '2xh': spacingAdjust['2xh'],
  '3x': spacingLayout['3x'],
  '3xh': spacingAdjust['3xh'],
  '4x': spacingLayout['4x'],
  '4xh': spacingAdjust['4xh'],
  '5x': spacingLayout['5x'],
  '5xh': spacingAdjust['5xh'],
  '6x': spacingLayout['6x'],
  '7x': spacingLayout['7x'],
  '8x': spacingLayout['8x'],
  '9x': spacingLayout['9x'],
  '10x': spacingLayout['10x'],
} as const

/** Tipo inferido das chaves do spacing */
export type SpacingToken = keyof typeof spacing
