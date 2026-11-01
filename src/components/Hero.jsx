import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import HeroFilm from './HeroFilm'
import PaperScraps from './PaperScraps'
import { DropTitle } from './Ink'
import { reducedMotion } from '../origami/motion'

gsap.registerPlugin(useGSAP)

const SCRAPS = [
  { x: '6%', y: '12%', shape: 'tri', r: -20, size: 30 },
  { x: '44%', y: '8%', shape: 'sq', fill: 'var(--color-sheet)', r: 12, size: 24, dur: 11 },
  { x: '3%', y: '78%', shape: 'kite', fill: 'var(--color-sun)', r: 30, size: 26 },
  { x: '52%', y: '86%', shape: 'tri', r: 140, size: 22, dur: 8 },
  { x: '92%', y: '6%', shape: 'kite', r: -10, size: 24, dur: 12 },
]

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap.from('.hero-rise', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.9, ease: 'power3.out' })
      gsap.from('.hero-note', { scale: 0.5, rotate: -12, opacity: 0, duration: 0.7, delay: 0.15, ease: 'back.out(2.2)' })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate px-5 pb-10 pt-4 lg:px-16 lg:pb-16 lg:pt-6">
      <PaperScraps scraps={SCRAPS} />
      <div className="mx-auto grid max-w-7xl items-center gap-4 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
        <div className="relative z-10 lg:order-1">
          <p className="hero-note hand-note mb-4 inline-block -rotate-3 text-2xl text-orange-deep lg:text-[1.7rem]">
            4 The People · made in Dubai ↘
          </p>
          <DropTitle
            lines={['Automated', 'for the UAE']}
            accent="UAE"
            className="display text-[clamp(3.1rem,13vw,4.6rem)] lg:text-[clamp(4.4rem,7.4vw,7.4rem)]"
          />
          <p className="hero-rise mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft lg:text-lg">
            4 The People builds the systems that replace manual work: operations software,
            folded to fit how the Emirates actually run.
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/#contact" className="btn min-h-13 px-7 text-base">
              Request a system <span className="btn-arrow">→</span>
            </Link>
            <a href="#systems" className="btn btn--light min-h-13 px-7 text-base">
              View the stack
            </a>
          </div>
          <p className="hero-rise hand-note mt-8 hidden text-xl text-ink-soft lg:block">
            psst, tap a tile to open a system
          </p>
        </div>

        <div className="relative order-first mx-auto w-full max-w-[34rem] lg:order-2 lg:max-w-none">
          <HeroFilm />
        </div>
      </div>
    </section>
  )
}
