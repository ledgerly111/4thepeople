import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProductHeader from './ProductHeader'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function SoftwarePage({ product }) {
  const root = useRef(null)
  const flow = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product.slug])

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
        stagger: 0.04,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.erp-mods',
          start: 'top 80%',
        },
      })

      gsap.fromTo(
        '.erp-rail',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: flow.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      )
    },
    { scope: root, dependencies: [product.slug] },
  )

  return (
    <div
      ref={root}
      className="w-full max-w-full overflow-x-hidden bg-void font-mono text-cream"
    >
      <ProductHeader eyebrow={product.eyebrow} />

      <section className="relative border-b border-cream/15 px-5 py-16 lg:px-16 lg:py-28">
        <div className="erp-hero mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3 opacity-60">
            <div className="h-px w-8 bg-cream" />
            <span className="text-[10px] tracking-[0.28em]">{product.kicker}</span>
          </div>
          <h1 className="max-w-5xl text-[clamp(2rem,6vw,4.4rem)] font-bold leading-[1.08] tracking-[0.06em]">
            {product.title[0]}
            <br />
            {product.title[1]}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-cream/75 lg:text-base">
            {product.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:gap-4">
            <a
              href="#operation"
              className="flex min-h-12 items-center justify-center border border-cream bg-cream px-6 text-xs tracking-[0.16em] text-void lg:text-sm"
            >
              SEE THE DAY
            </a>
            <Link
              to="/#contact"
              className="flex min-h-12 items-center justify-center border border-cream px-6 text-xs tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-void lg:text-sm"
            >
              REQUEST THIS SYSTEM
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-cream/15 px-5 py-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 lg:gap-x-5">
          {product.pipe.map((label, i) => (
            <span key={label} className="erp-pipe-item flex items-center gap-3 lg:gap-5">
              <span className="text-[10px] tracking-[0.22em] text-accent lg:text-xs">
                {label}
              </span>
              {i < product.pipe.length - 1 ? (
                <span className="hidden h-px w-8 bg-cream/25 lg:block" aria-hidden="true" />
              ) : null}
            </span>
          ))}
        </div>
      </section>

      <section
        id="operation"
        ref={flow}
        className="relative px-5 py-20 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="erp-flow-title lg:self-start">
            <h2 className="max-w-xl text-[1.75rem] font-bold tracking-[0.06em] lg:text-5xl">
              {product.dayTitle[0]}
              <br />
              {product.dayTitle[1]}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream/65 lg:text-sm">
              {product.dayCopy}
            </p>
            <div className="mt-8 h-px w-full origin-left bg-cream/20">
              <div className="erp-rail h-px w-full origin-left bg-accent" />
            </div>
          </div>

          <ol className="space-y-0 divide-y divide-cream/15 border-y border-cream/15">
            {product.steps.map((step) => (
              <li key={step.id} className="erp-step py-10 lg:py-14">
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <span className="text-xs text-accent">{step.id}</span>
                  <span className="text-[10px] tracking-[0.2em] text-cream/40">
                    STAGE
                  </span>
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
          <div className="mb-10 flex items-end justify-between gap-6 lg:mb-16">
            <h2 className="text-[1.75rem] font-bold tracking-[0.06em] lg:text-5xl">
              {product.modulesTitle}
            </h2>
            <span className="hidden text-[10px] tracking-[0.22em] text-cream/40 lg:block">
              ONE PLATFORM
            </span>
          </div>
          <ul className="grid grid-cols-1 border-t border-cream/15 md:grid-cols-2">
            {product.modules.map((mod) => (
              <li
                key={mod.id}
                className="erp-mod border-b border-cream/15 py-8 md:odd:pr-8 md:even:border-l md:even:pl-8"
              >
                <span className="text-[10px] text-accent">{mod.id}</span>
                <h3 className="mt-3 text-base tracking-[0.1em] lg:text-lg">{mod.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-cream/60 lg:text-sm">
                  {mod.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-cream/15 px-5 py-20 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[1.75rem] font-bold tracking-[0.06em] lg:text-5xl">
            ALSO IN THE DESK
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-0 border-t border-cream/15 sm:grid-cols-2">
            {product.extras.map((item) => (
              <li
                key={item}
                className="border-b border-cream/15 py-5 text-[15px] tracking-[0.02em] text-cream/75 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-cream/15 px-5 py-20 pb-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-5xl text-[1.75rem] font-bold leading-[1.15] tracking-[0.06em] lg:text-5xl">
            {product.ctaTitle}
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/65 lg:text-base">
            {product.ctaCopy}
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex min-h-12 items-center border border-cream bg-cream px-8 text-xs tracking-[0.16em] text-void lg:text-sm"
          >
            REQUEST A SYSTEM
          </Link>
        </div>
      </section>
    </div>
  )
}
