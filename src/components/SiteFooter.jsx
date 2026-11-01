import { Link } from 'react-router-dom'
import Logo from '../origami/Logo'
import { PRODUCTS } from '../data/products'

export default function SiteFooter() {
  return (
    <footer className="relative px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-14 lg:px-16 lg:pt-20">
      <svg className="ink-boil-soft absolute inset-x-5 -top-[5px] h-[12px] w-[calc(100%-2.5rem)] lg:inset-x-16 lg:w-[calc(100%-8rem)]" preserveAspectRatio="none" viewBox="0 0 100 12" aria-hidden="true">
        <line x1="0" y1="6" x2="100" y2="6" stroke="var(--color-ink)" strokeWidth="2.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
        <div>
          <Link to="/" aria-label="4TP home" className="inline-block">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
            4 The People. Automated software for the businesses that keep the Emirates moving.
          </p>
          <p className="hand-note mt-4 text-xl text-orange-deep">made in Dubai, folded with care</p>
        </div>

        <div>
          <p className="eyebrow text-ink-soft">Systems</p>
          <ul className="mt-4 space-y-2.5">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`} className="ink-link font-medium">{p.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/custom-software" className="ink-link font-medium">Custom software</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ink-soft">Say hello</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href="mailto:hello@4tp.ae" className="ink-link font-medium">hello@4tp.ae</a></li>
            <li className="text-ink-soft">Dubai, United Arab Emirates</li>
            <li className="text-left text-ink-soft" lang="ar" dir="rtl">الإمارات العربية المتحدة</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-xs tracking-wide text-ink-soft">
        © {new Date().getFullYear()} 4 The People · Automated software · UAE
      </p>
    </footer>
  )
}
