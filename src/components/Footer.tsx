import { Link } from 'react-router'
import { Logo } from './Logo'
import { CHECKED_ON, PORTFOLIO_URL, SOURCES } from '../data/site'

const COLUMNS = [
  { title: 'Individuals', links: [['/programmes', 'Programmes'], ['/sales-ladder', 'The Sales Ladder'], ['/register', 'Register interest'], ['/launch-lab', 'Career Launch Lab']] },
  { title: 'Organisations', links: [['/organisations', 'Services'], ['/organisations/brief', 'Send a team brief'], ['/organisations/audit', 'Sales audit enquiry'], ['/discovery-call', 'Discovery call']] },
  { title: 'More', links: [['/careers', 'Careers'], ['/insights', 'Insights'], ['/about', 'About'], ['/contact', 'Contact']] },
] as const

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo tone="ivory" />
          <p>Sales training and advisory for people and organisations in Kampala.</p>
        </div>
        {COLUMNS.map(column => (
          <nav key={column.title} aria-label={column.title} className="site-footer__col">
            <h2>{column.title}</h2>
            <ul>{column.links.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="container site-footer__disclosure" id="concept-disclosure">
        <h2>About this website</h2>
        <p>
          This is an independent redesign concept for ABC Sales Consulting, made to show how its website could work. It is not
          affiliated with or approved by ABC. The logo and the line “Built for the next level” are proposals, and the people in the
          photographs are AI-generated illustrations, not ABC staff, clients or graduates.
        </p>
        <p>
          Every form is a demonstration: nothing is sent, booked, reserved or uploaded. Programme fees and durations are references
          from the <a href={SOURCES.ladder} rel="noopener">official Sales Ladder page</a>, checked {CHECKED_ON}. For anything
          current, contact ABC through <a href={SOURCES.home} rel="noopener">abcsalesconsulting.net</a>.
        </p>
        <p className="site-footer__credit">Concept design and build by <a href={PORTFOLIO_URL} rel="noopener">Arthur Kitandwe</a>.</p>
      </div>
    </footer>
  )
}
