import { toggleShortlist, useShortlist } from '../lib/shortlist'
import { announce } from './Announcer'
import { Icon } from './Icon'

export function ShortlistButton({ id, name }: { id: string; name: string }) {
  const shortlisted = useShortlist().includes(id)
  return (
    <button
      type="button"
      className={`button button--small button--ghost shortlist ${shortlisted ? 'is-on' : ''}`}
      aria-pressed={shortlisted}
      aria-label={`Shortlist ${name}`}
      onClick={() => {
        toggleShortlist(id)
        announce(shortlisted ? `${name} removed from your shortlist` : `${name} added to your shortlist`)
      }}
    >
      <Icon name={shortlisted ? 'check' : 'plus'} size={16} /> {shortlisted ? 'Shortlisted' : 'Shortlist'}
    </button>
  )
}
