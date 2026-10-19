import { useRef } from 'react'
import { Link } from 'react-router'
import { useSiteMotion } from '../animation/useSiteMotion'
import { SceneImg, type SceneName } from '../components/Img'
import { PageIntro } from '../components/PageIntro'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const SERVICES: { id: string; title: string; body: string; discuss: string[]; image: SceneName; alt: string; to: string; cta: string }[] = [
  {
    id: 'training', title: 'Team sales training',
    body: 'Training across the full sales cycle, from generating leads to closing, delivered for your team and practised on your own products and customers.',
    discuss: ['Which roles and how many people', 'Where deals are currently lost', 'Scheduling around the team’s selling time'],
    image: 'sales-training', alt: 'A facilitator listening as a participant rehearses a pitch to colleagues (illustrative image).',
    to: '/organisations/brief', cta: 'Send a team brief',
  },
  {
    id: 'advisory', title: 'Strategic sales advisory',
    body: 'Help designing a sales process that fits how your customers buy, and finding where opportunities leak out of the funnel.',
    discuss: ['How a sale moves through the business today', 'Targets, territories and team structure', 'What a better process would need to change'],
    image: 'sales-strategy', alt: 'Business leaders planning with blank cards around a boardroom table (illustrative image).',
    to: '/discovery-call', cta: 'Request a discovery call',
  },
  {
    id: 'audit', title: 'Sales performance audits',
    body: 'A structured review of how effective the sales team is, where skills are uneven and where the process slows deals down.',
    discuss: ['What prompted the review', 'How opportunities are tracked', 'What information could be shared, and how it would be protected'],
    image: 'performance-audit', alt: 'Two consultants reviewing printed pages at a desk (illustrative image; no real data is shown).',
    to: '/organisations/audit', cta: 'Start an audit enquiry',
  },
  {
    id: 'recruitment', title: 'Recruitment support',
    body: 'Help finding sales people for your organisation. ABC’s careers page lists placements in roles from sales executive to sales manager.',
    discuss: ['The role and what success looks like', 'The experience that matters most', 'Timing and the selection process'],
    image: 'recruitment', alt: 'A candidate in an interview with two people across a desk (illustrative image).',
    to: '/organisations/brief', cta: 'Describe the role you need',
  },
]

export default function Organisations() {
  useDocumentTitle('For organisations')
  const root = useRef<HTMLDivElement>(null)
  useSiteMotion(root)

  return (
    <div ref={root}>
      <PageIntro kicker="For organisations" title="Help for teams that need to sell better">
        <p>Four ways ABC works with organisations. Each starts with a conversation about your team, not a fixed package.</p>
        <div className="button-row">
          <Link to="/organisations/brief" className="button button--primary">Send a team brief</Link>
          <Link to="/discovery-call" className="button button--outline">Request a discovery call</Link>
        </div>
      </PageIntro>

      <nav className="container service-index" aria-label="Services on this page">
        <ul>{SERVICES.map(service => <li key={service.id}><a href={`#${service.id}`}>{service.title}</a></li>)}</ul>
      </nav>

      {SERVICES.map((service, index) => (
        <section key={service.id} id={service.id} className={`service ${index % 2 ? 'service--flip' : ''}`} aria-labelledby={`${service.id}-title`} tabIndex={-1}>
          <div className="container service__grid">
            <figure className="service__image" data-anim="reveal">
              <SceneImg name={service.image} alt={service.alt} sizes="(min-width: 1024px) 50vw, 100vw" />
            </figure>
            <div className="service__text" data-anim="reveal">
              <h2 className="section-title" id={`${service.id}-title`}>{service.title}</h2>
              <p>{service.body}</p>
              <h3 className="service__sub">What you could discuss</h3>
              <ul className="check-list">{service.discuss.map(item => <li key={item}>{item}</li>)}</ul>
              <Link to={service.to} className="button button--outline">{service.cta}</Link>
            </div>
          </div>
        </section>
      ))}

      <section className="section closing" aria-labelledby="org-closing">
        <div className="container closing__inner">
          <h2 className="closing__title" id="org-closing">What happens next</h2>
          <p>Send a short brief or request a call. Scope, timing and fees for any work are agreed with ABC directly; this concept makes no promises about results.</p>
          <div className="button-row">
            <Link to="/organisations/brief" className="button button--primary button--large">Send a team brief</Link>
            <Link to="/organisations/audit" className="button button--outline button--large">Sales audit enquiry</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
