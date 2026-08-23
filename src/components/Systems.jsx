import { Link } from 'react-router-dom'
import { ProductIcon } from './ProductIcons'
import { PRODUCTS } from '../data/products'

export default function Systems() {
  return (
    <section
      id="systems"
      className="relative border-t border-cream/15 bg-void px-5 py-20 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-6 lg:mb-16">
          <h2 className="max-w-5xl font-mono text-[1.75rem] font-bold tracking-[0.06em] text-cream lg:text-5xl lg:tracking-[0.08em]">
            THE STACK
          </h2>
          <span className="hidden font-mono text-[10px] tracking-[0.22em] text-cream/40 lg:block">
            {String(PRODUCTS.length).padStart(2, '0')} MODULES
          </span>
        </div>

        <ul className="divide-y divide-cream/15 border-y border-cream/15">
          {PRODUCTS.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/${item.slug}`}
                className="block transition-colors hover:bg-cream/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-8 lg:grid-cols-[4rem_4.5rem_1fr_8rem] lg:items-center lg:gap-x-6 lg:py-10">
                  <span className="font-mono text-xs text-accent lg:text-sm">{item.id}</span>
                  <span className="justify-self-end font-mono text-[10px] tracking-[0.2em] text-cream/50 lg:col-start-4 lg:row-start-1">
                    {item.status}
                  </span>
                  <div className="col-start-1 row-start-2 flex h-12 w-12 items-center justify-center border border-cream/20 text-accent lg:col-start-2 lg:row-start-1 lg:h-14 lg:w-14">
                    <ProductIcon name={item.icon} className="h-6 w-6 lg:h-7 lg:w-7" />
                  </div>
                  <div className="col-span-1 col-start-2 row-start-2 lg:col-start-3 lg:row-start-1">
                    <h3 className="font-mono text-lg tracking-[0.08em] text-cream lg:text-3xl lg:tracking-[0.12em]">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-cream/65 lg:text-sm">
                      {item.stackCopy}
                    </p>
                    <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.2em] text-accent">
                      OPEN SYSTEM →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
