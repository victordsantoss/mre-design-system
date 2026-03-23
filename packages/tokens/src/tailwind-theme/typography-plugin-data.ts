import { semanticTypography } from '../semantic/typography'
import { toKebabSegment } from './casing'

type CssLike = Record<string, string | number>

/**
 * Mapa para `addUtilities` do Tailwind — chaves `.text-ds-{variante}`.
 */
export function buildTypographyUtilityStyles(): Record<string, CssLike> {
  const utilities: Record<string, CssLike> = {}

  for (const [name, spec] of Object.entries(semanticTypography)) {
    const u: CssLike = {
      fontFamily: spec.fontFamily,
      fontSize: spec.fontSize,
      fontWeight: String(spec.fontWeight),
      lineHeight: String(spec.lineHeight),
      letterSpacing: spec.letterSpacing,
    }
    if ('textTransform' in spec && spec.textTransform) {
      u.textTransform = spec.textTransform
    }
    if ('fontStyle' in spec && spec.fontStyle) {
      u.fontStyle = spec.fontStyle
    }
    utilities[`.text-ds-${toKebabSegment(name)}`] = u
  }

  return utilities
}
