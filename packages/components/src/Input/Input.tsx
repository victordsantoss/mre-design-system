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
import { Message } from '../Message/Message'

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

    const isError      = status === 'error'
    const feedbackText = statusMessage ?? helperText

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
          {status && feedbackText && (
            <Message id={helperId} variant="feedback" severity={status}>
              {feedbackText}
            </Message>
          )}
          {!status && helperText && (
            <p id={helperId} className="text-base text-muted-foreground">
              {helperText}
            </p>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
