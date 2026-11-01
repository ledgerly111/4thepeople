import { useRef } from 'react'
import { FoldWords, Squiggle } from './Ink'
import PaperScraps from './PaperScraps'
import { useReveal } from '../origami/useReveal'

const NOTES = [
  {
    title: 'Built for the UAE',
    copy: 'VAT invoices, government-fee wallets, Talabat and Noon Food tickets. The details of how the Emirates actually run.',
    tilt: 'tilt-l',
    tape: '-top-3 left-8 -rotate-6',
  },
  {
    title: 'Runs the desk, not a dashboard',
    copy: 'Work orders, kitchen tickets, van loads and the books move together. Staff stop copying numbers between tools.',
    tilt: 'tilt-r lg:translate-y-8',
    tape: '-top-3 right-10 rotate-3',
  },
  {
    title: 'Fixes in hours',
    copy: 'Send the change in the morning. We patch, deploy, and it is on the live desk the same day.',
    tilt: 'tilt-l lg:-translate-y-2',
    tape: '-top-3 left-1/3 rotate-2',
  },
]

export default function Proof() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} className="relative isolate px-5 py-20 lg:px-16 lg:py-32">
      <PaperScraps scraps={[{ x: '88%', y: '10%', shape: 'sq', fill: 'var(--color-sheet)', r: 18 }, { x: '4%', y: '64%', shape: 'tri', r: 60, size: 26 }]} />
      <div className="mx-auto max-w-6xl">
        <p className="hand-note text-2xl text-orange-deep" data-reveal="rise">why 4TP?</p>
        <h2 className="display mt-3 max-w-4xl text-[clamp(2.5rem,7vw,5.6rem)]">
          <FoldWords text="Software that" />{' '}
          <span className="relative inline-block whitespace-nowrap">
            <FoldWords text="does the work." />
            <Squiggle className="absolute -bottom-[0.12em] left-0 h-[0.24em] w-full" delay={0.4} />
          </span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft" data-reveal="rise">
          Not dashboards that watch people do it. 4TP ships automated systems for the
          businesses that keep the Emirates moving, starting with the desks that never stop.
        </p>

        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {NOTES.map((note, i) => (
            <li key={note.title} data-reveal="fold" className={`sheet ${note.tilt} px-6 pb-7 pt-9`}>
              <span className={`tape ${note.tape}`} />
              <span className="hand-note text-3xl text-orange-deep">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{note.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{note.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
