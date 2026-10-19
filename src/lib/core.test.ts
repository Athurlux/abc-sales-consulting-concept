import { describe, expect, it } from 'vitest'
import { ROLES } from '../data/roles'
import { PROGRAMMES } from '../data/programmes'
import { applyFlow, auditFlow, callFlow, contactFlow, corporateFlow, launchFlow, registerFlow, type RegisterDraft } from '../forms/flows'
import { firstIncompleteIndex, pruneHidden, reviewSections, validateStage, type FlowSpec, type Draft } from '../forms/engine'
import { DONE, resolveStep } from '../forms/useFormFlow'
import { cvFileError, describeFile } from './cvFile'
import { recommendProgramme } from './fit'
import { filterRoles, parseRoleFilters, roleFiltersToParams } from './roleFilters'
import { callDateError, earliestCallDate } from './schedule'
import { parseShortlist, serializeShortlist } from './shortlist'
import { addDays } from './validation'

// 23:30 in Kampala (UTC+3) on 19 October 2026, but still the 19th in UTC: the case
// where a visitor's clock and Kampala disagree about "today".
const LATE = new Date('2026-10-19T20:30:00Z')
// 00:30 in Kampala on 20 October 2026, while UTC is still the 19th.
const AFTER_MIDNIGHT = new Date('2026-10-19T21:30:00Z')

const filled = <T extends Draft>(flow: FlowSpec<T>, today = '2026-10-19') => ({ ...flow.empty(), ...flow.sample(today) }) as T

describe('discovery-call dates (Africa/Kampala)', () => {
  it('rejects past dates and today, and accepts tomorrow onwards', () => {
    expect(callDateError('2026-10-18', LATE)).toMatch(/today or a later date/)
    expect(callDateError('2026-10-19', LATE)).toMatch(/tomorrow or a later date/)
    expect(callDateError('2026-10-20', LATE)).toBeNull()
  })

  it('uses the Kampala date, not the UTC date, after midnight in Kampala', () => {
    expect(earliestCallDate(AFTER_MIDNIGHT)).toBe('2026-10-21')
    expect(callDateError('2026-10-20', AFTER_MIDNIGHT)).not.toBeNull()
  })

  it('bounds how far ahead a date can be and rejects malformed input', () => {
    expect(callDateError(addDays('2026-10-19', 60), LATE)).toBeNull()
    expect(callDateError(addDays('2026-10-19', 61), LATE)).toMatch(/within the next 60 days/)
    expect(callDateError('2026-11-31', LATE)).toBe('Enter a valid date.')
    expect(callDateError('', LATE)).toMatch(/Choose a preferred date/)
  })
})

describe('validation in the form specs', () => {
  it('requires a programme, valid contact details and who pays', () => {
    const empty = registerFlow.empty()
    expect(Object.keys(validateStage(registerFlow.stages[0], empty))).toEqual(['programme'])
    const details = validateStage(registerFlow.stages[1], { ...empty, fullName: 'A', email: 'not-an-email', phone: '12345' })
    expect(details.email).toMatch(/name@example.com/)
    expect(details.phone).toMatch(/Ugandan number/)
    expect(validateStage(registerFlow.stages[1], { ...empty, fullName: 'A', email: 'a@b.co', phone: '+256 772 123 456' })).toEqual({})
  })

  it('asks for the employer only when the employer sponsors, and prunes it otherwise', () => {
    const base = { ...filled(registerFlow), programme: 'frontline-practitioner' } as RegisterDraft
    const sponsored = { ...base, participation: 'employer', employer: null }
    expect(validateStage(registerFlow.stages[2], sponsored).employer).toBe('Enter employer name.')
    const switched = { ...sponsored, employer: 'Old Co', participation: 'individual' }
    expect(validateStage(registerFlow.stages[2], switched)).toEqual({})
    expect(pruneHidden(registerFlow, switched).employer).toBeNull()
    const participation = reviewSections(registerFlow, switched).find(section => section.stageId === 'participation')!
    expect(participation.entries.map(entry => entry.name)).not.toContain('employer')
  })

  it('accepts either email or phone where the flow allows one, but not neither', () => {
    const contact = contactFlow.stages[1]
    expect(validateStage(contact, { ...contactFlow.empty(), fullName: 'A' }).contactMethod).toMatch(/email address or a phone number/)
    expect(validateStage(contact, { ...contactFlow.empty(), fullName: 'A', phone: '0772123456' })).toEqual({})
  })

  it('validates multi-choice answers against their options', () => {
    const need = corporateFlow.stages[0]
    const draft = filled(corporateFlow)
    expect(validateStage(need, { ...draft, services: null }).services).toBe('Choose at least one service.')
    expect(validateStage(need, { ...draft, services: 'training|made-up' }).services).toBe('Choose at least one service.')
    const review = reviewSections(corporateFlow, draft)[0].entries.find(entry => entry.name === 'services')!
    expect(review.value).toBe('Team sales training, Strategic sales advisory')
  })

  it('every sample completes its flow, so “Use sample details” always reaches review', () => {
    const today = '2026-10-19'
    const flows: FlowSpec<any>[] = [registerFlow, corporateFlow, auditFlow, callFlow, launchFlow, applyFlow, contactFlow]
    for (const flow of flows) {
      const draft = { ...filled(flow, today), ...(flow === registerFlow ? { programme: 'foundational-selling' } : {}) }
      expect(firstIncompleteIndex(flow, draft, LATE), flow.key).toBe(flow.stages.length)
    }
  })
})

