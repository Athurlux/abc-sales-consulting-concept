import { useRef } from 'react'
import { Link } from 'react-router'
import { useSiteMotion } from '../animation/useSiteMotion'
import { SalesSteps } from '../components/Steps'
import { PROGRAMMES, formatUGX } from '../data/programmes'
import { CHECKED_ON, SOURCES } from '../data/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function SalesLadder() {
  useDocumentTitle('The Sales Ladder')
  const root = useRef<HTMLDivElement>(null)
  useSiteMotion(root)

  return (
    <div ref={root}>
      <header className="ladder-hero">
        <div className="container ladder-hero__grid">
          <div>
            <p className="kicker">ABC’s published method</p>
            <h1>The Sales Ladder</h1>
            <p className="lede">
              One seven-stage process, from finding a prospect to earning a referral. Every programme level climbs the same
              steps, each time deeper and on harder deals. A sales mindset sits underneath all of it.
            </p>
          </div>
          <img
            className="ladder-hero__sculpture"
            data-anim="drift"
            src="/images/growth-sculpture-960.webp"
            srcSet="/images/growth-sculpture-480.webp 480w, /images/growth-sculpture-960.webp 960w"
            sizes="(min-width: 1024px) 34vw, 70vw"
            width={1254}
            height={1254}
            alt=""
            decoding="async"
          />
        </div>
      </header>

      <section className="ladder-band ladder-band--page" aria-labelledby="stages-title">
        <div className="container">
          <h2 className="section-title" id="stages-title">The seven stages</h2>
          <SalesSteps detailed />
          <p className="ladder-band__note">Stage names follow ABC’s published framework. The one-line descriptions are written for this concept.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="levels-title">
        <div className="container">
          <div className="section-head" data-anim="reveal">
            <h2 className="section-title" id="levels-title">Climbing the levels</h2>
            <p>Each level returns to the same stages with a different job in mind.</p>
          </div>
          <ol className="level-steps">
            {PROGRAMMES.map((programme, index) => (
              <li key={programme.id} className="level-step" style={{ '--step': index } as React.CSSProperties} data-anim="card">
                <p className="level-step__level">{programme.level}</p>
                <h3><Link to={`/programmes/${programme.id}`}>{programme.name}</Link></h3>
                <p>{programme.short}</p>
                <p className="level-step__meta">{programme.duration ?? 'Duration not published'}. Published fee {formatUGX(programme.fee)}.</p>
              </li>
            ))}
          </ol>
          <p className="source-note">Levels, durations and fees from the <a href={SOURCES.ladder} rel="noopener">official Sales Ladder page</a>, checked {CHECKED_ON}.</p>
          <div className="button-row">
            <Link to="/programmes" className="button button--primary">Compare programmes</Link>
            <Link to="/programmes#fit" className="button button--outline">Find your starting level</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
