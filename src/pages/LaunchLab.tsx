import { useRef } from 'react'
import { Link } from 'react-router'
import { useSiteMotion } from '../animation/useSiteMotion'
import { DemoNote } from '../components/DemoNote'
import { SceneImg } from '../components/Img'
import { LAUNCH_LAB, formatUGX } from '../data/programmes'
import { CHECKED_ON, SOURCES } from '../data/site'
import { FormFlow } from '../forms/FormFlow'
import { launchFlow } from '../forms/flows'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function LaunchLab() {
  useDocumentTitle('Career Launch Lab')
  const root = useRef<HTMLDivElement>(null)
  useSiteMotion(root)

  return (
    <div ref={root} className="launch">
      <header className="launch-hero">
        <div className="container launch-hero__grid">
          <div className="launch-hero__text">
            <p className="kicker kicker--light">For Year 13 leavers aged 18–20</p>
            <h1>Career Launch Lab</h1>
            <p className="lede">Six weeks of real selling before university: talk to customers, build a team venture and pitch it on Launch Day.</p>
            <dl className="key-facts key-facts--light">
              <div><dt>Published length</dt><dd>{LAUNCH_LAB.duration}</dd></div>
              <div><dt>Published fee</dt><dd>{formatUGX(LAUNCH_LAB.fee)}</dd></div>
              <div><dt>Age group</dt><dd>18–20</dd></div>
            </dl>
            <a href="#interest" className="button button--primary button--large">Register interest (demo)</a>
          </div>
          <div className="launch-hero__art">
            <img src="/images/cover-launch-lab-500.webp" srcSet="/images/cover-launch-lab-500.webp 500w, /images/cover-launch-lab-1000.webp 1000w" sizes="(min-width: 1024px) 26vw, 60vw" width={1000} height={1200} alt="" />
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="themes-title">
        <div className="container launch-themes">
          <h2 className="section-title" id="themes-title">Five themes, in order</h2>
          <ol className="theme-steps">
            {LAUNCH_LAB.themes.map((theme, index) => (
              <li key={theme.title} style={{ '--step': index } as React.CSSProperties} data-anim="card">
                <span className="theme-steps__name">{theme.title}</span>
                <span>{theme.line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="outcomes-title">
        <div className="container launch-split">
          <figure data-anim="reveal">
            <SceneImg name="launch-lab" alt="Four young adults working on a pitch together around laptops (AI-generated illustration of fictional participants)." sizes="(min-width: 1024px) 50vw, 100vw" />
          </figure>
          <div data-anim="reveal">
            <h2 className="section-title" id="outcomes-title">What participants leave with</h2>
            <ul className="check-list">{LAUNCH_LAB.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
            <p className="source-note">
              Summarised from the <a href={SOURCES.launchLab} rel="noopener">official Launch Lab page</a>, checked {CHECKED_ON}. That page gave a
              start date of {LAUNCH_LAB.publishedStart}, which has passed. No later intake is shown here; ask ABC about future dates.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="interest" aria-labelledby="interest-title" tabIndex={-1}>
        <div className="container interest">
          <div className="interest__intro">
            <h2 className="section-title" id="interest-title">Register interest</h2>
            <p>For the young person or a parent or guardian. We only ask for the enquirer’s contact details.</p>
            <DemoNote>It shows how an interest form could work. Nothing is sent and no place is held on any intake.</DemoNote>
          </div>
          <FormFlow flow={launchFlow} referencePrefix="LAB" restartLabel="Start a new enquiry" printable doneLinks={[{ label: 'Explore other programmes', to: '/programmes' }]} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container split-callout">
          <p>Older than 20, or already working? The <Link to="/programmes/foundational-selling">Foundational Selling</Link> programme is aimed at people who already sell.</p>
        </div>
      </section>
    </div>
  )
}
