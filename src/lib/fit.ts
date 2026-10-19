// General guidance for choosing a starting level. It mirrors the "who it's for"
// descriptions on the published Sales Ladder; it is not an admissions assessment.

export type Experience = 'new' | 'selling' | 'experienced' | 'leading'
export type Challenge = 'method' | 'value' | 'team' | 'teach'

export interface FitAnswers {
  experience: Experience | null
  challenge: Challenge | null
}

export interface FitResult {
  programmeId: string
  reason: string
}

export function recommendProgramme({ experience, challenge }: FitAnswers): FitResult | null {
  if (!experience || !challenge) return null
  if (challenge === 'teach') {
    return experience === 'leading' || experience === 'experienced'
      ? { programmeId: 'certified-trainer', reason: 'You want to teach others, and the trainer route is published for Level 3 graduates and proven sellers.' }
      : { programmeId: 'foundational-selling', reason: 'Teaching the method starts with using it well yourself; the trainer route is published for Level 3 graduates and proven sellers.' }
  }
  if (challenge === 'team' || experience === 'leading') {
    return { programmeId: 'sales-leadership', reason: 'Your results depend on other people selling well, which is the focus of Level 3.' }
  }
  if (experience === 'new' || challenge === 'method') {
    return { programmeId: 'foundational-selling', reason: 'You want a repeatable method to replace trial and error, which is where Level 1 starts.' }
  }
  return { programmeId: 'frontline-practitioner', reason: 'You already sell; Level 2 focuses on discovery, pipeline discipline and holding your price.' }
}
