// Published programme references from the Sales Ladder page (checked CHECKED_ON).
// Descriptions are paraphrased; nothing here is a module list or curriculum that
// ABC has not published. Fees and durations are references, not live offers.

export interface Programme {
  id: string
  level: string
  name: string
  short: string
  cover: string | null
  coverLine: string
  forWho: string
  focus: string[]
  duration: string | null
  weeks: number | null
  fee: number
  format: string
  certification: string
  eligibility: string
  faqs: { q: string; a: string }[]
}

export const PROGRAMMES: Programme[] = [
  {
    id: 'foundational-selling',
    level: 'Level 1',
    name: 'Foundational Selling',
    short: 'For people who sell every day but have never been trained to.',
    cover: 'cover-foundational-selling',
    coverLine: 'Start with a repeatable process.',
    forWho: 'People who already sell as part of their work, often successfully, but have learned by trial and error and want a method they can repeat.',
    focus: [
      'Running the full seven-stage sales process on your own product or service.',
      'Building the kind of rapport that gets a second meeting.',
      'Closing with confidence rather than pressure.',
    ],
    duration: '6 weeks',
    weeks: 6,
    fee: 900_000,
    format: 'Weekly sessions, with skills practised on your own customers and products.',
    certification: 'The published page does not describe certification at this level.',
    eligibility: 'No entry requirement is published.',
    faqs: [
      { q: 'Do I need previous sales training?', a: 'No. The published description is aimed at people who sell but have not been formally trained.' },
      { q: 'Will I practise on real work?', a: 'The programme page describes practising skills on your own customers and products between sessions.' },
      { q: 'When does the next cohort start?', a: `Cohort dates change. This concept does not show live dates; confirm the current schedule with ABC directly.` },
    ],
  },
  {
    id: 'frontline-practitioner',
    level: 'Level 2',
    name: 'Frontline Practitioner',
    short: 'For sellers who can sell, but discount too quickly and lose deals they should win.',
    cover: 'cover-frontline-practitioner',
    coverLine: 'Build confidence. Sell on value.',
    forWho: 'Working sellers with some experience whose pipeline feels disorganised, who give discounts to get deals over the line, or who lose opportunities late.',
    focus: [
      'Discovery that finds out what a customer will actually pay for.',
      'Managing a pipeline as a working tool rather than a list.',
      'Defending price with confidence instead of discounting.',
    ],
    duration: '10 weeks',
    weeks: 10,
    fee: 1_800_000,
    format: 'Weekly sessions.',
    certification: 'From this level upwards, the published page says certification is earned in front of a panel.',
    eligibility: 'No formal entry requirement is published.',
    faqs: [
      { q: 'Should I take Level 1 first?', a: 'Not necessarily. If you already sell regularly and your challenge is discounting or a messy pipeline, this level is described for you. ABC can advise on the right starting point.' },
      { q: 'How is certification assessed?', a: 'The published page says Level 2 and above are certified in front of a panel. It does not publish the assessment criteria.' },
      { q: 'Can my employer pay?', a: 'The demo registration lets you choose individual or employer-sponsored participation. Payment terms are agreed with ABC, not on this site.' },
    ],
  },
  {
    id: 'sales-leadership',
    level: 'Level 3',
    name: 'Sales Leadership',
    short: 'For sellers who have outgrown selling alone and now need a team to sell well.',
    cover: 'cover-sales-leadership',
    coverLine: 'Develop the people behind the pipeline.',
    forWho: 'Experienced sellers stepping into, or already in, a role where results depend on other people’s selling.',
    focus: [
      'Building a sales playbook a team can follow.',
      'Coaching a seller through a live deal.',
      'Managing a pipeline that spans several people.',
    ],
    duration: '10 weeks',
    weeks: 10,
    fee: 2_600_000,
    format: 'Weekly sessions.',
    certification: 'Certified in front of a panel, as published for Level 2 and above.',
    eligibility: 'No formal entry requirement is published.',
    faqs: [
      { q: 'I manage a team but have never been trained as a seller. Is this right?', a: 'Possibly. The fit guide on the programmes page gives general guidance, and a discovery call with ABC is the better way to decide.' },
      { q: 'Can several managers from one company attend?', a: 'Organisations can describe their team in the corporate brief. Group arrangements are agreed with ABC directly.' },
      { q: 'Does this lead anywhere afterwards?', a: 'The published Certified ABC Trainer route lists Level 3 graduates among those eligible.' },
    ],
  },
  {
    id: 'certified-trainer',
    level: 'Trainer route',
    name: 'Certified ABC Trainer',
    short: 'For Level 3 graduates and proven sellers who want to teach the ABC method.',
    cover: null,
    coverLine: 'Teach the method.',
    forWho: 'Level 3 graduates and proven sellers who are ready to teach others.',
    focus: [
      'Learning to teach the full ABC method.',
      'An intensive format with an assessed teach-back.',
      'Teaching within your own business or, as published, as a licensed ABC trainer.',
    ],
    duration: null,
    weeks: null,
    fee: 2_500_000,
    format: 'Described as an intensive with an assessed teach-back.',
    certification: 'Assessed through a teach-back.',
    eligibility: 'Published as open to Level 3 graduates and proven sellers ready to teach, subject to assessment.',
    faqs: [
      { q: 'How long is the trainer route?', a: 'The published page does not state a duration.' },
      { q: 'Does registering here guarantee a place?', a: 'No. Nothing on this concept site reserves a place; the published route is subject to eligibility and assessment by ABC.' },
    ],
  },
]

export const LAUNCH_LAB = {
  id: 'launch-lab',
  name: 'Career Launch Lab',
  audience: 'Year 13 leavers aged 18–20 preparing for university',
  duration: '6 weeks',
  fee: 900_000,
  publishedStart: '1 October 2026',
  themes: [
    { title: 'Discover', line: 'Understanding people, listening well and finding where value lies.' },
    { title: 'Build', line: 'A personal pitch, a professional profile and a team to work with.' },
    { title: 'Sell', line: 'Prospecting, calls and objections with real customers, on their own or partner products.' },
    { title: 'Create', line: 'Forming a team venture and testing whether people want it.' },
    { title: 'Launch', line: 'Pitching the venture on Launch Day to a panel of business people.' },
  ],
  outcomes: [
    'Practical selling experience, including real conversations with customers.',
    'Stronger communication and presentation skills.',
    'A habit of spotting gaps and creating value.',
    'Proof of work to discuss at university and in early job applications.',
  ],
}

export const findProgramme = (id: string | null | undefined) => PROGRAMMES.find(programme => programme.id === id)

export const formatUGX = (amount: number) => `UGX ${amount.toLocaleString('en-GB')}`
