import { Link } from 'react-router'
import { FlowPage } from '../components/FlowPage'
import { corporateFlow } from '../forms/flows'

export default function CorporateBrief() {
  return (
    <FlowPage
      kicker="For organisations"
      title="Send a team brief"
      intro={<p>Three short steps: what you need, the challenge, and how to reach you. For a deeper review of an existing team, use the <Link to="/organisations/audit">sales audit enquiry</Link> instead.</p>}
      note="It shows how a brief could reach ABC. Nothing is sent, and nobody will contact you. Please don’t include confidential business information."
      flow={corporateFlow}
      referencePrefix="BRF"
      restartLabel="Start a new brief"
      doneLinks={[{ label: 'Back to services', to: '/organisations' }]}
    />
  )
}
