/**
 * Tailwind CSS preset exportável — Padrão Digital de Governo (GovBR)
 * MRE / Itamaraty Design System
 *
 * Uso no projeto consumidor:
 * ```ts
 * // tailwind.config.ts
 * import dsPreset from '@ds/components/tailwind.config'
 * export default {
 *   presets: [dsPreset],
 *   content: [
 *     './node_modules/@ds/components/dist/**\/*.{js,cjs}',
 *     './src/**\/*.{ts,tsx}',
 *   ],
 * }
 * ```
 *
 * As variáveis CSS são injetadas pelo DesignSystemProvider (globals.css).
 * Tipografia, raios, sombras e durações vêm de `@ds/tokens` (exportações do índice do pacote).
 */
import {
  elevation,
  fontFamilies,
  fontSizes,
  fontSizesPx,
  lineHeights,
  surfaceRounder,
  transitionDuration,
} from '@ds/tokens'
import type { Config } from 'tailwindcss'

const lhLow = String(lineHeights.low)
const lhMed = String(lineHeights.medium)

type ScaleFontSizeKey = keyof typeof fontSizes
type ScaleFontSizeEntry = [string, { lineHeight: string }]

/** GovBR: ≤14px → lineheight medium; >14px → low (`fontSizes` + `fontSizesPx` + `lineHeights` em @ds/tokens). */
function lineHeightForScaleKey(key: ScaleFontSizeKey): string {
  return fontSizesPx[key] <= 14 ? lhMed : lhLow
}

const scaleFontSize: Record<string, ScaleFontSizeEntry> = {}
for (const key of Object.keys(fontSizes) as ScaleFontSizeKey[]) {
  scaleFontSize[key] = [fontSizes[key], { lineHeight: lineHeightForScaleKey(key) }]
}

const preset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Semânticos via CSS custom properties ──
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
          /** Superfície branca GovBR (--pure-0) */
          0: 'var(--color-pure-0)',
        },
      },

      borderRadius: {
        // GovBR — `surfaceRounder` em @ds/tokens; pill via CSS (globals)
        none: `${surfaceRounder.none}px`,
        xs: '2px',
        sm: `${surfaceRounder.sm}px`,
        md: `${surfaceRounder.md}px`,
        lg: `${surfaceRounder.lg}px`,
        xl: `${surfaceRounder.lg}px`,
        full: '9999px',
        pill: 'var(--surface-rounder-pill, 100em)',
      },

      fontFamily: {
        /** Espelha `fontFamilies` em @ds/tokens/primitives/typography */
        sans:    [fontFamilies.base],
        body:    [fontFamilies.body],
        heading: [fontFamilies.heading],
        mono:    [fontFamilies.mono],
      },

      fontSize: scaleFontSize,

      // Foco GovBR: outline 3px offset 4px (azul info #155BCB)
      ringWidth: {
        'gov': '3px',
      },
      ringOffsetWidth: {
        'gov': '4px',
      },

      boxShadow: {
        'card-sm': elevation.shadowSm,
        'card-md': elevation.shadowMd,
        popover: elevation.popover,
        modal: elevation.modal,
        drawer: elevation.drawer,
      },

      transitionDuration: {
        'gov-fast': `${transitionDuration.veryFast}ms`,
        'gov-base': `${transitionDuration.fast}ms`,
        'gov-slow': `${transitionDuration.moderate}ms`,
      },
    },
  },
}

export default preset
