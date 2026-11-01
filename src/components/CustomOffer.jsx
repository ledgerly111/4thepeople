import { useRef } from 'react'
import { Link } from 'react-router-dom'
import FoldingSheet from './FoldingSheet'
import { FoldWords } from './Ink'
import { useReveal } from '../origami/useReveal'

export default function CustomOffer() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} id="custom" className="relative px-5 py-20 lg:px-16 lg:py-28">
      <div data-reveal="fold" className="sheet sheet--cream mx-auto grid max-w-6xl items-center gap-6 p-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-12">
        <span className="tape -top-3 left-10 -rotate-3" />
        <span className="tape -top-3 right-12 rotate-6" />
        <FoldingSheet steps={['Brief', 'Build', 'Host', 'Ship', 'Stay']} className="mx-auto w-full max-w-[26rem]" />
        <div>
          <p className="hand-note text-2xl text-orange-deep">none of these quite you?</p>
          <h2 className="display mt-2 text-[clamp(2.3rem,5.6vw,4.2rem)]">
            <FoldWords text="Customized software, folded for you." />
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Not a template. We design and build the system your operation actually needs,
            from a blank sheet. Then we host it on the edge and ship fixes in hours.
          </p>
          <Link to="/custom-software" className="btn mt-8 min-h-13 px-7 text-base">
            Open the brief <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
