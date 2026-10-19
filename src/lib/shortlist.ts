import { useSyncExternalStore } from 'react'
import { PROGRAMMES } from '../data/programmes'

// The only thing this site persists: a versioned list of known programme IDs.
// No personal details are ever written to storage.
const KEY = 'abc-concept-shortlist'
const VERSION = 1
const KNOWN = new Set(PROGRAMMES.map(programme => programme.id))

/** Reads defensively: stale, foreign or tampered values become an empty list. */
export function parseShortlist(raw: string | null): string[] {
  if (!raw) return []
  try {
    const value = JSON.parse(raw) as { version?: unknown; ids?: unknown }
    if (value?.version !== VERSION || !Array.isArray(value.ids)) return []
    return [...new Set(value.ids.filter((id): id is string => typeof id === 'string' && KNOWN.has(id)))]
  } catch {
    return []
  }
}

export const serializeShortlist = (ids: string[]) => JSON.stringify({ version: VERSION, ids })

let current: string[] = []
let loaded = false
const listeners = new Set<() => void>()

function read() {
  if (!loaded) {
    loaded = true
    try { current = parseShortlist(localStorage.getItem(KEY)) } catch { current = [] }
  }
  return current
}

function write(ids: string[]) {
  current = ids
  try { localStorage.setItem(KEY, serializeShortlist(ids)) } catch { /* storage unavailable: keep it for this visit */ }
  listeners.forEach(listener => listener())
}

export function toggleShortlist(id: string) {
  if (!KNOWN.has(id)) return
  const ids = read()
  write(ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id])
}

const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }

export const useShortlist = () => useSyncExternalStore(subscribe, read, () => [] as string[])
