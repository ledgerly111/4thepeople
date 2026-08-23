import { Link } from 'react-router-dom'
import logo from '../assets/4tplogo.svg'

export default function ProductHeader({ eyebrow }) {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/20 bg-void/85 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2 lg:gap-4">
          <img src={logo} alt="4TP" className="h-8 w-8 lg:h-10 lg:w-10" />
          <span className="font-mono text-lg font-bold italic tracking-[0.22em] text-cream lg:text-2xl lg:tracking-[0.28em]">
            4TP
          </span>
          {eyebrow ? (
            <>
              <span className="hidden h-4 w-px bg-cream/40 lg:block" />
              <span className="hidden font-mono text-[10px] tracking-[0.18em] text-cream/55 lg:inline">
                {eyebrow}
              </span>
            </>
          ) : null}
        </Link>

        <nav className="flex items-center gap-2 lg:gap-6">
          <Link
            to="/"
            className="flex min-h-11 items-center px-3 font-mono text-[10px] tracking-[0.16em] text-cream/70 transition-colors hover:text-accent lg:text-[10px]"
          >
            BACK
          </Link>
          <Link
            to="/#contact"
            className="flex min-h-11 items-center border border-cream px-3 font-mono text-[10px] tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-void lg:px-4"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  )
}
