// The stages of a desk on a strip of paper folded like an accordion: every other panel
// leans away from the light.
export default function PipeRibbon({ stages }) {
  const n = stages.length
  const W = 100 / n
  const D = 9 // how far a receding fold edge sits in from the top and bottom
  return (
    <div data-reveal="fold" className="relative mx-auto max-w-5xl">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ink-boil-soft absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <g transform="translate(1.2 7)" opacity="0.28">
          {stages.map((_, i) => {
            const x0 = i * W
            const x1 = x0 + W
            const [t0, t1] = i % 2 ? [D, 0] : [0, D]
            return <polygon key={i} points={`${x0},${t0} ${x1},${t1} ${x1},${100 - t1} ${x0},${100 - t0}`} fill="url(#hatch)" />
          })}
        </g>
        {stages.map((_, i) => {
          const x0 = i * W
          const x1 = x0 + W
          const [t0, t1] = i % 2 ? [D, 0] : [0, D]
          return (
            <polygon
              key={i}
              points={`${x0},${t0} ${x1},${t1} ${x1},${100 - t1} ${x0},${100 - t0}`}
              fill={i % 2 ? '#eadfc8' : 'var(--color-sheet)'}
              stroke="var(--color-ink)" strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
      <ol className="relative grid py-5 lg:py-7" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {stages.map((label, i) => (
          <li key={label} className="flex flex-col items-center gap-0.5 px-1 text-center">
            <span className="hand-note text-lg text-orange-deep lg:text-2xl">{i + 1}</span>
            <span className="text-[10px] font-bold tracking-[0.12em] sm:text-xs lg:text-sm lg:tracking-[0.16em]">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
