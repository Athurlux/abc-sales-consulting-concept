import { useRef } from 'react'
import { Link } from 'react-router'
import { useSiteMotion } from '../animation/useSiteMotion'
import { CoverImg, SceneImg, type SceneName } from '../components/Img'
import { SalesSteps } from '../components/Steps'
import { PROGRAMMES, formatUGX } from '../data/programmes'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const HEADLINE = ['Build the people.', 'Strengthen the process.', 'Grow the business.']

const ROUTES = [
  { title: 'I want to sell better', who: 'Individuals', body: 'Structured programmes from your first method to leading a team.', to: '/programmes', cta: 'Explore programmes' },
  { title: 'My team needs to sell better', who: 'Organisations', body: 'Team training, advisory, sales audits and recruitment support.', to: '/organisations', cta: 'See services for teams' },
  { title: 'I’m looking for a sales role', who: 'Candidates', body: 'How ABC’s recruitment side works, with sample roles to explore.', to: '/careers', cta: 'Explore careers' },
]

const CHAPTERS: { line: string; title: string; body: string; services: string[]; to: string; cta: string; image: SceneName; alt: string }[] = [
  {
    line: 'Build the people',
    title: 'Sellers who know what to do next',
    body: 'Training built around one seven-stage process, practised on real customers between sessions, so improvement shows up in the work rather than in a notebook.',
    services: ['Sales Ladder programmes', 'Team sales training'],
    to: '/programmes', cta: 'See the programmes',
    image: 'sales-training', alt: 'A facilitator listens while a participant rehearses a pitch to a small group around a meeting table (illustrative image).',
  },
  {
    line: 'Strengthen the process',
    title: 'A process the whole team can see',
    body: 'Advisory and audit work looks at how a sale really moves through your business, where it stalls, and what would make it repeatable.',
    services: ['Strategic sales advisory', 'Sales performance audits'],
    to: '/organisations/audit', cta: 'Start an audit enquiry',
    image: 'performance-audit', alt: 'Two consultants review printed pages together at a desk (illustrative image; the pages show no real data).',
  },
  {
    line: 'Grow the business',
    title: 'The right people in the right seats',
    body: 'Growth depends on who is selling as much as how. ABC’s recruitment work connects sales talent with organisations that need it.',
    services: ['Recruitment support', 'Sales leadership development'],
    to: '/organisations', cta: 'Discuss your team’s needs',
    image: 'recruitment', alt: 'A candidate in conversation with two interviewers across an office desk (illustrative image).',
  },
]

const ENGAGEMENT = [
  { title: 'Share a short brief', body: 'Outline the team, the challenge and your timing. A few minutes is enough.' },
  { title: 'Have a discovery conversation', body: 'Talk it through with ABC to agree what is really going on.' },
  { title: 'Agree a plan', body: 'Training, advisory, an audit or a mix, with scope and terms agreed directly with ABC.' },
  { title: 'Work and review', body: 'Delivery alongside your team, with progress reviewed against what you agreed.' },
]

