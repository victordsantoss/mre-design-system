'use client'
/**
 * Select — Padrão Digital de Governo (GovBR)
 *
 * Campo de seleção única com dropdown customizado usando List + Item.
 * Mesmas densidades, borda cinza, foco azul e estados de validação do Input.
 *
 * Acessibilidade: padrão combobox + listbox (ARIA 1.2)
 *   - trigger: role="combobox" + aria-expanded + aria-controls
 *   - dropdown: role="listbox"
 *   - opções: role="option" + aria-selected
 *   - Teclado: ArrowUp/Down, Enter, Escape, Tab
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import type { InputDensity, InputStatus } from '../Input/Input'
import { Message } from '../Message/Message'
import { List } from '../List/List'
import { Item } from '../Item/Item'

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export interface SelectOption<T extends string | number = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface SelectProps<T extends string | number = string> {
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
  id?: string
  className?: string
  'aria-label'?: string
}

// ─────────────────────────────────────────────
// Constantes visuais
// ─────────────────────────────────────────────

const DENSITY_HEIGHT: Record<InputDensity, string> = {
  small:  'h-8 min-h-8',
  medium: 'h-10 min-h-10',
  large:  'h-12 min-h-12',
}

const STATUS_BORDER_COLOR: Record<InputStatus, string> = {
  success: 'border-success',
  error:   'border-destructive',
  warning: 'border-warning',
  info:    'border-info',
}

// ─────────────────────────────────────────────
// Chevron animado
// ─────────────────────────────────────────────

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'pointer-events-none h-4 w-4 text-primary transition-transform duration-200',
        open && 'rotate-180',
      )}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

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
    'aria-label': ariaLabel,
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const [open, setOpen] = React.useState(false)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const listboxRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => triggerRef.current!)

  const generatedId = React.useId()
  const resolvedId  = id ?? `select-${generatedId}`
  const helperId    = `${resolvedId}-helper`
  const listboxId   = `${resolvedId}-listbox`
  const labelId     = label ? `${resolvedId}-label` : undefined

  const isError      = status === 'error'
  const feedbackText = statusMessage ?? helperText
  const raw          = value === null || value === undefined ? '' : String(value)
  const selectedOpt  = options.find((o) => String(o.value) === raw)

  // ── Fechar ao clicar fora
  React.useEffect(() => {
    if (!open) return
    const handle = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handle)
    return () => document.removeEventListener('pointerdown', handle)
  }, [open])

  // ── Scroll do item em foco para a área visível
  React.useEffect(() => {
    if (!open || focusedIndex < 0 || !listboxRef.current) return
    const items = listboxRef.current.querySelectorAll<HTMLElement>('[role="option"]')
    items[focusedIndex]?.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex, open])

  // ── Índices de opções habilitadas (para saltar desabilitadas no teclado)
  const enabledIndices = options
    .map((o, i) => ({ o, i }))
    .filter(({ o }) => !o.disabled)
    .map(({ i }) => i)

  const openDropdown = () => {
    if (disabled) return
    const cur = options.findIndex((o) => String(o.value) === raw)
    setFocusedIndex(cur >= 0 ? cur : enabledIndices[0] ?? 0)
    setOpen(true)
  }

  const handleSelect = (optValue: T) => {
    onChange?.(optValue)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openDropdown()
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break

      case 'ArrowDown': {
        e.preventDefault()
        const next = enabledIndices.find((i) => i > focusedIndex)
        if (next !== undefined) setFocusedIndex(next)
        break
      }

      case 'ArrowUp': {
        e.preventDefault()
        const prev = [...enabledIndices].reverse().find((i) => i < focusedIndex)
        if (prev !== undefined) setFocusedIndex(prev)
        break
      }

      case 'Enter':
      case ' ': {
        e.preventDefault()
        const opt = options[focusedIndex]
        if (opt && !opt.disabled) handleSelect(opt.value)
        break
      }

      case 'Tab':
        setOpen(false)
        break
    }
  }

  // ── Classes visuais do trigger
  const heightClass      = highlight ? 'h-14 min-h-14' : DENSITY_HEIGHT[density]
  const borderColorClass = status
    ? STATUS_BORDER_COLOR[status]
    : open ? 'border-primary' : 'border-input hover:border-primary/60'
  const bgClass = highlight
    ? 'bg-muted border-0 ring-0 focus-visible:ring-2 focus-visible:ring-primary/30'
    : 'bg-background border'

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex font-body',
        inline ? 'flex-row items-center gap-4' : 'flex-col gap-1',
        fullWidth ? 'w-full' : '',
        className,
      )}
    >
      {/* Rótulo */}
      {label && (
        <label
          id={labelId}
          htmlFor={resolvedId}
          className={cn(
            'text-base font-semibold text-foreground',
            disabled && 'opacity-45',
            inline && 'shrink-0',
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Campo + feedback */}
      <div className={cn('relative flex flex-col gap-1', inline && 'flex-1', fullWidth && 'w-full')}>

        {/* Trigger */}
        <button
          ref={triggerRef}
          id={resolvedId}
          type="button"
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          aria-labelledby={labelId}
          aria-label={ariaLabel}
          aria-invalid={isError || undefined}
          aria-describedby={feedbackText ? helperId : undefined}
          aria-required={required || undefined}
          onClick={() => (open ? setOpen(false) : openDropdown())}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative flex w-full items-center rounded-md text-left',
            'pl-3 pr-9 text-up-01',
            'transition-colors duration-gov-fast',
            heightClass,
            bgClass,
            borderColorClass,
            disabled && 'opacity-45 pointer-events-none',
            !selectedOpt ? 'text-muted-foreground' : 'text-foreground',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
            highlight && 'pl-4',
          )}
        >
          <span className="flex-1 truncate">
            {selectedOpt ? selectedOpt.label : placeholder}
          </span>
          <span className="absolute right-3 flex items-center">
            <ChevronDown open={open} />
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            aria-label={!labelId ? (ariaLabel ?? placeholder) : undefined}
            className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-background shadow-md"
          >
            <List>
              {options.map((opt, i) => (
                <Item
                  key={String(opt.value)}
                  role="option"
                  aria-selected={String(opt.value) === raw}
                  selected={String(opt.value) === raw}
                  active={i === focusedIndex}
                  disabled={opt.disabled}
                  onClick={() => { if (!opt.disabled) handleSelect(opt.value) }}
                >
                  {opt.label}
                </Item>
              ))}
            </List>
          </div>
        )}

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
}

const Select = React.forwardRef(SelectInner) as <T extends string | number = string>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => React.ReactElement

export { Select }