describe('multi-step state', () => {
  it('never lets a direct link skip an incomplete step', () => {
    const empty = registerFlow.empty()
    expect(resolveStep(registerFlow, empty, 'review')).toBe('programme')
    const partial = { ...empty, programme: 'sales-leadership' }
    expect(resolveStep(registerFlow, partial, 'goals')).toBe('details')
    expect(resolveStep(registerFlow, { ...filled(registerFlow), programme: 'sales-leadership' }, 'review')).toBe('review')
  })

  it('keeps the done step addressable so the confirmation can show its honest fallback', () => {
    expect(resolveStep(registerFlow, registerFlow.empty(), DONE)).toBe(DONE)
  })
})

describe('programme selection', () => {
  it('suggests a level from the published audiences', () => {
    expect(recommendProgramme({ experience: 'new', challenge: 'value' })?.programmeId).toBe('foundational-selling')
    expect(recommendProgramme({ experience: 'selling', challenge: 'value' })?.programmeId).toBe('frontline-practitioner')
    expect(recommendProgramme({ experience: 'selling', challenge: 'team' })?.programmeId).toBe('sales-leadership')
    expect(recommendProgramme({ experience: 'leading', challenge: 'teach' })?.programmeId).toBe('certified-trainer')
    expect(recommendProgramme({ experience: 'new', challenge: 'teach' })?.programmeId).toBe('foundational-selling')
    expect(recommendProgramme({ experience: null, challenge: 'method' })).toBeNull()
  })

  it('persists only known programme IDs, and survives bad storage', () => {
    expect(parseShortlist(serializeShortlist(['sales-leadership', 'foundational-selling']))).toEqual(['sales-leadership', 'foundational-selling'])
    expect(parseShortlist(JSON.stringify({ version: 1, ids: ['sales-leadership', 'evil', 42, 'sales-leadership'] }))).toEqual(['sales-leadership'])
    expect(parseShortlist(JSON.stringify({ version: 2, ids: ['sales-leadership'] }))).toEqual([])
    expect(parseShortlist('{not json')).toEqual([])
    expect(parseShortlist(null)).toEqual([])
  })

  it('offers every published level in the registration flow, and nothing else', () => {
    const options = registerFlow.stages[0].fields[0].options!.map(option => option.value)
    expect(options).toEqual(PROGRAMMES.map(programme => programme.id))
  })
})

describe('careers filters', () => {
  it('matches every query word, case- and accent-insensitively', () => {
    const titles = (q: string) => filterRoles(ROLES, { q, category: null, arrangement: null }).map(role => role.slug)
    expect(titles('ACCOUNT')).toEqual(['account-executive'])
    expect(titles('team pipeline')).toEqual(['sales-executive', 'sales-team-lead'])
    expect(titles('entébbe')).toEqual(['retail-sales-associate'])
    expect(titles('nothing-matches')).toEqual([])
  })

  it('ignores unknown URL values and round-trips known ones', () => {
    expect(parseRoleFilters(new URLSearchParams('category=fake&arrangement=hybrid&q=lead'))).toEqual({ q: 'lead', category: null, arrangement: 'hybrid' })
    const filters = { q: 'sales', category: 'field', arrangement: 'on-site' }
    expect(parseRoleFilters(roleFiltersToParams(filters))).toEqual(filters)
    expect(filterRoles(ROLES, filters).map(role => role.slug)).toEqual(['retail-sales-associate'])
  })
})

describe('CV selection (local only)', () => {
  it('accepts PDF and Word up to 2 MB', () => {
    expect(cvFileError({ name: 'cv.pdf', type: 'application/pdf', size: 120_000 })).toBeNull()
    expect(cvFileError({ name: 'CV.DOCX', type: '', size: 50_000 })).toBeNull()
    expect(describeFile({ name: 'cv.pdf', type: 'application/pdf', size: 120_000 })).toBe('cv.pdf (117 KB)')
  })

  it('rejects other types, renamed files, empty files and large files', () => {
    expect(cvFileError({ name: 'photo.jpg', type: 'image/jpeg', size: 1000 })).toMatch(/PDF or Word/)
    expect(cvFileError({ name: 'cv.pdf', type: 'image/png', size: 1000 })).toMatch(/PDF or Word/)
    expect(cvFileError({ name: 'cv.pdf', type: 'application/pdf', size: 0 })).toMatch(/empty/)
    expect(cvFileError({ name: 'cv.pdf', type: 'application/pdf', size: 2 * 1024 * 1024 + 1 })).toMatch(/2 MB/)
  })
})
