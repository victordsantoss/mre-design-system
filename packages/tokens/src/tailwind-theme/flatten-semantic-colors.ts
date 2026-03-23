import type { SemanticColorTheme } from '../semantic/colors'
import { toKebabSegment } from './casing'

const DS_COLOR_PREFIX = '--ds-color'

/**
 * Percorre `SemanticColorTheme` e produz nomes `--ds-color-*` com valores hex.
 */
export function flattenSemanticColorVars(theme: SemanticColorTheme): Record<string, string> {
  const out: Record<string, string> = {}

  function walk(node: object, segments: string[]): void {
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string') {
        const name = [...segments, toKebabSegment(k)].join('-')
        out[`${DS_COLOR_PREFIX}-${name}`] = v
      } else if (v && typeof v === 'object') {
        walk(v, [...segments, toKebabSegment(k)])
      }
    }
  }

  walk(theme, [])
  return out
}

export function formatCssCustomProperties(vars: Record<string, string>, indent = '    '): string {
  return Object.entries(vars)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join('\n')
}
