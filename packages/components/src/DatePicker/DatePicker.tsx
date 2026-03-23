'use client'
/**
 * DatePicker — Padrão Digital de Governo (DateTimePicker / Datepicker, DS 3.7)
 * Input editável com máscara, painel em Card, navegação mês/ano (setas + select + ano), intervalo e hora 24h.
 */
import * as React from 'react'
import { Input, type InputDensity } from '../Input/Input'
import { Button } from '../Button/Button'
import { Card, CardContent } from '../Card/Card'
import { cn } from '../utils/cn'
import {
  getCalendarCells,
  WEEKDAY_LABELS_BR_FULL,
  isSameDay,
  compareDay,
  isBetweenDaysExclusive,
  setTimeOfDay,
  dateKeyLocal,
  formatDisplaySingle,
  formatDisplayRange,
  parseSinglePtBr,
  parseRangePtBr,
  clampYear,
  isDisabledByRangeSelection,
  maskDateInput,
  monthLabelPt,
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

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]'

function isDisabledDay(
  d: Date,
  minDate?: Date,
  maxDate?: Date,
  shouldDisableDate?: (date: Date) => boolean,
  selectionMode?: DatePickerSelectionMode,
  valueRange?: DateRangeValue,
): boolean {
  if (minDate && compareDay(d, minDate) < 0) return true
  if (maxDate && compareDay(d, maxDate) > 0) return true
  if (shouldDisableDate?.(d)) return true
  if (valueRange && selectionMode) {
    if (isDisabledByRangeSelection(d, selectionMode, valueRange)) return true
  }
  return false
}

