/**
 * Semantic Color Tokens — Padrão Digital de Governo (GovBR)
 * Fonte: Fundamentos Visuais › Cores (superfície, leitura, interação, feedback).
 *
 * Dois temas explícitos (`semanticColorsLight`, `semanticColorsDark`).
 * `semanticColors` aponta para o tema claro (retrocompatível).
 */
import { blueWarmVivid, blueWarm, greenCoolVivid, yellowVivid, redVivid, gray, pure } from '../primitives/colors'
import { govEspecificacao } from './gov-spec'

/** Forma comum dos tokens semânticos por tema (claro | escuro). */
export type SemanticColorTheme = {
  primary: {
    main: string
    light: string
    dark: string
    contrastText: string
  }
  secondary: {
    main: string
    light: string
    dark: string
    contrastText: string
  }
  error: {
    main: string
    light: string
    dark: string
    contrastText: string
    surface: string
  }
  warning: {
    main: string
    light: string
    dark: string
    contrastText: string
    surface: string
    /** Texto/ícone de aviso legível sobre neutro claro */
    readableOnNeutral: string
  }
  success: {
    main: string
    light: string
    dark: string
    contrastText: string
    surface: string
  }
  info: {
    main: string
    light: string
    dark: string
    contrastText: string
    surface: string
  }
  /** Superfícies do tema (P = principal, A = alternativa do documento). */
  background: {
    default: string
    paper: string
    surface: string
  }
  /** Leitura contrastante com a superfície do tema. */
  text: {
    primary: string
    secondary: string
    disabled: string
    link: string
  }
  /**
   * Interação em fundo escuro — GovBR: P `#C5D4EB` (`--blue-warm-20`).
   * Tema claro: uso típico em header/barra `#071D41`. Tema escuro: alinhado à primária interativa.
   */
  interactiveOnDark: {
    main: string
    contrastText: string
  }
}

/**
 * Tema claro — FUNDO CLARO + leitura `#333333` + interação `#1351B4` + feedbacks do guia.
 */
export const semanticColorsLight: SemanticColorTheme = {
  primary: {
    main: blueWarmVivid[70],
    light: blueWarmVivid[40],
    dark: blueWarmVivid[80],
    contrastText: pure[0],
  },
  secondary: {
    main: blueWarmVivid[90],
    light: blueWarm[70],
    dark: pure[100],
    contrastText: pure[0],
  },
  error: {
    main: redVivid[50],
    light: redVivid[30],
    dark: redVivid[70],
    contrastText: pure[0],
    surface: redVivid[10],
  },
  warning: {
    main: yellowVivid[20],
    light: yellowVivid[10],
    dark: yellowVivid[50],
    contrastText: gray[90],
    surface: yellowVivid[5],
    readableOnNeutral: yellowVivid[50],
  },
  success: {
    main: greenCoolVivid[50],
    light: greenCoolVivid[30],
    dark: greenCoolVivid[70],
    contrastText: pure[0],
    surface: greenCoolVivid[5],
  },
  info: {
    main: blueWarmVivid[60],
    light: blueWarmVivid[30],
    dark: blueWarmVivid[80],
    contrastText: pure[0],
    surface: blueWarmVivid[10],
  },
  background: {
    default: govEspecificacao.fundoClaro.principal.hex,
    paper: govEspecificacao.fundoClaro.principal.hex,
    surface: govEspecificacao.fundoClaro.alternativo.hex,
  },
  text: {
    primary: govEspecificacao.leitura.fundoClaro.hex,
    secondary: gray[60],
    disabled: gray[40],
    link: blueWarmVivid[70],
  },
  interactiveOnDark: {
    /** GovBR: `--blue-warm-20` no guia = `#C5D4EB` (alinhado a `blueWarmVivid[20]` nesta paleta). */
    main: blueWarmVivid[20],
    contrastText: blueWarmVivid[90],
  },
}

/**
 * Tema escuro — FUNDO ESCURO (`#071D41` / `#0C326F`) + leitura `#FFFFFF` + interação `#C5D4EB`.
 * Feedbacks mantêm as cores P do guia; superfícies de estado usam tons mais escuros da mesma família.
 */
export const semanticColorsDark: SemanticColorTheme = {
  primary: {
    main: blueWarmVivid[20],
    light: blueWarmVivid[30],
    dark: pure[0],
    contrastText: blueWarmVivid[90],
  },
  secondary: {
    main: blueWarmVivid[80],
    light: blueWarmVivid[70],
    dark: blueWarmVivid[90],
    contrastText: pure[0],
  },
  error: {
    main: redVivid[50],
    light: redVivid[40],
    dark: redVivid[70],
    contrastText: pure[0],
    surface: redVivid[80],
  },
  warning: {
    main: yellowVivid[20],
    light: yellowVivid[30],
    dark: yellowVivid[50],
    contrastText: gray[90],
    surface: yellowVivid[80],
    readableOnNeutral: yellowVivid[50],
  },
  success: {
    main: greenCoolVivid[50],
    light: greenCoolVivid[40],
    dark: greenCoolVivid[70],
    contrastText: pure[0],
    surface: greenCoolVivid[80],
  },
  info: {
    main: blueWarmVivid[60],
    light: blueWarmVivid[50],
    dark: blueWarmVivid[70],
    contrastText: pure[0],
    /** Tom informativo sobre fundo `#071D41` sem coincidir com `background.surface` (`#0C326F`). */
    surface: blueWarm[70],
  },
  background: {
    default: govEspecificacao.fundoEscuro.principal.hex,
    paper: govEspecificacao.fundoEscuro.principal.hex,
    surface: govEspecificacao.fundoEscuro.alternativo.hex,
  },
  text: {
    primary: govEspecificacao.leitura.fundoEscuro.hex,
    secondary: gray[30],
    disabled: gray[50],
    link: blueWarmVivid[20],
  },
  interactiveOnDark: {
    main: blueWarmVivid[20],
    contrastText: blueWarmVivid[90],
  },
}

/** Igual a `semanticColorsLight` — mantido para compatibilidade com imports existentes. */
export const semanticColors: SemanticColorTheme = semanticColorsLight
