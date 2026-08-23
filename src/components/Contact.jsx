import { useState } from 'react'
import logo from '../assets/4tplogo.svg'

const fieldClass =
  'h-12 w-full border border-cream/25 bg-transparent px-3 font-mono text-base text-cream outline-none transition-colors focus:border-accent lg:text-sm'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const org = String(data.get('org') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const message = String(data.get('message') || '').trim()
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${org}\nPhone: ${phone}\n\n${message}`,
    )
    window.location.href = `mailto:hello@4tp.ae?subject=${encodeURIComponent('4TP system request')}&body=${body}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative border-t border-cream/15 bg-void px-5 py-20 pb-10 lg:px-16 lg:py-48"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="max-w-5xl font-mono text-[1.75rem] font-bold tracking-[0.06em] text-cream lg:text-5xl lg:tracking-[0.08em]">
            TALK TO 4TP
          </h2>
          <p className="mt-5 max-w-md font-mono text-[15px] leading-relaxed text-cream/70 lg:mt-6 lg:text-sm">
            Tell us the operation. We build the system. Dubai-based, UAE-first.
          </p>
          <div className="mt-8 space-y-2 font-mono text-[11px] tracking-[0.12em] text-cream/45 lg:mt-10 lg:tracking-[0.16em]">
            <p>LAT 25.2048° · LONG 55.2708°</p>
            <p>DUBAI, UNITED ARAB EMIRATES</p>
            <p>الإمارات العربية المتحدة</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 lg:space-y-6">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-cream/55">
              NAME
            </span>
            <input required name="name" autoComplete="name" className={fieldClass} />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-cream/55">
              ORGANISATION
            </span>
            <input required name="org" autoComplete="organization" className={fieldClass} />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-cream/55">
              PHONE
            </span>
            <input
              required
              name="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-cream/55">
              WHAT NEEDS AUTOMATING
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full border border-cream/25 bg-transparent px-3 py-3 font-mono text-base text-cream outline-none transition-colors focus:border-accent lg:text-sm"
            />
          </label>
          <button
            type="submit"
            className="relative min-h-12 w-full border border-cream bg-cream px-6 font-mono text-sm tracking-[0.16em] text-void transition-colors hover:border-accent hover:bg-accent"
          >
            {sent ? 'OPENING MAIL' : 'SEND REQUEST'}
          </button>
        </form>
      </div>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 pb-[env(safe-area-inset-bottom)] lg:mt-32 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="font-mono text-xs tracking-[0.2em] text-cream/70">
            4TP SOLUTIONS
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.12em] text-cream/40 lg:tracking-[0.16em]">
          © {new Date().getFullYear()} 4 THE PEOPLE · AUTOMATED SOFTWARE · UAE
        </p>
      </footer>
    </section>
  )
}
