/**
 * Transition Tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Transições
 *
 * Durações:
 *   --duration-very-fast  → 0.10s (100ms)  — micro animação, feedback simples
 *   --duration-fast       → 0.30s (300ms)  — micro animação, mudanças de tela
 *   --duration-moderate   → 0.50s (500ms)  — animação média
 *   --duration-slow       → 0.80s (800ms)  — macro animação
 *   --duration-very-slow  → 1.00s (1000ms) — macro animação, uso excepcional
 *
 * Easings:
 *   --animation-ease         → cubic-bezier(0.25, 0.1, 0.25, 1)
 *   --animation-ease-in      → cubic-bezier(0.42, 0, 1, 1)
 *   --animation-ease-out     → cubic-bezier(0, 0, 0.58, 1)
 *   --animation-ease-in-out  → cubic-bezier(0.42, 0, 0.58, 1)
 *   --animation-ease-linear  → cubic-bezier(0, 0, 1, 1)
 */

// ---------------------------------------------------------------------------
// Durações (em milissegundos)
// ---------------------------------------------------------------------------

export const transitionDuration = {
  /** 100ms — --duration-very-fast | checkbox, switch, hover simples */
  veryFast: 100,
  /** 300ms — --duration-fast | modais aparecem, mudanças de tela */
  fast: 300,
  /** 500ms — --duration-moderate | animações médias */
  moderate: 500,
  /** 800ms — --duration-slow | macro animações */
  slow: 800,
  /** 1000ms — --duration-very-slow | uso excepcional */
  verySlow: 1000,
} as const

// ---------------------------------------------------------------------------
// Easings (cubic-bezier)
// ---------------------------------------------------------------------------

export const transitionEasing = {
  /** cubic-bezier(0.25, 0.1, 0.25, 1) — --animation-ease */
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  /** cubic-bezier(0.42, 0, 1, 1) — --animation-ease-in | elementos saindo da tela */
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  /** cubic-bezier(0, 0, 0.58, 1) — --animation-ease-out | elementos entrando na tela */
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  /** cubic-bezier(0.42, 0, 0.58, 1) — --animation-ease-in-out | padrão para a maioria das UIs */
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  /** cubic-bezier(0, 0, 1, 1) — --animation-ease-linear | animações constantes */
  linear: 'cubic-bezier(0, 0, 1, 1)',
} as const

// ---------------------------------------------------------------------------
// Helpers de CSS — strings prontas para uso em `transition`
// ---------------------------------------------------------------------------

export const transitions = {
  /** Fade In — elemento aparece gradualmente */
  fade: {
    in: `opacity ${transitionDuration.fast}ms ${transitionEasing.easeOut}`,
    out: `opacity ${transitionDuration.veryFast}ms ${transitionEasing.easeIn}`,
  },
  /** Mudança de cor — estados interativos (hover, focus, active) */
  color: `color ${transitionDuration.veryFast}ms ${transitionEasing.ease},
    background-color ${transitionDuration.veryFast}ms ${transitionEasing.ease},
    border-color ${transitionDuration.veryFast}ms ${transitionEasing.ease}`,
  /** Scale — ênfase no elemento */
  scale: `transform ${transitionDuration.fast}ms ${transitionEasing.easeOut}`,
  /** Slide — navegação espacial */
  slide: `transform ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Elevation — mudança de sombra/z-index */
  elevation: `box-shadow ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Rotate — rotação de ícone (ex.: chevron de accordion) */
  rotate: `transform ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Corner — mudança de border-radius */
  corner: `border-radius ${transitionDuration.fast}ms ${transitionEasing.ease}`,
  /** Padrão geral — propriedades comuns de componentes interativos */
  default: `all ${transitionDuration.veryFast}ms ${transitionEasing.easeInOut}`,
} as const

// ---------------------------------------------------------------------------
// Mapeamento MUI — paridade com @itamaraty-ds/tokens (tema MUI / referência)
// ---------------------------------------------------------------------------

/**
 * Durações mapeadas para os slots internos do MUI.
 * Uso: passar em `createTheme({ transitions: { duration: muiTransitionDuration } })`
 */
export const muiTransitionDuration = {
  shortest: transitionDuration.veryFast,
  shorter: transitionDuration.veryFast,
  short: transitionDuration.veryFast,
  standard: transitionDuration.fast,
  complex: transitionDuration.moderate,
  enteringScreen: transitionDuration.fast,
  leavingScreen: 250,
} as const

/**
 * Easings mapeados para os slots internos do MUI.
 */
export const muiTransitionEasing = {
  easeInOut: transitionEasing.easeInOut,
  easeOut: transitionEasing.easeOut,
  easeIn: transitionEasing.easeIn,
  sharp: transitionEasing.linear,
} as const

export type TransitionDurationKey = keyof typeof transitionDuration
export type TransitionEasingKey = keyof typeof transitionEasing
