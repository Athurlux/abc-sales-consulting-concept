import { Link, useParams } from 'react-router'
import { FlowPage } from '../components/FlowPage'
import { findRole } from '../data/roles'
import { applyFlow } from '../forms/flows'
import { RoleMissing } from './RoleDetail'

export default function Apply() {
  const { slug } = useParams()
  const role = findRole(slug)
  if (!role) return <RoleMissing />

  return (
    <FlowPage
      kicker="Demo application"
      title={`Apply: ${role.title}`}
      intro={<p>This is a sample role, not an active vacancy. <Link to={`/careers/${role.slug}`}>Read the role</Link> before you start.</p>}
      note="It shows how an application could work. No application is submitted, and a selected CV is checked on this device only. It is never uploaded, read or stored."
      flow={applyFlow}
      instanceKey={`apply-${role.slug}`}
      referencePrefix="APP"
      meta={[{ label: 'Role', value: `${role.title} (demo opportunity)` }]}
      reviewLead={<p className="review-lead">Applying for: <strong>{role.title}</strong>, a demo opportunity</p>}
      restartLabel="Start a new application"
      doneLinks={[{ label: 'Back to sample roles', to: '/careers' }]}
    />
  )
}
