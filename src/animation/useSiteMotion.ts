import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './gsap'

export const DUR = { fast: 0.35, base: 0.6, slow: 0.9 }
export const EASE = { out: 'power3.out', expo: 'expo.out', mask: 'power4.inOut', scrub: 'none' }

const revealPending = () => document.documentElement.classList.remove('hero-pending')

/**
 * One scoped context per page. useGSAP reverts every tween and ScrollTrigger on
 * unmount, and matchMedia reverts per-breakpoint work on resize, so navigation and
 * resizing cannot accumulate triggers. Content is visible by default: elements are
 * hidden only inside the motion branch, immediately before their reveal is armed.
 * Links and buttons are never hidden, so calls to action work from the first frame.
 */
export function useSiteMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' }, context => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean }
      const scope = root.current
      if (!scope) return

      // ---- Narrative image swap (desktop only; mobile shows images inline) -------
      // Not decorative motion: it keeps the sticky photograph matched to the chapter
      // being read, so it runs with reduced motion too, just without the crossfade.
      if (desktop) {
        const frames = gsap.utils.toArray<HTMLElement>('[data-narrative-frame]', scope)
        gsap.utils.toArray<HTMLElement>('[data-chapter]', scope).forEach((chapter, index) => {
          ScrollTrigger.create({
            trigger: chapter,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: self => {
              if (!self.isActive) return
              frames.forEach((frame, frameIndex) => gsap.to(frame, { autoAlpha: frameIndex === index ? 1 : 0, duration: motion ? DUR.base : 0, overwrite: true }))
            },
          })
        })
      }

      if (!motion) { revealPending(); return }
      const cleanups: (() => void)[] = []

      // ---- Hero: staged headline, then the photograph opens ----------------------
      if (scope.querySelector('[data-hero="line"]')) {
        const tl = gsap.timeline({ defaults: { ease: EASE.out } })
        tl.from('[data-hero="line"]', { yPercent: 110, duration: DUR.slow, stagger: 0.12, ease: EASE.expo })
          .from('[data-hero="lede"]', { y: 16, opacity: 0, duration: DUR.base }, '-=0.5')
          .fromTo('[data-hero="mask"]', { scaleX: 1 }, { scaleX: 0, duration: 1.1, ease: EASE.mask }, 0.15)
          .from('[data-hero="photo"]', { scale: 1.08, duration: 1.4 }, 0.15)
        revealPending()
        // Anyone reaching for a CTA mid-entrance gets the finished layout at once.
        const settle = () => tl.progress(1)
        scope.addEventListener('pointerdown', settle)
        scope.addEventListener('focusin', settle)
        cleanups.push(() => { scope.removeEventListener('pointerdown', settle); scope.removeEventListener('focusin', settle) })
      } else {
        revealPending()
      }

      // ---- Section reveals, batched and played once -------------------------------
      const reveals = gsap.utils.toArray<HTMLElement>('[data-anim="reveal"]', scope)
      gsap.set(reveals, { y: desktop ? 28 : 16, opacity: 0 })
      ScrollTrigger.batch(reveals, {
        start: 'top 88%',
        once: true,
        onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: DUR.slow, stagger: 0.08, ease: EASE.out, clearProps: 'transform,opacity' }),
      })

      // ---- Programme cards: small stagger from the left, the reading direction ----
      const cards = gsap.utils.toArray<HTMLElement>('[data-anim="card"]', scope)
      gsap.set(cards, { x: desktop ? -24 : 0, y: desktop ? 0 : 16, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: batch => gsap.to(batch, { x: 0, y: 0, opacity: 1, duration: DUR.base, stagger: 0.08, ease: EASE.out, clearProps: 'transform,opacity' }),
      })

      // ---- The staircase: each step rises into place one after another -------------
      gsap.utils.toArray<HTMLElement>('[data-anim="stair"]', scope).forEach(stair => {
        const steps = stair.querySelectorAll<HTMLElement>('[data-anim="step"]')
        gsap.set(steps, { yPercent: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: stair,
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to(steps, { yPercent: 0, opacity: 1, duration: DUR.base, stagger: 0.09, ease: EASE.out, clearProps: 'transform,opacity' }),
        })
      })

      // ---- The sculpture is a flat picture: a gentle 2D drift only -----------------
      if (desktop) {
        gsap.utils.toArray<HTMLElement>('[data-anim="drift"]', scope).forEach(image => {
          gsap.fromTo(image, { yPercent: 6 }, {
            yPercent: -6, ease: EASE.scrub,
            scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          })
        })
      }

      // Webfonts change line heights; re-measure once they settle.
      let alive = true
      document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh() })
      return () => { alive = false; cleanups.forEach(cleanup => cleanup()) }
    })

    return () => revealPending()
  }, { scope: root, dependencies: [] })
}
