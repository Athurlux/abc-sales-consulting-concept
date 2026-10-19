import { Link, useParams } from 'react-router'
import { arrangementLabel, categoryLabel, findRole } from '../data/roles'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function RoleMissing() {
  return (
    <section className="container not-found">
      <h1>We couldn’t find that sample role.</h1>
      <p className="lede">The link may be out of date. Remember that every role on this concept site is a demonstration.</p>
      <div className="button-row"><Link to="/careers" className="button button--primary">See sample roles</Link></div>
    </section>
  )
}

export default function RoleDetail() {
  const { slug } = useParams()
  const role = findRole(slug)
  useDocumentTitle(role ? `${role.title} (demo role)` : 'Role not found')
  if (!role) return <RoleMissing />

  return (
    <article className="container role">
      <p className="kicker"><Link to="/careers">Careers</Link> <span aria-hidden="true">/</span> Sample role</p>
      <h1>{role.title}</h1>
      <p className="notice notice--demo"><strong>Demo opportunity — not an active vacancy.</strong> No employer, salary or opening is implied.</p>
      <p className="lede">{role.summary}</p>
      <dl className="key-facts">
        <div><dt>Role type</dt><dd>{categoryLabel(role.category)}</dd></div>
        <div><dt>Arrangement</dt><dd>{arrangementLabel(role.arrangement)}</dd></div>
        <div><dt>Location</dt><dd>{role.location}</dd></div>
        <div><dt>Sector</dt><dd>{role.sector}</dd></div>
      </dl>
      <div className="role__cols">
        <section aria-labelledby="do-title">
          <h2 id="do-title" className="section-title">What you would do</h2>
          <ul className="check-list">{role.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section aria-labelledby="look-title">
          <h2 id="look-title" className="section-title">What helps</h2>
          <ul className="check-list">{role.lookingFor.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <div className="button-row">
        <Link to={`/careers/${role.slug}/apply`} className="button button--primary button--large">Try the demo application</Link>
        <Link to="/careers" className="button button--outline button--large">Back to sample roles</Link>
      </div>
    </article>
  )
}
