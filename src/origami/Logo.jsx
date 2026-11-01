import { LOGO_DOT, LOGO_FOUR, LOGO_P_HOLE, LOGO_TP, LOGO_TP_SPLIT, LOGO_VIEWBOX } from './logoPaths'
import { LOGO_INK, ORANGE } from './motion'

// The sidebar wordmark. `animated` pops the pieces in one by one and lets the dot hop
// on hover (see .logo-* in index.css).
export default function Logo({ className = '', animated = false, ink = LOGO_INK, dot = ORANGE, title = '4TP' }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label={title}
      className={[animated ? 'logo-animated' : '', className].filter(Boolean).join(' ')}
    >
      <defs>
        <clipPath id={`logo-t-${animated ? 'a' : 's'}`}>
          <rect x="500" y="370" width={LOGO_TP_SPLIT - 500} height="370" />
        </clipPath>
        <clipPath id={`logo-p-${animated ? 'a' : 's'}`}>
          <rect x={LOGO_TP_SPLIT} y="370" width="340" height="370" />
        </clipPath>
      </defs>
      <path className="logo-piece logo-four" d={LOGO_FOUR} fill={ink} />
      <g className="logo-piece logo-t" clipPath={`url(#logo-t-${animated ? 'a' : 's'})`}>
        <path d={`${LOGO_TP} ${LOGO_P_HOLE}`} fill={ink} fillRule="evenodd" />
      </g>
      <g className="logo-piece logo-p" clipPath={`url(#logo-p-${animated ? 'a' : 's'})`}>
        <path d={`${LOGO_TP} ${LOGO_P_HOLE}`} fill={ink} fillRule="evenodd" />
      </g>
      <path className="logo-dot" d={LOGO_DOT} fill={dot} />
    </svg>
  )
}
