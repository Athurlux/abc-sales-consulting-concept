// Sample roles written for the concept. They are not vacancies, name no hiring
// client and carry no salary, so nothing here can be mistaken for a real offer.

export const ROLE_CATEGORIES = [
  { value: 'field', label: 'Field and retail sales' },
  { value: 'accounts', label: 'Account management' },
  { value: 'leadership', label: 'Sales leadership' },
] as const

export const ARRANGEMENTS = [
  { value: 'on-site', label: 'Office-based' },
  { value: 'field', label: 'Field-based' },
  { value: 'hybrid', label: 'Hybrid' },
] as const

export type RoleCategory = (typeof ROLE_CATEGORIES)[number]['value']
export type Arrangement = (typeof ARRANGEMENTS)[number]['value']

export interface Role {
  slug: string
  title: string
  category: RoleCategory
  arrangement: Arrangement
  location: string
  sector: string
  summary: string
  responsibilities: string[]
  lookingFor: string[]
}

export const ROLES: Role[] = [
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    category: 'field',
    arrangement: 'field',
    location: 'Kampala',
    sector: 'Business services',
    summary: 'Find and win new small-business customers across Kampala, from first call to signed order.',
    responsibilities: [
      'Build a list of prospective customers and contact them each week.',
      'Run discovery meetings and present the right package.',
      'Keep every opportunity up to date in the team’s pipeline.',
      'Ask satisfied customers for introductions.',
    ],
    lookingFor: [
      'At least a year of selling, in any sector.',
      'Comfort meeting people you have never spoken to before.',
      'A habit of following up without being reminded.',
    ],
  },
  {
    slug: 'account-executive',
    title: 'Account Executive',
    category: 'accounts',
    arrangement: 'hybrid',
    location: 'Kampala',
    sector: 'Technology',
    summary: 'Look after a set of existing business customers and grow what they buy.',
    responsibilities: [
      'Hold regular reviews with each account.',
      'Spot new needs early and shape proposals around them.',
      'Work with delivery colleagues so promises are kept.',
      'Forecast your accounts honestly each month.',
    ],
    lookingFor: [
      'Two or more years of business-to-business sales or account management.',
      'Clear written proposals.',
      'Patience with longer decisions involving several people.',
    ],
  },
  {
    slug: 'sales-team-lead',
    title: 'Sales Team Lead',
    category: 'leadership',
    arrangement: 'on-site',
    location: 'Kampala',
    sector: 'Distribution',
    summary: 'Lead a small team of sellers: coach them through deals and keep the pipeline honest.',
    responsibilities: [
      'Run weekly pipeline reviews with the team.',
      'Join sellers on important calls and coach afterwards.',
      'Help set realistic targets and track progress.',
      'Bring new team members up to speed.',
    ],
    lookingFor: [
      'A strong personal sales record.',
      'Some experience guiding or mentoring other sellers.',
      'Calm, direct feedback.',
    ],
  },
  {
    slug: 'retail-sales-associate',
    title: 'Retail Sales Associate',
    category: 'field',
    arrangement: 'on-site',
    location: 'Entebbe',
    sector: 'Consumer retail',
    summary: 'Help walk-in customers choose well, and build the repeat business a showroom depends on.',
    responsibilities: [
      'Greet customers and understand what they need.',
      'Demonstrate products and explain options clearly.',
      'Keep in touch with customers who are still deciding.',
    ],
    lookingFor: [
      'Friendly, confident conversation.',
      'Interest in learning products in depth.',
      'Previous retail experience is useful but not essential.',
    ],
  },
]

export const findRole = (slug: string | undefined) => ROLES.find(role => role.slug === slug)

export const categoryLabel = (value: RoleCategory) => ROLE_CATEGORIES.find(item => item.value === value)?.label ?? value
export const arrangementLabel = (value: Arrangement) => ARRANGEMENTS.find(item => item.value === value)?.label ?? value
