import { Link } from 'react-router'
import { SceneImg } from '../components/Img'
import { PageIntro } from '../components/PageIntro'
import { CHECKED_ON, PORTFOLIO_URL, SOURCES } from '../data/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <PageIntro
        kicker="About"
        title="Sales education and advisory from Ntinda, Kampala"
        aside={<figure className="intro-figure"><SceneImg name="programme-still-life" alt="" sizes="(min-width: 1024px) 36vw, 100vw" priority /></figure>}
      >
        <p>
          ABC Sales Consulting trains people to sell and helps organisations build stronger sales teams. Its public website
          describes four areas of work: the Sales Ladder programmes, sales training and consulting for organisations, sales
          audits, and the Career Launch Lab for school leavers. Its careers page also shows recruitment and placement of sales staff.
        </p>
      </PageIntro>

      <section className="container section section--tight about">
        <div className="about__grid">
          <section aria-labelledby="method-title">
            <h2 className="section-title" id="method-title">One method throughout</h2>
            <p>
              The published approach is a seven-stage sales process, from prospecting to getting referrals, with a sales mindset
              underneath. Each programme level returns to the same stages on harder deals. <Link to="/sales-ladder">See the Sales Ladder</Link>.
            </p>
          </section>
          <section aria-labelledby="where-title">
            <h2 className="section-title" id="where-title">Where</h2>
            <p>ABC is based in Ntinda, Kampala. Its website lists two different plot numbers, so this concept shows the area only. See <Link to="/contact">contact</Link>.</p>
          </section>
        </div>

        <section className="concept-box" id="concept" aria-labelledby="concept-title" tabIndex={-1}>
          <h2 className="section-title" id="concept-title">About this concept</h2>
          <p>
            This website is an independent redesign concept made to show ABC Sales Consulting how its online presence could guide
            individuals, organisations and candidates to the right next step. It is not affiliated with or approved by ABC, and it is
            not ABC’s official website, which is at <a href={SOURCES.home} rel="noopener">abcsalesconsulting.net</a>.
          </p>
          <ul className="check-list">
            <li>Every form is a demonstration. Nothing is sent, booked, reserved, uploaded or paid, and answers are cleared on refresh.</li>
            <li>The only thing stored in your browser is your programme shortlist, as programme names. No personal details are stored.</li>
            <li>Programme fees and durations are references from ABC’s public pages, checked {CHECKED_ON}. They may have changed.</li>
            <li>The logo, colours and the line “Built for the next level” are proposals, not ABC’s current identity.</li>
            <li>People in the photographs are AI-generated illustrations. They are not ABC staff, trainers, clients or graduates.</li>
            <li>Careers listings are samples, not vacancies. Insights articles are concept editorial, not ABC publications.</li>
            <li>No testimonials, client logos, results or accreditations are shown, because none could be verified.</li>
          </ul>
          <p>Concept design and build by <a href={PORTFOLIO_URL} rel="noopener">Arthur Kitandwe</a>.</p>
        </section>
      </section>
    </>
  )
}
