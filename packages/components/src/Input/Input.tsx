'use client'
/**
 * Input — Padrão Digital de Governo (GovBR)
 *
 * Campo de entrada de texto com suporte a:
 *   - Três densidades: small (32px), medium (40px), large (48px)
 *   - Versão destaque (highlight): fundo cinza, 56px, sem borda
 *   - Estados de validação: success | error | warning | info
 *   - Ícone ilustrativo à esquerda (startIcon)
 *   - Ação interna à direita (endAction)
 *   - Rótulo posição inline (lateral)
 *   - Mensagem de feedback e texto auxiliar
 *   - Acessibilidade: aria-invalid, aria-describedby, labels associados
 */
import * as React from 'react'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export type InputDensity = 'small' | 'medium' | 'large'
export type InputStatus  = 'success' | 'error' | 'warning' | 'info'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Rótulo exibido acima (padrão) ou ao lado (inline) do campo */
  label?: React.ReactNode
  /** Densidade: small (32px) | medium (40px, padrão) | large (48px) */
  density?: InputDensity
  /** Versão destaque: fundo cinza, sem borda, altura 56px */
  highlight?: boolean
  /** Estado de validação */
  status?: InputStatus
  /** Mensagem de feedback vinculada ao estado */
  statusMessage?: string
  /** Texto auxiliar exibido abaixo do campo */
  helperText?: string
  /** Ícone ilustrativo no lado esquerdo (dentro do campo) */
  startIcon?: React.ReactNode
  /** Ação interna no lado direito (ex.: mostrar/ocultar senha) */
  endAction?: React.ReactNode
  /** Posiciona rótulo e campo lado a lado */
  inline?: boolean
  /** Exibe asterisco no rótulo */
  required?: boolean
}

// ─────────────────────────────────────────────
// Altura por densidade
// ─────────────────────────────────────────────

const DENSITY_HEIGHT: Record<InputDensity, string> = {
  small:  'h-8  min-h-8',   // 32px
  medium: 'h-10 min-h-10',  // 40px
  large:  'h-12 min-h-12',  // 48px
}

const DENSITY_FONTSIZE: Record<InputDensity, string> = {
  small:  'text-base',
  medium: 'text-up-01',
  large:  'text-up-01',
}

// ─────────────────────────────────────────────
// Ícones de status (SVG inline — sem dependências externas)
// ─────────────────────────────────────────────

const StatusIcons: Record<InputStatus, React.FC<{ className?: string }>> = {
  success: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

// Cores do helper text por status
const STATUS_HELPER_COLOR: Record<InputStatus, string> = {
  success: 'text-success',
  error:   'text-destructive',
  warning: 'text-[color:var(--color-warning-readable-on-light)]',
  info:    'text-info',
}

// Cor da borda por status
const STATUS_BORDER_COLOR: Record<InputStatus, string> = {
  success: 'border-success focus-within:border-success',
  error:   'border-destructive focus-within:border-destructive',
  warning: 'border-warning focus-within:border-warning',
  info:    'border-info focus-within:border-info',
}

// ─────────────────────────────────────────────
// Componente Input
// ─────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      label,
      density = 'medium',
      highlight = false,
      status,
      statusMessage,
      helperText,
      startIcon,
      endAction,
      inline = false,
      required = false,
      disabled = false,
      id,
      ...props
    },
    ref,
  ) {
    const generatedId = React.useId()
    const resolvedId  = id ?? `input-${generatedId}`
    const helperId    = `${resolvedId}-helper`

    const isError     = status === 'error'
    const feedbackText = statusMessage ?? helperText
    const StatusIcon   = status ? StatusIcons[status] : null

    const heightClass = highlight
      ? 'h-14 min-h-14'
      : DENSITY_HEIGHT[density]

    const fontClass = DENSITY_FONTSIZE[density]

    const borderColorClass = status
      ? STATUS_BORDER_COLOR[status]
      : 'border-input focus-within:border-primary'

    const bgClass = highlight
      ? 'bg-muted border-0 focus-within:border-0 focus-within:ring-2 focus-within:ring-primary/30'
      : 'bg-background border'

    return (
      <div className={cn('flex w-full font-body', inline ? 'flex-row items-center gap-4' : 'flex-col gap-1', className)}>
        {/* Rótulo */}
        {label && (
          <label
            htmlFor={resolvedId}
            className={cn(
              'text-base font-semibold text-foreground',
              disabled && 'opacity-45',
              inline ? 'shrink-0' : '',
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-destructive" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* Campo + helper */}
        <div className={cn('flex flex-col gap-1', inline ? 'flex-1' : '')}>
          {/* Wrapper do input */}
          <div
            className={cn(
              'relative flex items-center rounded-md transition-colors duration-gov-fast',
              heightClass,
              bgClass,
              borderColorClass,
              disabled && 'opacity-45 pointer-events-none',
            )}
          >
            {/* Ícone esquerdo */}
            {startIcon && (
              <span className="absolute left-3 flex items-center text-muted-foreground">
                {startIcon}
              </span>
            )}

            {/* Input nativo */}
            <input
              ref={ref}
              id={resolvedId}
              disabled={disabled}
              required={required}
              aria-invalid={isError || undefined}
              aria-describedby={feedbackText ? helperId : undefined}
              aria-required={required || undefined}
              className={cn(
                'h-full w-full bg-transparent outline-none',
                'placeholder:text-muted-foreground',
                fontClass,
                'text-foreground',
                startIcon  ? 'pl-9'  : 'pl-3',
                endAction  ? 'pr-10' : 'pr-3',
                highlight  && 'pl-4 pr-4',
              )}
              {...props}
            />

            {/* Ação direita */}
            {endAction && (
              <span className="absolute right-2 flex items-center">
                {endAction}
              </span>
            )}
          </div>

          {/* Feedback / helper text */}
          {feedbackText && (
            <p
              id={helperId}
              className={cn(
                'flex items-center gap-1 text-base',
                status ? STATUS_HELPER_COLOR[status] : 'text-muted-foreground',
              )}
            >
              {StatusIcon && <StatusIcon />}
              {feedbackText}
            </p>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
