import { ARRANGEMENTS, ROLE_CATEGORIES, type Role } from '../data/roles'

export interface RoleFilters {
  q: string
  category: string | null
  arrangement: string | null
}

const known = (value: string | null, options: readonly { value: string }[]) => (value && options.some(option => option.value === value) ? value : null)

/** Unknown or tampered URL values are ignored rather than producing an empty list. */
export function parseRoleFilters(params: URLSearchParams): RoleFilters {
  return {
    q: (params.get('q') ?? '').slice(0, 80),
    category: known(params.get('category'), ROLE_CATEGORIES),
    arrangement: known(params.get('arrangement'), ARRANGEMENTS),
  }
}

export function roleFiltersToParams(filters: RoleFilters) {
  const params = new URLSearchParams()
  if (filters.q.trim()) params.set('q', filters.q.trim())
  if (filters.category) params.set('category', filters.category)
  if (filters.arrangement) params.set('arrangement', filters.arrangement)
  return params
}

const normalise = (text: string) => text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')

/** Every word of the query must appear somewhere in the role's searchable text. */
export function filterRoles(roles: Role[], filters: RoleFilters) {
  const words = normalise(filters.q).split(/\s+/).filter(Boolean)
  return roles.filter(role => {
    if (filters.category && role.category !== filters.category) return false
    if (filters.arrangement && role.arrangement !== filters.arrangement) return false
    if (!words.length) return true
    const haystack = normalise([role.title, role.summary, role.sector, role.location, ...role.responsibilities].join(' '))
    return words.every(word => haystack.includes(word))
  })
}
