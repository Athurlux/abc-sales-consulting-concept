// Compact browser journey check. Run against a preview build:
//   npm run build && npm run preview -- --port 4176   (another terminal)
//   npm run verify     or   VERIFY_URL=https://abc-sales-consulting-concept.pages.dev npm run verify
// One headless Chrome, one page at a time.
import { chromium } from 'playwright'

const BASE = (process.env.VERIFY_URL ?? 'http://127.0.0.1:4176').replace(/\/$/, '')
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const results = []
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`) }

const browser = await chromium.launch({ executablePath: CHROME })
const context = await browser.newContext({ viewport: { width: 1280, height: 860 } })
const page = await context.newPage()
const requests = []
const errors = []
page.on('request', request => requests.push({ method: request.method(), url: request.url() }))
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
const go = async path => { await page.goto(BASE + path, { waitUntil: 'networkidle' }) }
const sees = async (text, timeout = 8000) => page.getByText(text).first().waitFor({ timeout }).then(() => true, () => false)
const button = name => page.getByRole('button', { name, exact: true })
const kampalaDate = offset => {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala' }).format(new Date())
  const date = new Date(`${today}T00:00:00Z`); date.setUTCDate(date.getUTCDate() + offset)
  return date.toISOString().slice(0, 10)
}
// Fill a flow with sample details and step through to the final button.
const runSample = async finalLabel => {
  for (let step = 0; step < 6 && !(await button(finalLabel).count()); step++) {
    if (await page.locator('.flow__head button').count()) await page.locator('.flow__head button').click()
    await page.locator('.flow__actions button[type="submit"]').click()
    await page.waitForTimeout(120)
  }
  return (await button(finalLabel).count()) > 0
}

try {
  // 1. Home → programmes, fit guide, shortlist
  await go('/')
  await page.getByRole('link', { name: 'Explore programmes' }).first().click()
  await page.waitForURL(/\/programmes$/)
  check('hero CTA reaches the programme directory', await page.locator('h1', { hasText: 'Choose the level' }).isVisible())
  await page.getByLabel('I sell regularly and have some experience').check()
  await page.getByLabel('I discount too often or lose deals late').check()
  check('fit guide suggests Frontline Practitioner, labelled as guidance', (await page.locator('.fit__name').innerText()).startsWith('Frontline Practitioner') && await sees('not an admissions assessment'))
  await page.getByRole('button', { name: 'Shortlist Sales Leadership' }).click()
  await page.getByRole('button', { name: 'Shortlist Foundational Selling' }).click()
  await page.getByLabel(/Show my shortlist only/).check()
  check('shortlist filter shows two levels', (await page.locator('.compare__col').count()) === 2)
  await page.reload({ waitUntil: 'networkidle' })
  const stored = await page.evaluate(() => Object.entries(localStorage))
  check('storage holds only versioned programme IDs', stored.length === 1 && stored[0][1] === '{"version":1,"ids":["sales-leadership","foundational-selling"]}', JSON.stringify(stored))

  // 2. Registration: preselect, errors, conditional field, edit, duplicate protection, honest fallback
  await go('/programmes/sales-leadership')
  await page.getByRole('link', { name: 'Register interest (demo)' }).first().click()
  await page.waitForURL(/\/register\?programme=sales-leadership/)
  check('programme preselected from the detail page', await page.getByLabel(/Sales Leadership \(Level 3\)/).isChecked())
  await button('Continue').click()
  await button('Continue').click()
  check('empty details step shows an error summary', await page.locator('.error-summary').isVisible())
  check('focus moves to the first invalid field', await page.evaluate(() => document.activeElement?.id === 'fullName'))
  await page.locator('#email').fill('not-an-email')
  check('inline error is tied to its field', (await page.locator('#email').getAttribute('aria-describedby'))?.includes('email-error') ?? false)
  await button('Use sample details').click()
  await button('Continue').click()
  await page.getByLabel('My employer would sponsor me').check()
  check('employer field appears only for sponsorship', await page.locator('#employer').isVisible())
  await button('Continue').click()
  check('employer required when sponsored', (await page.locator('#employer-error').innerText()).includes('employer name'))
  await page.getByLabel('I would pay myself').check()
  await button('Continue').click()
  await button('Review').click()
  await page.getByRole('button', { name: /Edit Your details/ }).click()
  await page.locator('#fullName').fill('Amani N. Nakato')
  await button('Continue').click(); await button('Continue').click(); await button('Review').click()
  check('review reflects the edit and drops the hidden employer', await sees('Amani N. Nakato') && !(await page.locator('.summary').innerText()).includes('Employer name'))
  await button('Complete demo registration').dblclick()
  await page.waitForURL(/\/register\/confirmation\/ABC-/)
  check('confirmation states nothing was sent or reserved', await sees('Demo complete. No registration was sent and no seat has been reserved.'))
  check('confirmation offers Print and return to programmes', await button('Print').isVisible() && await page.getByRole('link', { name: 'Return to programmes' }).isVisible())
  await page.goBack({ waitUntil: 'networkidle' })
  check('Back cannot resubmit a filled review', !(await button('Complete demo registration').isVisible().catch(() => false)))
  await page.goForward({ waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' })
  check('refreshed confirmation shows an honest fallback', await sees('There’s no registration to show here.'))

  // 3. Corporate brief and audit enquiry (with conditional CRM field)
  await go('/organisations/brief')
  check('corporate brief completes', await runSample('Complete demo brief') && (await button('Complete demo brief').click(), await sees('No brief was sent')))
  await go('/organisations/audit')
  await button('Use sample details').click(); await button('Continue').click()
  await page.getByLabel('A CRM system').check()
  check('audit asks which CRM only when one is used', await page.locator('#crmName').isVisible())
  await page.getByLabel('Spreadsheets').check()
  check('audit enquiry completes', await runSample('Complete demo audit enquiry') && (await button('Complete demo audit enquiry').click(), await sees('no audit has been arranged')))

  // 4. Discovery call: Kampala dates
  await go('/discovery-call')
  await page.getByLabel('Training for my team').check(); await button('Continue').click()
  await page.locator('#date').fill(kampalaDate(-1)); await page.getByLabel(/Morning/).check(); await button('Continue').click()
  check('past date rejected', (await page.locator('#date-error').innerText()).includes('today or a later date'))
  await page.locator('#date').fill(kampalaDate(0)); await button('Continue').click()
  check('today rejected (Kampala time)', (await page.locator('#date-error').innerText()).includes('tomorrow'))
  check('windows labelled as demonstration preferences', await sees('Demonstration preference only'))
  await page.locator('#date').fill(kampalaDate(2)); await button('Continue').click()
  check('call request completes without booking', await runSample('Complete demo call request') && (await button('Complete demo call request').click(), await sees('No meeting was booked and no calendar invitation was sent.')))

  // 5. Careers: URL filters, empty state, Back; application with local-only CV
  await go('/careers')
  await page.locator('#role-q').fill('account')
  await page.waitForURL(/q=account/)
  check('search narrows and lives in the URL', (await page.locator('.role-row').count()) === 1)
  await page.locator('#role-category').selectOption('leadership')
  check('empty state with reset', await sees('No sample roles match these filters.'))
  await page.goBack()
  await page.waitForURL(url => !url.toString().includes('category'))
  check('Back undoes the last filter', (await page.locator('.role-row').count()) === 1)
  await page.getByRole('button', { name: 'Reset filters' }).first().click()
  check('reset shows all sample roles', (await page.locator('.role-row').count()) === 4 && (await page.locator('.role-row__flag').count()) === 4)
  await page.getByRole('link', { name: 'Sales Team Lead' }).click()
  await page.getByRole('link', { name: 'Try the demo application' }).click()
  await button('Use sample details').click(); await button('Continue').click()
  await page.locator('#cv').setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') })
  check('wrong CV type rejected locally', (await page.locator('#cv-error').innerText()).includes('PDF or Word'))
  await page.locator('#cv').setInputFiles({ name: 'cv.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(40_000, 1) })
  check('valid CV shows its name only', await sees('Selected: cv.pdf (39 KB)'))
  await button('Review').click()
  check('review lists the CV filename', await sees('cv.pdf (39 KB)'))
  await button('Complete demo application').click()
  check('application confirmation: nothing submitted', await sees('No application was submitted and your CV was not uploaded.'))
  await button('Start a new application').click()
  await button('Use sample details').click(); await button('Continue').click()
  check('CV cleared after completion', (await page.locator('.file-chosen').count()) === 0 && (await page.locator('#cv').inputValue()) === '')

  // 6. Contact and Launch Lab
  await go('/contact')
  check('real contact details kept apart from the form', await page.locator('.real-contact').getByText('admin@abcsalesconsulting.net').isVisible())
  check('contact completes', await runSample('Complete demo message') && (await button('Complete demo message').click(), await sees('No message was sent.')))
  await go('/launch-lab')
  check('Launch Lab does not advertise the passed start as upcoming', await sees('which has passed'))
  check('Launch Lab interest completes', await runSample('Complete demo interest form') && (await button('Complete demo interest form').click(), await sees('no place has been held')))

  // 7. Direct nested routes and fallbacks
  for (const [path, text] of [
    ['/insights/asking-for-referrals', 'Asking for referrals without feeling awkward'],
    ['/careers/sales-executive', 'Demo opportunity — not an active vacancy.'],
    ['/careers/not-a-role/apply', 'We couldn’t find that sample role.'],
    ['/programmes/not-a-level', 'We couldn’t find that programme.'],
    ['/organisations/brief?step=review', 'What you need'],
    ['/no-such-page', 'This page isn’t here.'],
  ]) { await go(path); check(`direct load ${path}`, await sees(text)) }

  // 8. Keyboard menu at phone width; reduced motion
  await page.setViewportSize({ width: 390, height: 800 })
  await go('/about')
  await page.getByRole('button', { name: 'Open menu' }).click()
  check('mobile menu focuses its first link', await page.evaluate(() => document.activeElement?.textContent === 'Home'))
  await page.keyboard.press('Escape')
  check('Escape closes the menu and restores focus', await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Open menu'))
  const reduced = await browser.newPage({ reducedMotion: 'reduce' })
  await reduced.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('reduced motion: hero settled immediately', await reduced.evaluate(() => !document.documentElement.classList.contains('hero-pending') && getComputedStyle(document.querySelector('[data-hero="line"]')).transform === 'none'))
  await reduced.close()

  // 9. No trigger build-up across navigation and resizing
  await page.setViewportSize({ width: 1280, height: 860 })
  await go('/')
  const initial = await page.evaluate(() => window.__scrollTriggerCount?.())
  for (let i = 0; i < 3; i++) {
    await page.getByRole('link', { name: 'Sales Ladder', exact: true }).first().click()
    await page.waitForURL(/sales-ladder/)
    await page.getByRole('link', { name: 'ABC Sales Consulting concept, home' }).click()
    await page.waitForURL(url => new URL(url).pathname === '/')
  }
  for (const width of [800, 1280, 900, 1300, 1280]) { await page.setViewportSize({ width, height: 860 }); await page.waitForTimeout(200) }
  await page.waitForTimeout(400)
  const after = await page.evaluate(() => window.__scrollTriggerCount?.())
  check('ScrollTrigger count stable after navigation and resizing', typeof initial === 'number' && after === initial, `${initial} → ${after}`)

  // 10. Overflow sweep
  const overflow = []
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 860 })
    for (const path of ['/', '/programmes', '/programmes/sales-leadership', '/sales-ladder', '/organisations', '/launch-lab', '/careers', '/register', '/contact']) {
      await go(path)
      const extra = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (extra > 0) overflow.push(`${path}@${width}:${extra}`)
    }
  }
  check('no horizontal overflow at 360–1440', overflow.length === 0, overflow.join(', '))

  // 11. Nothing leaves the browser
  const origin = new URL(BASE).origin
  const nonGet = requests.filter(request => request.method !== 'GET')
  const thirdParty = requests.filter(request => !request.url.startsWith(origin) && !request.url.startsWith('data:'))
  const personal = requests.filter(request => /amani|nakato|okello|example\.com|0772|cv\.pdf/i.test(decodeURIComponent(request.url)))
  check('no non-GET requests', nonGet.length === 0, nonGet.map(request => request.url).join(', '))
  check('no third-party requests', thirdParty.length === 0, [...new Set(thirdParty.map(request => new URL(request.url).host))].join(', '))
  check('no personal data in any request URL', personal.length === 0)
  // localStorage holds only the shortlist; sessionStorage holds React Router's scroll
  // positions (pathname keys). Neither may contain anything typed into a form.
  const storage = await page.evaluate(() => ({ local: Object.keys(localStorage), dump: JSON.stringify({ ...localStorage, ...sessionStorage }) }))
  check('no personal data in browser storage', storage.local.every(key => key === 'abc-concept-shortlist') && !/amani|nakato|okello|daniel|grace|example\.com|0772|0701|cv\.pdf/i.test(storage.dump), storage.local.join(', '))
  check('no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '))
} catch (error) {
  check('journey ran to completion', false, error.message.split('\n')[0])
} finally {
  await browser.close()
}

const failed = results.filter(result => !result.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
