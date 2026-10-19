import { Link, useSearchParams } from 'react-router'
import { PageIntro } from '../components/PageIntro'
import { SceneImg } from '../components/Img'
import { ARRANGEMENTS, ROLES, ROLE_CATEGORIES, arrangementLabel, categoryLabel } from '../data/roles'
import { SOURCES } from '../data/site'
import { filterRoles, parseRoleFilters, roleFiltersToParams, type RoleFilters } from '../lib/roleFilters'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Careers() {
  useDocumentTitle('Careers')
  const [params, setParams] = useSearchParams()
  const filters = parseRoleFilters(params)
  const results = filterRoles(ROLES, filters)
  const active = Boolean(filters.q || filters.category || filters.arrangement)

  // Typing replaces the history entry; choosing a filter adds one, so Back undoes it.
  const apply = (patch: Partial<RoleFilters>, replace = false) => setParams(roleFiltersToParams({ ...filters, ...patch }), { replace })

  return (
    <>
      <PageIntro
        kicker="Careers"
        title="Sales careers"
        aside={<figure className="intro-figure"><SceneImg name="recruitment" alt="A candidate talking with two interviewers across a desk (AI-generated illustration)." sizes="(min-width: 1024px) 36vw, 100vw" priority /></figure>}
      >
        <p>ABC also recruits sales people for other organisations. To show how a careers section could work, this concept uses a few sample roles.</p>
        <p className="notice notice--demo"><strong>These are demo opportunities, not active vacancies.</strong> For real openings, see ABC’s <a href={SOURCES.careers} rel="noopener">official careers page</a>.</p>
      </PageIntro>

      <section className="container section section--tight" aria-labelledby="roles-title">
        <h2 className="visually-hidden" id="roles-title">Sample roles</h2>
        <form className="role-filters" role="search" onSubmit={event => event.preventDefault()}>
          <div className="field">
            <label className="field__label" htmlFor="role-q">Search roles</label>
            <input id="role-q" className="input" type="search" value={filters.q} placeholder="For example, account or retail" onChange={event => apply({ q: event.target.value }, true)} />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="role-category">Role type</label>
            <select id="role-category" className="input input--select" value={filters.category ?? ''} onChange={event => apply({ category: event.target.value || null })}>
              <option value="">All role types</option>
              {ROLE_CATEGORIES.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="role-arrangement">Work arrangement</label>
            <select id="role-arrangement" className="input input--select" value={filters.arrangement ?? ''} onChange={event => apply({ arrangement: event.target.value || null })}>
              <option value="">Any arrangement</option>
              {ARRANGEMENTS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          {active && <button type="button" className="button button--ghost button--small role-filters__reset" onClick={() => setParams(new URLSearchParams())}>Reset filters</button>}
        </form>

        <p className="results-count" id="results-count" aria-live="polite"><strong>{results.length}</strong> sample {results.length === 1 ? 'role' : 'roles'}</p>

        {results.length ? (
          <ul className="role-list">
            {results.map(role => (
              <li key={role.slug} className="role-row">
                <div>
                  <p className="role-row__flag">Demo opportunity — not an active vacancy</p>
                  <h3 className="role-row__title"><Link to={`/careers/${role.slug}`}>{role.title}</Link></h3>
                  <p>{role.summary}</p>
                </div>
                <dl className="role-row__facts">
                  <div><dt>Type</dt><dd>{categoryLabel(role.category)}</dd></div>
                  <div><dt>Arrangement</dt><dd>{arrangementLabel(role.arrangement)}</dd></div>
                  <div><dt>Location</dt><dd>{role.location}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p className="empty-state__title">No sample roles match these filters.</p>
            <p>Try fewer words, or clear the filters to see all {ROLES.length}.</p>
            <button type="button" className="button button--primary" onClick={() => setParams(new URLSearchParams())}>Reset filters</button>
          </div>
        )}
      </section>

      <section className="section section--stone" aria-labelledby="employers-title">
        <div className="container split-callout">
          <div>
            <h2 className="section-title" id="employers-title">Hiring sales people?</h2>
            <p>ABC’s recruitment support helps organisations find sales talent.</p>
          </div>
          <Link to="/organisations#recruitment" className="button button--outline">Recruitment support</Link>
        </div>
      </section>
    </>
  )
}
