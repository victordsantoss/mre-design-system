/**
 * Semantic Typography Tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Tipografia
 *
 * Cada variante segue a especificação GovBR:
 *   size   → escala Minor Third (base 14px)
 *   weight → escala de 9 pesos
 *   lineHeight → low (1.15) para ≥ up-02 | medium (1.45) para ≤ up-01/base
 */
import { fontFamilies, fontWeights, fontSizes, lineHeights, letterSpacings } from '../primitives/typography'

export const semanticTypography = {
  /**
   * H1 — up-06 (41.8px) / light (300) / low (1.15)
   * --font-size-scale-up-06 / --fontweight-light / --font-lineheight-low
   */
  h1: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-06'],
    fontWeight: fontWeights.light,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.tight,
  },

  /**
   * H2 — up-05 (34.84px) / regular (400) / low (1.15)
   * --font-size-scale-up-05 / --fontweight-regular / --font-lineheight-low
   */
  h2: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-05'],
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.tight,
  },

  /**
   * H3 — up-04 (29.03px) / medium (500) / low (1.15)
   * --font-size-scale-up-04 / --fontweight-medium / --font-lineheight-low
   */
  h3: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-04'],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * H4 — up-03 (24.19px) / semi-bold (600) / low (1.15)
   * --font-size-scale-up-03 / --fontweight-semi-bold / --font-lineheight-low
   */
  h4: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-03'],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * H5 — up-02 (20.16px) / bold (700) / low (1.15)
   * --font-size-scale-up-02 / --fontweight-bold / --font-lineheight-low
   */
  h5: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-02'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * H6 — up-01 (16.8px) / extra-bold (800) / low (1.15) / UPPERCASE
   * --font-size-scale-up-01 / --fontweight-extra-bold / --font-lineheight-low
   */
  h6: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-01'],
    fontWeight: fontWeights.extraBold,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.uppercase,
    textTransform: 'uppercase' as const,
  },

  /**
   * Parágrafo (body1) — up-01 (16.8px) / regular (400) / medium (1.45)
   * --font-size-scale-up-01 / --fontweight-regular / --font-lineheight-medium
   */
  body1: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes['up-01'],
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.medium,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Corpo menor (body2) — base (14px) / regular (400) / medium (1.45)
   */
  body2: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.medium,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Rótulo / Label — base (14px) / semi-bold (600) / medium (1.45)
   * --font-size-scale-base / --fontweight-semi-bold / --font-lineheight-medium
   */
  label: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.medium,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Campo de entrada / Input — up-01 (16.8px) / medium (500) / low (1.15)
   * --font-size-scale-up-01 / --fontweight-medium / --font-lineheight-low
   */
  input: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes['up-01'],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Placeholder — base (14px) / regular (400) / medium (1.45) / itálico
   */
  placeholder: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.medium,
    fontStyle: 'italic' as const,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Legenda / Legend — up-01 (16.8px) / semi-bold (600) / low (1.15)
   */
  legend: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes['up-01'],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Caption / Legenda pequena — down-01 (11.67px) / regular (400) / medium (1.45)
   */
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes['down-01'],
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.medium,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Overline — base (14px) / semi-bold (600) / medium (1.45) / UPPERCASE
   */
  overline: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.medium,
    letterSpacing: letterSpacings.uppercase,
    textTransform: 'uppercase' as const,
  },

  /**
   * Botão — up-01 (16.8px) / semi-bold (600) / low (1.15)
   * Sem text-transform para seguir a diretriz GovBR de não usar caixa alta em botões
   */
  button: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes['up-01'],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
    textTransform: 'none' as const,
  },

  /**
   * Código — monospace / base (14px) / medium (500) / low (1.15)
   */
  code: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.normal,
  },

  /**
   * Display — up-07 (50.16px) / light (300) / low (1.15)
   * Para uso em heroes e banners de destaque
   */
  display: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['up-07'],
    fontWeight: fontWeights.light,
    lineHeight: lineHeights.low,
    letterSpacing: letterSpacings.tight,
  },
} as const
