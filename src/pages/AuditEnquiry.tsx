import { Link } from 'react-router'
import { FlowPage } from '../components/FlowPage'
import { auditFlow } from '../forms/flows'

export default function AuditEnquiry() {
  return (
    <FlowPage
      kicker="For organisations"
      title="Sales audit enquiry"
      intro={
        <>
          <p>A sales audit looks at how effective the team is, where skills are uneven and where the process slows deals down. These questions help start that conversation; broad answers are fine.</p>
          <p>Not sure an audit is what you need? <Link to="/insights/what-a-sales-audit-looks-at">Read what an audit looks at</Link> or <Link to="/discovery-call">request a call</Link>.</p>
        </>
      }
      note="It shows how an audit enquiry could work. Nothing is sent and no audit is arranged. Never share customer databases, revenue records or confidential documents through a website form."
      flow={auditFlow}
      referencePrefix="AUD"
      restartLabel="Start a new enquiry"
      doneLinks={[{ label: 'Back to services', to: '/organisations' }]}
    />
  )
}