export default function Home() {
  useDocumentTitle(null)
  const root = useRef<HTMLDivElement>(null)
  useSiteMotion(root)

  return (
    <div ref={root} className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/hero-desktop-960.webp 960w, /images/hero-desktop-1536.webp 1536w" sizes="100vw" width={1536} height={1024} />
            <img
              data-hero="photo"
              src="/images/hero-mobile-480.webp"
              srcSet="/images/hero-mobile-480.webp 480w, /images/hero-mobile-800.webp 800w"
              sizes="100vw"
              width={1024}
              height={1316}
              alt="Sales professionals discussing a proposal at a meeting table (AI-generated illustration, not ABC staff)."
              fetchPriority="high"
            />
          </picture>
          <span className="hero__mask" data-hero="mask" aria-hidden="true" />
        </div>
        <div className="container hero__copy">
          <p className="kicker">Sales training and advisory in Kampala</p>
          <h1 className="hero__title" id="hero-title">
            {HEADLINE.map((line, index) => (
              <span key={line} className="hero__line" style={{ '--step': index } as React.CSSProperties}><span data-hero="line">{line}</span></span>
            ))}
          </h1>
          <p className="hero__lede" data-hero="lede">
            Practical sales programmes for people who sell, and training, advisory and audits for organisations that need their
            teams to sell better.
          </p>
          <div className="button-row">
            <Link to="/programmes" className="button button--primary button--large">Explore programmes</Link>
            <Link to="/organisations" className="button button--outline button--large">Discuss your team’s needs</Link>
          </div>
        </div>
      </section>

      <section className="section routes" aria-labelledby="routes-title">
        <div className="container">
          <h2 className="section-title" id="routes-title" data-anim="reveal">Where are you starting?</h2>
          <ol className="routes__list">
            {ROUTES.map((route, index) => (
              <li key={route.to} className="route" style={{ '--step': index } as React.CSSProperties} data-anim="card">
                <p className="route__who">{route.who}</p>
                <h3 className="route__title">{route.title}</h3>
                <p>{route.body}</p>
                <Link to={route.to} className="text-link">{route.cta}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="narrative" aria-labelledby="narrative-title">
        <div className="container narrative__grid">
          <div className="narrative__media" aria-hidden="true">
            {CHAPTERS.map((chapter, index) => (
              <div key={chapter.image} className="narrative__frame" data-narrative-frame style={index ? { opacity: 0, visibility: 'hidden' } : undefined}>
                <SceneImg name={chapter.image} alt="" sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
            ))}
          </div>
          <div className="narrative__chapters">
            <h2 className="visually-hidden" id="narrative-title">How ABC works with people and organisations</h2>
            {CHAPTERS.map((chapter, index) => (
              <article key={chapter.line} className="chapter" data-chapter>
                <p className="chapter__line"><span aria-hidden="true">{index + 1}</span>{chapter.line}</p>
                <figure className="chapter__figure">
                  <SceneImg name={chapter.image} alt={chapter.alt} sizes="100vw" />
                </figure>
                <h3 className="chapter__title">{chapter.title}</h3>
                <p>{chapter.body}</p>
                <ul className="tag-list" aria-label="Related services">{chapter.services.map(service => <li key={service}>{service}</li>)}</ul>
                <Link to={chapter.to} className="text-link">{chapter.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section programmes-preview" aria-labelledby="programmes-title">
        <div className="container">
          <div className="section-head" data-anim="reveal">
            <h2 className="section-title" id="programmes-title">Four levels, one method</h2>
            <p>Each level of the Sales Ladder takes the same seven stages deeper, on harder deals. Fees are the published reference figures.</p>
          </div>
          <ul className="programme-strip">
            {PROGRAMMES.map(programme => (
              <li key={programme.id} className="programme-tile" data-anim="card">
                <Link to={`/programmes/${programme.id}`} className="programme-tile__link">
                  {programme.cover
                    ? <CoverImg cover={programme.cover} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw" className="programme-tile__cover" />
                    : <span className="programme-tile__cover programme-tile__cover--trainer" aria-hidden="true"><span /><span /><span /><span /></span>}
                  <span className="programme-tile__level">{programme.level}</span>
                  <span className="programme-tile__name">{programme.name}</span>
                  <span className="programme-tile__meta">{programme.duration ?? 'Duration not published'}, {formatUGX(programme.fee)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="button-row">
            <Link to="/programmes" className="button button--primary">Compare programmes</Link>
            <Link to="/programmes#fit" className="button button--outline">Find your starting level</Link>
          </div>
        </div>
      </section>

      <section className="ladder-band" aria-labelledby="ladder-title">
        <div className="container ladder-band__grid">
          <div className="ladder-band__text" data-anim="reveal">
            <h2 className="section-title" id="ladder-title">The Sales Ladder</h2>
            <p>ABC teaches one seven-stage process, from finding a prospect to earning a referral, with a sales mindset underneath it all. Every level climbs the same steps.</p>
            <Link to="/sales-ladder" className="button button--light">How the ladder works</Link>
          </div>
          <SalesSteps />
        </div>
      </section>

      <section className="section engagement" aria-labelledby="engagement-title">
        <div className="container engagement__grid">
          <div className="section-head" data-anim="reveal">
            <h2 className="section-title" id="engagement-title">Working with ABC as an organisation</h2>
            <p>A typical route from first contact to working together. The details of any engagement are agreed with ABC directly.</p>
            <Link to="/organisations/brief" className="button button--primary">Send a team brief</Link>
          </div>
          <ol className="engagement__steps">
            {ENGAGEMENT.map((step, index) => (
              <li key={step.title} data-anim="reveal">
                <span className="engagement__num" aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="launch-feature" aria-labelledby="launch-title">
        <div className="container launch-feature__grid">
          <figure className="launch-feature__image" data-anim="reveal">
            <SceneImg name="launch-lab" alt="Four young adults collaborating on a pitch around laptops (AI-generated illustration of fictional participants)." sizes="(min-width: 1024px) 55vw, 100vw" />
          </figure>
          <div className="launch-feature__text" data-anim="reveal">
            <p className="kicker kicker--light">For school leavers aged 18–20</p>
            <h2 className="section-title" id="launch-title">Career Launch Lab</h2>
            <p>A six-week programme where Year 13 leavers sell to real customers, build a team venture and pitch it on Launch Day.</p>
            <Link to="/launch-lab" className="button button--light">Explore the programme</Link>
          </div>
        </div>
      </section>

      <section className="section closing" aria-labelledby="closing-title">
        <div className="container closing__inner" data-anim="reveal">
          <h2 className="closing__title" id="closing-title">Not sure where to start?</h2>
          <p>A short discovery call is the quickest way to find the right route for you or your team.</p>
          <div className="button-row">
            <Link to="/discovery-call" className="button button--primary button--large">Request a discovery call</Link>
            <Link to="/programmes#fit" className="button button--outline button--large">Try the programme fit guide</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
