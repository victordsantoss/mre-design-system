/** Utilitários de calendário (datas locais, sem dependências externas). */

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function compareDay(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

export function isBetweenDaysExclusive(day: Date, a: Date, b: Date): boolean {
  const d = startOfDay(day).getTime()
  const t1 = startOfDay(a).getTime()
  const t2 = startOfDay(b).getTime()
  const lo = Math.min(t1, t2)
  const hi = Math.max(t1, t2)
  return d > lo && d < hi
}

/** Chave estável yyyy-mm-dd no fuso local (evita toISOString em chaves de lista). */
export function dateKeyLocal(d: Date): string {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Grade 6×7 com domingo na primeira coluna (padrão gov.br / locale BR). */
export function getCalendarCells(viewYear: number, viewMonth0: number): { date: Date; outside: boolean }[] {
  const first = new Date(viewYear, viewMonth0, 1)
  const startPad = first.getDay()
  const start = new Date(viewYear, viewMonth0, 1 - startPad)
  const cells: { date: Date; outside: boolean }[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    cells.push({
      date,
      outside: date.getMonth() !== viewMonth0,
    })
  }
  return cells
}

/** Abreviações 3 letras — alinhado ao PDF GovBR (ex.: «Sab»). */
export const WEEKDAY_LABELS_BR_FULL = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'] as const

export const MONTHS_LONG_PT = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const

export const MONTHS_SHORT_PT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
] as const

/** Mês por extenso com inicial maiúscula (tom GovBR). */
export function monthLabelPt(m0: number): string {
  const s = MONTHS_LONG_PT[m0]
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

/** Define hora do dia (0–23) e minutos na data local. */
export function setTimeOfDay(d: Date, hour24: number, minute: number): Date {
  const next = new Date(d)
  const h = Math.min(23, Math.max(0, Math.floor(hour24)))
  const m = Math.min(59, Math.max(0, Math.floor(minute)))
  next.setHours(h, m, 0, 0)
  return next
}

/** Separador GovBR para intervalo no campo (ex.: «08/02/2020 e 12/02/2020»). */
export const RANGE_SEP = ' e '

const RANGE_SEP_LEGACY = ' — '

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatDateOnlyPtBr(d: Date): string {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`
}

export function formatDisplaySingle(d: Date | null, withTime: boolean): string {
  if (!d) return ''
  const dateStr = formatDateOnlyPtBr(d)
  if (!withTime) return dateStr
  const t = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
  return `${dateStr} ${t}`
}

export function formatDisplayRange(range: { start: Date | null; end: Date | null }): string {
  const { start, end } = range
  if (!start && !end) return ''
  if (start && !end) return `${formatDateOnlyPtBr(start)}${RANGE_SEP}…`
  if (start && end) return `${formatDateOnlyPtBr(start)}${RANGE_SEP}${formatDateOnlyPtBr(end)}`
  return ''
}

/**
 * Data dd/mm/aaaa; com hora: espaço, vírgula ou « e » antes de HH:mm (24h), p.ex. GovBR «dd/mm/aaaa e hh:mm».
 */
export function parseSinglePtBr(s: string, withTime: boolean): Date | null {
  const trimmed = s.trim()
  if (!trimmed) return null

  const timeSuffix = withTime
    ? String.raw`(?:(?:\s*,\s*|\s+e\s+|\s+)(\d{1,2}):(\d{2}))?`
    : ''
  const re = new RegExp(`^\\s*(\\d{1,2})/(\\d{1,2})/(\\d{4})${timeSuffix}\\s*$`, 'i')
  const m = trimmed.match(re)
  if (!m) return null

  const day = Number(m[1])
  const month = Number(m[2])
  const year = Number(m[3])
  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const d = new Date(year, month - 1, day)
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null

  if (withTime && m[4] !== undefined && m[4] !== '') {
    const hh = Number(m[4])
    const mm = Number(m[5])
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null
    d.setHours(hh, mm, 0, 0)
  } else if (withTime) {
    d.setHours(0, 0, 0, 0)
  } else {
    d.setHours(0, 0, 0, 0)
  }

  return d
}

/** Parte campo em «dd/mm/aaaa e dd/mm/aaaa» (aceita também « — » legado). */
function splitRangeInput(trimmed: string): { startStr: string; endPart: string } {
  if (trimmed.includes(RANGE_SEP_LEGACY)) {
    const parts = trimmed.split(RANGE_SEP_LEGACY)
    return {
      startStr: parts[0]?.trim() ?? '',
      endPart: parts.slice(1).join(RANGE_SEP_LEGACY).trim(),
    }
  }
  const parts = trimmed.split(/\s+e\s+/i)
  if (parts.length >= 2) {
    return {
      startStr: parts[0]?.trim() ?? '',
      endPart: parts.slice(1).join(' e ').trim(),
    }
  }
  return { startStr: trimmed, endPart: '' }
}

/** Intervalo: "dd/mm/aaaa e dd/mm/aaaa" ou só início (ignora "…"). */
export function parseRangePtBr(s: string): { start: Date | null; end: Date | null } | null {
  const trimmed = s.trim()
  if (!trimmed) return { start: null, end: null }

  const { startStr, endPart } = splitRangeInput(trimmed)
  if (!startStr) return { start: null, end: null }

  const start = parseSinglePtBr(startStr, false)
  if (!start) return null

  if (!endPart || endPart === '…' || endPart === '...') {
    return { start, end: null }
  }

  const end = parseSinglePtBr(endPart, false)
  if (!end) return null

  return { start, end }
}

export function clampYear(y: number, min = 1900, max = 2100): number {
  return Math.min(max, Math.max(min, Math.floor(y)))
}

/**
 * No modo intervalo, após escolher só a data inicial, dias antes dela ficam desabilitados (GovBR).
 */
export function isDisabledByRangeSelection(
  d: Date,
  selectionMode: 'single' | 'range',
  range: { start: Date | null; end: Date | null },
): boolean {
  if (selectionMode !== 'range') return false
  const { start, end } = range
  if (!start || end) return false
  return compareDay(d, start) < 0
}

/**
 * Máscara progressiva por dígitos. Com hora: 8 dígitos data + até 4 hora → exibição «dd/mm/aaaa hh:mm» (espaço GovBR).
 */
export function maskDateInput(raw: string, withTime: boolean, selectionMode: 'single' | 'range'): string {
  if (selectionMode === 'range') {
    return raw
  }

  if (!withTime) {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
  }

  const digits = raw.replace(/\D/g, '').slice(0, 12)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  if (digits.length <= 8) {
    const d = digits
    return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
  }

  const d = digits.slice(0, 8)
  const t = digits.slice(8)
  const dateFormatted = `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
  if (t.length === 0) return dateFormatted
  if (t.length <= 2) return `${dateFormatted} ${t}`
  return `${dateFormatted} ${t.slice(0, 2)}:${t.slice(2, 4)}`
}
