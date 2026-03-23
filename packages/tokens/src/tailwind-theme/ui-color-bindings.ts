import { toKebabSegment } from './casing'

function dsRef(...parts: string[]): string {
  const name = parts.map(toKebabSegment).join('-')
  return `var(--ds-color-${name})`
}

/**
 * `--color-*` de UI → `var(--ds-color-*)`.
 * Valores claros/escuros vêm só da troca de `--ds-color-*` em `.dark`.
 */
export const uiColorVarAliases: Record<string, string> = {
  '--color-background': dsRef('background', 'default'),
  '--color-foreground': dsRef('text', 'primary'),
  '--color-card': dsRef('background', 'paper'),
  '--color-card-foreground': dsRef('text', 'primary'),
  '--color-primary': dsRef('primary', 'main'),
  '--color-primary-foreground': dsRef('primary', 'contrastText'),
  '--color-primary-hover': dsRef('primary', 'dark'),
  '--color-primary-subtle': dsRef('info', 'surface'),
  '--color-secondary': dsRef('secondary', 'main'),
  '--color-secondary-foreground': dsRef('secondary', 'contrastText'),
  '--color-destructive': dsRef('error', 'main'),
  '--color-destructive-foreground': dsRef('error', 'contrastText'),
  '--color-destructive-subtle': dsRef('error', 'surface'),
  '--color-success': dsRef('success', 'main'),
  '--color-success-foreground': dsRef('success', 'contrastText'),
  '--color-success-subtle': dsRef('success', 'surface'),
  '--color-warning': dsRef('warning', 'main'),
  '--color-warning-foreground': dsRef('warning', 'contrastText'),
  '--color-warning-subtle': dsRef('warning', 'surface'),
  '--color-warning-readable-on-light': dsRef('warning', 'readableOnNeutral'),
  '--color-info': dsRef('info', 'main'),
  '--color-info-foreground': dsRef('info', 'contrastText'),
  '--color-info-subtle': dsRef('info', 'surface'),
}
