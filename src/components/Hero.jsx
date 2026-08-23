import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import logo from '../assets/4tplogo.svg'
import AsciiShader from './AsciiShader'
import { useIsDesktop } from '../hooks/useIsDesktop'

gsap.registerPlugin(useGSAP)

const BARS = [5, 11, 7, 14, 8, 12, 6, 10]

function DesktopHero() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/20 via-transparent to-void/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/30" />

      <div className="hero-chrome pointer-events-none absolute left-0 top-0 z-20 h-12 w-12 border-l-2 border-t-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute right-0 top-0 z-20 h-12 w-12 border-r-2 border-t-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute bottom-[5vh] left-0 z-20 h-12 w-12 border-b-2 border-l-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute bottom-[5vh] right-0 z-20 h-12 w-12 border-b-2 border-r-2 border-cream/30" />

      <header className="hero-chrome absolute left-0 right-0 top-0 z-20 border-b border-cream/20">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="4TP" className="h-10 w-10" />
            <div className="font-mono text-2xl font-bold italic tracking-[0.28em] text-cream">
              4TP
            </div>
            <div className="h-4 w-px bg-cream/40" />
            <span className="font-mono text-[10px] text-cream/60">UAE · 4 THE PEOPLE</span>
          </div>

          <nav className="flex items-center gap-6 font-mono text-[10px] tracking-[0.18em] text-cream/70">
            <a href="#systems" className="transition-colors hover:text-accent">
              SYSTEMS
            </a>
            <a href="#contact" className="transition-colors hover:text-accent">
              CONTACT
            </a>
            <span className="text-cream/35">|</span>
            <span>LAT 25.2048°</span>
            <span className="h-1 w-1 rounded-full bg-cream/40" />
            <span>LONG 55.2708°</span>
          </nav>
        </div>
      </header>

      <div className="relative z-10 flex min-h-dvh items-center justify-end">
        <div className="hero-copy w-1/2 px-16 pr-[10%]">
          <div className="relative ml-auto max-w-lg">
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-cream" />
              <span className="font-mono text-[10px] tracking-wider text-cream">∞</span>
              <div className="h-px flex-1 bg-cream" />
            </div>

            <div className="relative">
              <div className="dither-pattern absolute -right-3 top-0 h-full w-1 opacity-40" />
              <h1 className="max-w-5xl font-mono text-[clamp(2.2rem,3.6vw,3.6rem)] font-bold leading-[1.12] tracking-[0.08em] text-cream">
                AUTOMATED
                <br />
                FOR THE UAE
              </h1>
            </div>

            <div className="mb-3 mt-3 flex gap-1 opacity-40" aria-hidden="true">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-0.5 w-0.5 rounded-full bg-cream" />
              ))}
            </div>

            <p className="mb-6 max-w-md font-mono text-base leading-relaxed text-cream/80">
              4 The People builds the systems that replace manual work — operations
              software designed for how the Emirates actually run.
            </p>

            <div className="flex flex-row gap-4">
              <a
                href="#contact"
                className="group relative border border-cream bg-transparent px-6 py-3 text-center font-mono text-sm tracking-[0.14em] text-cream transition-colors duration-200 hover:bg-cream hover:text-void"
              >
                <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-cream opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-cream opacity-0 transition-opacity group-hover:opacity-100" />
                REQUEST A SYSTEM
              </a>
              <a
                href="#systems"
                className="border border-cream bg-transparent px-6 py-3 text-center font-mono text-sm tracking-[0.14em] text-cream transition-colors duration-200 hover:bg-cream hover:text-void"
              >
                VIEW THE STACK
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 opacity-40">
              <span className="font-mono text-[9px] text-cream">∞</span>
              <div className="h-px flex-1 bg-cream" />
              <span className="font-mono text-[9px] text-cream">4TP.PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-chrome absolute bottom-[5vh] left-0 right-0 z-20 border-t border-cream/20 bg-void/40 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-3">
          <div className="flex items-center gap-6 font-mono text-[9px] text-cream/50">
            <span>SYSTEM.ACTIVE</span>
            <div className="flex items-end gap-1" aria-hidden="true">
              {BARS.map((h, i) => (
                <div key={i} className="w-1 bg-cream/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] text-cream/50">
            <span>◐ RENDERING</span>
            <div className="flex gap-1" aria-hidden="true">
              <div className="h-1 w-1 animate-pulse rounded-full bg-cream/60" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-cream/40 [animation-delay:200ms]" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-cream/20 [animation-delay:400ms]" />
            </div>
            <span>DUBAI</span>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileHero({ menuOpen, setMenuOpen }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/35 via-transparent to-void/90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-void via-void/80 to-transparent" />

      <div className="hero-chrome pointer-events-none absolute left-0 top-0 z-20 h-7 w-7 border-l-2 border-t-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute right-0 top-0 z-20 h-7 w-7 border-r-2 border-t-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute bottom-0 left-0 z-20 h-7 w-7 border-b-2 border-l-2 border-cream/30" />
      <div className="hero-chrome pointer-events-none absolute bottom-0 right-0 z-20 h-7 w-7 border-b-2 border-r-2 border-cream/30" />

      <header className="hero-chrome absolute left-0 right-0 top-0 z-30 border-b border-cream/20 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <img src={logo} alt="4TP" className="h-8 w-8 shrink-0" />
            <div className="font-mono text-lg font-bold italic tracking-[0.22em] text-cream">
              4TP
            </div>
          </div>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center border border-cream/30 font-mono text-[10px] tracking-[0.18em] text-cream"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
        {menuOpen ? (
          <nav
            id="mobile-nav"
            className="flex flex-col border-t border-cream/15 bg-void/90 px-4 py-2 backdrop-blur-sm"
          >
            <a
              href="#systems"
              className="flex min-h-12 items-center font-mono text-sm tracking-[0.16em] text-cream"
              onClick={() => setMenuOpen(false)}
            >
              SYSTEMS
            </a>
            <a
              href="#contact"
              className="flex min-h-12 items-center font-mono text-sm tracking-[0.16em] text-cream"
              onClick={() => setMenuOpen(false)}
            >
              CONTACT
            </a>
          </nav>
        ) : null}
      </header>

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-[4.75rem] pt-[5.5rem]">
        <div className="hero-copy w-full">
          <div className="mb-3 flex items-center gap-2 opacity-60">
            <div className="h-px w-6 bg-cream" />
            <span className="font-mono text-[10px] tracking-wider text-cream">∞</span>
            <div className="h-px flex-1 bg-cream" />
          </div>

          <h1 className="font-mono text-[clamp(1.85rem,8vw,2.4rem)] font-bold leading-[1.08] tracking-[0.06em] text-cream">
            AUTOMATED
            <br />
            FOR THE UAE
          </h1>

          <p className="mt-4 max-w-[34ch] font-mono text-[15px] leading-relaxed text-cream/85">
            4 The People builds the systems that replace manual work — operations
            software designed for how the Emirates actually run.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href="#contact"
              className="flex min-h-12 items-center justify-center border border-cream bg-cream px-5 font-mono text-xs tracking-[0.14em] text-void"
            >
              REQUEST A SYSTEM
            </a>
            <a
              href="#systems"
              className="flex min-h-12 items-center justify-center border border-cream bg-transparent px-5 font-mono text-xs tracking-[0.14em] text-cream"
            >
              VIEW THE STACK
            </a>
          </div>
        </div>
      </div>

      <div className="hero-chrome absolute inset-x-0 bottom-0 z-20 border-t border-cream/20 bg-void/55 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3 font-mono text-[9px] text-cream/50">
            <span>SYS.ACT</span>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-cream/50">
            <div className="flex gap-1" aria-hidden="true">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream/60" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream/40 [animation-delay:200ms]" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream/20 [animation-delay:400ms]" />
            </div>
            <span>DUBAI</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Hero() {
  const root = useRef(null)
  const isDesktop = useIsDesktop()
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.hero-chrome', {
        opacity: 0,
        y: 8,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('.hero-copy > *', {
        opacity: 0,
        y: isDesktop ? 0 : 18,
        x: isDesktop ? 28 : 0,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.15,
        ease: 'power3.out',
      })
    },
    { scope: root, dependencies: [isDesktop] },
  )

  return (
    <section
      ref={root}
      className="relative min-h-dvh w-full overflow-hidden bg-void"
    >
      <a
        href="#systems"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-void"
      >
        Skip to systems
      </a>

      <div className="absolute inset-0">
        <AsciiShader key="ascii-torus" />
      </div>

      {isDesktop ? (
        <DesktopHero />
      ) : (
        <MobileHero menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
    </section>
  )
}
