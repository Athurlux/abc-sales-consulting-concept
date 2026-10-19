// Every demo journey is declared here. Field specs drive rendering, validation,
// review and the confirmation summary (see engine.ts), so a rule lives in one place.
import { eitherContact, type FieldSpec, type FlowSpec, type Option } from './engine'
import { PROGRAMMES, formatUGX } from '../data/programmes'
import { CALL_MAX_DAYS, CALL_WINDOWS, callDateError, earliestCallDate } from '../lib/schedule'
import { addDays } from '../lib/validation'

const NAME: FieldSpec<any> = { name: 'fullName', label: 'Full name', kind: 'text', autoComplete: 'name', maxLength: 80 }
const EMAIL: FieldSpec<any> = { name: 'email', label: 'Email address', kind: 'email', autoComplete: 'email', maxLength: 120 }
const PHONE: FieldSpec<any> = { name: 'phone', label: 'Phone number', kind: 'tel', autoComplete: 'tel', hint: 'A Ugandan number such as 0772 123 456, or an international number starting with +.' }
const optional = <T,>(field: T) => ({ ...field, optional: true })

const TEAM_SIZES: Option[] = [
  { value: '1-5', label: '1–5 sellers' },
  { value: '6-15', label: '6–15 sellers' },
  { value: '16-50', label: '16–50 sellers' },
  { value: '50+', label: 'More than 50 sellers' },
]
const SECTORS: Option[] = [
  'Banking and financial services', 'Insurance', 'Telecoms and technology', 'Manufacturing and distribution',
  'Retail and consumer goods', 'Real estate', 'Health', 'Education', 'Agriculture', 'Hospitality and travel', 'NGO or public sector', 'Other',
].map(label => ({ value: label.toLowerCase().replace(/[^a-z]+/g, '-'), label }))
const TIMEFRAMES: Option[] = [
  { value: 'month', label: 'Within a month' },
  { value: 'quarter', label: 'In the next three months' },
  { value: 'later', label: 'Later this year or next' },
  { value: 'exploring', label: 'Just exploring for now' },
]

// ---- Programme registration ----------------------------------------------------
export interface RegisterDraft extends Record<string, string | null> {
  programme: string | null
  fullName: string | null
  email: string | null
  phone: string | null
  participation: string | null
  employer: string | null
  sponsorEmail: string | null
  experience: string | null
  goals: string | null
  notes: string | null
}

export const PROGRAMME_OPTIONS: Option[] = PROGRAMMES.map(programme => ({
  value: programme.id,
  label: `${programme.name} (${programme.level})`,
  description: `${programme.duration ?? 'Duration not published'} · published fee ${formatUGX(programme.fee)}`,
}))

export const registerFlow: FlowSpec<RegisterDraft> = {
  key: 'register',
  empty: () => ({ programme: null, fullName: null, email: null, phone: null, participation: null, employer: null, sponsorEmail: null, experience: null, goals: null, notes: null }),
  sample: () => ({
    fullName: 'Amani Nakato', email: 'amani.nakato@example.com', phone: '0772 123 456', participation: 'individual', experience: '1-3',
    goals: 'process|objections', notes: 'I sell office supplies and want to stop relying on discounts.',
  }),
  stages: [
    {
      id: 'programme',
      title: 'Programme',
      intro: 'Choose the level you would like to register interest in. Fees are the published reference figures and are not charged here.',
      fields: [{ name: 'programme', label: 'Programme', kind: 'radio', options: PROGRAMME_OPTIONS, requiredMessage: 'Choose a programme.' }],
    },
    {
      id: 'details',
      title: 'Your details',
      fields: [NAME, EMAIL, PHONE],
    },
    {
      id: 'participation',
      title: 'Participation',
      fields: [
        {
          name: 'participation', label: 'Who would pay for the programme?', kind: 'radio', requiredMessage: 'Choose who would pay.',
          options: [
            { value: 'individual', label: 'I would pay myself', description: 'Individual participation.' },
            { value: 'employer', label: 'My employer would sponsor me', description: 'ABC would agree terms with your organisation.' },
          ],
        },
        { name: 'employer', label: 'Employer name', kind: 'text', autoComplete: 'organization', maxLength: 100, when: draft => draft.participation === 'employer' },
        { ...optional(EMAIL), name: 'sponsorEmail', label: 'Email for the person approving it', autoComplete: 'off', hint: 'Only if someone else approves training budgets.', when: draft => draft.participation === 'employer' },
        {
          name: 'experience', label: 'How long have you been selling?', kind: 'select', requiredMessage: 'Choose how long you have been selling.',
          options: [
            { value: 'new', label: 'I am new to selling' },
            { value: '1-3', label: '1–3 years' },
            { value: '4-7', label: '4–7 years' },
            { value: '8+', label: '8 years or more' },
          ],
        },
      ],
    },
    {
      id: 'goals',
      title: 'Goals',
      intro: 'Optional. This helps a programme adviser understand where you are starting from.',
      fields: [
        {
          name: 'goals', label: 'What would you most like to improve?', kind: 'checkboxes', optional: true,
          options: [
            { value: 'process', label: 'Following a repeatable sales process' },
            { value: 'prospecting', label: 'Finding new customers' },
            { value: 'objections', label: 'Handling price objections' },
            { value: 'closing', label: 'Closing with confidence' },
            { value: 'pipeline', label: 'Managing my pipeline' },
            { value: 'team', label: 'Leading or coaching a team' },
          ],
        },
        { name: 'notes', label: 'Anything else about your situation?', kind: 'textarea', optional: true, maxLength: 500, rows: 4 },
      ],
    },
  ],
  review: { title: 'Review your registration', intro: 'Check each answer. Use Edit to change a step; you will come back here afterwards.' },
  final: { label: 'Complete demo registration', note: 'Demonstration only. Nothing is sent, no seat is reserved and no payment is taken.' },
  done: { title: 'Demo complete.', body: 'No registration was sent and no seat has been reserved.' },
}

