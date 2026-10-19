# Verification

Checks actually performed on 19 October 2026. Nothing listed under "Not performed" should be read as done.

## Automated

| Check | Result |
|---|---|
| `tsc -b` (strict, no unused locals) | Clean |
| `npm run build` | Clean. Page chunks 1–10 KB; GSAP (about 46 KB gzipped) loads only with pages that animate |
| `npm test` (vitest, 17 tests) | All pass. Covers Kampala date handling (past, today, after Kampala midnight, upper bound, impossible dates), form-spec validation, conditional field pruning, email-or-phone rules, multi-choice validation, every flow's sample completing, step-skipping protection, the fit guide, shortlist storage parsing, careers filtering and URL round-trips, and CV file rules |
| `npm run verify` (one headless Chrome, 51 checks) | 51/51 against the local preview and 51/51 against https://abc-sales-consulting-concept.pages.dev |

### What `scripts/verify.mjs` covers

- Hero CTA, fit guide suggestion and guidance wording, shortlist toggling, filtering and storage contents.
- Registration: preselection from a programme page, error summary, focus on the first invalid field, `aria-describedby` on inline errors, the conditional employer field, editing from review, the hidden employer pruned from review, double-click completion, confirmation wording, Print and return links, Back not resubmitting, and the honest fallback after a refresh.
- Corporate brief, audit enquiry (conditional CRM question), discovery call (past date and today rejected in Kampala time; windows labelled as demo preferences), contact, and Launch Lab interest.
- Careers: search and filters in the URL, empty state, Back undoing a filter, reset, demo flag on every role, wrong CV type rejected, valid CV shown by name only and listed in review, CV cleared after completion.
- Direct loads of nested routes and fallbacks for unknown programmes, roles and pages.
- Mobile menu keyboard focus and Escape restoring focus; reduced motion settling the hero immediately.
- ScrollTrigger count unchanged after three home → Sales Ladder → home round trips and five resizes across breakpoints (22 → 22).
- No horizontal overflow on 9 routes at 360, 390, 768, 1024 and 1440 px.
- No non-GET requests, no third-party requests (fonts are self-hosted), no personal data in any request URL or in `localStorage` or `sessionStorage`, and no console or page errors.

Hardening note: the first live runs each failed a different single check because the script sampled the page a frame too early (a lazy chunk, a URL-driven re-render, a focus move inside `requestAnimationFrame`). Those checks now wait for the expected state. No application code changed for them.

## Bug found by the tests

`isIsoDate` accepted impossible dates such as `2026-11-31`, because `Date.parse` rolls them into the next month. It now round-trips the value. The same helper exists in the Nook Kampala and Dama Consultants concepts; they were not modified here.

## Visual review

Full-page screenshots were captured with `scripts/shoot.mjs` and inspected at 1440 px (home, programmes, programme detail, Sales Ladder, organisations, Launch Lab, careers) and 390 px (home, register, careers, Sales Ladder). Fixes made from them:

- The desktop hero copy overlapped the people at 1440 px, so the hero became a copy column beside the photograph, cropped from the left to keep faces.
- Nav and footer lists showed bullet markers.
- The desktop hero photo did not fill the hero's height.
- "Prospecting" broke mid-word in the seven-step staircase, so the steps now take the full width.
- Copy: "A 6 weeks programme" and a lowercased "year 13".
- Callout rules ran past the content width on stone sections.

Selected captures are in `docs/screenshots/`. Very tall phone captures over about 8,000 px repeat the top of the page, which is a Chrome capture limit; the overflow sweep confirms layout at those widths.

## Not performed

- No Lighthouse or other automated accessibility audit.
- No screen-reader pass (NVDA, VoiceOver or TalkBack).
- No physical-device testing; phone widths were emulated in desktop Chrome.
- No cross-browser testing beyond Chrome (Safari and Firefox untested).
- No throttled-CPU performance profile.

## Remaining limitations

- Fees, durations and contact details are dated references and will drift; recheck them before any real use.
- The address plot number and the primary phone number are unresolved on ABC's own site.
- Deployment is Direct Upload: a GitHub push does not update the live site (see README).
