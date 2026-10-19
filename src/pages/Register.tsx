import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { DemoNote } from '../components/DemoNote'
import { PageIntro } from '../components/PageIntro'
import { findProgramme, formatUGX } from '../data/programmes'
import { FormFlow } from '../forms/FormFlow'
import { useForms } from '../forms/FormsContext'
import { registerFlow, type RegisterDraft } from '../forms/flows'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Register() {
  useDocumentTitle('Register interest')
  const [params] = useSearchParams()
  const { drafts, setDraft } = useForms()
  const requested = findProgramme(params.get('programme'))
  const draft = drafts[registerFlow.key] as RegisterDraft | undefined

  // A link from a programme page preselects it, without overwriting a choice already made.
  useEffect(() => {
    if (requested && !draft?.programme) setDraft(registerFlow.key, { ...(draft ?? registerFlow.empty()), programme: requested.id })
  }, [requested, draft, setDraft])

  return (
    <>
      <PageIntro
        kicker="Programmes"
        title="Register your interest"
        aside={<DemoNote>It shows how registration could work. Nothing is sent, no seat is reserved and no payment is taken. Refreshing the page clears your answers.</DemoNote>}
      >
        <p>Choose a programme, add your details and review everything before completing the demo.</p>
      </PageIntro>
      <div className="container section section--tight">
        <FormFlow
          flow={registerFlow}
          referencePrefix="ABC"
          doneRoute={reference => `/register/confirmation/${reference}`}
          extra={values => {
            const programme = findProgramme(values.programme)
            return {
              programmeId: programme?.id,
              meta: programme
                ? [{ label: 'Programme', value: `${programme.name}, ${programme.level}` }, { label: 'Published reference fee', value: `${formatUGX(programme.fee)} (not charged)` }]
                : [],
            }
          }}
        />
      </div>
    </>
  )
}
