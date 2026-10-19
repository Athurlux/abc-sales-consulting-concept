import { FlowPage } from '../components/FlowPage'
import { callFlow } from '../forms/flows'

export default function DiscoveryCall() {
  return (
    <FlowPage
      kicker="Talk it through"
      title="Request a discovery call"
      intro={<p>Choose a topic, a preferred day and a rough time of day. Dates are read in Kampala time (East Africa Time) and must be from tomorrow onwards.</p>}
      note="The time windows are illustrative preferences, not ABC’s real calendar. No meeting is booked and no invitation is sent."
      flow={callFlow}
      referencePrefix="CAL"
      restartLabel="Start a new request"
      doneLinks={[{ label: 'Explore programmes', to: '/programmes' }]}
    />
  )
}
