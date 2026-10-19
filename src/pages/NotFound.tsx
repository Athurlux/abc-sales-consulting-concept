import { Link } from 'react-router'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="container not-found">
      <img className="not-found__mark" src="/brand/mark-vermilion.svg" width={60} height={66} alt="" />
      <h1>This page isn’t here.</h1>
      <p className="lede">The link may be mistyped or out of date. These are the main routes through the site.</p>
      <ul className="not-found__routes">
        <li><Link to="/programmes">Programmes</Link><span>Compare levels and find a starting point</span></li>
        <li><Link to="/organisations">For organisations</Link><span>Training, advisory, audits and recruitment</span></li>
        <li><Link to="/careers">Careers</Link><span>Sample roles and the demo application</span></li>
        <li><Link to="/contact">Contact</Link><span>Published contact details for ABC</span></li>
      </ul>
      <Link to="/" className="button button--primary">Go to the homepage</Link>
    </section>
  )
}
