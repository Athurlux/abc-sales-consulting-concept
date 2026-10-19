import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useSiteMotion } from '../animation/useSiteMotion'
import { CoverImg } from '../components/Img'
import { PageIntro } from '../components/PageIntro'
import { ShortlistButton } from '../components/ShortlistButton'
import { PROGRAMMES, findProgramme, formatUGX } from '../data/programmes'
import { CHECKED_ON, SOURCES } from '../data/site'
import { recommendProgramme, type Challenge, type Experience } from '../lib/fit'
import { useShortlist } from '../lib/shortlist'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const EXPERIENCE: { value: Experience; label: string }[] = [
  { value: 'new', label: 'I’m new to selling, or I sell without any training' },
  { value: 'selling', label: 'I sell regularly and have some experience' },
  { value: 'experienced', label: 'I’m an experienced seller' },
  { value: 'leading', label: 'I lead or manage other sellers' },
]
const CHALLENGE: { value: Challenge; label: string }[] = [
  { value: 'method', label: 'I don’t have a consistent method' },
  { value: 'value', label: 'I discount too often or lose deals late' },
  { value: 'team', label: 'My team’s results depend on me' },
  { value: 'teach', label: 'I want to teach others to sell' },
]

export default function Programmes() {
  useDocumentTitle('Programmes')
  const root = useRef<HTMLDivElement>(null)
  useSiteMotion(root)
  const shortlist = useShortlist()
  const [onlyShortlisted, setOnlyShortlisted] = useState(false)
  const showing = onlyShortlisted && shortlist.length ? PROGRAMMES.filter(programme => shortlist.includes(programme.id)) : PROGRAMMES

  return (
    <div ref={root}>
      <PageIntro kicker="The Sales Ladder programmes" title="Choose the level that fits where you are">
        <p>Four published levels build on one seven-stage sales process. Compare them side by side, or answer two questions for a suggested starting point.</p>
        <p className="source-note">Fees and durations are references from the <a href={SOURCES.ladder} rel="noopener">official Sales Ladder page</a>, checked {CHECKED_ON}. They are not live availability; confirm current dates and fees with ABC.</p>
      </PageIntro>

      <section className="section section--tight" aria-labelledby="compare-title">
        <div className="container">
          <div className="compare-head">
            <h2 className="section-title" id="compare-title">Compare the levels</h2>
            {shortlist.length > 0 && (
              <label className="switch">
                <input type="checkbox" checked={onlyShortlisted} onChange={event => setOnlyShortlisted(event.target.checked)} />
                <span>Show my shortlist only ({shortlist.length})</span>
              </label>
            )}
          </div>
          <div className={`compare compare--${showing.length}`}>
            {showing.map(programme => (
              <article key={programme.id} className="compare__col" data-anim="card" aria-labelledby={`compare-${programme.id}`}>
                <div className="compare__top">
                  {programme.cover
                    ? <CoverImg cover={programme.cover} sizes="(min-width: 1024px) 20vw, 40vw" className="compare__cover" />
                    : <span className="compare__cover programme-tile__cover--trainer" aria-hidden="true"><span /><span /><span /><span /></span>}
                  <p className="compare__level">{programme.level}</p>
                  <h3 id={`compare-${programme.id}`}><Link to={`/programmes/${programme.id}`}>{programme.name}</Link></h3>
                </div>
                <dl className="compare__facts">
                  <div><dt>For</dt><dd>{programme.short}</dd></div>
                  <div><dt>Duration</dt><dd>{programme.duration ?? 'Not published'}</dd></div>
                  <div><dt>Published fee</dt><dd>{formatUGX(programme.fee)}</dd></div>
                  <div><dt>Format</dt><dd>{programme.format}</dd></div>
                  <div><dt>Certification</dt><dd>{programme.certification}</dd></div>
                </dl>
                <div className="compare__actions">
                  <Link to={`/programmes/${programme.id}`} className="button button--outline button--small">View details</Link>
                  <ShortlistButton id={programme.id} name={programme.name} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FitGuide />

      <section className="section" aria-labelledby="launch-link-title">
        <div className="container split-callout" data-anim="reveal">
          <div>
            <h2 className="section-title" id="launch-link-title">Leaving school?</h2>
            <p>The Career Launch Lab is a separate six-week programme published for Year 13 leavers aged 18–20 preparing for university.</p>
          </div>
          <Link to="/launch-lab" className="button button--outline">About the Launch Lab</Link>
        </div>
      </section>
    </div>
  )
}

function FitGuide() {
  const [experience, setExperience] = useState<Experience | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const result = recommendProgramme({ experience, challenge })
  const programme = findProgramme(result?.programmeId)

  return (
    <section className="section fit" id="fit" aria-labelledby="fit-title" tabIndex={-1}>
      <div className="container fit__grid">
        <div>
          <h2 className="section-title" id="fit-title">Find a starting point</h2>
          <p>Two questions, based on who each level is published for. This is general guidance, not an admissions assessment.</p>
        </div>
        <div className="fit__form">
          <fieldset className="field choice-group">
            <legend className="field__label">Where are you now?</legend>
            <div className="choice-group__options">
              {EXPERIENCE.map(option => (
                <label key={option.value} className={`choice ${experience === option.value ? 'is-selected' : ''}`}>
                  <input type="radio" name="fit-experience" value={option.value} checked={experience === option.value} onChange={() => setExperience(option.value)} />
                  <span className="choice__text"><span className="choice__label">{option.label}</span></span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="field choice-group">
            <legend className="field__label">What would help most?</legend>
            <div className="choice-group__options">
              {CHALLENGE.map(option => (
                <label key={option.value} className={`choice ${challenge === option.value ? 'is-selected' : ''}`}>
                  <input type="radio" name="fit-challenge" value={option.value} checked={challenge === option.value} onChange={() => setChallenge(option.value)} />
                  <span className="choice__text"><span className="choice__label">{option.label}</span></span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="fit__result" aria-live="polite">
            {result && programme ? (
              <>
                <p className="fit__suggest">Suggested starting point</p>
                <p className="fit__name">{programme.name} <span>({programme.level})</span></p>
                <p>{result.reason}</p>
                <p className="fine-print">A conversation with ABC is the reliable way to confirm the right level.</p>
                <div className="button-row">
                  <Link to={`/programmes/${programme.id}`} className="button button--primary button--small">View {programme.name}</Link>
                  <Link to="/discovery-call" className="button button--outline button--small">Talk it through</Link>
                </div>
              </>
            ) : (
              <p className="fit__empty">Answer both questions to see a suggestion.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
