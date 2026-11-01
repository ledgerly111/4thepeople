import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reducedMotion } from '../origami/motion'

// A hand-inked orange underline. With data-reveal="wipe" (the default) it inks itself in,
// left to right, when it scrolls into view. (A pathLength dash would stop short here: a
// non-scaling stroke measures its dashes on screen, and the underline stretches.)
export function Squiggle({ className = '', reveal = true, delay = 0, color = 'var(--color-orange)', width = 9 }) {
  return (
    <svg
      viewBox="0 0 300 40" preserveAspectRatio="none"
      className={`pointer-events-none overflow-visible ${className}`} aria-hidden="true"
      data-reveal={reveal ? 'wipe' : undefined} data-delay={delay}
    >
      <path
        d="M 4 22 C 60 10, 120 30, 180 16 S 270 12, 296 20"
        fill="none" stroke={color} strokeWidth={width} strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Ink dashes that burst once when .is-on is added.
export function Burst({ className = '', count = 9 }) {
  return (
    <svg viewBox="-50 -50 100 100" className={`impact pointer-events-none overflow-visible ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + 0.2
        return (
          <line key={i} x1={Math.cos(a) * 24} y1={Math.sin(a) * 24} x2={Math.cos(a) * 40} y2={Math.sin(a) * 40}
            stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" />
        )
      })}
    </svg>
  )
}

// Words that fold up off the line as they scroll in (useReveal).
export function FoldWords({ text, className = '' }) {
  return (
    <span data-reveal="words" className={className}>
      {text.split(' ').map((word, i, all) => (
        <span key={i} className="w inline-block">
          {word}
          {i < all.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

// A headline whose letters drop in one by one, as "Coming soon" does in the film, then
// an orange full stop falls, lands with a squash and a burst, and the accent word is
// underlined in orange ink.
export function DropTitle({ lines, accent, as: Tag = 'h1', className = '', delay = 0.25, dot = true }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      const tl = gsap.timeline({ delay })
      tl.from('.ltr', {
        yPercent: -70,
        rotate: (i) => (((i * 53) % 7) - 3) * 7,
        scale: 0.55,
        opacity: 0,
        transformOrigin: '50% 80%',
        duration: 0.5,
        ease: 'back.out(2.2)',
        stagger: 0.04,
      })
      if (dot) {
        tl.from('.drop-dot', { y: -320, opacity: 0, duration: 0.34, ease: 'power3.in' }, '-=0.15')
        tl.add(() => ref.current?.querySelector('.impact')?.classList.add('is-on'))
        tl.fromTo('.drop-dot', { scaleX: 1.3, scaleY: 0.65 }, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' }, '<')
      }
      tl.fromTo('.squiggle-under', { clipPath: 'inset(-50% 100% -50% -5%)' }, { clipPath: 'inset(-50% -5% -50% -5%)', duration: 0.5, ease: 'power2.out' }, '<0.05')
    },
    { scope: ref },
  )

  let k = 0
  const letters = (word) =>
    [...word].map((ch) => (
      <span key={k++} className="ltr inline-block">
        {ch}
      </span>
    ))

  return (
    <Tag ref={ref} className={className} aria-label={`${lines.join(' ')}${dot ? '.' : ''}`}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi, all) => (
            <span key={wi} className={`relative inline-block whitespace-nowrap ${word === accent ? 'text-ink' : ''}`}>
              {letters(word)}
              {word === accent ? (
                <Squiggle reveal={false} className="squiggle-under absolute -bottom-[0.16em] left-[-2%] h-[0.22em] w-[104%]" width={10} />
              ) : null}
              {wi < all.length - 1 ? ' ' : ''}
              {dot && li === lines.length - 1 && wi === all.length - 1 ? (
                <span className="relative ml-[0.06em] inline-block h-[0.2em] w-[0.2em] align-baseline">
                  <span className="drop-dot absolute inset-0 rounded-full border-[0.035em] border-ink bg-orange" style={{ transformOrigin: '50% 100%' }} />
                  <Burst className="absolute left-1/2 top-1/2 h-[1.1em] w-[1.1em] -translate-x-1/2 -translate-y-1/2" />
                </span>
              ) : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

// The folded-down corner of a .sheet--eared.
export function Dogear({ back = 'var(--color-paper)' }) {
  return (
    <svg className="dogear" viewBox="0 0 34 34" aria-hidden="true">
      <polygon points="0,0 34,34 0,34" fill={back} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <polygon points="0,34 34,34 4,38" fill="rgb(36 31 27 / 0.12)" />
    </svg>
  )
}
