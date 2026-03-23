/**
 * Primitive Color Tokens — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Fundamentos Visuais
 * Based on: U.S. Web Design System (USWDS)
 *
 * Cores canônicas do guia **cores** (Gov.br): #FFFFFF, #333333, #1351B4, #C5D4EB,
 * #F8F8F8, #071D41, #155BCB, #D4E5FF, #168821, #E3F5E1, #FFCD07, #FFF5C2,
 * #E52207, #FDB8AE.
 *
 * Naming convention: the number represents lightness (90=darkest, 5=lightest)
 */

/** Blue Warm Vivid — cor primária interativa do GovBR */
export const blueWarmVivid = {
  90: '#071D41',
  80: '#0C326F',
  70: '#1351B4', // Primary interactive (light bg)
  60: '#155BCB', // Info
  50: '#2672DE',
  40: '#5994D3',
  30: '#98BAE7',
  20: '#C5D4EB', // Primary interactive (dark bg)
  10: '#D4E5FF', // Info background
  5: '#EDF5FF',
} as const

/** Blue Warm — variação sem vivacidade */
export const blueWarm = {
  90: '#13171F',
  80: '#222A38',
  70: '#374157',
  60: '#4A5A78',
  50: '#627095',
  40: '#8896B3',
  30: '#ADBACF',
  20: '#C8D2E3',
  10: '#DDE3EF',
  5: '#ECF1F7',
} as const

/** Green Cool Vivid — sucesso */
export const greenCoolVivid = {
  80: '#19311E',
  70: '#154C21',
  60: '#1A7A2E',
  50: '#168821', // Success primary
  40: '#2EA843',
  30: '#5DC06E',
  20: '#9EDBA2',
  10: '#C7EFC4',
  5: '#E3F5E1', // Success background
} as const

/** Yellow Vivid — aviso/alerta */
export const yellowVivid = {
  80: '#422D19',
  70: '#5C3D0B',
  60: '#775809',
  50: '#967117',
  40: '#BF920C',
  30: '#E2B007',
  20: '#FFCD07', // Warning primary
  10: '#FFF2C3',
  5: '#FFF5C2', // Warning background
} as const

/** Red Vivid — erro */
export const redVivid = {
  80: '#5C1111',
  70: '#8B1A1A',
  60: '#B51D09',
  50: '#E52207', // Error primary
  40: '#EF4E35',
  30: '#F8856B',
  20: '#F8B4A2',
  10: '#FDB8AE', // Superfície de erro (guia cores Gov.br)
  5: '#FFF3F2',
} as const

/** Gray — neutros */
export const gray = {
  90: '#1B1B1B',
  80: '#333333', // Text primary (light bg)
  70: '#555555',
  60: '#666666',
  50: '#757575',
  40: '#909090',
  30: '#ADADAD',
  20: '#C6C6C6',
  10: '#DCDCDC',
  5: '#F0F0F0',
  2: '#F8F8F8', // Background surface alt
  1: '#FCFCFC',
} as const

/** Pure — extremos */
export const pure = {
  0: '#FFFFFF',   // White / Background surface
  100: '#000000', // Black
} as const

/**
 * Paleta completa de primitivos — re-export agrupado
 */
export const primitiveColors = {
  blueWarmVivid,
  blueWarm,
  greenCoolVivid,
  yellowVivid,
  redVivid,
  gray,
  pure,
} as const
