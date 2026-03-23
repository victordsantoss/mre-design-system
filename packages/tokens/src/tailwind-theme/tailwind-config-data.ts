import type { SemanticColorTheme } from '../semantic/colors'
import { semanticColorsLight } from '../semantic/colors'
import { surfaceRounder } from '../primitives/borders'
import { elevation } from '../primitives/elevation'
import { fontFamilies, fontSizes, fontSizesPx, lineHeights } from '../primitives/typography'
import { transitionDuration } from '../primitives/transitions'
import { toKebabSegment } from './casing'

export function lineHeightForFontScaleKey(key: keyof typeof fontSizes): string {
  return fontSizesPx[key] <= 14 ? String(lineHeights.medium) : String(lineHeights.low)
}

export function buildFontSizeExtend(): Record<string, [string, { lineHeight: string }]> {
  const out: Record<string, [string, { lineHeight: string }]> = {}
  for (const key of Object.keys(fontSizes) as (keyof typeof fontSizes)[]) {
    out[key] = [fontSizes[key], { lineHeight: lineHeightForFontScaleKey(key) }]
  }
  return out
}

function cssVarNameForSemanticLeaf(group: string, leaf: string): string {
  return `--ds-color-${[group, leaf].map(toKebabSegment).join('-')}`
}

/** Árvore `colors.ds.*` espelhando `SemanticColorTheme` com `var(--ds-color-*)`. */
export function buildDsColorTree(theme: SemanticColorTheme = semanticColorsLight): Record<string, unknown> {
  const tree: Record<string, unknown> = {}
  for (const [groupKey, groupVal] of Object.entries(theme)) {
    if (typeof groupVal !== 'object' || groupVal === null) continue
    const branch: Record<string, string> = {}
    for (const [leafKey, hex] of Object.entries(groupVal)) {
      if (typeof hex !== 'string') continue
      const cssVar = cssVarNameForSemanticLeaf(groupKey, leafKey)
      const twKey = leafKey === 'default' ? 'DEFAULT' : toKebabSegment(leafKey)
      branch[twKey] = `var(${cssVar})`
    }
    tree[toKebabSegment(groupKey)] = branch
  }
  return tree
}

/** Cores alinhadas ao preset shadcn / componentes atuais (`var(--color-*)`). */
export function buildUiColorExtend(): Record<string, string | Record<string, string>> {
  return {
    border: 'var(--color-border)',
    input: 'var(--color-input)',
    ring: 'var(--color-ring)',
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    primary: {
      DEFAULT: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
      hover: 'var(--color-primary-hover)',
      subtle: 'var(--color-primary-subtle)',
    },
    secondary: {
      DEFAULT: 'var(--color-secondary)',
      foreground: 'var(--color-secondary-foreground)',
    },
    destructive: {
      DEFAULT: 'var(--color-destructive)',
      foreground: 'var(--color-destructive-foreground)',
      subtle: 'var(--color-destructive-subtle)',
    },
    success: {
      DEFAULT: 'var(--color-success)',
      foreground: 'var(--color-success-foreground)',
      subtle: 'var(--color-success-subtle)',
    },
    warning: {
      DEFAULT: 'var(--color-warning)',
      foreground: 'var(--color-warning-foreground)',
      subtle: 'var(--color-warning-subtle)',
      'readable-on-light': 'var(--color-warning-readable-on-light)',
    },
    info: {
      DEFAULT: 'var(--color-info)',
      foreground: 'var(--color-info-foreground)',
      subtle: 'var(--color-info-subtle)',
    },
    muted: {
      DEFAULT: 'var(--color-muted)',
      foreground: 'var(--color-muted-foreground)',
    },
    accent: {
      DEFAULT: 'var(--color-accent)',
      foreground: 'var(--color-accent-foreground)',
    },
    card: {
      DEFAULT: 'var(--color-card)',
      foreground: 'var(--color-card-foreground)',
    },
    overlay: 'var(--color-overlay)',
    pure: {
      0: 'var(--color-pure-0)',
    },
  }
}

export function buildBorderRadiusExtend(): Record<string, string> {
  const sm = surfaceRounder.sm
  const md = surfaceRounder.md
  const lg = surfaceRounder.lg
  return {
    none: '0',
    xs: '2px',
    sm: typeof sm === 'number' ? `${sm}px` : String(sm),
    md: typeof md === 'number' ? `${md}px` : String(md),
    lg: typeof lg === 'number' ? `${lg}px` : String(lg),
    xl: typeof lg === 'number' ? `${lg}px` : String(lg),
    full: '9999px',
    pill: 'var(--surface-rounder-pill, 100em)',
  }
}

export function buildBoxShadowExtend(): Record<string, string> {
  return {
    'card-sm': elevation.shadowSm,
    'card-md': elevation.shadowMd,
    popover: elevation.popover,
    modal: elevation.modal,
    drawer: elevation.drawer,
  }
}

export function buildTransitionDurationExtend(): Record<string, string> {
  return {
    'ds-fast': `${transitionDuration.veryFast}ms`,
    'ds-base': `${transitionDuration.fast}ms`,
    'ds-slow': `${transitionDuration.moderate}ms`,
  }
}

export function buildFontFamilyExtend(): Record<string, string[]> {
  return {
    sans: [fontFamilies.base],
    body: [fontFamilies.body],
    heading: [fontFamilies.heading],
    mono: [fontFamilies.mono],
  }
}

export function buildSpacingExtend(): Record<string, string> {
  return {
    card: 'var(--card-padding)',
    'card-icon': 'var(--card-icon-padding)',
  }
}
