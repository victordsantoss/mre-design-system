/**
 * GovBR Input — constantes de layout alinhadas ao pacote MUI (`Input/styles.ts`).
 * Úteis para Autocomplete, DatePicker e extensões que precisam das mesmas métricas.
 */
import type { InputDensity, InputStatus } from './Input'

export const DENSITY_HEIGHT: Record<InputDensity, number> = {
  small: 32,
  medium: 40,
  large: 48,
}

export const HIGHLIGHT_HEIGHT = 56

export const FONT_SIZES: Record<InputDensity, string> = {
  small: '0.875rem',
  medium: '1.05rem',
  large: '1.05rem',
}

export function verticalPadding(height: number, lineHeightPx = 24): string {
  return `${Math.max(0, (height - lineHeightPx) / 2)}px`
}

/** Cor de helper por estado — hex GovBR alinhados a semanticColors */
export function helperTextColorHex(status?: InputStatus): string {
  if (!status) return '#666666'
  switch (status) {
    case 'success':
      return '#168821'
    case 'error':
      return '#E52207'
    case 'warning':
      return '#BF920C'
    case 'info':
      return '#155BCB'
    default:
      return '#666666'
  }
}
