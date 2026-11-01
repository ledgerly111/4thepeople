const WORDS = ['Typing centers', 'Cafeterias & restaurants', 'Retail counters', 'Van sales routes', 'Construction', 'Mobile shops', 'CRM', 'BYTE AI', 'MCP server', 'Custom builds', 'Made in Dubai']

function Ribbon({ reverse = false, tone }) {
  const items = WORDS
  return (
    <div className={`sheet ${tone} overflow-hidden py-3 lg:py-4`} style={{ '--shadow': '6px 8px' }}>
      <div className={`marquee-track ${reverse ? 'marquee-track--rev' : ''}`}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || reverse}>
            {items.map((w, i) => (
              <li key={i} className="flex items-center gap-6 pr-6 text-lg font-bold tracking-tight lg:gap-8 lg:pr-8 lg:text-2xl">
                {w}
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" aria-hidden="true">
                  <polygon points="10,1 17,4 19,10 16,17 10,19 3,16 1,10 4,3" fill={reverse ? 'var(--color-orange)' : 'var(--color-sheet)'} stroke="var(--color-ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

// Two paper ribbons crossing, each scrolling its own way.
export default function Marquee() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-14" aria-label="Who 4TP builds for">
      <div className="-mx-6 rotate-[1.6deg]">
        <Ribbon reverse tone="sheet--cream" />
      </div>
      <div className="-mx-6 -mt-3 -rotate-[1.4deg]">
        <Ribbon tone="sheet--orange" />
      </div>
    </section>
  )
}
