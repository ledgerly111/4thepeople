import { Link } from 'react-router-dom'
import { FoldWords } from './Ink'

// An orange sheet with its folds still showing, for the closing call to action. The page
// it sits on runs its reveals (useReveal).
export default function CtaSheet({ title, copy, cta, to = '/#contact', note = 'ready when you are' }) {
  return (
    <section className="px-5 py-20 lg:px-16 lg:py-28">
      <div
        data-reveal="fold"
        className="sheet sheet--orange tilt-l mx-auto max-w-5xl px-6 py-12 text-center lg:px-16 lg:py-20"
        style={{
          '--sheet-pattern':
            'linear-gradient(45deg, transparent calc(50% - 1px), rgb(36 31 27 / 0.16) 50%, transparent calc(50% + 1px)), linear-gradient(-45deg, transparent calc(50% - 1px), rgb(36 31 27 / 0.16) 50%, transparent calc(50% + 1px))',
        }}
      >
        <p className="hand-note text-2xl text-ink lg:text-[1.7rem]">{note}</p>
        <h2 className="display mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,6vw,4.4rem)]">
          <FoldWords text={title} />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{copy}</p>
        <Link to={to} className="btn btn--light mt-9 min-h-13 px-8 text-base">
          {cta} <span className="btn-arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
