import { ProductIcon } from './ProductIcons'
import ByteAurora from './byte/ByteAurora'
import OrigamiBadge from '../origami/OrigamiBadge'

// A system's mark: its icon on the folded orange 4TP disc, or, for BYTE AI, BYTE's own
// orb as the app draws it.
export default function SystemBadge({ icon, className = '', byteState = 'idle' }) {
  if (icon === 'byte') {
    return (
      <span className={`relative block ${className}`}>
        <span className="absolute inset-[6%] translate-x-[8%] translate-y-[9%] rounded-full opacity-30" style={{ background: 'var(--hatch)' }} aria-hidden="true" />
        <ByteAurora size={64} state={byteState} title="BYTE AI" className="relative h-full w-full" />
      </span>
    )
  }
  return (
    <OrigamiBadge className={className}>
      <ProductIcon name={icon} x="58" y="58" width="84" height="84" className="" stroke="var(--color-sheet)" strokeWidth="1.6" />
    </OrigamiBadge>
  )
}