const CalendarGlyph = () => (
  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ChevronUpSm = ({ className }: { className?: string }) => (
  <svg className={cn('h-3.5 w-3.5 shrink-0', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

const ChevronDownSm = ({ className }: { className?: string }) => (
  <svg className={cn('h-3.5 w-3.5 shrink-0', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export function DatePicker({
  selectionMode = 'single',
  value = null,
  onChange,
  valueRange = { start: null, end: null },
  onRangeChange,
  label,
  placeholder,
  disabled,
  required,
  density = 'medium',
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
  const panelId = `${inputId}-panel`
  const rootRef = React.useRef<HTMLDivElement>(null)

  const defaultPlaceholder =
    selectionMode === 'range'
      ? 'dd/mm/aaaa e dd/mm/aaaa'
      : withTime
        ? 'dd/mm/aaaa e hh:mm'
        : 'dd/mm/aaaa'

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(() =>
    selectionMode === 'range' ? formatDisplayRange(valueRange) : formatDisplaySingle(value, withTime),
  )
  const [parseError, setParseError] = React.useState<string | null>(null)
  const inputTextRef = React.useRef(inputText)
  inputTextRef.current = inputText

  const baseForView = () => {
    if (selectionMode === 'range') {
      return valueRange.start ?? valueRange.end ?? new Date()
    }
    return value ?? new Date()
  }

  const [view, setView] = React.useState(() => {
    const base = baseForView()
    return { y: base.getFullYear(), m: base.getMonth() }
  })
  const [yearStr, setYearStr] = React.useState(() => String(baseForView().getFullYear()))

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const [hourStr, setHourStr] = React.useState(() => pad2(value?.getHours() ?? 0))
  const [minuteStr, setMinuteStr] = React.useState(() => pad2(value?.getMinutes() ?? 0))

  const valueSignature = React.useMemo(() => {
    if (selectionMode === 'range') {
      const a = valueRange.start?.getTime() ?? ''
      const b = valueRange.end?.getTime() ?? ''
      return `r:${a}|${b}`
    }
    return `s:${value?.getTime() ?? ''}`
  }, [selectionMode, value, valueRange.start, valueRange.end])

  React.useEffect(() => {
    const next =
      selectionMode === 'range' ? formatDisplayRange(valueRange) : formatDisplaySingle(value, withTime)
    inputTextRef.current = next
    setInputText(next)
    setParseError(null)
  }, [valueSignature, selectionMode, withTime, valueRange, value])

  React.useEffect(() => {
    setHourStr(pad2(value?.getHours() ?? 0))
    setMinuteStr(pad2(value?.getMinutes() ?? 0))
  }, [value])

  const syncPanelFromValue = React.useCallback(() => {
    const base =
      selectionMode === 'range'
        ? valueRange.start ?? valueRange.end ?? new Date()
        : value ?? new Date()
    const y = base.getFullYear()
    const m = base.getMonth()
    setView({ y, m })
    setYearStr(String(y))
  }, [selectionMode, value, valueRange.start, valueRange.end])

  const handleOpen = React.useCallback(() => {
    if (disabled) return
    setOpen(true)
    syncPanelFromValue()
  }, [disabled, syncPanelFromValue])

  React.useEffect(() => {
    if (!open) return
    const onDoc = (e: PointerEvent) => {
      const root = rootRef.current
      if (root && !root.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDoc, true)
    return () => document.removeEventListener('pointerdown', onDoc, true)
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const commitInput = React.useCallback(() => {
    const trimmed = inputTextRef.current.trim()
    if (!trimmed) {
      if (selectionMode === 'range') {
        onRangeChange?.({ start: null, end: null })
      } else {
        onChange?.(null)
      }
      inputTextRef.current = ''
      setInputText('')
      setParseError(null)
      return
    }

    if (selectionMode === 'range') {
      const parsed = parseRangePtBr(inputTextRef.current)
      if (!parsed) {
        setParseError('Datas inválidas. Use dd/mm/aaaa e dd/mm/aaaa.')
        return
      }
      const { start, end } = parsed
      if (start && minDate && compareDay(start, minDate) < 0) {
        setParseError('Data inicial fora do intervalo permitido.')
        return
      }
      if (end && minDate && compareDay(end, minDate) < 0) {
        setParseError('Data final fora do intervalo permitido.')
        return
      }
      if (start && maxDate && compareDay(start, maxDate) > 0) {
        setParseError('Data inicial fora do intervalo permitido.')
        return
      }
      if (end && maxDate && compareDay(end, maxDate) > 0) {
        setParseError('Data final fora do intervalo permitido.')
        return
      }
      let out = parsed
      if (start && end && compareDay(end, start) < 0) {
        out = { start: end, end: start }
      }
      onRangeChange?.(out)
      const rangeShown = formatDisplayRange(out)
      inputTextRef.current = rangeShown
      setInputText(rangeShown)
      setParseError(null)
      return
    }

    const d = parseSinglePtBr(inputTextRef.current, withTime)
    if (!d) {
      setParseError('Data inválida.')
      return
    }
    if (minDate && compareDay(d, minDate) < 0) {
      setParseError('Data fora do intervalo permitido.')
      return
    }
    if (maxDate && compareDay(d, maxDate) > 0) {
      setParseError('Data fora do intervalo permitido.')
      return
    }
    onChange?.(d)
    const normalized = formatDisplaySingle(d, withTime)
    inputTextRef.current = normalized
    setInputText(normalized)
    setParseError(null)
  }, [
    selectionMode,
    withTime,
    onChange,
    onRangeChange,
    minDate,
    maxDate,
  ])

  const onInputBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const next = e.relatedTarget as Node | null
      if (next && rootRef.current?.contains(next)) return
      if (!next) {
        requestAnimationFrame(() => {
          if (rootRef.current?.contains(document.activeElement)) return
          commitInput()
        })
        return
      }
      commitInput()
    },
    [commitInput],
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const next =
      selectionMode === 'range' ? raw : maskDateInput(raw, withTime, selectionMode)
    inputTextRef.current = next
    setInputText(next)
    setParseError(null)
  }

  const cells = getCalendarCells(view.y, view.m)
  const today = new Date()

  const dayInRangeBar = (d: Date) => {
    if (selectionMode !== 'range' || !valueRange.start) return false
    if (!valueRange.end) return isSameDay(d, valueRange.start)
    const { start, end } = valueRange
    return (
      isSameDay(d, start) ||
      isSameDay(d, end) ||
      isBetweenDaysExclusive(d, start, end)
    )
  }

  const parsedHourMinute = () => {
    let h = parseInt(hourStr, 10)
    let mi = parseInt(minuteStr, 10)
    if (!Number.isFinite(h)) h = 0
    if (!Number.isFinite(mi)) mi = 0
    return { h: Math.min(23, Math.max(0, h)), mi: Math.min(59, Math.max(0, mi)) }
  }

  const pickSingle = (d: Date) => {
    const { h, mi } = parsedHourMinute()
    let next = d
    if (withTime) next = setTimeOfDay(d, h, mi)
    onChange?.(next)
    const shown = formatDisplaySingle(next, withTime)
    inputTextRef.current = shown
    setInputText(shown)
    if (!withTime) setOpen(false)
  }

  const pickRange = (d: Date) => {
    const { start, end } = valueRange
    if (!start || (start && end)) {
      onRangeChange?.({ start: d, end: null })
      const shown = formatDisplayRange({ start: d, end: null })
      inputTextRef.current = shown
      setInputText(shown)
    } else if (start && !end) {
      if (compareDay(d, start) < 0) onRangeChange?.({ start: d, end: start })
      else onRangeChange?.({ start, end: d })
      setOpen(false)
    }
  }

  const onPickDay = (d: Date) => {
    if (isDisabledDay(d, minDate, maxDate, shouldDisableDate, selectionMode, valueRange)) return
    if (selectionMode === 'range') pickRange(d)
    else pickSingle(d)
  }

  const onMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const m = Number(e.target.value)
    setView((v) => ({ ...v, m }))
  }

  const applyYearDigits = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    setYearStr(digits)
    if (digits.length === 4) {
      const y = parseInt(digits, 10)
      if (Number.isFinite(y)) {
        const cy = clampYear(y)
        setView((v) => ({ ...v, y: cy }))
        if (cy !== y) setYearStr(String(cy))
      }
    }
  }

  const onYearBlur = () => {
    const digits = yearStr.replace(/\D/g, '')
    if (digits.length < 4) {
      setYearStr(String(view.y))
      return
    }
    const y = parseInt(digits, 10)
    if (!Number.isFinite(y)) {
      setYearStr(String(view.y))
      return
    }
    const cy = clampYear(y)
    setView((v) => ({ ...v, y: cy }))
    setYearStr(String(cy))
  }

  const navPrev = () => {
    setView((v) => {
      const next = v.m <= 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }
      setYearStr(String(next.y))
      return next
    })
  }

  const navNext = () => {
    setView((v) => {
      const next = v.m >= 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }
      setYearStr(String(next.y))
      return next
    })
  }

  const applyTimeToValue = () => {
    if (!value || selectionMode !== 'single') return
    const { h, mi } = parsedHourMinute()
    setHourStr(pad2(h))
    setMinuteStr(pad2(mi))
    const next = setTimeOfDay(value, h, mi)
    onChange?.(next)
    const shown = formatDisplaySingle(next, true)
    inputTextRef.current = shown
    setInputText(shown)
  }

  const bumpHour = (delta: number) => {
    let h = parseInt(hourStr, 10)
    if (!Number.isFinite(h)) h = 0
    let mi = parseInt(minuteStr, 10)
    if (!Number.isFinite(mi)) mi = 0
    const nh = (h + delta + 24) % 24
    setHourStr(pad2(nh))
    if (value && selectionMode === 'single') {
      const next = setTimeOfDay(value, nh, mi)
      onChange?.(next)
      const shown = formatDisplaySingle(next, true)
      inputTextRef.current = shown
      setInputText(shown)
    }
  }

  const bumpMinute = (delta: number) => {
    let h = parseInt(hourStr, 10)
    if (!Number.isFinite(h)) h = 0
    let mi = parseInt(minuteStr, 10)
    if (!Number.isFinite(mi)) mi = 0
    const nm = (mi + delta + 60) % 60
    setMinuteStr(pad2(nm))
    if (value && selectionMode === 'single') {
      const next = setTimeOfDay(value, h, nm)
      onChange?.(next)
      const shown = formatDisplaySingle(next, true)
      inputTextRef.current = shown
      setInputText(shown)
    }
  }

  const calendarIcon = (
    <button
      type="button"
      disabled={disabled}
      className={cn('rounded-sm text-primary hover:text-primary-hover', FOCUS_RING, disabled && 'pointer-events-none opacity-45')}
      aria-label="Abrir calendário"
      onPointerDown={(e) => e.preventDefault()}
      onClick={(e) => {
        e.stopPropagation()
        if (disabled) return
        setOpen((o) => !o)
        if (!open) syncPanelFromValue()
      }}
    >
      <CalendarGlyph />
    </button>
  )

  return (
    <div ref={rootRef} className="relative w-full font-body">
      <Input
        id={inputId}
        label={label}
        placeholder={placeholder ?? defaultPlaceholder}
        value={inputText}
        disabled={disabled}
        required={required}
        density={density}
        highlight={highlight}
        inline={inline}
        helperText={parseError ? undefined : helperText}
        status={parseError ? 'error' : undefined}
        statusMessage={parseError ?? undefined}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onFocus={handleOpen}
        onClick={handleOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        autoComplete="off"
        endAction={calendarIcon}
      />

      {open && !disabled && (
        <Card
          id={panelId}
          className="absolute left-0 z-50 mt-1 w-[304px] max-w-[calc(100vw-1rem)] shadow-[var(--shadow-card)]"
          role="dialog"
          aria-modal="true"
          aria-label="Calendário"
        >
          <CardContent className="p-[var(--card-padding)]">
            <div className="mb-2 flex items-center justify-between gap-1.5">
              <button
                type="button"
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-primary hover:bg-muted',
                  FOCUS_RING,
                )}
                aria-label="Mês anterior"
                onClick={navPrev}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
                <div className="relative max-w-[11rem] min-w-0 flex-1">
                  <select
                    className={cn(
                      'h-8 w-full min-w-0 cursor-pointer appearance-none bg-transparent py-0 pl-1 pr-7',
                      'text-center text-up-01 font-semibold text-primary',
                      'border-0 shadow-none outline-none',
                      'rounded-sm',
                      FOCUS_RING,
                    )}
                    aria-label="Mês"
                    value={view.m}
                    onChange={onMonthSelect}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {monthLabelPt(i)}
                      </option>
                    ))}
                  </select>
                  <ChevronDownSm className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-primary" />
                </div>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  aria-label="Ano"
                  className={cn(
                    'h-7 min-h-7 w-[2.75rem] shrink-0 rounded-sm border border-input bg-background px-1 text-center text-sm font-semibold text-primary tabular-nums',
                    FOCUS_RING,
                  )}
                  value={yearStr}
                  onChange={(e) => applyYearDigits(e.target.value)}
                  onBlur={onYearBlur}
                />
              </div>

              <button
                type="button"
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-primary hover:bg-muted',
                  FOCUS_RING,
                )}
                aria-label="Próximo mês"
                onClick={navNext}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-x-0 gap-y-0.5 text-center text-base font-medium text-muted-foreground">
              {WEEKDAY_LABELS_BR_FULL.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div
              className={cn(
                'grid grid-cols-7',
                selectionMode === 'range' ? 'gap-x-0 gap-y-0' : 'gap-x-0 gap-y-0.5',
              )}
              role="grid"
              aria-label="Dias do mês"
            >
              {cells.map(({ date, outside }, cellIndex) => {
                const dis = isDisabledDay(date, minDate, maxDate, shouldDisableDate, selectionMode, valueRange)
                const selSingle = selectionMode === 'single' && value && isSameDay(date, value)
                const selStart = selectionMode === 'range' && valueRange.start && isSameDay(date, valueRange.start)
                const selEnd = selectionMode === 'range' && valueRange.end && isSameDay(date, valueRange.end)
                const inRange =
                  selectionMode === 'range' &&
                  valueRange.start &&
                  valueRange.end &&
                  isBetweenDaysExclusive(date, valueRange.start, valueRange.end)
                const isToday = isSameDay(date, today)

                const rangeComplete =
                  selectionMode === 'range' && valueRange.start && valueRange.end
                const sameRangeDay =
                  rangeComplete &&
                  valueRange.start &&
                  valueRange.end &&
                  isSameDay(valueRange.start, valueRange.end)
                const bar = selectionMode === 'range' && dayInRangeBar(date)
                const prevBar =
                  cellIndex > 0 && dayInRangeBar(cells[cellIndex - 1]!.date) && bar
                const nextBar =
                  cellIndex < cells.length - 1 && dayInRangeBar(cells[cellIndex + 1]!.date) && bar

                const rangeBarStartCap = bar && !prevBar
                const rangeBarEndCap = bar && !nextBar
                const rangeMidTone = bar && rangeComplete && inRange

                return (
                  <button
                    key={dateKeyLocal(date)}
                    type="button"
                    role="gridcell"
                    disabled={dis}
                    onClick={() => onPickDay(date)}
                    className={cn(
                      'flex h-9 items-center justify-center text-base font-semibold',
                      selectionMode === 'range' ? 'min-w-0 w-full' : 'w-9 rounded-full',
                      FOCUS_RING,
                      selectionMode === 'single' && 'text-primary',
                      outside && !bar && 'font-normal text-primary/50',
                      dis && 'cursor-not-allowed font-normal text-muted-foreground/45 opacity-100',
                      selectionMode === 'single' &&
                        isToday &&
                        !selSingle &&
                        'bg-primary/15 text-primary ring-0',
                      selectionMode === 'single' &&
                        selSingle &&
                        'bg-primary text-primary-foreground ring-0',
                      selectionMode === 'single' &&
                        !dis &&
                        !selSingle &&
                        !(isToday && !selSingle) &&
                        'hover:bg-primary/10',
                      selectionMode === 'range' &&
                        !bar &&
                        isToday &&
                        'rounded-full bg-primary/15 text-primary ring-0',
                      selectionMode === 'range' &&
                        !bar &&
                        !isToday &&
                        !dis &&
                        'rounded-full text-primary hover:bg-primary/10',
                      bar &&
                        (sameRangeDay || !rangeComplete) &&
                        'rounded-full bg-primary font-semibold text-primary-foreground ring-0',
                      bar &&
                        rangeComplete &&
                        !sameRangeDay &&
                        cn(
                          'ring-0',
                          !rangeBarStartCap && !rangeBarEndCap && 'rounded-none',
                          rangeBarStartCap && !rangeBarEndCap && 'rounded-l-full rounded-r-none',
                          !rangeBarStartCap && rangeBarEndCap && 'rounded-r-full rounded-l-none',
                          (selStart || selEnd) && 'bg-primary font-semibold text-primary-foreground',
                          rangeMidTone &&
                            'font-semibold text-primary-foreground [background-color:color-mix(in_srgb,var(--color-primary)_52%,white)] dark:[background-color:color-mix(in_srgb,var(--color-primary)_45%,var(--color-background))]',
                        ),
                    )}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            {withTime && selectionMode === 'single' && (
              <div className="mt-3 border-t border-border pt-3">
                <fieldset>
                  <legend className="sr-only">Horário</legend>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        type="button"
                        className={cn(
                          'flex h-5 w-9 items-center justify-center rounded-sm text-primary hover:bg-primary/10',
                          FOCUS_RING,
                        )}
                        aria-label="Aumentar hora"
                        onClick={() => bumpHour(1)}
                      >
                        <ChevronUpSm />
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        aria-label="Hora"
                        className={cn(
                          'box-border h-9 w-9 rounded-sm border border-input bg-background text-center text-base font-semibold text-foreground tabular-nums',
                          FOCUS_RING,
                        )}
                        value={hourStr}
                        onChange={(e) => setHourStr(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        onBlur={applyTimeToValue}
                      />
                      <button
                        type="button"
                        className={cn(
                          'flex h-5 w-9 items-center justify-center rounded-sm text-primary hover:bg-primary/10',
                          FOCUS_RING,
                        )}
                        aria-label="Diminuir hora"
                        onClick={() => bumpHour(-1)}
                      >
                        <ChevronDownSm />
                      </button>
                    </div>

                    <span className="select-none text-up-01 font-semibold leading-none text-foreground" aria-hidden>
                      :
                    </span>

                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        type="button"
                        className={cn(
                          'flex h-5 w-9 items-center justify-center rounded-sm text-primary hover:bg-primary/10',
                          FOCUS_RING,
                        )}
                        aria-label="Aumentar minutos"
                        onClick={() => bumpMinute(1)}
                      >
                        <ChevronUpSm />
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        aria-label="Minutos"
                        className={cn(
                          'box-border h-9 w-9 rounded-sm border border-input bg-background text-center text-base font-semibold text-foreground tabular-nums',
                          FOCUS_RING,
                        )}
                        value={minuteStr}
                        onChange={(e) => setMinuteStr(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        onBlur={applyTimeToValue}
                      />
                      <button
                        type="button"
                        className={cn(
                          'flex h-5 w-9 items-center justify-center rounded-sm text-primary hover:bg-primary/10',
                          FOCUS_RING,
                        )}
                        aria-label="Diminuir minutos"
                        onClick={() => bumpMinute(-1)}
                      >
                        <ChevronDownSm />
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2 border-t border-border pt-3">
              <Button
                emphasis="tertiary"
                density="small"
                type="button"
                onClick={() => {
                  onChange?.(null)
                  onRangeChange?.({ start: null, end: null })
                  inputTextRef.current = ''
                  setInputText('')
                  setHourStr('00')
                  setMinuteStr('00')
                  setParseError(null)
                  setOpen(false)
                }}
              >
                Limpar
              </Button>
              <Button emphasis="primary" density="small" type="button" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
