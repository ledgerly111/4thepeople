import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import Logo from '../origami/Logo'
import { reducedMotion } from '../origami/motion'

const LINKS = [
  { to: '/#systems', label: 'Systems' },
  { to: '/custom-software', label: 'Custom build' },
  { to: '/#contact', label: 'Contact' },
]

export default function SiteHeader({ eyebrow }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panel = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open || !panel.current || reducedMotion()) return
    gsap.fromTo(
      panel.current.children,
      { rotateX: -90, opacity: 0, transformOrigin: '50% 0%', transformPerspective: 800 },
      { rotateX: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
    )
  }, [open])

  return (
    <header className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-300 ${scrolled || open ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-paper/88 backdrop-blur-md" />
        <svg className="ink-boil-soft absolute inset-x-0 -bottom-[5px] h-[12px] w-full" preserveAspectRatio="none" viewBox="0 0 100 12">
          <line x1="0" y1="6" x2="100" y2="6" stroke="var(--color-ink)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" aria-label="4TP home" className="block shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep">
            <Logo animated className="h-8 w-auto lg:h-9" />
          </Link>
          {eyebrow ? (
            <span className="hand-note hidden truncate pt-1 text-xl text-ink-soft sm:inline">/ {eyebrow}</span>
          ) : null}
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="ink-link py-1 text-[0.95rem] font-medium text-ink">
              {link.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="btn ml-2 min-h-11 px-5 text-sm">
            Request a system <span className="btn-arrow">→</span>
          </Link>
        </nav>

        <button
          type="button"
          className="btn btn--light min-h-11 px-4 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" ref={panel} className="flex flex-col gap-3 px-4 pb-5 lg:hidden" aria-label="Main">
          {LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`sheet flex min-h-14 items-center justify-between px-5 text-lg font-semibold ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
            >
              {link.label}
              <span className="text-orange-deep">→</span>
            </Link>
          ))}
          <Link to="/#contact" onClick={() => setOpen(false)} className="btn mt-1 min-h-14 text-base">
            Request a system <span className="btn-arrow">→</span>
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
