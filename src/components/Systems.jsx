import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ProductIcon } from './ProductIcons'
import { Dogear, FoldWords } from './Ink'
import OrigamiBadge from '../origami/OrigamiBadge'
import { useReveal } from '../origami/useReveal'
import { PRODUCTS } from '../data/products'

export default function Systems() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} id="systems" className="relative px-5 py-20 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hand-note text-2xl text-orange-deep" data-reveal="rise">pick your desk</p>
            <h2 className="display mt-2 text-[clamp(2.5rem,7vw,5rem)]">
              <FoldWords text="The stack" />
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft" data-reveal="rise">
            {PRODUCTS.length} live systems, each folded around one kind of business. Open one to see its day.
          </p>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-16 lg:gap-12">
          {PRODUCTS.map((item, i) => (
            <li key={item.slug} data-reveal="fold">
              <Link
                to={`/${item.slug}`}
                className={`sheet sheet--eared sheet-lift group flex h-full flex-col p-6 lg:p-8 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
              >
                <Dogear />
                <div className="flex items-start justify-between gap-4">
                  <OrigamiBadge className="float-y h-20 w-20 lg:h-24 lg:w-24" shadow>
                    <ProductIcon name={item.icon} x="62" y="62" width="76" height="76" className="" stroke="var(--color-sheet)" strokeWidth="1.7" />
                  </OrigamiBadge>
                  <span className="mr-6 mt-1 -rotate-6 rounded-sm border-2 border-orange-deep px-2 py-0.5 text-xs font-bold tracking-[0.2em] text-orange-deep">
                    {item.status}
                  </span>
                </div>
                <p className="mt-5 text-sm font-semibold text-ink-soft">{item.id}</p>
                <h3 className="mt-1 text-[1.65rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">{item.label}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{item.stackCopy}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold">
                    Open system <span className="btn-arrow text-orange-deep">→</span>
                  </span>
                  <span className="hand-note text-xl text-ink-soft">{item.modulesTitle.toLowerCase()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
