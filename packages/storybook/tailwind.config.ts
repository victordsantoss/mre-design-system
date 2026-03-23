import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './stories/**/*.{ts,tsx,mdx}',
    '../components/src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        pure: {
          0: 'var(--color-pure-0)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        pill: 'var(--surface-rounder-pill, 100em)',
      },
      transitionDuration: {
        'gov-fast': '100ms',
        'gov-base': '300ms',
      },
      fontSize: {
        'gov-xs': ['0.729rem', { lineHeight: '1.45' }],
        'gov-sm': ['0.875rem', { lineHeight: '1.45' }],
        'gov-base': ['1.05rem', { lineHeight: '1.45' }],
        'gov-lg': ['1.26rem', { lineHeight: '1.15' }],
        'gov-xl': ['1.512rem', { lineHeight: '1.15' }],
        'gov-2xl': ['1.814rem', { lineHeight: '1.15' }],
        'gov-3xl': ['2.178rem', { lineHeight: '1.15' }],
      },
      boxShadow: {
        'card-md': '0 2px 8px 0 rgba(7,29,65,0.12)',
        drawer: '4px 0 16px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config
