/** Proposed concept wordmark from the asset pack, not ABC's official identity. */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'ivory' }) {
  return <img className="logo" src={`/brand/logo-${tone}.svg`} width={560} height={132} alt="ABC Sales Consulting" />
}
