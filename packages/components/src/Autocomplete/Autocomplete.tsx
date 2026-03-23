'use client'
/**
 * Autocomplete — Padrão Digital de Governo (GovBR)
 * Campo com lista de sugestões; API alinhada ao pacote MUI (subset de props).
 */
import * as React from 'react'
import { Input, type InputDensity, type InputStatus } from '../Input/Input'
import { cn } from '../utils/cn'

export type AutocompleteOption = { label: string; [key: string]: unknown } | string

export function getOptionLabel(opt: AutocompleteOption): string {
  return typeof opt === 'string' ? opt : opt.label
}

export interface AutocompleteProps<T extends AutocompleteOption = AutocompleteOption> {
  options: T[]
  value: T | string | null
  onChange: (v: T | string | null) => void
  label?: React.ReactNode
  placeholder?: string
  density?: InputDensity
  highlight?: boolean
  status?: InputStatus
  statusMessage?: string
  helperText?: string
  startIcon?: React.ReactNode
  required?: boolean
  inline?: boolean
  inputId?: string
  getOptionLabel?: (option: T | string) => string
  loading?: boolean
  disabled?: boolean
  className?: string
  /** Filtra opções visíveis (padrão: contém texto, case-insensitive) */
  filterOptions?: (options: T[], input: string) => T[]
}

export function Autocomplete<T extends AutocompleteOption = AutocompleteOption>({
  options,
  value,
  onChange,
  label,
  placeholder,
  density,
  highlight,
  status,
  statusMessage,
  helperText,
  startIcon,
  required,
  inline,
  inputId: inputIdProp,
  getOptionLabel: getOpt = getOptionLabel as (o: T | string) => string,
  loading,
  disabled,
  className,
  filterOptions,
}: AutocompleteProps<T>) {
  const autoId = React.useId()
  const inputId = inputIdProp ?? `${autoId}-input`
  const listId = `${autoId}-listbox`
  const [open, setOpen] = React.useState(false)
  const [inputVal, setInputVal] = React.useState(() => (value != null ? getOpt(value) : ''))
  const [highlighted, setHighlighted] = React.useState(0)
  const wrapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setInputVal(value != null ? getOpt(value) : '')
  }, [value, getOpt])

  const defaultFilter = React.useCallback((opts: T[], q: string) => {
    const s = q.trim().toLowerCase()
    if (!s) return opts
    return opts.filter((o) => getOpt(o).toLowerCase().includes(s))
  }, [getOpt])

  const filtered = (filterOptions ?? defaultFilter)(options, inputVal)

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const selectOption = (opt: T) => {
    onChange(opt)
    setInputVal(getOpt(opt))
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && filtered[highlighted]) {
      e.preventDefault()
      selectOption(filtered[highlighted])
    }
  }

  return (
    <div ref={wrapRef} className={cn('relative w-full font-body', className)}>
      <Input
        id={inputId}
        label={label}
        placeholder={placeholder}
        density={density}
        highlight={highlight}
        status={status}
        statusMessage={statusMessage}
        helperText={helperText}
        startIcon={startIcon}
        required={required}
        inline={inline}
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value)
          setOpen(true)
          setHighlighted(0)
          onChange(null)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-[530px] w-full overflow-y-auto rounded-sm border border-border bg-card py-0 shadow-popover"
        >
          {loading ? (
            <li className="px-4 py-3 text-up-01 text-muted-foreground">Carregando…</li>
          ) : filtered.length === 0 ? (
            <li className="flex items-center gap-2 px-4 py-3 text-up-01 text-muted-foreground">
              <span>Nenhum resultado encontrado</span>
            </li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={getOpt(opt) + String(i)}
                role="option"
                aria-selected={i === highlighted}
                className={cn(
                  'cursor-pointer border-t border-border px-4 py-3 text-up-01 first:border-t-0',
                  i === highlighted && 'bg-primary/10',
                )}
                onMouseEnter={() => setHighlighted(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(opt)}
              >
                {getOpt(opt)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
