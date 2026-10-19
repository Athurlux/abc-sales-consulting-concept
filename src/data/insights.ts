// Original concept editorial written for this proposal. Not written or published
// by ABC Sales Consulting, and not attributed to any member of its staff.

export interface Article {
  slug: string
  title: string
  dek: string
  stage: string
  minutes: number
  body: { heading?: string; paragraphs: string[]; list?: string[] }[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'prospecting-is-a-habit',
    title: 'Prospecting is a daily habit, not a campaign',
    dek: 'Why the sellers with the fullest pipelines rarely have a “big push” month, and how to build the habit in twenty minutes a day.',
    stage: 'Prospecting',
    minutes: 4,
    body: [
      { paragraphs: [
        'Most sales teams prospect in bursts. A slow month arrives, a manager calls for a push, everyone makes calls for a week, and then the meetings from that week take over the diary. Six weeks later the pipeline is thin again.',
        'The fix is less dramatic than a campaign: a small, protected block of prospecting every working day, done before the urgent work starts.',
      ] },
      { heading: 'Make the list before you need it', paragraphs: [
        'Prospecting stalls when every session starts with “who should I call?”. Keep a running list of named businesses and people, with one line on why each might need what you sell. Add to it whenever you notice a new shop, a tender notice or a company hiring sellers.',
      ] },
      { heading: 'Count conversations, not calls', paragraphs: [
        'Dialling numbers is easy to count and easy to fake. The useful measure is how many real conversations you had, and how many of those led to a next step. Track both for a month and you will see which sources of names are worth your time.',
      ], list: ['Twenty minutes, same time each day.', 'Five new names added each week.', 'One honest question per conversation: “What would need to change for this to be worth a meeting?”'] },
      { heading: 'Why it compounds', paragraphs: [
        'A steady habit fills the pipeline evenly, so you are never forced to discount at month end to make a number. That is the quiet advantage of prospecting daily: it protects your price as well as your target.',
      ] },
    ],
  },
  {
    slug: 'too-expensive',
    title: '“It’s too expensive”: answering without discounting',
    dek: 'A price objection is usually a value question in disguise. Here is how to find out which one you are facing.',
    stage: 'Handling objections',
    minutes: 5,
    body: [
      { paragraphs: [
        'When a customer says the price is too high, the reflex is to offer something off. Sometimes that is right. More often it teaches the customer that your first price was never your real price.',
      ] },
      { heading: 'First, find out what they mean', paragraphs: [
        '“Too expensive” can mean several different things: more than the budget allows, more than a competitor, more than the value they can see, or simply “I need to show my boss I pushed back”. Each needs a different answer, so ask before you answer.',
      ], list: ['“Too expensive compared with what?”', '“If the price were right, is this the option you would choose?”', '“What would it need to do to be worth this?”'] },
      { heading: 'Go back to the need', paragraphs: [
        'If you identified the need well, you can connect the price to it: what the problem is costing them now, and what changes once it is solved. If you cannot make that connection, the objection is telling you discovery was rushed, and that is worth knowing too.',
      ] },
      { heading: 'Trade, don’t give', paragraphs: [
        'If the budget really is the limit, change the scope instead of the price: a smaller quantity, a longer term or fewer extras. A concession should always buy something back, such as a faster decision, a larger order or a referral.',
      ] },
    ],
  },
  {
    slug: 'what-a-sales-audit-looks-at',
    title: 'What a sales audit actually looks at',
    dek: 'An audit is not a judgement of your sellers. It is a structured look at where good effort is leaking out of the process.',
    stage: 'Identifying needs',
    minutes: 4,
    body: [
      { paragraphs: [
        'Leaders usually ask for a sales audit when results disappoint and nobody can agree why. Some blame the market, some blame the team, some blame the product. A good audit replaces those opinions with a shared picture.',
      ] },
      { heading: 'The process, step by step', paragraphs: [
        'Start by writing down how a sale really happens today, from first contact to repeat order, rather than how the handbook says it should. Gaps between the two are often the first finding.',
      ] },
      { heading: 'Where deals stall', paragraphs: [
        'Most teams lose deals at one or two predictable points: after the first meeting, after the proposal, or at the price conversation. Knowing which one is yours tells you whether the fix is coaching, a better qualification habit or a different offer.',
      ], list: ['How are opportunities recorded, and can anyone see them?', 'Which stage loses the most deals?', 'Do sellers describe the process the same way?', 'Is the forecast based on evidence or hope?'] },
      { heading: 'What it should not need', paragraphs: [
        'You should never have to hand over customer databases or confidential financial records just to begin a conversation about an audit. What is shared, and how it is protected, should be agreed in writing first.',
      ] },
    ],
  },
  {
    slug: 'asking-for-referrals',
    title: 'Asking for referrals without feeling awkward',
    dek: 'The seventh stage of the sales process is the one most sellers skip. A simple script makes it feel natural.',
    stage: 'Getting referrals',
    minutes: 3,
    body: [
      { paragraphs: [
        'A satisfied customer is the warmest introduction you will ever get, yet many sellers never ask for one. It feels like asking for a favour. It doesn’t need to.',
      ] },
      { heading: 'Ask at the right moment', paragraphs: [
        'The best time is shortly after the customer has seen the result they bought: the delivery arrived, the system went live, the first month went well. Ask while the value is fresh in their mind, not at the moment of signing.',
      ] },
      { heading: 'Be specific', paragraphs: [
        '“Do you know anyone who might be interested?” invites a polite no. Name the kind of business you help and ask for one introduction.',
      ], list: ['“Who else in your association deals with the same problem?”', '“Would you be comfortable introducing me to them by message?”', '“What should I know about them before I call?”'] },
      { heading: 'Close the loop', paragraphs: [
        'Whatever happens with the introduction, tell the customer who made it. People keep referring sellers who treat their contacts well and say thank you.',
      ] },
    ],
  },
]

export const findArticle = (slug: string | undefined) => ARTICLES.find(article => article.slug === slug)
