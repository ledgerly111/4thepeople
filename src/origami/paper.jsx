// Paper and ink: folding flaps, hatched
// shadows, ink impact dashes, and the filters that make every outline "boil".
import { INK } from './motion'
import { faceLight, foldMatrix, pts } from './fold'

export function Shade({ points, light }) {
  if (Math.abs(light - 1) < 0.01) return null
  const dark = light < 1
  const o = dark ? Math.min(0.34, (1 - light) * 0.5) : Math.min(0.3, (light - 1) * 0.7)
  return <polygon points={points} fill={dark ? '#6b3a12' : '#ffffff'} opacity={o} />
}

// Ink round a piece of paper: cut edges solid, crease edges dashed until folded.
export function Edges({ edges, folded = false, width = 2.4 }) {
  return edges.map(([p, q, kind], i) => (
    <line
      key={i}
      x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]}
      stroke={INK}
      strokeWidth={kind === 'crease' && !folded ? width * 0.7 : width}
      strokeDasharray={kind === 'crease' && !folded ? '7 6' : undefined}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      opacity={kind === 'crease' && !folded ? 0.55 : 1}
    />
  ))
}

// One flap: its top or under face, clipped to its polygon, folded about its crease.
export function Flap({ id, poly, P0, n, a, top, under, dir = 1, edges, hideUnder = false, ink = 2.4 }) {
  const showTop = Math.cos(a) >= 0
  if (!showTop && hideUnder) return null
  const P = pts(poly)
  return (
    <g transform={a ? foldMatrix(P0, n, a) : undefined}>
      <clipPath id={id}><polygon points={P} /></clipPath>
      <g clipPath={`url(#${id})`}>{showTop ? top : under}</g>
      <Shade points={P} light={a ? faceLight(n, a, dir) : 1} />
      {edges ? <Edges edges={edges} folded={a > 0.2} width={ink} /> : null}
    </g>
  )
}

// Ink dashes bursting out round an impact.
export function Impact({ x, y, t, at, r0 = 60, len = 26, count = 12, life = 0.3, width = 2.6, skew = 0 }) {
  const k = (t - at) / life
  if (k < 0 || k > 1) return null
  const grow = 1 - (1 - k) ** 2
  const o = k < 0.7 ? 1 : (1 - k) / 0.3
  return (
    <g opacity={o}>
      {Array.from({ length: count }, (_, i) => {
        const ang = skew + (i / count) * Math.PI * 2 + ((i * 37) % 11) * 0.02
        const r1 = r0 + grow * 22 + (i % 3) * 5
        const r2 = r1 + len * (1 - k * 0.6) * (i % 2 ? 0.75 : 1)
        return (
          <line key={i} x1={x + Math.cos(ang) * r1} y1={y + Math.sin(ang) * r1} x2={x + Math.cos(ang) * r2} y2={y + Math.sin(ang) * r2}
            stroke={INK} strokeWidth={width} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        )
      })}
    </g>
  )
}

// A little four-point ink sparkle.
export function Sparkle({ x, y, s, rot = 0 }) {
  if (s <= 0.01) return null
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 -22 Q3 -3 22 0 Q3 3 0 22 Q-3 3 -22 0 Q-3 -3 0 -22 Z" fill="#fff8e6" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </g>
  )
}

// Filters and patterns for the whole site. The turbulence seeds are re-rolled about
// eight times a second (useBoil) so outlines wobble like frame-by-frame ink.
export function InkDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id="boil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence data-boil type="turbulence" baseFrequency="0.03" numOctaves="2" seed="1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Smooth noise for thin CSS borders: turbulence's creases would tear them. */}
        <filter id="boilSoft" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence data-boil type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="boilText" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence data-boil type="turbulence" baseFrequency="0.045" numOctaves="1" seed="1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
          <line x1="0" y1="0" x2="0" y2="9" stroke={INK} strokeWidth="1.7" />
        </pattern>
      </defs>
    </svg>
  )
}
