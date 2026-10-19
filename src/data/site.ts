// Facts taken from ABC Sales Consulting's public website. They are dated references:
// the concept never presents them as live availability. See docs/CONTENT-NOTES.md.

export const CHECKED_ON = '19 October 2026'

export const SOURCES = {
  home: 'https://abcsalesconsulting.net/',
  ladder: 'https://abcsalesconsulting.net/sales-ladder/',
  launchLab: 'https://abcsalesconsulting.net/launch-lab/',
  careers: 'https://abcsalesconsulting.net/careers/',
}

/**
 * The official site lists one email but two phone numbers and two plot numbers
 * (Plot 8 in its banner, Plot 18 in its footer). Neither is chosen here.
 */
export const CONTACT = {
  area: 'Ntinda, Kampala',
  email: 'admin@abcsalesconsulting.net',
  phones: [
    { number: '+256 748 019 936', href: 'tel:+256748019936', where: 'listed in the official site’s footer' },
    { number: '0791 178 657', href: 'tel:+256791178657', where: 'listed in the official site’s top banner' },
  ],
}

export const PORTFOLIO_URL = 'https://arthur-kitandwe.kranks533.workers.dev'

export const SALES_PROCESS = [
  { id: 'prospecting', title: 'Prospecting', line: 'Finding the people and organisations worth talking to.' },
  { id: 'rapport', title: 'Building rapport', line: 'Earning enough trust for an honest conversation.' },
  { id: 'needs', title: 'Identifying needs', line: 'Asking until the real problem is on the table.' },
  { id: 'presenting', title: 'Presenting', line: 'Showing how the offer answers that problem.' },
  { id: 'objections', title: 'Handling objections', line: 'Treating a concern as information, not rejection.' },
  { id: 'closing', title: 'Closing', line: 'Asking for the decision clearly and confidently.' },
  { id: 'referrals', title: 'Getting referrals', line: 'Turning a satisfied customer into the next lead.' },
] as const
