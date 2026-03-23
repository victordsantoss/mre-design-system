/**
 * Semantic Color Tokens — Padrão Digital de Governo (GovBR)
 * Mapeia os tokens primitivos para roles semânticos de UI.
 *
 * **Leitura e fundos** seguem `govEspecificacao` (Especificação Leitura + FUNDO CLARO + FUNDO ESCURO).
 * **Marca e feedback:** primária #1351B4; interação em fundo escuro #C5D4EB; secundária #071D41;
 * info #155BCB / #D4E5FF; sucesso #168821 / #E3F5E1; aviso #FFCD07 / #FFF5C2; erro #E52207 / #FDB8AE.
 */
import { blueWarmVivid, blueWarm, greenCoolVivid, yellowVivid, redVivid, gray, pure } from '../primitives/colors'
import { govEspecificacao } from './gov-spec'

export const semanticColors = {
  /**
   * Cor primária — Blue Warm Vivid 70 (#1351B4)
   * Usada em botões, links e elementos interativos principais (fundo claro).
   */
  primary: {
    main: blueWarmVivid[70],
    light: blueWarmVivid[40],
    dark: blueWarmVivid[80],
    contrastText: pure[0],
  },

  /**
   * Cor secundária — Blue Warm Vivid 90 (#071D41)
   * Header escuro e superfícies de contraste do GovBR.
   */
  secondary: {
    main: blueWarmVivid[90],
    light: blueWarm[70],
    dark: pure[100],
    contrastText: pure[0],
  },

  /**
   * Erro — Red Vivid 50 (#E52207)
   */
  error: {
    main: redVivid[50],
    light: redVivid[30],
    dark: redVivid[70],
    contrastText: pure[0],
    surface: redVivid[10],
  },

  /**
   * Aviso — Yellow Vivid 20 (#FFCD07)
   * Texto sobre fundo de aviso deve ser escuro (gray 90).
   */
  warning: {
    main: yellowVivid[20],
    light: yellowVivid[10],
    dark: yellowVivid[50],
    contrastText: gray[90],
    surface: yellowVivid[5],
  },

  /**
   * Sucesso — Green Cool Vivid 50 (#168821)
   */
  success: {
    main: greenCoolVivid[50],
    light: greenCoolVivid[30],
    dark: greenCoolVivid[70],
    contrastText: pure[0],
    surface: greenCoolVivid[5],
  },

  /**
   * Informação — Blue Warm Vivid 60 (#155BCB)
   */
  info: {
    main: blueWarmVivid[60],
    light: blueWarmVivid[30],
    dark: blueWarmVivid[80],
    contrastText: pure[0],
    surface: blueWarmVivid[10],
  },

  /**
   * Superfícies — FUNDO CLARO: P (`--pure-0`) em default/paper; A (`--gray-2`) em surface.
   * FUNDO ESCURO: P (`--blue-warm-vivid-90`), A (`--blue-warm-vivid-80`) — ver `createItamaratyDarkTheme`.
   */
  background: {
    default: govEspecificacao.fundoClaro.principal.hex,
    paper: govEspecificacao.fundoClaro.principal.hex,
    surface: govEspecificacao.fundoClaro.alternativo.hex,
    dark: govEspecificacao.fundoEscuro.principal.hex,
    darkAlt: govEspecificacao.fundoEscuro.alternativo.hex,
  },

  /**
   * Texto — Leitura: P em claro (`--gray-80`); P em escuro (`--pure-0` via `onDark`).
   */
  text: {
    primary: govEspecificacao.leitura.fundoClaro.hex,
    secondary: gray[60],
    disabled: gray[40],
    onDark: govEspecificacao.leitura.fundoEscuro.hex,
    link: blueWarmVivid[70],
  },

  /**
   * Elementos interativos sobre fundo escuro (ex.: header GovBR)
   */
  interactiveOnDark: {
    main: blueWarmVivid[20], // #C5D4EB
    contrastText: blueWarmVivid[90],
  },
} as const
