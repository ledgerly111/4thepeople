import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProductHeader from '../components/ProductHeader'
import MatrixRain from '../components/MatrixRain'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PIPE = ['BRIEF', 'BUILD', 'HOST', 'SHIP', 'STAY']

const STEPS = [
  {
    id: '01',
    name: 'FROM SCRATCH',
    copy: 'You describe the desk. We do not force a catalog onto it. Screens, roles, documents, and the way money moves are specified to your operation — then written as software.',
    points: [
      'Built for your workflow, not a generic ERP with unused modules',
      'Same visual language and stack discipline as every 4TP system',
      'You keep the product. We keep it running.',
    ],
  },
  {
    id: '02',
    name: 'WORLD-FAST HOSTING',
    copy: 'The app ships as a static front end on Cloudflare’s global edge — one of the fastest networks on the planet. No office server. No waiting on a machine in a back room.',
    points: [
      'Served from the edge, close to whoever opens it in the UAE and abroad',
      'Cloud database and auth behind it — backups, not a USB stick',
      'Opens on phone and laptop the same morning you go live',
    ],
  },
  {
    id: '03',
    name: 'HOURS, NOT SPRINTS',
    copy: 'New features and error fixes are implemented in hours. You send the change. We patch, deploy, and you see it on the live desk the same day — not in a six-week ticket pile.',
    points: [
      'Bug on the counter this morning, patched before close',
      'A new field, report, or permission can land the same afternoon',
      'You talk to the people who wrote it — not a distant vendor queue',
    ],
  },
]

const PROMISES = [
  {
    id: '01',
    name: 'SPECIFIED TO YOU',
    copy: 'Intake, stock, invoices, staff — whatever the operation is. We map it, then we build it.',
  },
  {
    id: '02',
    name: 'EDGE HOSTING',
    copy: 'Cloudflare edge. Fast load, worldwide. No hardware for you to baby-sit.',
  },
  {
    id: '03',
    name: 'FIXES IN HOURS',
    copy: 'Errors and new features ship in hours. The software stays as live as the business.',
  },
]

export default function CustomSoftwarePage() {
  const root = useRef(null)
  const flow = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.erp-hero > *', {
        opacity: 0,
        y: 22,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.erp-pipe-item', {
        opacity: 0.15,
        y: 10,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power2.out',
        delay: 0.35,
      })

      gsap.from('.erp-step', {
        opacity: 0,
        y: 36,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: flow.current,
          start: 'top 78%',
        },
      })

      gsap.from('.erp-mod', {
        opacity: 0,
        y: 18,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.erp-mods',
          start: 'top 80%',
        },
      })
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="w-full max-w-full overflow-x-hidden bg-void font-mono text-cream"
    >
      <ProductHeader eyebrow="CUSTOM SOFTWARE" />

      <section className="relative border-b border-cream/15 px-5 py-16 lg:px-16 lg:py-24">
        <div className="erp-hero mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden border border-cream/20 lg:mx-0 lg:h-[320px] lg:max-w-none">
            <MatrixRain />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/10" />
            <div className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] tracking-[0.2em] text-cream/45">
              MATRIX · LIVE
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3 opacity-60">
              <div className="h-px w-8 bg-cream" />
              <span className="text-[10px] tracking-[0.28em]">BUILT TO ORDER · UAE</span>
            </div>
            <h1 className="max-w-5xl text-[clamp(1.85rem,5.5vw,3.8rem)] font-bold leading-[1.08] tracking-[0.06em]">
              CUSTOMIZED
              <br />
              SOFTWARE FOR YOU
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/75 lg:text-base">
              If the shelf product is not the desk, we write a new one. From scratch.
              Hosted on the world’s fastest edge. New features and error fixes land in
              hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:gap-4">
              <a
                href="#operation"
                className="flex min-h-12 items-center justify-center border border-cream bg-cream px-6 text-xs tracking-[0.16em] text-void lg:text-sm"
              >
                HOW WE BUILD
              </a>
              <Link
                to="/#contact"
                className="flex min-h-12 items-center justify-center border border-cream px-6 text-xs tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-void lg:text-sm"
              >
                START A BRIEF
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-cream/15 px-5 py-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 lg:gap-x-5">
          {PIPE.map((label, i) => (
            <span key={label} className="erp-pipe-item flex items-center gap-3 lg:gap-5">
              <span className="text-[10px] tracking-[0.22em] text-accent lg:text-xs">
                {label}
              </span>
              {i < PIPE.length - 1 ? (
                <span className="hidden h-px w-8 bg-cream/25 lg:block" aria-hidden="true" />
              ) : null}
            </span>
          ))}
        </div>
      </section>

      <section id="operation" ref={flow} className="relative px-5 py-20 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="lg:self-start">
            <h2 className="max-w-xl text-[1.75rem] font-bold tracking-[0.06em] lg:text-5xl">
              THE BUILD,
              <br />
              MAPPED
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream/65 lg:text-sm">
              Three facts. The rest is conversation, then code, then a URL your staff
              can open tomorrow.
            </p>
          </div>

          <ol className="divide-y divide-cream/15 border-y border-cream/15">
            {STEPS.map((step) => (
              <li key={step.id} className="erp-step py-10 lg:py-14">
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <span className="text-xs text-accent">{step.id}</span>
                  <span className="text-[10px] tracking-[0.2em] text-cream/40">STAGE</span>
                </div>
                <h3 className="text-xl tracking-[0.08em] lg:text-3xl">{step.name}</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/70 lg:text-sm">
                  {step.copy}
                </p>
                <ul className="mt-5 space-y-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[13px] leading-relaxed text-cream/55 lg:text-sm"
                    >
                      <span className="mt-2 h-px w-4 shrink-0 bg-accent/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="erp-mods border-t border-cream/15 px-5 py-20 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-[1.75rem] font-bold tracking-[0.06em] lg:mb-16 lg:text-5xl">
            WHAT YOU GET
          </h2>
          <ul className="grid grid-cols-1 border-t border-cream/15 md:grid-cols-3">
            {PROMISES.map((item) => (
              <li
                key={item.id}
                className="erp-mod border-b border-cream/15 py-8 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
              >
                <span className="text-[10px] text-accent">{item.id}</span>
                <h3 className="mt-3 text-base tracking-[0.1em] lg:text-lg">{item.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-cream/60 lg:text-sm">
                  {item.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-cream/15 px-5 py-20 pb-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-5xl text-[1.75rem] font-bold leading-[1.15] tracking-[0.06em] lg:text-5xl">
            Tell us the operation.
            <br />
            We write the system.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/65 lg:text-base">
            From scratch, on the edge, with changes that land in hours. If none of the
            shelf products is the desk — this is.
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex min-h-12 items-center border border-cream bg-cream px-8 text-xs tracking-[0.16em] text-void lg:text-sm"
          >
            START A BRIEF
          </Link>
        </div>
      </section>
    </div>
  )
}
