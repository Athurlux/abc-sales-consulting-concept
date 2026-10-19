import type { ReactNode } from 'react'
import { DemoNote } from './DemoNote'
import { PageIntro } from './PageIntro'
import { FormFlow } from '../forms/FormFlow'
import type { Draft, FlowSpec } from '../forms/engine'
import type { FlowOptions } from '../forms/useFormFlow'
import { useDocumentTitle } from '../lib/useDocumentTitle'

interface FlowPageProps<T extends Draft> extends FlowOptions<T> {
  title: string
  kicker: string
  intro: ReactNode
  note?: string
  flow: FlowSpec<T>
  doneLinks?: { label: string; to: string }[]
  restartLabel?: string
  reviewLead?: ReactNode
  beforeForm?: ReactNode
}

/** Shared frame for the enquiry journeys: intro, demo notice, then the form. */
export function FlowPage<T extends Draft>({ title, kicker, intro, note, flow, doneLinks, restartLabel, reviewLead, beforeForm, ...options }: FlowPageProps<T>) {
  useDocumentTitle(title)
  return (
    <>
      <PageIntro kicker={kicker} title={title} aside={<DemoNote>{note}</DemoNote>}>{intro}</PageIntro>
      <div className="container section section--tight">
        {beforeForm}
        <FormFlow flow={flow} doneLinks={doneLinks} restartLabel={restartLabel} reviewLead={reviewLead} printable {...options} />
      </div>
    </>
  )
}
