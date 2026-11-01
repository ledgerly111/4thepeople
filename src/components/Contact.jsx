import { useRef, useState } from 'react'
import { FoldWords, Squiggle } from './Ink'
import { useReveal } from '../origami/useReveal'

const FLIGHT = 'M 8 150 C 70 40, 150 175, 220 90 S 300 20, 336 54'

function PaperPlane() {
  return (
    <div className="relative h-[180px] w-[340px] max-w-full" aria-hidden="true">
      <svg viewBox="0 0 340 180" className="ink-boil-soft absolute inset-0 h-full w-full overflow-visible">
        <path d={FLIGHT} fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeDasharray="2 10" strokeLinecap="round" opacity="0.45" />
      </svg>
      <svg
        viewBox="0 0 50 30"
        className="ink-boil-soft absolute left-0 top-0 w-14"
        style={{ offsetPath: `path('${FLIGHT}')`, offsetRotate: 'auto', animation: 'fly 5.5s cubic-bezier(.45,.05,.4,1) infinite' }}
      >
        <polygon points="2,4 48,13 15,15" fill="var(--color-sheet)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <polygon points="15,15 48,13 19,27" fill="var(--color-orange)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <polygon points="15,15 19,27 12,19" fill="var(--color-ember)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

export default function Contact() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)
  useReveal(root)

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
    <section ref={root} id="contact" className="relative px-5 py-20 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="hand-note text-2xl text-orange-deep" data-reveal="rise">let&apos;s fold one for you</p>
          <h2 className="display mt-2 text-[clamp(2.6rem,7vw,5.2rem)]">
            <FoldWords text="Talk to" />{' '}
            <span className="relative inline-block whitespace-nowrap">
              <FoldWords text="4TP." />
              <Squiggle className="absolute -bottom-[0.1em] left-0 h-[0.24em] w-full" delay={0.3} />
            </span>
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft" data-reveal="rise">
            Tell us the operation. We build the system. Dubai-based, UAE-first.
          </p>
          <div className="mt-10 hidden lg:block">
            <PaperPlane />
          </div>
          <div className="mt-6 space-y-1 lg:mt-4" data-reveal="rise">
            <p className="hand-note text-2xl">Dubai, United Arab Emirates</p>
            <p className="text-left text-lg text-ink-soft" lang="ar" dir="rtl">الإمارات العربية المتحدة</p>
          </div>
        </div>

        <form data-reveal="fold" onSubmit={onSubmit} className="sheet sheet--lined tilt-r space-y-6 px-6 pb-8 pt-10 lg:px-10 lg:pb-10 lg:pt-12">
          <span className="tape -top-3 left-8 -rotate-6" />
          <span className="tape -top-3 right-8 rotate-3" />
          <label className="block">
            <span className="eyebrow text-ink-soft">Name</span>
            <input required name="name" autoComplete="name" className="field" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-soft">Organisation</span>
            <input required name="org" autoComplete="organization" className="field" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-soft">Phone</span>
            <input required name="phone" type="tel" autoComplete="tel" className="field" />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-soft">What needs automating</span>
            <textarea required name="message" rows={4} className="field resize-y" />
          </label>
          <button type="submit" className="btn min-h-14 w-full text-base">
            {sent ? 'Opening your mail…' : 'Send request'} <span className="btn-arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}
