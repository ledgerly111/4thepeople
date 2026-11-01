// A blank sheet, creased, then folded corner by corner into an orange diamond. Each
// fold is a step of a custom build; the 4TP dot lands on the finished piece, then the
// sheet opens out and starts again.
import { useRef } from 'react'
import { applyFold, blintzGeometry, hull, pts } from '../origami/fold'
import { CREAM, FACET, INK, SHEET, backOut, easeInOut, prog } from '../origami/motion'
import { Flap, Impact, Sparkle } from '../origami/paper'
import { useClock } from '../origami/useClock'

const PI = Math.PI
const G = blintzGeometry(300, 168)
const { C, H, T, R, B, L, FLAPS } = G
const LOOP = 8.6
const FOLD_AT = [1, 1.7, 2.4, 3.1]
const FOLD_LEN = 0.55
const UNFOLD_AT = 6
const DOT_AT = 3.85
const LABEL_POS = [[112, 92, 'end'], [488, 92, 'start'], [488, 528, 'start'], [112, 528, 'end']]

function angleOf(t, i) {
  const shut = easeInOut(prog(t, FOLD_AT[i], FOLD_AT[i] + FOLD_LEN))
  const at = UNFOLD_AT + (3 - i) * 0.28
  const open = easeInOut(prog(t, at, at + 0.45))
  return PI * shut * (1 - open)
}

export default function FoldingSheet({ steps, className = '' }) {
  const root = useRef(null)
  const [clock] = useClock(root, { still: 4.6 })
  const t = ((clock % LOOP) + LOOP) % LOOP
  const angles = FLAPS.map((_, i) => angleOf(t, i))
  const shadow = hull([T, R, B, L, ...FLAPS.flatMap((f, i) => [f.corner, f.a, f.b].map((q) => applyFold(q, f.P0, f.n, angles[i])))])
  const bob = Math.sin(t * 2.2) * 4 * prog(t, DOT_AT, DOT_AT + 0.4) * (1 - prog(t, UNFOLD_AT - 0.3, UNFOLD_AT))
  const dot = backOut(prog(t, DOT_AT, DOT_AT + 0.3)) * (1 - prog(t, UNFOLD_AT - 0.35, UNFOLD_AT - 0.1))
  const creases = prog(t, 0.2, 0.7)
  const labelsOut = 1 - prog(t, 7, 7.4)

  return (
    <div ref={root} className={`ink-boil ${className}`}>
      <svg viewBox="0 0 600 620" className="block h-auto w-full" role="img" aria-label={`A sheet folding through ${steps.join(', ')}`}>
        <g transform={`translate(0 ${bob})`}>
          <polygon points={pts(shadow)} transform="translate(14 16)" fill="url(#hatch)" opacity="0.3" />
          <polygon points={pts([T, R, B, L])} fill={SHEET} />
          {FLAPS.map((f, i) => (
            <Flap
              key={i} id={`fs-flap${i}`} poly={[f.corner, f.a, f.b]} P0={f.P0} n={f.n} a={angles[i]}
              top={<rect x={C - H} y={C - H} width={2 * H} height={2 * H} fill={SHEET} />}
              under={<rect x={C - H} y={C - H} width={2 * H} height={2 * H} fill={FACET[i]} />}
              edges={[[f.corner, f.a, 'cut'], [f.corner, f.b, 'cut'], ...(creases > 0 || angles[i] > 0 ? [[f.a, f.b, 'crease']] : [])]}
              ink={2.6}
            />
          ))}
          {dot > 0.01 ? (
            <g transform={`translate(${C} ${C}) scale(${dot})`}>
              <circle r="26" fill={CREAM} stroke={INK} strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
              <path d="M -16 -1 A 16 16 0 0 1 -2 -15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
            </g>
          ) : null}
        </g>
        <Impact x={C} y={C} t={t} at={DOT_AT + 0.05} r0={44} len={18} count={10} life={0.3} width={2.6} />
        <Sparkle x={470} y={250} s={Math.sin(PI * prog(t, DOT_AT + 0.2, DOT_AT + 0.7)) * 0.8} rot={t * 30} />
        <Sparkle x={140} y={360} s={Math.sin(PI * prog(t, DOT_AT + 0.4, DOT_AT + 0.9)) * 0.6} rot={-t * 30} />
        {steps.slice(0, 4).map((label, i) => {
          const k = backOut(prog(t, FOLD_AT[i] + 0.3, FOLD_AT[i] + 0.6)) * labelsOut
          if (k <= 0.01) return null
          const [x, y, anchor] = LABEL_POS[i]
          return (
            <text key={label} x={x} y={y} textAnchor={anchor} fontFamily="Caveat, cursive" fontWeight="700" fontSize="40" fill={INK} opacity={Math.min(1, k)}
              transform={`translate(${x} ${y}) scale(${k}) rotate(${i % 2 ? 4 : -4}) translate(${-x} ${-y})`}>
              <tspan fill="#ea6411">{i + 1}.</tspan> {label.toLowerCase()}
            </text>
          )
        })}
        {steps[4] ? (
          <text x={C} y={598} textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="40" fill="#ea6411" opacity={Math.min(1, backOut(prog(t, DOT_AT + 0.3, DOT_AT + 0.6))) * labelsOut}>
            …and we {steps[4].toLowerCase()}.
          </text>
        ) : null}
      </svg>
    </div>
  )
}
