'use client'
/**
 * DatePicker — Seletor de data (GovBR / DSIC)
 * Paridade de API com o pacote MUI; implementação com painel posicionado e lógica em `calendarLogic`.
 */
import * as React from 'react'
import { Input, type InputDensity } from '../Input/Input'
import { Button } from '../Button/Button'
import { cn } from '../utils/cn'
import {
  getCalendarCells,
  MONTHS_LONG_PT,
  WEEKDAY_LABELS_BR_FULL,
  isSameDay,
  compareDay,
  isBetweenDaysExclusive,
  setTimeOfDay,
} from './calendarLogic'

export type DatePickerSelectionMode = 'single' | 'range'

export type DateRangeValue = { start: Date | null; end: Date | null }

export interface DatePickerProps {
  selectionMode?: DatePickerSelectionMode
  value?: Date | null
  onChange?: (date: Date | null) => void
  valueRange?: DateRangeValue
  onRangeChange?: (range: DateRangeValue) => void
  label?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  required?: boolean
  density?: InputDensity
  highlight?: boolean
  inline?: boolean
  helperText?: string
  minDate?: Date
  maxDate?: Date
  shouldDisableDate?: (date: Date) => boolean
  withTime?: boolean
  inputId?: string
}

function formatDisplaySingle(d: Date | null, withTime: boolean): string {
  if (!d) return ''
  const dateStr = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
  if (!withTime) return dateStr
  const t = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
  return `${dateStr}, ${t}`
}

function formatDisplayRange(range: DateRangeValue): string {
  const { start, end } = range
  if (!start && !end) return ''
  if (start && !end) return `${formatDisplaySingle(start, false)} — …`
  if (start && end) return `${formatDisplaySingle(start, false)} — ${formatDisplaySingle(end, false)}`
  return ''
}

function isDisabledDay(
  d: Date,
  minDate?: Date,
  maxDate?: Date,
  shouldDisableDate?: (date: Date) => boolean,
): boolean {
  if (minDate && compareDay(d, minDate) < 0) return true
  if (maxDate && compareDay(d, maxDate) > 0) return true
  if (shouldDisableDate?.(d)) return true
  return false
}

export function DatePicker({
  selectionMode = 'single',
  value = null,
  onChange,
  valueRange = { start: null, end: null },
  onRangeChange,
  label,
  placeholder = 'dd/mm/aaaa',
  disabled,
  required,
  density,
  highlight,
  inline,
  helperText,
  minDate,
  maxDate,
  shouldDisableDate,
  withTime = false,
  inputId: inputIdProp,
}: DatePickerProps) {
  const autoId = React.useId()
  const inputId = inputIdProp ?? `${autoId}-dp`
  const [open, setOpen] = React.useState(false)
  const [view, setView] = React.useState(() => {
    const base = value ?? valueRange.start ?? new Date()
    return { y: base.getFullYear(), m: base.getMonth() }
  })
  const [hour, setHour] = React.useState(() => (value ? value.getHours() : 0))
  const [minute, setMinute] = React.useState(() => (value ? value.getMinutes() : 0))
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const display =
    selectionMode === 'range'
      ? formatDisplayRange(valueRange)
      : formatDisplaySingle(value, withTime)

  const cells = getCalendarCells(view.y, view.m)

  const pickSingle = (d: Date) => {
    let next = d
    if (withTime) next = setTimeOfDay(d, hour, minute)
    onChange?.(next)
    if (!withTime) setOpen(false)
  }

  const pickRange = (d: Date) => {
    const { start, end } = valueRange
    if (!start || (start && end)) {
      onRangeChange?.({ start: d, end: null })
    } else if (start && !end) {
      if (compareDay(d, start) < 0) onRangeChange?.({ start: d, end: start })
      else onRangeChange?.({ start, end: d })
      setOpen(false)
    }
  }

  const onPickDay = (d: Date) => {
    if (isDisabledDay(d, minDate, maxDate, shouldDisableDate)) return
    if (selectionMode === 'range') pickRange(d)
    else pickSingle(d)
  }

  return (
    <div ref={anchorRef} className="relative w-full font-body">
      <Input
        id={inputId}
        label={label}
        placeholder={placeholder}
        value={display}
        readOnly
        disabled={disabled}
        required={required}
        density={density}
        highlight={highlight}
        inline={inline}
        helperText={helperText}
        onClick={() => !disabled && setOpen((o) => !o)}
        endAction={
          <button
            type="button"
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Abrir calendário"
            onClick={() => !disabled && setOpen((o) => !o)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        }
      />

      {open && !disabled && (
        <div
          className="absolute left-0 z-50 mt-1 min-w-[288px] max-w-[320px] rounded-sm border border-border bg-card p-4 font-body shadow-popover"
          role="dialog"
          aria-label="Calendário"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              className="rounded p-1 text-primary hover:bg-muted"
              aria-label="Mês anterior"
              onClick={() => setView((v) => (v.m <= 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }))}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-center font-heading text-base font-semibold capitalize">
              {MONTHS_LONG_PT[view.m]} {view.y}
            </span>
            <button
              type="button"
              className="rounded p-1 text-primary hover:bg-muted"
              aria-label="Próximo mês"
              onClick={() => setView((v) => (v.m >= 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }))}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {WEEKDAY_LABELS_BR_FULL.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map(({ date, outside }) => {
              const dis = isDisabledDay(date, minDate, maxDate, shouldDisableDate)
              const selSingle = selectionMode === 'single' && value && isSameDay(date, value)
              const selStart = selectionMode === 'range' && valueRange.start && isSameDay(date, valueRange.start)
              const selEnd = selectionMode === 'range' && valueRange.end && isSameDay(date, valueRange.end)
              const inRange =
                selectionMode === 'range' &&
                valueRange.start &&
                valueRange.end &&
                isBetweenDaysExclusive(date, valueRange.start, valueRange.end)

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={dis}
                  onClick={() => onPickDay(date)}
                  className={cn(
                    'flex h-9 items-center justify-center rounded text-base',
                    outside && 'text-muted-foreground/50',
                    dis && 'cursor-not-allowed opacity-40',
                    (selSingle || selStart || selEnd) && 'bg-primary font-semibold text-primary-foreground',
                    inRange && 'bg-primary/15',
                    !dis && !selSingle && !selStart && !selEnd && 'hover:bg-muted',
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          {withTime && selectionMode === 'single' && (
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
              <label className="text-base text-muted-foreground">
                Hora
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                  className="ml-2 w-14 rounded border border-input px-1"
                />
              </label>
              <label className="text-base text-muted-foreground">
                Min
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={minute}
                  onChange={(e) => setMinute(Number(e.target.value))}
                  className="ml-2 w-14 rounded border border-input px-1"
                />
              </label>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2 border-t border-border pt-3">
            <Button emphasis="tertiary" density="small" type="button" onClick={() => { onChange?.(null); onRangeChange?.({ start: null, end: null }); setOpen(false) }}>
              Limpar
            </Button>
            <Button emphasis="primary" density="small" type="button" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
