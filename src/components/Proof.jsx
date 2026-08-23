import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Proof() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.proof-line', {
        opacity: 0.12,
        y: 24,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative border-t border-cream/15 bg-void px-5 py-20 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3 opacity-50 lg:mb-10">
          <div className="h-px w-8 bg-cream lg:w-10" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-cream lg:tracking-[0.28em]">
            4TP / UAE
          </span>
        </div>
        <h2 className="proof-line max-w-5xl font-mono text-[1.75rem] font-bold leading-[1.15] tracking-[0.04em] text-cream lg:text-6xl lg:tracking-[0.06em]">
          Software that does the work.
        </h2>
        <p className="proof-line mt-5 max-w-2xl font-mono text-[15px] leading-relaxed text-cream/70 lg:mt-6 lg:text-lg">
          Not dashboards that watch people do it. 4TP ships automated systems for
          the businesses that keep the Emirates moving — starting with the desks
          that never stop.
        </p>
      </div>
    </section>
  )
}
