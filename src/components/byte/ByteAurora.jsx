// BYTE AI's icon, copied unchanged in drawing from ledgerly-react src/components/byte/.
import { useId } from 'react'
import './byte-aurora.css'

// BYTE's face: a glossy orb with violet, pink and blue light swirling inside and two soft capsule
// eyes. `state` sets what it is doing:
//   static    still (older chat messages, icons)
//   idle      floats, breathes, blinks and glances around (the welcome screen)
//   thinking  the light spins while it looks up and to the side
//   scanning  a band of light sweeps across while its eyes read left and right (using tools)
//   typing    three dots bounce under its eyes while the answer appears
//   done      rings pulse out once and it smiles with its eyes (the answer is in)
const STATES = new Set(['static', 'idle', 'thinking', 'scanning', 'typing', 'done'])
const LABELS = { thinking: 'is thinking', scanning: 'is reading your data', typing: 'is answering' }

export default function ByteAurora({ size = 40, state = 'static', className = '', title = 'BYTE' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const mode = STATES.has(state) ? state : 'static'
  return (
    <svg
      className={`byte-aurora is-${mode} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={LABELS[mode] ? `${title} ${LABELS[mode]}` : title}
    >
      <defs>
        <clipPath id={`${uid}-clip`}><circle cx="32" cy="32" r="28" /></clipPath>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
        <radialGradient id={`${uid}-gloss`} cx="34%" cy="26%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-band`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="byte-aurora__rings">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="28" fill="none" stroke="#ff5c8a" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="28" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      </g>
      <g className="byte-aurora__body">
        <g clipPath={`url(#${uid}-clip)`}>
          <rect width="64" height="64" fill="#6d28d9" />
          <g className="byte-aurora__swirl" filter={`url(#${uid}-blur)`}>
            <circle cx="18" cy="20" r="17" fill="#8b5cf6" />
            <circle cx="48" cy="24" r="15" fill="#ff5c8a" />
            <circle cx="30" cy="50" r="18" fill="#38bdf8" />
          </g>
          <circle cx="32" cy="32" r="28" fill={`url(#${uid}-gloss)`} />
          <rect className="byte-aurora__band" x="-30" y="0" width="18" height="64" fill={`url(#${uid}-band)`} />
        </g>
        <circle cx="32" cy="32" r="27.5" fill="none" stroke="#fff" strokeOpacity="0.3" />
        <g className="byte-aurora__eyes">
          <rect x="22" y="24" width="6.5" height="12" rx="3.25" fill="#fff" />
          <rect x="35.5" y="24" width="6.5" height="12" rx="3.25" fill="#fff" />
        </g>
        <g className="byte-aurora__dots">
          <circle cx="26" cy="44.5" r="2.1" fill="#fff" />
          <circle cx="32" cy="44.5" r="2.1" fill="#fff" />
          <circle cx="38" cy="44.5" r="2.1" fill="#fff" />
        </g>
      </g>
    </svg>
  )
}
