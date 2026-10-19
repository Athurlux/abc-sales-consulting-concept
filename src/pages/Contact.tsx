import { FlowPage } from '../components/FlowPage'
import { CHECKED_ON, CONTACT, SOURCES } from '../data/site'
import { contactFlow } from '../forms/flows'

export default function Contact() {
  return (
    <FlowPage
      kicker="Contact"
      title="Get in touch"
      intro={<p>Use the demo form to see how an enquiry could work, or contact ABC directly using the details below.</p>}
      note="This form is not connected to email, WhatsApp or any server. To reach ABC, use the published contact details on this page."
      flow={contactFlow}
      referencePrefix="MSG"
      restartLabel="Write another message"
      doneLinks={[{ label: 'Go to the homepage', to: '/' }]}
      beforeForm={
        <section className="real-contact" aria-labelledby="real-contact-title">
          <h2 id="real-contact-title">Contact ABC directly</h2>
          <p className="fine-print">Published on ABC’s <a href={SOURCES.home} rel="noopener">official website</a>, checked {CHECKED_ON}. Not connected to this concept.</p>
          <dl className="plain-facts">
            <div><dt>Email</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            <div>
              <dt>Phone</dt>
              <dd>
                The official site lists two numbers:
                <ul className="phone-list">{CONTACT.phones.map(phone => <li key={phone.number}><a href={phone.href}>{phone.number}</a> <span>({phone.where})</span></li>)}</ul>
              </dd>
            </div>
            <div><dt>Location</dt><dd>{CONTACT.area}. The site gives two different plot numbers, so confirm the address before visiting.</dd></div>
          </dl>
        </section>
      }
    />
  )
}
