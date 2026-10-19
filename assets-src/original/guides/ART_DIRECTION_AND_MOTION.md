# Art direction and motion

Position: ambitious sales education and practical business advisory. Proposed campaign: “Built for the next level.” Avoid cloning the earlier Dama navy consulting aesthetic.

Use ivory as the main canvas, ink for readable type, vermilion for a small number of actions and visual landmarks. White small text may use the deep vermilion token, but check every actual pair for contrast; colour alone must not communicate state. Build responsive typography with clamp(). Suggested fonts Manrope and Inter; no font binaries supplied.

## Asset map
- Home desktop: images/hero-desktop.webp. People occupy the right half; use the left for live dark HTML text. At wide ratios preserve faces. Prefer a separate copy column if the crop becomes crowded.
- Home mobile: images/hero-mobile.webp. Keep the subject below the headline. At narrow widths put copy above the image rather than layering long paragraphs on the portrait.
- Sales training and corporate training: sales-training.webp.
- One-to-one advisory: executive-coaching.webp.
- Corporate strategy: sales-strategy.webp.
- Performance audit: performance-audit.webp. Printed blocks are illustrative, not client results.
- Recruitment and careers: recruitment.webp.
- Launch Lab: launch-lab.webp. All depicted participants are fictional young adults.
- Programme overview or supporting editorial moment: programme-still-life.webp.
- Sales Ladder transition: growth-sculpture.webp. This is a flattened bitmap, not a rigged 3D model.
- Programme tiles: programmes/*.svg or .webp.
- Header/footer: branding/logo-ink.svg and logo-ivory.svg. Logo is a proposed replacement identity; do not call it official.
- Sharing: social/social-preview-1200x630.jpg; social square is a separate crop.

## Motion storyboard
1. Short staged headline entrance, then photograph reveal; CTAs usable immediately.
2. On the Sales Ladder, animate real SVG/HTML steps one at a time beside readable copy. The sculpture can have a restrained 2D translation; do not fake a full 3D rotation of a flat picture.
3. Programme cards reveal with small stagger; no carousel required to access content.
4. An optional brief desktop sticky narrative can connect people, process and growth; mobile uses normal document flow.
5. Forms use brief state transitions; errors and focus must remain clear.
Use GSAP context cleanup and matchMedia; remove pinning under reduced motion. Avoid animated counters implying business results, automatic marquees carrying critical content, giant preloads and scroll-jacking. Lazy-load supporting photography, serve small versions appropriately, preload only the active hero.

## What can break the result
- Fake staff, customer or graduate attribution destroys credibility. Never attach a real person’s name to a generated face.
- A stale cohort date or fake availability makes the site misleading. Use a dated data file and demo labels.
- Similar office photographs repeated everywhere make the site monotonous. Mix photography with large type, restrained vector steps and breathing room.
- Long pinned sequences and oversized imagery make phones slow and the enquiry journey hard to reach. Keep animation secondary to access.
- The PNG artwork is not in this ZIP; full-resolution high-quality WebP masters and smaller delivery versions are provided. Generate further derivatives from the master, not repeatedly from a small image.
