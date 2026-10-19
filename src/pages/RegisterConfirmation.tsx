import { Link, useParams } from 'react-router'
import { Icon } from '../components/Icon'
import { useForms } from '../forms/FormsContext'
import { Summary } from '../forms/FormFlow'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function RegisterConfirmation() {
  const { reference } = useParams()
  const { completions, setCompletion } = useForms()
  const completion = completions.register?.reference === reference ? completions.register : null
  useDocumentTitle(completion ? 'Demo registration complete' : 'No registration to show')

  if (!completion) {
    return (
      <section className="container confirmation">
        <h1>There’s no registration to show here.</h1>
        <p className="lede">
          Demo summaries are held in memory only during a visit, so they disappear after a refresh or when this page is opened
          from a link. Nothing was ever sent, and no seat exists for this reference.
        </p>
        <div className="button-row">
          <Link to="/register" className="button button--primary">Start a demo registration</Link>
          <Link to="/programmes" className="button button--outline">Return to programmes</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container confirmation" aria-labelledby="confirmation-title">
      <p className="kicker">Demo reference {completion.reference}</p>
      <h1 id="confirmation-title">Your demo registration summary</h1>
      <p className="notice notice--demo">
        <strong>Demo complete. No registration was sent and no seat has been reserved.</strong> This reference exists only in this browser tab.
      </p>
      <Summary sections={completion.sections} meta={completion.meta} />
      <div className="button-row no-print">
        <button type="button" className="button button--outline" onClick={() => window.print()}><Icon name="print" size={18} /> Print</button>
        <Link to="/programmes" className="button button--primary">Return to programmes</Link>
        <Link to="/register" className="text-button" onClick={() => setCompletion('register', null)}>Start another demo registration</Link>
      </div>
      <p className="fine-print">To register for real, contact ABC Sales Consulting directly. See the <Link to="/contact">contact page</Link>.</p>
    </section>
  )
}
