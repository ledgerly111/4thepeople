import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PipeRibbon from '../components/PipeRibbon'
import StepTrail from '../components/StepTrail'
import CtaSheet from '../components/CtaSheet'
import FoldingSheet from '../components/FoldingSheet'
import PaperScraps from '../components/PaperScraps'
import { DropTitle, FoldWords } from '../components/Ink'
import { useReveal } from '../origami/useReveal'

const PIPE = ['BRIEF', 'BUILD', 'HOST', 'SHIP', 'STAY']

const STEPS = [
  {
    id: '01',
    name: 'FROM SCRATCH',
    copy: 'You describe the desk. We do not force a catalog onto it. Screens, roles, documents, and the way money moves are specified to your operation, then written as software.',
    points: [
      'Built for your workflow, not a generic ERP with unused modules',
      'Same visual language and stack discipline as every 4TP system',
      'You keep the product. We keep it running.',
    ],
  },
  {
    id: '02',
    name: 'WORLD-FAST HOSTING',
    copy: 'The app ships as a static front end on Cloudflare’s global edge, one of the fastest networks on the planet. No office server. No waiting on a machine in a back room.',
    points: [
      'Served from the edge, close to whoever opens it in the UAE and abroad',
      'Cloud database and auth behind it: backups, not a USB stick',
      'Opens on phone and laptop the same morning you go live',
    ],
  },
  {
    id: '03',
    name: 'HOURS, NOT SPRINTS',
    copy: 'New features and error fixes are implemented in hours. You send the change. We patch, deploy, and you see it on the live desk the same day, not in a six-week ticket pile.',
    points: [
      'Bug on the counter this morning, patched before close',
      'A new field, report, or permission can land the same afternoon',
      'You talk to the people who wrote it, not a distant vendor queue',
    ],
  },
]

const PROMISES = [
  {
    id: '01',
    name: 'Specified to you',
    copy: 'Intake, stock, invoices, staff: whatever the operation is. We map it, then we build it.',
  },
  {
    id: '02',
    name: 'Edge hosting',
    copy: 'Cloudflare edge. Fast load, worldwide. No hardware for you to baby-sit.',
  },
  {
    id: '03',
    name: 'Fixes in hours',
    copy: 'Errors and new features ship in hours. The software stays as live as the business.',
  },
]

export default function CustomSoftwarePage() {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={root} className="w-full max-w-full overflow-x-clip">
      <SiteHeader eyebrow="Custom software" />

      <main>
        <section className="relative isolate px-5 pb-14 pt-8 lg:px-16 lg:pb-20 lg:pt-12">
          <PaperScraps scraps={[{ x: '6%', y: '70%', shape: 'tri', r: 30 }, { x: '48%', y: '4%', shape: 'sq', fill: 'var(--color-sheet)', r: -12, size: 24 }]} />
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <FoldingSheet steps={PIPE.map((s) => s.charAt(0) + s.slice(1).toLowerCase())} className="mx-auto w-full max-w-[24rem] lg:order-2 lg:max-w-[30rem]" />
            <div className="lg:order-1">
              <p className="hand-note -rotate-2 text-2xl text-orange-deep">built to order · UAE</p>
              <DropTitle
                lines={['Customized', 'software for you']}
                accent="you"
                className="display mt-3 text-[clamp(2.8rem,9vw,5.6rem)]"
              />
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft" data-reveal="rise">
                If the shelf product is not the desk, we write a new one. From scratch. Hosted on
                the world’s fastest edge. New features and error fixes land in hours.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row" data-reveal="rise" data-delay="0.1">
                <a href="#operation" className="btn min-h-13 px-7 text-base">
                  How we build <span className="btn-arrow">↓</span>
                </a>
                <Link to="/#contact" className="btn btn--light min-h-13 px-7 text-base">
                  Start a brief
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-6 lg:px-16" aria-label="Stages">
          <PipeRibbon stages={PIPE} />
        </section>

        <section id="operation" className="relative px-5 py-20 lg:px-16 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="hand-note text-2xl text-orange-deep" data-reveal="rise">three facts</p>
              <h2 className="display mt-2 text-[clamp(2.4rem,6vw,4.4rem)]">
                <FoldWords text="The build, mapped." />
              </h2>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft" data-reveal="rise">
                The rest is conversation, then code, then a URL your staff can open tomorrow.
              </p>
            </div>
            <StepTrail steps={STEPS} />
          </div>
        </section>

        <section className="px-5 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">
              <FoldWords text="What you get" />
            </h2>
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {PROMISES.map((item, i) => (
                <li key={item.id} data-reveal="fold" className={`sheet sheet-lift px-6 pb-8 pt-9 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}>
                  <span className={`tape -top-3 ${i % 2 ? 'right-8 rotate-3' : 'left-8 -rotate-6'}`} />
                  <span className="hand-note text-3xl text-orange-deep">{item.id}</span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{item.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaSheet
          title="Tell us the operation. We write the system."
          copy="From scratch, on the edge, with changes that land in hours. If none of the shelf products is the desk, this is."
          cta="Start a brief"
          note="a blank sheet is all we need"
        />
      </main>

      <SiteFooter />
    </div>
  )
}
