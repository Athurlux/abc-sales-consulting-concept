# ABC Sales Consulting: independent website concept

An independent redesign concept for [ABC Sales Consulting](https://abcsalesconsulting.net/), a sales training and advisory business in Ntinda, Kampala. It was made to show how the company's website could guide three audiences to the right next step: individuals choosing a programme, organisations looking for team training, advisory, audits or recruitment, and candidates exploring sales roles.

**Live:** https://abc-sales-consulting-concept.pages.dev
**Not affiliated with or approved by ABC Sales Consulting.** The logo and the line "Built for the next level" are proposals, and people in the photographs are AI-generated illustrations.

## What works

| Route | What it does |
|---|---|
| `/` | Hero, route chooser, people/process/growth narrative, programme preview, Sales Ladder, engagement steps, Launch Lab, closing CTA |
| `/programmes` | Side-by-side comparison of the four published levels, a programme shortlist (stored as IDs only), and a two-question fit guide |
| `/programmes/:slug` | Who it's for, focus, published fee and duration, entry and certification, FAQs, next action |
| `/register` → `/register/confirmation/:ref` | Demo registration: programme → details → individual or employer-sponsored → optional goals → review and edit → completion, with print and an honest fallback after a refresh |
| `/sales-ladder` | The seven published stages as a live HTML staircase, then the four levels |
| `/organisations`, `/organisations/brief`, `/organisations/audit` | Four services, a three-step team brief, and an audit enquiry with conditional CRM questions |
| `/discovery-call` | Topic, preferred date (Kampala time, from tomorrow) and an illustrative time window |
| `/launch-lab` | The programme for 18 to 20 year olds, with an interest form for the young person or a parent or guardian |
| `/careers`, `/careers/:slug`, `/careers/:slug/apply` | Sample roles with URL-driven search and filters, role pages, and an application with a local-only CV check |
| `/insights`, `/insights/:slug` | Four original concept articles |
| `/about`, `/contact` | Supported facts, the concept disclosure, and ABC's published contact details kept apart from the demo form |
| `*` | A useful not-found page |

Every form validates inline, has an error summary that moves focus, supports Back, editing from review, "Use sample details" and "Clear form", and ignores a double click on the final button. **Nothing is sent anywhere.** Answers live in React memory only and disappear on refresh. The only thing persisted is the programme shortlist, as a versioned list of known IDs in `localStorage`.

## Stack

React 19, TypeScript, Vite 7, React Router 7 (lazy route chunks), GSAP with ScrollTrigger (loaded only by pages that animate), plain CSS custom properties, and self-hosted Manrope and Inter variable fonts (OFL) via Fontsource. There is no backend.

- Content: `src/data/` (programmes, roles, insights, dated site facts)
- Forms: one declarative engine (`src/forms/engine.ts`), specs in `src/forms/flows.ts`
- Rules worth testing: `src/lib/` (Kampala dates, call windows, CV checks, fit guide, role filters, shortlist storage)
- Motion: `src/animation/useSiteMotion.ts`, one scoped `useGSAP` context per page with `matchMedia` and a reduced-motion branch

## Commands

```bash
npm install
npm run dev                 # local development
npm test                    # unit tests (vitest)
npm run build               # type-check and production build
npm run preview -- --port 4176
npm run verify              # browser journeys against the preview (needs Chrome)
npm run images              # regenerate web images from assets-src/original (Python + Pillow)
npm run deploy              # build and upload to Cloudflare Pages
```

In Git Bash, prefix the verify command with `MSYS_NO_PATHCONV=1`. `node scripts/shoot.mjs <outDir> <width> <paths...>` captures full-page screenshots for design review.

## Deployment

The site is on **Cloudflare Pages with Direct Upload** (project `abc-sales-consulting-concept`). **Pushing to GitHub does not publish anything.** To update the live site:

```bash
npm test && npm run build
npm run preview -- --port 4176     # in another terminal
MSYS_NO_PATHCONV=1 npm run verify
npm run deploy
MSYS_NO_PATHCONV=1 VERIFY_URL=https://abc-sales-consulting-concept.pages.dev npm run verify
```

`public/_redirects` sends every path to `index.html`, so nested routes survive a refresh. `public/_headers` sets caching and basic security headers.

## Documentation

- [docs/ASSETS.md](docs/ASSETS.md): asset provenance and generated-image disclosure
- [docs/CONTENT-NOTES.md](docs/CONTENT-NOTES.md): sources, verification dates and unresolved business details
- [docs/VERIFICATION.md](docs/VERIFICATION.md): checks actually performed and remaining limitations

Concept design and build by [Arthur Kitandwe](https://arthur-kitandwe.kranks533.workers.dev).
