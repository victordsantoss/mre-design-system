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
 * Cores GovBR canônicas: #1351B4 (primary), #071D41 (secondary/header),
 * #168821 (success), #FFCD07 (warning), #E52207 (error), #155BCB (info).
 */
import type { Config } from 'tailwindcss'

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
      },

      borderRadius: {
        // GovBR border radii — alinhados com @itamaraty-ds/tokens primitives/borders
        pill: '100em',   // botões (pill radius — marca visual GovBR)
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },

      fontFamily: {
        /** Rawline — fonte oficial do GovBR */
        sans: ['Rawline', 'Raleway', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Escala Minor Third GovBR (base = 14px)
        'gov-xs':   ['0.729rem', { lineHeight: '1.45' }],  // down-01
        'gov-sm':   ['0.875rem', { lineHeight: '1.45' }],  // base (14px)
        'gov-base': ['1.05rem',  { lineHeight: '1.45' }],  // up-01 (body)
        'gov-lg':   ['1.26rem',  { lineHeight: '1.15' }],  // up-02 (h5)
        'gov-xl':   ['1.512rem', { lineHeight: '1.15' }],  // up-03 (h4)
        'gov-2xl':  ['1.814rem', { lineHeight: '1.15' }],  // up-04 (h3)
        'gov-3xl':  ['2.178rem', { lineHeight: '1.15' }],  // up-05 (h2)
        'gov-4xl':  ['2.613rem', { lineHeight: '1.15' }],  // up-06 (h1)
        'gov-5xl':  ['3.135rem', { lineHeight: '1.15' }],  // up-07 (display)
      },

      // Foco GovBR: outline 3px offset 4px (azul info #155BCB)
      ringWidth: {
        'gov': '3px',
      },
      ringOffsetWidth: {
        'gov': '4px',
      },

      boxShadow: {
        // Sombras GovBR para cards e modais
        'card-sm': '0 1px 2px 0 rgba(7,29,65,0.08)',
        'card-md': '0 2px 8px 0 rgba(7,29,65,0.12)',
        'popover':  '0 4px 16px 0 rgba(7,29,65,0.16)',
        'modal':    '0 8px 32px 0 rgba(7,29,65,0.20)',
      },

      transitionDuration: {
        /** Paridade com `transitionDuration` em @ds/tokens */
        'gov-fast': '100ms',
        'gov-base': '300ms',
        'gov-slow': '500ms',
      },
    },
  },
}

export default preset
