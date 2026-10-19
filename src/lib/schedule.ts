import { addDays, futureDateError, kampalaParts } from './validation'

// Illustrative preference windows, not ABC's real calendar or opening hours.
export const CALL_WINDOWS = [
  { value: 'morning', label: 'Morning, 9:00–12:00', endMinutes: 12 * 60 },
  { value: 'midday', label: 'Midday, 12:00–14:00', endMinutes: 14 * 60 },
  { value: 'afternoon', label: 'Afternoon, 14:00–17:00', endMinutes: 17 * 60 },
]

export const CALL_MAX_DAYS = 60

/** Earliest selectable day: tomorrow in Kampala, so a "today" request is never implied as bookable. */
export const earliestCallDate = (now = new Date()) => addDays(kampalaParts(now).date, 1)

export function callDateError(date: string, now = new Date()): string | null {
  const base = futureDateError(date, now, { maxDays: CALL_MAX_DAYS, label: 'a preferred date' })
  if (base) return base
  if (date < earliestCallDate(now)) return 'Choose tomorrow or a later date (Kampala time).'
  return null
}

/** Weekend days are allowed but flagged, because the concept knows nothing about ABC's working days. */
export function isWeekend(date: string) {
  const day = new Date(`${date}T12:00:00Z`).getUTCDay()
  return day === 0 || day === 6
}
