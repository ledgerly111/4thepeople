import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PipeRibbon from '../components/PipeRibbon'
import StepTrail from '../components/StepTrail'
import CtaSheet from '../components/CtaSheet'
import PaperScraps from '../components/PaperScraps'
import { ProductIcon } from '../components/ProductIcons'
import { DropTitle, FoldWords } from '../components/Ink'
import OrigamiBadge from '../origami/OrigamiBadge'
import { useReveal } from '../origami/useReveal'
import { sentenceCase, titleCase } from '../lib/text'

const SCRAPS = [
  { x: '2%', y: '46%', shape: 'tri', r: -20, size: 26 },
  { x: '90%', y: '70%', shape: 'sq', fill: 'var(--color-sheet)', r: 14, size: 24, dur: 11 },
  { x: '55%', y: '6%', shape: 'kite', fill: 'var(--color-sun)', r: 30, size: 22 },
]

export default function SoftwarePage({ product }) {
  const root = useRef(null)
  useReveal(root, [product.slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product.slug])

  const [dayA, dayB] = product.dayTitle

  return (
    <div ref={root} className="w-full max-w-full overflow-x-clip">
      <SiteHeader eyebrow={product.label} />

      <main>
        <section className="relative isolate px-5 pb-14 pt-8 lg:px-16 lg:pb-20 lg:pt-14">
          <PaperScraps scraps={SCRAPS} />
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            <div>
              <p className="hand-note -rotate-2 text-2xl text-orange-deep">{sentenceCase(product.kicker)}</p>
              <DropTitle
                key={product.slug}
                lines={[titleCase(product.title[0]), titleCase(product.title[1])]}
                className="display mt-3 text-[clamp(2.8rem,10vw,6.2rem)]"
              />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft" data-reveal="rise">
                {product.intro}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row" data-reveal="rise" data-delay="0.1">
                <a href="#operation" className="btn min-h-13 px-7 text-base">
                  See the day <span className="btn-arrow">↓</span>
                </a>
                <Link to="/#contact" className="btn btn--light min-h-13 px-7 text-base">
                  Request this system
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-52 sm:w-64 lg:w-full lg:max-w-[22rem]" data-reveal="pop">
              <OrigamiBadge className="float-y ink-boil h-auto w-full">
                <ProductIcon name={product.icon} x="58" y="58" width="84" height="84" className="" stroke="var(--color-sheet)" strokeWidth="1.5" />
              </OrigamiBadge>
              <span className="hand-note absolute -bottom-2 right-0 rotate-3 text-xl text-ink-soft lg:text-2xl">{product.status.toLowerCase()} today ✓</span>
            </div>
          </div>
        </section>

        <section className="px-5 pb-6 lg:px-16" aria-label="Stages">
          <PipeRibbon stages={product.pipe} />
        </section>

        <section id="operation" className="relative px-5 py-20 lg:px-16 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="hand-note text-2xl text-orange-deep" data-reveal="rise">follow the dot</p>
              <h2 className="display mt-2 text-[clamp(2.4rem,6vw,4.4rem)]">
                <FoldWords text={`${sentenceCase(`${dayA} ${dayB}`)}`} />
              </h2>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft" data-reveal="rise">{product.dayCopy}</p>
            </div>
            <StepTrail steps={product.steps} />
          </div>
        </section>

        <section className="px-5 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">
                <FoldWords text={sentenceCase(product.modulesTitle)} />
              </h2>
              <p className="hand-note text-2xl text-ink-soft" data-reveal="rise">one platform, all of them</p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {product.modules.map((mod, i) => (
                <li key={mod.id} data-reveal="fold" className={`sheet sheet-lift px-5 pb-6 pt-5 ${i % 3 === 0 ? 'tilt-l' : i % 3 === 1 ? 'tilt-r' : ''}`}>
                  <span className="hand-note text-2xl text-orange-deep">{mod.id}</span>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">{titleCase(mod.name)}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{mod.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-16 lg:py-24">
          <div data-reveal="fold" className="sheet sheet--lined tilt-r mx-auto max-w-4xl px-6 pb-10 pt-12 lg:px-14 lg:pb-14 lg:pt-14">
            <span className="tape -top-3 left-12 -rotate-3" />
            <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">Also in the desk</h2>
            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {product.extras.map((item, i) => (
                <li key={item} className="flex min-h-11 items-start gap-3 py-2.5 text-[1.02rem] leading-snug">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" aria-hidden="true">
                    <path d="M3 10.5 8 15 17 4.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1 1" data-reveal="draw" data-delay={i * 0.08} />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaSheet title={product.ctaTitle} copy={product.ctaCopy} cta="Request a system" />
      </main>

      <SiteFooter />
    </div>
  )
}
