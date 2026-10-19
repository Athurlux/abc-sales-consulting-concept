import { Link, useParams } from 'react-router'
import { Faq } from '../components/Faq'
import { CoverImg } from '../components/Img'
import { ShortlistButton } from '../components/ShortlistButton'
import { PROGRAMMES, findProgramme, formatUGX } from '../data/programmes'
import { CHECKED_ON, SOURCES } from '../data/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function ProgrammeDetail() {
  const { slug } = useParams()
  const programme = findProgramme(slug)
  useDocumentTitle(programme ? programme.name : 'Programme not found')

  if (!programme) {
    return (
      <section className="container not-found">
        <h1>We couldn’t find that programme.</h1>
        <p className="lede">The link may be out of date. All four published levels are on the programmes page.</p>
        <div className="button-row"><Link to="/programmes" className="button button--primary">See all programmes</Link></div>
      </section>
    )
  }

  const next = PROGRAMMES[PROGRAMMES.indexOf(programme) + 1]

  return (
    <article className="programme">
      <header className="programme__hero">
        <div className="container programme__hero-grid">
          <div>
            <p className="kicker"><Link to="/programmes">Programmes</Link> <span aria-hidden="true">/</span> {programme.level}</p>
            <h1>{programme.name}</h1>
            <p className="lede">{programme.short}</p>
            <dl className="key-facts">
              <div><dt>Duration</dt><dd>{programme.duration ?? 'Not published'}</dd></div>
              <div><dt>Published fee</dt><dd>{formatUGX(programme.fee)}</dd></div>
              <div><dt>Format</dt><dd>{programme.format}</dd></div>
            </dl>
            <div className="button-row">
              <Link to={`/register?programme=${programme.id}`} className="button button--primary button--large">Register interest (demo)</Link>
              <ShortlistButton id={programme.id} name={programme.name} />
            </div>
            <p className="source-note">Reference information from the <a href={SOURCES.ladder} rel="noopener">official Sales Ladder page</a>, checked {CHECKED_ON}. No dates or seats are shown because none can be confirmed here.</p>
          </div>
          <div className="programme__cover">
            {programme.cover
              ? <CoverImg cover={programme.cover} sizes="(min-width: 1024px) 30vw, 70vw" />
              : <span className="programme-tile__cover programme-tile__cover--trainer programme-tile__cover--large" aria-hidden="true"><span /><span /><span /><span /></span>}
          </div>
        </div>
      </header>

      <div className="container programme__body">
        <section aria-labelledby="who-title">
          <h2 id="who-title" className="section-title">Who it’s for</h2>
          <p>{programme.forWho}</p>
        </section>
        <section aria-labelledby="focus-title">
          <h2 id="focus-title" className="section-title">What it focuses on</h2>
          <ul className="check-list">{programme.focus.map(item => <li key={item}>{item}</li>)}</ul>
          <p className="fine-print">Summarised from ABC’s published description. Every level works through the same seven-stage process; see <Link to="/sales-ladder">the Sales Ladder</Link>.</p>
        </section>
        <section aria-labelledby="entry-title">
          <h2 id="entry-title" className="section-title">Entry and certification</h2>
          <dl className="plain-facts">
            <div><dt>Eligibility</dt><dd>{programme.eligibility}</dd></div>
            <div><dt>Certification</dt><dd>{programme.certification}</dd></div>
          </dl>
        </section>
        <Faq items={programme.faqs} />
        <section className="next-step" aria-labelledby="next-title">
          <h2 id="next-title" className="section-title">Next step</h2>
          <p>Register interest to see how the journey would work, or talk it through first.</p>
          <div className="button-row">
            <Link to={`/register?programme=${programme.id}`} className="button button--primary">Register interest (demo)</Link>
            <Link to="/discovery-call" className="button button--outline">Request a discovery call</Link>
          </div>
          {next && <p className="next-step__more">Next level up: <Link to={`/programmes/${next.id}`}>{next.name}</Link></p>}
        </section>
      </div>
    </article>
  )
}
