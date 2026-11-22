import { Language } from '../types'

/**
 * Returns month key in YYYY-MM format
 */
export function getMonthKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/**
 * Shifts a YYYY-MM month key by a given offset of months
 */
export function shiftMonthKey(currentKey: string, offset: number): string {
  const year = Number(currentKey.slice(0, 4))
  const monthIndex = Number(currentKey.slice(5, 7)) - 1
  const date = new Date(year, monthIndex + offset, 1)
  return getMonthKey(date)
}

/**
 * Formats a localized long month label (e.g., "Noviembre de 2026" / "November 2026")
 */
export function formatMonthLabel(monthKey: string, lang: Language = 'es'): string {
  const year = Number(monthKey.slice(0, 4))
  const monthIndex = Number(monthKey.slice(5, 7)) - 1
  const date = new Date(year, monthIndex, 1)
  const locale = lang === 'es' ? 'es-CO' : 'en-US'
  const formatted = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

/**
 * Formats a localized short month label (e.g., "Nov 2026")
 */
export function formatShortMonthLabel(monthKey: string, lang: Language = 'es'): string {
  const year = Number(monthKey.slice(0, 4))
  const monthIndex = Number(monthKey.slice(5, 7)) - 1
  const date = new Date(year, monthIndex, 1)
  const locale = lang === 'es' ? 'es-CO' : 'en-US'
  const formatted = date.toLocaleDateString(locale, { month: 'short', year: 'numeric' })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a localized readable date
 */
export function formatExpenseDate(isoDateStr: string, lang: Language = 'es'): string {
  // Use T12:00:00 to avoid timezone date shifts across GMT offsets
  const date = new Date(`${isoDateStr}T12:00:00`)
  const locale = lang === 'es' ? 'es-CO' : 'en-US'
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' })
}

/**
 * Calculates days remaining in the month (for current month, days from today to month-end; for past/future, total days in month)
 */
export function getDaysLeftInMonth(monthKeyStr: string): number {
  const now = new Date()
  const isCurrentMonth = monthKeyStr === getMonthKey(now)
  const year = Number(monthKeyStr.slice(0, 4))
  const month = Number(monthKeyStr.slice(5, 7))

  if (isCurrentMonth) {
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    return Math.max(1, lastDayOfMonth - now.getDate() + 1)
  }

  return new Date(year, month, 0).getDate()
}
