import { Link } from 'react-router-dom'
import MatrixRain from './MatrixRain'

export default function CustomOffer() {
  return (
    <section
      id="custom"
      className="relative border-t border-cream/15 bg-void px-5 py-20 lg:px-16 lg:py-32"
    >
      <Link
        to="/custom-software"
        className="group mx-auto grid max-w-6xl overflow-hidden border border-cream/20 transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]"
      >
        <div className="relative h-40 overflow-hidden border-b border-cream/15 lg:h-auto lg:min-h-[280px] lg:border-b-0 lg:border-r">
          <MatrixRain />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-void/50" />
        </div>

        <div className="flex flex-col justify-center px-5 py-8 lg:px-12 lg:py-14">
          <div className="mb-4 flex items-center gap-3 opacity-60">
            <div className="h-px w-8 bg-cream" />
            <span className="font-mono text-[10px] tracking-[0.28em] text-cream">
              FROM SCRATCH
            </span>
          </div>
          <h2 className="font-mono text-[1.6rem] font-bold leading-[1.12] tracking-[0.06em] text-cream lg:text-4xl">
            CUSTOMIZED SOFTWARE
            <br />
            FOR YOU
          </h2>
          <p className="mt-4 max-w-lg font-mono text-[15px] leading-relaxed text-cream/70 lg:text-sm">
            Not a template. We design and build the system your operation actually
            needs — then host it on the edge and ship fixes in hours.
          </p>
          <span className="mt-6 inline-block font-mono text-[10px] tracking-[0.2em] text-accent group-hover:text-cream">
            OPEN THE BRIEF →
          </span>
        </div>
      </Link>
    </section>
  )
}
