# Assets

All visual assets come from `ABC_Sales_Consulting_Master_Assets.zip` (independent concept pack, created 19 October 2026). The 45 extracted files are kept unchanged in `assets-src/original/`. Every raster master was opened and decoded with Pillow before use; none were missing or corrupt.

## Generated imagery: disclosure

All ten photographs and renders are **AI-generated illustrations** (see `assets-src/original/asset-manifest.json` and `guides/GENERATION_PROMPTS.json`). The people, offices and training scenes are fictional. They are **not** ABC staff, trainers, clients, graduates or premises, and the site never names or captions a generated person as a real one. Alt text describes each scene and marks it as illustrative where a person might otherwise assume it is real.

The proposed logo family, favicons, programme covers and step pattern are **concept branding**, not ABC's official identity.

## Where each asset is used

| Asset | Used for | Derivatives (`public/images/`) |
|---|---|---|
| `hero-desktop.webp` | Home hero at 768px and wider; desktop crops from the left so faces stay in frame | 960, 1536 |
| `hero-mobile.webp` | Home hero below 768px; top 220px of empty wall removed because copy sits above the photo | 480, 800 |
| `sales-training.webp` | Narrative "Build the people", team training service | 480, 960, 1440 |
| `performance-audit.webp` | Narrative "Strengthen the process", audit service. Printed charts are illustrative, not client data | 480, 960, 1440 |
| `recruitment.webp` | Narrative "Grow the business", recruitment service, careers intro | 480, 960, 1440 |
| `sales-strategy.webp` | Strategic advisory service | 480, 960, 1440 |
| `launch-lab.webp` | Home Launch Lab feature, Launch Lab outcomes. Participants are fictional young adults | 480, 960, 1440 |
| `programme-still-life.webp` | About page | 480, 960, 1440 |
| `growth-sculpture.webp` | Sales Ladder hero. A flat bitmap: only a gentle 2D vertical drift on desktop, no fake rotation | 480, 960 |
| `executive-coaching.webp` | Not used. Advisory already has a scene, and repeating office photos would make pages monotonous | |
| `programmes/*.webp` | Programme tiles, comparison and detail covers; Launch Lab hero art. Decorative (`alt=""`) because their words repeat live HTML | 500, 1000 |
| `branding/logo-ink.svg`, `logo-ivory.svg` | Header and footer | copied to `public/brand/` |
| `branding/mark-vermilion.svg` | Closing CTA and not-found page | copied |
| `branding/favicon.svg`, `favicon-192.png` | Favicon and Apple touch icon (resized to 180px) | `public/` |
| `social/social-preview-1200x630.jpg` | Open Graph image; it carries its own "Independent design concept" label | `public/og-image.jpg` |
| `step-pattern.svg`, `logo-mono.svg`, `social-square-1080.jpg`, `CONTACT_SHEET.jpg`, `ASSET_INDEX.html` | Reference only | |

The Certified ABC Trainer route has no supplied cover. Rather than borrow another programme's art, it uses a CSS-drawn four-step stair in the same palette.

## Pipeline

`npm run images` (`scripts/optimize-images.py`) makes every derivative from the full-resolution master at WebP quality 78 to 82. The total is about 1.4 MB across all sizes. Outputs are committed, so the build never needs Python. Only the active hero is preloaded, and only on the homepage, with a `media` query so a device downloads only its own hero. Everything else is lazy-loaded with explicit dimensions.

## Fonts

Manrope and Inter variable fonts, SIL Open Font License, self-hosted through `@fontsource-variable/*`. No requests go to Google Fonts.
