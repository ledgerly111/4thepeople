import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { reducedMotion } from './motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Scroll reveals for anything marked up inside `scope`:
//   data-reveal="fold"  a sheet unfolds down from its top edge
//   data-reveal="words" each .w word folds up off the line
//   data-reveal="draw"  an SVG path (pathLength 1, dasharray 1) inks itself in
//   data-reveal="pop"   pops in with a squash, like the dot landing
//   data-reveal="rise"  plain rise and fade
export function useReveal(scope, dependencies = []) {
  useGSAP(
    () => {
      if (reducedMotion()) return
      const q = gsap.utils.selector(scope)
      const once = { start: 'top 88%', once: true }

      const folds = q('[data-reveal="fold"]')
      gsap.set(folds, { opacity: 0 })
      ScrollTrigger.batch(folds, {
        ...once,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { rotateX: -82, y: 28, opacity: 0, transformPerspective: 1100, transformOrigin: '50% 0%' },
            { rotateX: 0, y: 0, opacity: 1, duration: 1, ease: 'back.out(1.25)', stagger: 0.11, clearProps: 'transform,opacity' },
          ),
      })

      q('[data-reveal="words"]').forEach((el) => {
        gsap.from(el.querySelectorAll('.w'), {
          yPercent: 70,
          rotateX: -90,
          opacity: 0,
          transformOrigin: '50% 100%',
          transformPerspective: 600,
          duration: 0.7,
          ease: 'back.out(1.6)',
          stagger: 0.05,
          scrollTrigger: { trigger: el, ...once },
        })
      })

      q('[data-reveal="draw"]').forEach((el) => {
        gsap.from(el, {
          strokeDashoffset: 1,
          duration: 0.9,
          delay: Number(el.dataset.delay || 0),
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, ...once },
        })
      })

      q('[data-reveal="pop"]').forEach((el) => {
        gsap.from(el, {
          scale: 0.3,
          rotate: -18,
          opacity: 0,
          duration: 0.7,
          delay: Number(el.dataset.delay || 0),
          ease: 'back.out(2.4)',
          scrollTrigger: { trigger: el, ...once },
        })
      })

      q('[data-reveal="rise"]').forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          delay: Number(el.dataset.delay || 0),
          ease: 'power3.out',
          scrollTrigger: { trigger: el, ...once },
        })
      })
    },
    { scope, dependencies },
  )
}
