import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SystemBadge from './SystemBadge'
import { Dogear, FoldWords } from './Ink'
import { useReveal } from '../origami/useReveal'
import { PRODUCTS } from '../data/products'

const GROUPS = [
  { key: 'desk', note: 'one for each kind of business' },
  { key: 'platform', note: 'and across every desk' },
]

function SystemCard({ item, i }) {
  return (
    <li data-reveal="fold">
      <Link
        to={`/${item.slug}`}
        className={`sheet sheet--eared sheet-lift group flex h-full flex-col p-6 lg:p-7 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
      >
        <Dogear />
        <div className="flex items-start justify-between gap-4">
          <SystemBadge icon={item.icon} className="float-y h-18 w-18 lg:h-20 lg:w-20" />
          <span className="mr-6 mt-1 -rotate-6 whitespace-nowrap rounded-sm border-2 border-orange-deep px-2 py-0.5 text-[0.68rem] font-bold tracking-[0.18em] text-orange-deep">
            {item.status}
          </span>
        </div>
        <p className="mt-5 text-sm font-semibold text-ink-soft">{item.id}</p>
        <h3 className="mt-1 text-[1.55rem] font-extrabold leading-tight tracking-tight">{item.label}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{item.stackCopy}</p>
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="font-semibold">
            Open system <span className="btn-arrow text-orange-deep">→</span>
          </span>
          <span className="hand-note text-xl text-ink-soft">{item.modulesTitle.toLowerCase()}</span>
        </div>
      </Link>
    </li>
  )
}

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
            {PRODUCTS.length} systems on one platform: a desk for each kind of business, and the pieces every desk shares. Open one to see its day.
          </p>
        </div>

        {GROUPS.map((group) => {
          const items = PRODUCTS.filter((p) => p.group === group.key)
          if (!items.length) return null
          return (
            <div key={group.key} className="mt-14 lg:mt-16">
              <p className="hand-note text-2xl text-ink-soft lg:text-[1.7rem]" data-reveal="rise">{group.note} ↓</p>
              <ul className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
                {items.map((item, i) => <SystemCard key={item.slug} item={item} i={i} />)}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
