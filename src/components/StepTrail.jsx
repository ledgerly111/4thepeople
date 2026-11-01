import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { reducedMotion } from '../origami/motion'
import { titleCase } from '../lib/text'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const OCTAGON = '17,2 39,2 54,17 54,39 39,54 17,54 2,39 2,17'

// The steps of a day on a dashed ink trail. The orange dot rolls down it as you
// scroll, and each step's octagon turns orange when the dot reaches it.
export default function StepTrail({ steps }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const items = q('.trail-step')
      if (reducedMotion()) {
        items.forEach((el) => el.classList.add('is-on'))
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      gsap.fromTo(
        q('.trail-dot'),
        { y: 0 },
        {
          // from just under the first octagon to just above the last
          y: () => last.offsetTop - first.offsetTop - 90,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 55%', end: () => `+=${last.offsetTop - first.offsetTop}`, scrub: 0.6, invalidateOnRefresh: true },
        },
      )
      items.forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 58%',
          onEnter: () => el.classList.add('is-on'),
          onLeaveBack: () => el.classList.remove('is-on'),
        }),
      )
    },
    { scope: root, dependencies: [steps] },
  )

  return (
    <ol ref={root} className="relative">
      <span
        className="trail-dot pointer-events-none absolute left-[1.75rem] top-[3.9rem] z-10 -ml-[11px] h-[22px] w-[22px] rounded-full border-[2.5px] border-ink bg-orange"
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <li key={step.id} className="trail-step relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-14 last:pb-0 lg:gap-x-8 lg:pb-20">
          {i < steps.length - 1 ? (
            <span className="absolute bottom-0 left-[1.75rem] top-[3.9rem] -ml-px border-l-[2.5px] border-dashed border-ink/45" aria-hidden="true" />
          ) : null}
          <svg viewBox="0 0 56 56" className="trail-badge ink-boil-soft h-14 w-14" aria-hidden="true">
            <polygon points={OCTAGON} transform="translate(4 5)" fill="url(#hatch)" opacity="0.3" />
            <polygon points={OCTAGON} className="trail-fill" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <text x="28" y="35" textAnchor="middle" fontSize="19" fontWeight="800" fill="var(--color-ink)" fontFamily="Inter, sans-serif">{step.id}</text>
          </svg>
          <div className="pt-2">
            <h3 className="text-2xl font-extrabold tracking-tight lg:text-[1.9rem]">{titleCase(step.name)}</h3>
            <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{step.copy}</p>
            <ul className="mt-5 space-y-2.5">
              {step.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-orange-deep" aria-hidden="true">
                    <path d="M3 10.5 8 15 17 4.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}
