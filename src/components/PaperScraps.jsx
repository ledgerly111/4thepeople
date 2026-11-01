// Loose scraps of folded paper drifting about behind a section.
const SHAPES = {
  tri: '0,0 24,4 10,22',
  sq: '0,0 18,2 16,20 -2,18',
  kite: '10,0 20,12 10,26 0,12',
}

export default function PaperScraps({ scraps }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {scraps.map((s, i) => (
        <svg
          key={i}
          viewBox="-4 -4 32 34"
          className="drift ink-boil-soft absolute"
          style={{
            left: s.x, top: s.y, width: s.size ?? 34,
            '--r': `${s.r ?? 0}deg`, '--dx': `${s.dx ?? 12}px`, '--dy': `${s.dy ?? -16}px`, '--dur': `${s.dur ?? 9}s`,
            animationDelay: `${-i * 1.7}s`,
          }}
        >
          <polygon points={SHAPES[s.shape ?? 'tri']} fill={s.fill ?? 'var(--color-orange)'} stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </div>
  )
}
