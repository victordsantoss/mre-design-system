'use client'
/**
 * Select — Padrão Digital de Governo (GovBR)
 *
 * Campo de seleção única alinhado ao Input: mesmas densidades, borda cinza,
 * foco via primary, estados de validação, lista com realce GovBR.
 * Implementação com elemento <select> nativo acessível.
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import type { InputDensity, InputStatus } from '../Input/Input'
import { Message } from '../Message/Message'

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export interface SelectOption<T extends string | number = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface SelectProps<T extends string | number = string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange' | 'value'> {
  /** Rótulo acima ou inline */
  label?: React.ReactNode
  /** Opções da lista */
  options: SelectOption<T>[]
  /** Valor controlado */
  value?: T | '' | null | undefined
  onChange?: (value: T | '') => void
  /** Texto quando nada selecionado */
  placeholder?: string
  density?: InputDensity
  highlight?: boolean
  status?: InputStatus
  statusMessage?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  inline?: boolean
  fullWidth?: boolean
}

// Altura por densidade (mesma escala do Input)
const DENSITY_HEIGHT: Record<InputDensity, string> = {
  small:  'h-8 min-h-8',
  medium: 'h-10 min-h-10',
  large:  'h-12 min-h-12',
}

const STATUS_BORDER_COLOR: Record<InputStatus, string> = {
  success: 'border-success focus:border-success',
  error:   'border-destructive focus:border-destructive',
  warning: 'border-warning focus:border-warning',
  info:    'border-info focus:border-info',
}

// Seta SVG do select
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="pointer-events-none h-4 w-4 text-primary" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ─────────────────────────────────────────────
// Componente Select
// ─────────────────────────────────────────────

function SelectInner<T extends string | number = string>(
  {
    className,
    label,
    options,
    value,
    onChange,
    placeholder = 'Selecione',
    density = 'medium',
    highlight = false,
    status,
    statusMessage,
    helperText,
    disabled = false,
    required = false,
    inline = false,
    fullWidth = true,
    id,
    ...props
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>,
) {
  const generatedId  = React.useId()
  const resolvedId   = id ?? `select-${generatedId}`
  const helperId     = `${resolvedId}-helper`

  const isError      = status === 'error'
  const feedbackText = statusMessage ?? helperText

  const heightClass = highlight
    ? 'h-14 min-h-14'
    : DENSITY_HEIGHT[density]

  const borderColorClass = status
    ? STATUS_BORDER_COLOR[status]
    : 'border-input focus:border-primary'

  const bgClass = highlight
    ? 'bg-muted border-0 focus:ring-2 focus:ring-primary/30'
    : 'bg-background border'

  const raw = value === null || value === undefined ? '' : String(value)

  return (
    <div className={cn('flex font-body', inline ? 'flex-row items-center gap-4' : 'flex-col gap-1', fullWidth ? 'w-full' : '', className)}>
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
          {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
        </label>
      )}

      <div className={cn('flex flex-col gap-1', inline ? 'flex-1' : '', fullWidth ? 'w-full' : '')}>
        {/* Wrapper posicionado para ícone da seta */}
        <div
          className={cn(
            'relative flex items-center rounded-md transition-colors duration-gov-fast',
            heightClass,
            bgClass,
            borderColorClass,
            disabled && 'opacity-45 pointer-events-none',
          )}
        >
          <select
            ref={ref}
            id={resolvedId}
            disabled={disabled}
            required={required}
            value={raw}
            aria-invalid={isError || undefined}
            aria-describedby={feedbackText ? helperId : undefined}
            aria-required={required || undefined}
            onChange={(e) => {
              const v = e.target.value
              if (!onChange) return
              if (v === '') {
                onChange('')
                return
              }
              const opt = options.find((o) => String(o.value) === v)
              if (opt) onChange(opt.value as T | '')
            }}
            className={cn(
              'h-full w-full appearance-none bg-transparent outline-none',
              'pl-3 pr-9',
              'text-up-01 text-foreground',
              raw === '' && 'text-muted-foreground',
              highlight && 'pl-4',
            )}
            {...props}
          >
            <option value="" disabled={required}>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Seta */}
          <span className="absolute right-3 flex items-center">
            <ChevronDown />
          </span>
        </div>

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
}

const Select = React.forwardRef(SelectInner) as <T extends string | number = string>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => React.ReactElement

export { Select }