// ---- Corporate brief ------------------------------------------------------------
export interface CorporateDraft extends Record<string, string | null> {
  services: string | null
  teamSize: string | null
  sector: string | null
  challenge: string | null
  timeframe: string | null
  budget: string | null
  organisation: string | null
  fullName: string | null
  jobTitle: string | null
  email: string | null
  phone: string | null
}

export const SERVICE_OPTIONS: Option[] = [
  { value: 'training', label: 'Team sales training' },
  { value: 'advisory', label: 'Strategic sales advisory' },
  { value: 'audit', label: 'Sales performance audit' },
  { value: 'recruitment', label: 'Recruitment support' },
]

const CONTACT_GROUP = { id: 'contactMethod', legend: 'How could ABC reply?', hint: 'Give at least one: an email address or a phone number.', fields: ['email', 'phone'] }

export const corporateFlow: FlowSpec<CorporateDraft> = {
  key: 'corporate',
  empty: () => ({ services: null, teamSize: null, sector: null, challenge: null, timeframe: null, budget: null, organisation: null, fullName: null, jobTitle: null, email: null, phone: null }),
  sample: () => ({
    services: 'training|advisory', teamSize: '6-15', sector: 'manufacturing-and-distribution',
    challenge: 'Our distributors meet plenty of shops, but new sellers take months to close their first order and we lose good ones early.',
    timeframe: 'quarter', organisation: 'Sample Distributors Ltd', fullName: 'Daniel Okello', jobTitle: 'Commercial manager', email: 'daniel.okello@example.com', phone: '',
  }),
  groups: [CONTACT_GROUP],
  stages: [
    {
      id: 'need',
      title: 'What you need',
      intro: 'A short outline is enough. ABC would ask for detail in a conversation, not in a form.',
      fields: [
        { name: 'services', label: 'Which services are you interested in?', kind: 'checkboxes', options: SERVICE_OPTIONS, requiredMessage: 'Choose at least one service.' },
        { name: 'teamSize', label: 'Sales team size', kind: 'select', options: TEAM_SIZES },
        { name: 'sector', label: 'Sector', kind: 'select', options: SECTORS },
      ],
    },
    {
      id: 'challenge',
      title: 'The challenge',
      fields: [
        {
          name: 'challenge', label: 'What is the main sales challenge?', kind: 'textarea', minLength: 20, maxLength: 800, rows: 5,
          hint: 'Describe it in your own words. Please don’t include customer names, revenue figures or confidential documents.',
        },
        { name: 'timeframe', label: 'Preferred timeframe', kind: 'select', options: TIMEFRAMES },
        {
          name: 'budget', label: 'Budget range', kind: 'select', optional: true, hint: 'Optional, and only a rough guide.',
          options: [
            { value: 'under-5m', label: 'Under UGX 5 million' },
            { value: '5-15m', label: 'UGX 5–15 million' },
            { value: '15m+', label: 'Over UGX 15 million' },
            { value: 'unsure', label: 'Not sure yet' },
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact details',
      fields: [
        { name: 'organisation', label: 'Organisation', kind: 'text', autoComplete: 'organization', maxLength: 100 },
        NAME,
        { name: 'jobTitle', label: 'Your role', kind: 'text', optional: true, autoComplete: 'organization-title', maxLength: 80 },
        optional(EMAIL),
        optional(PHONE),
      ],
      validate: eitherContact('contactMethod', 'email', 'phone'),
    },
  ],
  review: { title: 'Review your brief', intro: 'This is what would reach ABC if the form were connected. It isn’t.' },
  final: { label: 'Complete demo brief', note: 'Demonstration only. Nothing is sent to ABC or anyone else.' },
  done: { title: 'Demo brief complete.', body: 'No brief was sent and nobody will contact you about it.' },
}

// ---- Sales audit enquiry ----------------------------------------------------------
export interface AuditDraft extends Record<string, string | null> {
  organisation: string | null
  sector: string | null
  teamSize: string | null
  process: string | null
  structure: string | null
  crm: string | null
  crmName: string | null
  concerns: string | null
  detail: string | null
  timeframe: string | null
  fullName: string | null
  email: string | null
  phone: string | null
}

export const auditFlow: FlowSpec<AuditDraft> = {
  key: 'audit',
  empty: () => ({ organisation: null, sector: null, teamSize: null, process: null, structure: null, crm: null, crmName: null, concerns: null, detail: null, timeframe: null, fullName: null, email: null, phone: null }),
  sample: () => ({
    organisation: 'Sample Insurance Agency', sector: 'insurance', teamSize: '16-50', process: 'informal', structure: 'regional',
    crm: 'spreadsheet', concerns: 'conversion|forecast', detail: 'Two regions perform very differently and we cannot see why.',
    timeframe: 'quarter', fullName: 'Grace Atim', email: 'grace.atim@example.com', phone: '0701 234 567',
  }),
  groups: [CONTACT_GROUP],
  stages: [
    {
      id: 'organisation',
      title: 'Organisation',
      fields: [
        { name: 'organisation', label: 'Organisation', kind: 'text', autoComplete: 'organization', maxLength: 100 },
        { name: 'sector', label: 'Sector', kind: 'select', options: SECTORS },
        { name: 'teamSize', label: 'Sales team size', kind: 'select', options: TEAM_SIZES },
      ],
    },
    {
      id: 'setup',
      title: 'Current sales set-up',
      intro: 'Broad answers are fine. An audit would gather detail properly, with agreement on what is shared.',
      fields: [
        {
          name: 'process', label: 'Is your sales process written down?', kind: 'radio', requiredMessage: 'Choose how your sales process is defined.',
          options: [
            { value: 'documented', label: 'Yes, and the team follows it' },
            { value: 'informal', label: 'Partly: people mostly do it their own way' },
            { value: 'none', label: 'No defined process yet' },
          ],
        },
        {
          name: 'structure', label: 'How is the team organised?', kind: 'select', requiredMessage: 'Choose how the team is organised.',
          options: [
            { value: 'single', label: 'One team, one manager' },
            { value: 'regional', label: 'By region or branch' },
            { value: 'product', label: 'By product or customer type' },
            { value: 'mixed', label: 'A mix, or changing' },
          ],
        },
        {
          name: 'crm', label: 'How do you track opportunities?', kind: 'radio', requiredMessage: 'Choose how you track opportunities.',
          options: [
            { value: 'crm', label: 'A CRM system' },
            { value: 'spreadsheet', label: 'Spreadsheets' },
            { value: 'none', label: 'Mostly in people’s heads or notebooks' },
          ],
        },
        { name: 'crmName', label: 'Which CRM?', kind: 'text', optional: true, maxLength: 60, when: draft => draft.crm === 'crm' },
      ],
    },
    {
      id: 'concerns',
      title: 'Concerns',
      fields: [
        {
          name: 'concerns', label: 'What concerns you most?', kind: 'checkboxes', requiredMessage: 'Choose at least one concern.',
          options: [
            { value: 'conversion', label: 'Too few opportunities turn into sales' },
            { value: 'pipeline', label: 'Not enough new opportunities' },
            { value: 'discounting', label: 'Too much discounting' },
            { value: 'forecast', label: 'Forecasts we can’t rely on' },
            { value: 'skills', label: 'Uneven skills across the team' },
            { value: 'turnover', label: 'Sellers leaving too soon' },
          ],
        },
        { name: 'detail', label: 'Anything to add?', kind: 'textarea', optional: true, maxLength: 600, rows: 4, hint: 'Please don’t include customer names, revenue records or other confidential data.' },
        { name: 'timeframe', label: 'Preferred timeframe', kind: 'select', options: TIMEFRAMES },
      ],
    },
    {
      id: 'contact',
      title: 'Contact details',
      fields: [NAME, optional(EMAIL), optional(PHONE)],
      validate: eitherContact('contactMethod', 'email', 'phone'),
    },
  ],
  review: { title: 'Review your audit enquiry', intro: 'Check each answer before completing the demo.' },
  final: { label: 'Complete demo audit enquiry', note: 'Demonstration only. Nothing is sent, and no audit is arranged.' },
  done: { title: 'Demo audit enquiry complete.', body: 'No enquiry was sent and no audit has been arranged.' },
}

// ---- Discovery call ----------------------------------------------------------------
export interface CallDraft extends Record<string, string | null> {
  topic: string | null
  date: string | null
  window: string | null
  fullName: string | null
  organisation: string | null
  email: string | null
  phone: string | null
}

export const callFlow: FlowSpec<CallDraft> = {
  key: 'call',
  empty: () => ({ topic: null, date: null, window: null, fullName: null, organisation: null, email: null, phone: null }),
  sample: today => ({ topic: 'team', date: addDays(today, 3), window: 'morning', fullName: 'Daniel Okello', organisation: 'Sample Distributors Ltd', email: 'daniel.okello@example.com', phone: '0772 123 456' }),
  stages: [
    {
      id: 'topic',
      title: 'Topic',
      fields: [{
        name: 'topic', label: 'What would you like to discuss?', kind: 'radio', requiredMessage: 'Choose a topic.',
        options: [
          { value: 'programme', label: 'Choosing a programme for myself' },
          { value: 'team', label: 'Training for my team' },
          { value: 'advisory', label: 'Sales advisory or an audit' },
          { value: 'recruitment', label: 'Recruiting sales staff' },
        ],
      }],
    },
    {
      id: 'time',
      title: 'Preferred time',
      intro: 'These are demonstration preferences, not real availability. Dates use Kampala time.',
      fields: [
        {
          name: 'date', label: 'Preferred date', kind: 'date',
          hint: `From tomorrow up to ${CALL_MAX_DAYS} days ahead.`,
          dateBounds: () => ({ min: earliestCallDate(), max: addDays(earliestCallDate(), CALL_MAX_DAYS - 1) }),
          validate: value => callDateError(value ?? ''),
        },
        { name: 'window', label: 'Preferred time window', kind: 'radio', options: CALL_WINDOWS.map(({ value, label }) => ({ value, label, description: 'Demonstration preference only' })), requiredMessage: 'Choose a time window.' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact details',
      fields: [NAME, optional({ name: 'organisation', label: 'Organisation', kind: 'text', autoComplete: 'organization', maxLength: 100 } as FieldSpec<CallDraft>), EMAIL, optional(PHONE)],
    },
  ],
  review: { title: 'Review your call request', intro: 'Check the details before completing the demo.' },
  final: { label: 'Complete demo call request', note: 'Demonstration only. No meeting is booked and no invitation is sent.' },
  done: { title: 'Demo call request complete.', body: 'No meeting was booked and no calendar invitation was sent.' },
}

// ---- Launch Lab interest ---------------------------------------------------------
export interface LaunchDraft extends Record<string, string | null> {
  enquirer: string | null
  fullName: string | null
  email: string | null
  phone: string | null
  question: string | null
}

export const launchFlow: FlowSpec<LaunchDraft> = {
  key: 'launch',
  empty: () => ({ enquirer: null, fullName: null, email: null, phone: null, question: null }),
  sample: () => ({ enquirer: 'parent', fullName: 'Ruth Namuli', email: 'ruth.namuli@example.com', phone: '', question: 'When is the next intake planned?' }),
  groups: [CONTACT_GROUP],
  stages: [
    {
      id: 'enquirer',
      title: 'About you',
      intro: 'We only ask for the enquirer’s contact details. Please don’t share a young person’s date of birth, school or other personal details here.',
      fields: [
        {
          name: 'enquirer', label: 'Who is enquiring?', kind: 'radio', requiredMessage: 'Choose who is enquiring.',
          options: [
            { value: 'participant', label: 'I am interested in taking part', description: 'The programme is published for ages 18–20.' },
            { value: 'parent', label: 'I am a parent or guardian' },
          ],
        },
        { ...NAME, label: 'Your full name' },
        optional(EMAIL),
        optional(PHONE),
      ],
      validate: eitherContact('contactMethod', 'email', 'phone'),
    },
    {
      id: 'question',
      title: 'Your question',
      fields: [{ name: 'question', label: 'What would you like to know?', kind: 'textarea', optional: true, maxLength: 500, rows: 4 }],
    },
  ],
  review: { title: 'Review your interest', intro: 'Check the details before completing the demo.' },
  final: { label: 'Complete demo interest form', note: 'Demonstration only. Nothing is sent and no place is held.' },
  done: { title: 'Demo interest form complete.', body: 'Nothing was sent and no place has been held on any intake.' },
}

// ---- Job application ----------------------------------------------------------------
export interface ApplyDraft extends Record<string, string | null> {
  fullName: string | null
  email: string | null
  phone: string | null
  location: string | null
  years: string | null
  currentRole: string | null
  motivation: string | null
  cv: string | null
}

export const applyFlow: FlowSpec<ApplyDraft> = {
  key: 'apply',
  empty: () => ({ fullName: null, email: null, phone: null, location: null, years: null, currentRole: null, motivation: null, cv: null }),
  sample: () => ({
    fullName: 'Amani Nakato', email: 'amani.nakato@example.com', phone: '0772 123 456', location: 'Kampala', years: '1-3', currentRole: 'Sales representative',
    motivation: 'I enjoy meeting new customers and I want a role where follow-up and pipeline discipline are valued.',
  }),
  stages: [
    {
      id: 'details',
      title: 'Your details',
      fields: [NAME, EMAIL, PHONE, { name: 'location', label: 'Town or city', kind: 'text', optional: true, autoComplete: 'address-level2', maxLength: 60 }],
    },
    {
      id: 'experience',
      title: 'Experience',
      fields: [
        {
          name: 'years', label: 'Years of sales experience', kind: 'select',
          options: [
            { value: 'none', label: 'None yet' },
            { value: '1-3', label: '1–3 years' },
            { value: '4-7', label: '4–7 years' },
            { value: '8+', label: '8 years or more' },
          ],
        },
        { name: 'currentRole', label: 'Current or most recent role', kind: 'text', optional: true, autoComplete: 'organization-title', maxLength: 80 },
        { name: 'motivation', label: 'Why does this role interest you?', kind: 'textarea', minLength: 30, maxLength: 700, rows: 5 },
        {
          name: 'cv', label: 'CV', kind: 'file', optional: true,
          hint: 'PDF or Word, up to 2 MB. The file is checked on this device only and is never uploaded or read.',
        },
      ],
    },
  ],
  review: { title: 'Review your application', intro: 'Check each answer before completing the demo.' },
  final: { label: 'Complete demo application', note: 'Demonstration only. No application or CV is sent to anyone.' },
  done: { title: 'Demo application complete.', body: 'No application was submitted and your CV was not uploaded.' },
}

// ---- Contact ------------------------------------------------------------------------
export interface ContactDraft extends Record<string, string | null> {
  category: string | null
  message: string | null
  fullName: string | null
  email: string | null
  phone: string | null
}

export const contactFlow: FlowSpec<ContactDraft> = {
  key: 'contact',
  empty: () => ({ category: null, message: null, fullName: null, email: null, phone: null }),
  sample: () => ({ category: 'programmes', message: 'Could you tell me whether evening sessions are available for Frontline Practitioner?', fullName: 'Amani Nakato', email: 'amani.nakato@example.com', phone: '' }),
  groups: [CONTACT_GROUP],
  stages: [
    {
      id: 'message',
      title: 'Your message',
      fields: [
        {
          name: 'category', label: 'What is it about?', kind: 'select',
          options: [
            { value: 'programmes', label: 'Programmes and registration' },
            { value: 'corporate', label: 'Training or advisory for an organisation' },
            { value: 'launch-lab', label: 'Career Launch Lab' },
            { value: 'careers', label: 'Careers and recruitment' },
            { value: 'other', label: 'Something else' },
          ],
        },
        { name: 'message', label: 'Message', kind: 'textarea', minLength: 10, maxLength: 1000, rows: 6 },
      ],
    },
    {
      id: 'contact',
      title: 'Your details',
      fields: [NAME, optional(EMAIL), optional(PHONE)],
      validate: eitherContact('contactMethod', 'email', 'phone'),
    },
  ],
  review: { title: 'Review your message', intro: 'Check the details before completing the demo.' },
  final: { label: 'Complete demo message', note: 'Demonstration only. This form is not connected to email, WhatsApp or any server.' },
  done: { title: 'Demo message complete.', body: 'No message was sent. To reach ABC, use the contact details beside this form.' },
}
