/**
 * Design System — Color Tokens
 *
 * Nomenclatura semântica seguindo padrões UX/UI:
 * - Escalas numéricas (50-950) para variações de intensidade
 * - Nomes semânticos para uso contextual (primary, secondary, destructive, etc.)
 * - Suporte a light/dark themes via CSS custom properties
 */

// ─────────────────────────────────────────────
// Base Color Scales (Paleta neutra + cromáticas)
// ─────────────────────────────────────────────

export const gray = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
} as const

export const blue = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const

export const green = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
} as const

export const red = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
} as const

export const amber = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const

export const violet = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
  950: '#2e1065',
} as const

// ─────────────────────────────────────────────
// Semantic Color Tokens (Light Theme)
// ─────────────────────────────────────────────

export const semanticLight = {
  // Background
  background: {
    default: '#ffffff',
    subtle: gray[50],
    muted: gray[100],
    emphasis: gray[900],
    inverse: gray[950],
  },

  // Foreground / Text
  foreground: {
    default: gray[950],
    muted: gray[500],
    subtle: gray[400],
    inverse: '#ffffff',
    onEmphasis: '#ffffff',
  },

  // Primary (ação principal)
  primary: {
    default: blue[600],
    hover: blue[700],
    active: blue[800],
    subtle: blue[50],
    foreground: '#ffffff',
    border: blue[200],
  },

  // Secondary (ação alternativa)
  secondary: {
    default: gray[100],
    hover: gray[200],
    active: gray[300],
    subtle: gray[50],
    foreground: gray[900],
    border: gray[200],
  },

  // Destructive (ações perigosas)
  destructive: {
    default: red[600],
    hover: red[700],
    active: red[800],
    subtle: red[50],
    foreground: '#ffffff',
    border: red[200],
  },

  // Success
  success: {
    default: green[600],
    hover: green[700],
    active: green[800],
    subtle: green[50],
    foreground: '#ffffff',
    border: green[200],
  },

  // Warning
  warning: {
    default: amber[500],
    hover: amber[600],
    active: amber[700],
    subtle: amber[50],
    foreground: '#ffffff',
    border: amber[200],
  },

  // Border
  border: {
    default: gray[200],
    muted: gray[100],
    emphasis: gray[400],
    focus: blue[500],
  },

  // Ring (focus ring)
  ring: {
    default: blue[500],
    destructive: red[500],
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Card
  card: {
    default: '#ffffff',
    foreground: gray[950],
  },

  // Input
  input: {
    default: gray[200],
    focus: blue[500],
    invalid: red[500],
    placeholder: gray[400],
  },

  // Accent
  accent: {
    default: gray[100],
    foreground: gray[900],
  },
} as const

// ─────────────────────────────────────────────
// Semantic Color Tokens (Dark Theme)
// ─────────────────────────────────────────────

export const semanticDark = {
  background: {
    default: gray[950],
    subtle: gray[900],
    muted: gray[800],
    emphasis: gray[50],
    inverse: '#ffffff',
  },

  foreground: {
    default: gray[50],
    muted: gray[400],
    subtle: gray[500],
    inverse: gray[950],
    onEmphasis: gray[950],
  },

  primary: {
    default: blue[500],
    hover: blue[400],
    active: blue[300],
    subtle: blue[950],
    foreground: '#ffffff',
    border: blue[800],
  },

  secondary: {
    default: gray[800],
    hover: gray[700],
    active: gray[600],
    subtle: gray[900],
    foreground: gray[50],
    border: gray[700],
  },

  destructive: {
    default: red[500],
    hover: red[400],
    active: red[300],
    subtle: red[950],
    foreground: '#ffffff',
    border: red[800],
  },

  success: {
    default: green[500],
    hover: green[400],
    active: green[300],
    subtle: green[950],
    foreground: '#ffffff',
    border: green[800],
  },

  warning: {
    default: amber[500],
    hover: amber[400],
    active: amber[300],
    subtle: amber[950],
    foreground: gray[950],
    border: amber[800],
  },

  border: {
    default: gray[800],
    muted: gray[900],
    emphasis: gray[600],
    focus: blue[500],
  },

  ring: {
    default: blue[400],
    destructive: red[400],
  },

  overlay: 'rgba(0, 0, 0, 0.7)',

  card: {
    default: gray[900],
    foreground: gray[50],
  },

  input: {
    default: gray[700],
    focus: blue[400],
    invalid: red[400],
    placeholder: gray[500],
  },

  accent: {
    default: gray[800],
    foreground: gray[50],
  },
} as const

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export const colors = {
  gray,
  blue,
  green,
  red,
  amber,
  violet,
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
} as const

export type SemanticColors = typeof semanticLight
