import { blintzGeometry, pts } from './fold'
import { FACET, INK } from './motion'

const G = blintzGeometry(100, 110)
const DISC = pts(G.DISC)

// The folded orange disc of the 4TP icon, at rest, with something drawn on it. Every
// badge shares one clip path: the geometry is the same.
export default function OrigamiBadge({ className = '', children, shadow = true }) {
  return (
    <svg viewBox="-8 -8 226 226" className={className} aria-hidden="true">
      <clipPath id="badge-disc"><polygon points={DISC} /></clipPath>
      {shadow ? <polygon points={DISC} transform="translate(9 11)" fill="url(#hatch)" opacity="0.3" /> : null}
      <g clipPath="url(#badge-disc)">
        {G.FACETS.map((f, i) => <polygon key={i} points={pts(f)} fill={FACET[i]} />)}
        {[G.T, G.R, G.B, G.L].map((p, i) => (
          <line key={i} x1={G.C} y1={G.C} x2={p[0]} y2={p[1]} stroke={INK} strokeWidth="1.4" opacity="0.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <polygon points={DISC} fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {children}
    </svg>
  )
}
