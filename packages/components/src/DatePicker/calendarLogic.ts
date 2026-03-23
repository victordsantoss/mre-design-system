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

export const WEEKDAY_LABELS_BR = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const

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

/** Define hora do dia (0–23) e minutos na data local. */
export function setTimeOfDay(d: Date, hour24: number, minute: number): Date {
  const next = new Date(d)
  const h = Math.min(23, Math.max(0, Math.floor(hour24)))
  const m = Math.min(59, Math.max(0, Math.floor(minute)))
  next.setHours(h, m, 0, 0)
  return next
}
