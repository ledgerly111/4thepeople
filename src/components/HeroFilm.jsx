// The hero, after the "4TP x your AI" origami film: an orange sheet falls, blintz-folds
// into the 4TP icon and the sidebar wordmark pops onto it. The dot jumps out, flips
// orange and hops round the four systems, tapping each tile open; it comes home, ink
// threads join every tile to 4TP and orange beads keep running home along them.
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { ProductIcon } from './ProductIcons'
import { applyFold, blintzGeometry, faceLight, foldMatrix, hull, pts } from '../origami/fold'
import { LOGO_DOT_CENTRE, LOGO_FOUR, LOGO_P_HOLE, LOGO_TP, LOGO_TP_SPLIT } from '../origami/logoPaths'
import {
  CREAM, EMBER, FACET, INK, ORANGE, SHEET,
  backOut, bump, clamp01, easeInOut, easeOut, lerp, prog,
} from '../origami/motion'
import { Edges, Flap, Impact, Shade, Sparkle } from '../origami/paper'
import { useClock } from '../origami/useClock'

const PI = Math.PI
const C = 540
const G = blintzGeometry(C, 280)
const { T, R, B, L, H, FLAPS, FACETS, OCT, TIPS, CORNERS, DISC } = G

const HIT = {
  land: 0.42,
  flaps: [0.48, 0.58, 0.68, 0.78],
  flapLen: 0.26,
  tips: [1.06, 1.26],
  corners: [1.26, 1.42],
  letters: [1.4, 1.48, 1.56],
  dot: 1.7,
  shrink: [1.9, 2.2],
  squash: 2.12,
  launch: 2.25,
}
const IDLE = 6

// ------------------------------------------------------------------ the tiles
const RING = 350
const TILE = 168
const BACKS = ['#ff8d42', '#f4c26b', '#ea6411', '#fe7b29']
const TILES = PRODUCTS.map((p, i) => {
  const ang = ((-135 + i * 90) * PI) / 180
  return {
    i, slug: p.slug, icon: p.icon, name: p.short, back: BACKS[i],
    x: C + RING * Math.cos(ang), y: C + RING * Math.sin(ang), tilt: [-3, 2.5, -2, 3][i],
  }
})
const PERCH = { x: 72, y: -72 }

// The dot's hops: out to the first tile, a little rebound onto each tile's corner, on
// to the next tile, then home.
const HOPS = []
{
  const firstLand = 2.63
  HOPS.push({ kind: 'out', to: 0, t0: HIT.launch, t1: firstLand })
  let land = firstLand
  TILES.forEach((a, i) => {
    if (i > 0) {
      const t0 = 3.15 + (i - 1) * 0.52
      land = t0 + 0.32
      HOPS.push({ kind: 'tile', from: i - 1, to: i, t0, t1: land })
    }
    a.land = land
    HOPS.push({ kind: 'perch', to: i, t0: land, t1: land + 0.13 })
  })
  HIT.home = land + 0.65
  HOPS.push({ kind: 'home', from: TILES.length - 1, t0: land + 0.3, t1: HIT.home })
  HIT.spokes = HIT.home + 0.02
  HIT.data = HIT.home + 0.3
  HIT.shimmer = HIT.home + 0.52
}

const mod = (a, n) => ((a % n) + n) % n
const BEAD_EVERY = 2.8
const BEAD_TRIP = 0.9
const beadPhase = (t, i) => {
  const since = t - IDLE - i * 0.7
  return since < 0 ? -1 : mod(since, BEAD_EVERY)
}

// ------------------------------------------------------------------ the icon
const LS = 0.3 // logo units to icon units
const LC = [724, 555] // the wordmark's centre
const DOT_HOME = {
  x: C + (LOGO_DOT_CENTRE.x - LC[0]) * LS,
  y: C + (LOGO_DOT_CENTRE.y - LC[1]) * LS,
  r: LOGO_DOT_CENTRE.r * LS,
}
const DOT_R = 22
const TP = `${LOGO_TP} ${LOGO_P_HOLE}`
const PIECES = [
  { d: LOGO_FOUR, c: [395, 551] },
  { d: TP, clip: 'hf-t', c: [650, 551] },
  { d: TP, clip: 'hf-p', c: [925, 520] },
]

function iconPose(t) {
  const s = lerp(1, 0.6, easeInOut(prog(t, ...HIT.shrink)))
  let pulse = 0.015 * bump(t, HIT.land, 0.25) + 0.07 * bump(t, HIT.home, 0.3)
  TILES.forEach((a) => {
    pulse += 0.03 * bump(t, HIT.data + 0.3 + a.i * 0.03, 0.18)
    const ph = beadPhase(t, a.i)
    if (ph >= BEAD_TRIP) pulse += 0.03 * bump(ph, BEAD_TRIP, 0.22)
  })
  const breathe = t > IDLE ? 0.01 * Math.sin((t - IDLE) * 1.6) * clamp01(t - IDLE) : 0
  return { cx: C, cy: C, s: s * (1 + pulse + breathe) }
}
const iconToWorld = (pose, p) => [pose.cx + (p[0] - C) * pose.s, pose.cy + (p[1] - C) * pose.s]

function HatchShadow({ points, dx = 13, dy = 15, o = 0.3 }) {
  return <polygon points={pts(points)} transform={`translate(${dx} ${dy})`} fill="url(#hatch)" opacity={o} />
}

function FacetArt() {
  return (
    <>
      {FACETS.map((f, i) => <polygon key={i} points={pts(f)} fill={FACET[i]} />)}
      {[T, R, B, L].map((p, i) => (
        <line key={i} x1={C} y1={C} x2={p[0]} y2={p[1]} stroke={INK} strokeWidth={1.6} opacity={0.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </>
  )
}

function FallingSheet({ t }) {
  const p = clamp01(t / HIT.land)
  const y = lerp(-330, C, p ** 1.7)
  const x = C + 70 * Math.sin(p * 7) * (1 - p)
  const rot = -24 * (1 - p) * Math.cos(p * 5)
  const sy = Math.cos(3 * PI * (1 - p))
  const off = 14 + 90 * (1 - p)
  const sq = [[-H, -H], [H, -H], [H, H], [-H, H]]
  return (
    <>
      <g transform={`translate(${x + off} ${C + off}) rotate(${rot}) scale(${1 - 0.25 * (1 - p)} ${Math.max(0.2, Math.abs(sy))})`} opacity={0.3 * p}>
        <polygon points={pts(sq)} fill="url(#hatch)" />
      </g>
      <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${Math.abs(sy) < 0.02 ? 0.02 : sy})`}>
        <polygon points={pts(sq)} fill={sy >= 0 ? SHEET : ORANGE} stroke={INK} strokeWidth={2.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </g>
    </>
  )
}

function Blintz({ t }) {
  const angles = HIT.flaps.map((at) => PI * easeInOut(prog(t, at, at + HIT.flapLen)))
  const shadow = hull([T, R, B, L, ...FLAPS.flatMap((f, i) => [f.corner, f.a, f.b].map((q) => applyFold(q, f.P0, f.n, angles[i])))])
  return (
    <>
      <HatchShadow points={shadow} />
      <polygon points={pts([T, R, B, L])} fill={SHEET} />
      {FLAPS.map((f, i) => (
        <Flap
          key={i} id={`hf-blintz${i}`} poly={[f.corner, f.a, f.b]} P0={f.P0} n={f.n} a={angles[i]}
          top={<rect x={C - H} y={C - H} width={2 * H} height={2 * H} fill={SHEET} />}
          under={<rect x={C - H} y={C - H} width={2 * H} height={2 * H} fill={FACET[i]} />}
          edges={[[f.corner, f.a, 'cut'], [f.corner, f.b, 'cut'], [f.a, f.b, 'crease']]}
          ink={2.6}
        />
      ))}
    </>
  )
}

function Octagon({ t }) {
  const a = PI * easeInOut(prog(t, ...HIT.tips))
  const b = PI * easeInOut(prog(t, ...HIT.corners))
  const cornersOn = t >= HIT.corners[0]
  const base = cornersOn ? DISC : OCT
  const pieces = cornersOn ? CORNERS : TIPS
  const ang = cornersOn ? b : a
  const shadow = hull([...base, ...(Math.cos(ang) >= 0 ? pieces.flatMap((p) => p.poly.map((q) => applyFold(q, p.P0, p.n, ang))) : [])])
  const n = base.length
  const edges = base.map((p, i) => [p, base[(i + 1) % n], i % 2 === 0 ? 'crease' : 'cut'])
  return (
    <>
      <HatchShadow points={shadow} />
      <clipPath id="hf-disc"><polygon points={pts(base)} /></clipPath>
      <g clipPath="url(#hf-disc)"><FacetArt /></g>
      <Edges edges={edges} folded={ang > 0.2} width={2.6} />
      {pieces.map((p, i) => (
        <Flap
          key={`${cornersOn}${i}`} id={`hf-${cornersOn ? 'corner' : 'tip'}${i}`} poly={p.poly} P0={p.P0} n={p.n} a={ang} dir={-1} hideUnder
          top={<FacetArt />}
          edges={[[p.poly[0], p.poly[1], 'cut'], [p.poly[0], p.poly[2], 'cut']]}
          ink={2.6}
        />
      ))}
    </>
  )
}

function Letters({ t, dot }) {
  return (
    <g transform={`translate(${C} ${C}) scale(${LS}) translate(${-LC[0]} ${-LC[1]})`}>
      <clipPath id="hf-t"><rect x="500" y="370" width={LOGO_TP_SPLIT - 500} height="370" /></clipPath>
      <clipPath id="hf-p"><rect x={LOGO_TP_SPLIT} y="370" width="340" height="370" /></clipPath>
      {PIECES.map((piece, i) => {
        const e = backOut(prog(t, HIT.letters[i], HIT.letters[i] + 0.24))
        if (e <= 0) return null
        const m = Math.min(1, e)
        const [cx, cy] = piece.c
        return (
          <g key={i} transform={`translate(${cx} ${cy - (1 - m) * 66}) scale(${e}) rotate(${(1 - m) * -24}) translate(${-cx} ${-cy})`}>
            <g clipPath={piece.clip ? `url(#${piece.clip})` : undefined}>
              <path d={piece.d} fillRule="evenodd" transform="translate(8 10)" fill={EMBER} opacity={0.55} />
              <path d={piece.d} fillRule="evenodd" fill={CREAM} stroke={INK} strokeWidth={2.2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </g>
          </g>
        )
      })}
      {dot}
    </g>
  )
}

// ------------------------------------------------------------------ the dot
function hopEnds(h) {
  const tileAt = (i) => [TILES[i].x, TILES[i].y]
  const perchAt = (i) => [TILES[i].x + PERCH.x, TILES[i].y + PERCH.y]
  if (h.kind === 'out') return { A: iconToWorld(iconPose(h.t0), [DOT_HOME.x, DOT_HOME.y]), B: tileAt(h.to), h: 150 }
  if (h.kind === 'perch') return { A: tileAt(h.to), B: perchAt(h.to), h: 46 }
  if (h.kind === 'tile') return { A: perchAt(h.from), B: tileAt(h.to), h: 110 }
  return { A: perchAt(h.from), B: iconToWorld(iconPose(h.t1), [DOT_HOME.x, DOT_HOME.y]), h: 130 }
}
const arc = (E, u) => [lerp(E.A[0], E.B[0], u), lerp(E.A[1], E.B[1], u) - E.h * 4 * u * (1 - u)]

function dotState(t) {
  if (t < HIT.dot) return null
  if (t < HIT.launch) {
    const e = backOut(prog(t, HIT.dot, HIT.dot + 0.22))
    const k = easeOut(prog(t, HIT.squash, HIT.launch))
    return { onIcon: true, scale: e, sx: 1 + 0.16 * k, sy: 1 - 0.32 * k, colour: CREAM }
  }
  if (t >= HIT.home) {
    const k = prog(t, HIT.home, HIT.home + 0.16)
    return { onIcon: true, scale: 1, sx: 1 + 0.2 * (1 - k) ** 2, sy: 1 - 0.3 * (1 - k) ** 2, colour: CREAM }
  }
  let last = null
  for (const h of HOPS) {
    if (t >= h.t0 && t < h.t1) {
      const u = prog(t, h.t0, h.t1)
      const E = hopEnds(h)
      const [x, y] = arc(E, u)
      const rHome = DOT_HOME.r * 0.6
      let r = DOT_R
      let colour = ORANGE
      let flip = 1
      if (h.kind === 'out') {
        r = lerp(rHome, DOT_R, Math.min(1, u * 2))
        colour = u < 0.5 ? CREAM : ORANGE
        flip = Math.max(0.06, Math.abs(Math.cos(PI * u)))
      }
      if (h.kind === 'home') {
        r = lerp(DOT_R, rHome, Math.max(0, u * 2 - 1))
        colour = u < 0.5 ? ORANGE : CREAM
        flip = Math.max(0.06, Math.abs(Math.cos(PI * u)))
      }
      const st = Math.sin(PI * u)
      return { x, y, r, colour, sx: (1 - 0.06 * st) * flip, sy: 1 + 0.1 * st, E, u, h }
    }
    if (h.t1 <= t) last = h
  }
  const E = hopEnds(last)
  const kk = prog(t, last.t1, last.t1 + 0.14)
  return { x: E.B[0], y: E.B[1], r: DOT_R, colour: ORANGE, sx: 1 + 0.2 * (1 - kk) ** 2, sy: 1 - 0.3 * (1 - kk) ** 2 }
}

function DotShape({ r, colour, sx, sy, x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y + r * (1 - sy)}) scale(${sx} ${sy})`}>
      <circle r={r} fill={colour} stroke={INK} strokeWidth={2.4} vectorEffect="non-scaling-stroke" />
      <path d={`M ${-r * 0.62} ${-r * 0.05} A ${r * 0.62} ${r * 0.62} 0 0 1 ${-r * 0.08} ${-r * 0.6}`} fill="none" stroke="#ffffff" strokeWidth={Math.max(2, r * 0.16)} strokeLinecap="round" opacity={0.85} />
    </g>
  )
}

function FlyingDot({ s }) {
  if (!s || s.onIcon) return null
  const strokes = []
  if (s.h && s.h.kind !== 'perch' && s.u > 0.14) {
    for (const side of [-1, 1]) {
      const P = [s.u - 0.17, s.u - 0.11, s.u - 0.06].map((u) => arc(s.E, Math.max(0, u)))
      const dx = P[2][0] - P[0][0]
      const dy = P[2][1] - P[0][1]
      const m = Math.hypot(dx, dy) || 1
      const off = side * s.r * 0.55
      const Q = P.map((p) => [p[0] - (dy / m) * off, p[1] + (dx / m) * off])
      strokes.push(<polyline key={side} points={pts(Q)} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" opacity={0.8} vectorEffect="non-scaling-stroke" />)
    }
  }
  let ground = null
  if (s.E) {
    const lift = 4 * s.u * (1 - s.u)
    const gx = lerp(s.E.A[0], s.E.B[0], s.u)
    const gy = lerp(s.E.A[1], s.E.B[1], s.u) + s.r
    ground = <ellipse cx={gx} cy={gy} rx={s.r * (1 - 0.45 * lift)} ry={s.r * 0.28 * (1 - 0.45 * lift)} fill={INK} opacity={0.16 * (1 - 0.6 * lift)} />
  }
  return (
    <>
      {ground}
      {strokes}
      <DotShape x={s.x} y={s.y} r={s.r} colour={s.colour} sx={s.sx} sy={s.sy} />
    </>
  )
}

// The dotted ink trail the dot leaves, faded out once the threads are drawn.
function Trail({ t }) {
  const fade = 1 - prog(t, HIT.home, HIT.home + 0.5)
  if (fade <= 0) return null
  const dots = []
  HOPS.forEach((h, hi) => {
    if (h.kind === 'perch' || t < h.t0) return
    const E = hopEnds(h)
    const u = prog(t, h.t0, h.t1)
    const n = Math.round(Math.hypot(E.B[0] - E.A[0], E.B[1] - E.A[1]) / 15) + 4
    for (let i = 1; i < n; i += 1) {
      const v = i / n
      if (v > u) break
      const [x, y] = arc(E, v)
      dots.push(<circle key={`${hi}-${i}`} cx={x} cy={y} r={3} fill={INK} />)
    }
  })
  return <g opacity={0.42 * fade}>{dots}</g>
}

// ------------------------------------------------------------------ tiles
function tileState(a, t) {
  const lt = t - a.land
  if (lt < 0) return null
  const idle = clamp01(t - IDLE)
  return {
    alpha: PI * (1 - easeOut(prog(lt, 0.19, 0.33))),
    beta: PI * (1 - easeOut(prog(lt, 0.07, 0.21))),
    sc: backOut(prog(lt, 0, 0.12)) * (1 - 0.06 * bump(t, a.land + 0.04, 0.2)),
    bob: idle * Math.sin((t - IDLE) * 1.3 + a.i * 1.7) * 6,
    label: easeOut(prog(lt, 0.28, 0.45)),
    open: lt > 0.4,
  }
}

function Tile({ a, t, hover, focus, onOpen, onHover, onFocus }) {
  const s = tileState(a, t)
  if (!s) return null
  const { x: qx, y: qy } = a
  const h = TILE / 2
  const x0 = qx - h
  const y0 = qy - h
  const x1 = qx + h
  const y1 = qy + h
  const TL = [[x0, y0], [qx, y0], [qx, qy], [x0, qy]]
  const TR = [[qx, y0], [x1, y0], [x1, qy], [qx, qy]]
  const BL = [[x0, qy], [qx, qy], [qx, y1], [x0, y1]]
  const BR = [[qx, qy], [x1, qy], [x1, y1], [qx, y1]]
  const IS = 96
  const front = (
    <>
      <rect x={x0} y={y0} width={TILE} height={TILE} fill="#fffaf0" />
      <ProductIcon name={a.icon} x={qx - IS / 2} y={qy - IS / 2} width={IS} height={IS} className="" stroke={INK} strokeWidth="1.25" />
    </>
  )
  const back = <rect x={x0} y={y0} width={TILE} height={TILE} fill={a.back} />
  const P = [qx, qy]
  const ca = Math.cos(s.alpha)
  const cb = Math.cos(s.beta)
  const offx = ((h / 2) * (1 - ca)) / 2
  const offy = ((h / 2) * (1 - cb)) / 2
  const edgesOf = (Q, cuts) => Q.map((p, i) => [p, Q[(i + 1) % 4], cuts[i] ? 'cut' : 'crease'])
  const fpR = qx + Math.max(0, h * ca)
  const fpB = qy + Math.max(0, h * cb)
  const lifted = hover || focus
  const lift = lifted ? 1.07 : 1
  const shadowOff = lifted ? [15, 18] : [9, 11]
  const bottom = cb >= 0 ? (
    <>
      <Flap id={`hf-bl${a.i}`} poly={BL} top={front} a={0} edges={edgesOf(BL, [0, 0, 1, 1])} />
      <Flap id={`hf-br${a.i}`} poly={BR} P0={P} n={[1, 0]} a={s.alpha} top={front} under={back} edges={edgesOf(BR, [0, 1, 1, 0])} />
    </>
  ) : (
    <>
      <polygon points={pts(BL)} fill={a.back} />
      <Edges edges={edgesOf(BL, [0, 0, 1, 1])} folded />
    </>
  )
  return (
    <g transform={`translate(${qx} ${qy + s.bob - (lifted ? 6 : 0)}) scale(${s.sc * lift}) rotate(${lifted ? 0 : a.tilt}) translate(${-qx} ${-qy}) translate(${offx} ${offy})`}>
      <rect x={x0 + shadowOff[0]} y={y0 + shadowOff[1]} width={fpR - x0} height={fpB - y0} fill="url(#hatch)" opacity={lifted ? 0.36 : 0.28} />
      <Flap id={`hf-tl${a.i}`} poly={TL} top={front} a={0} edges={edgesOf(TL, [1, 0, 0, 1])} />
      <Flap id={`hf-tr${a.i}`} poly={TR} P0={P} n={[1, 0]} a={s.alpha} top={front} under={back} edges={edgesOf(TR, [1, 1, 0, 0])} />
      <g transform={s.beta ? foldMatrix(P, [0, 1], s.beta) : undefined}>
        {bottom}
        <Shade points={pts([[x0, qy], [x1, qy], [x1, y1], [x0, y1]])} light={faceLight([0, 1], s.beta)} />
      </g>
      {s.label > 0 ? (
        <text x={qx} y={(qy < C ? y0 - 24 : y1 + 42) + 10 * (1 - s.label)} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={650} fontSize={30} letterSpacing="-0.5" fill={INK} opacity={s.label}>
          {a.name}
          {lifted ? <tspan fill={ORANGE}> →</tspan> : null}
        </text>
      ) : null}
      {focus ? (
        <rect x={x0 - 10} y={y0 - 10} width={TILE + 20} height={TILE + 20} rx={8} fill="none" stroke={ORANGE} strokeWidth={3} strokeDasharray="10 8" vectorEffect="non-scaling-stroke" />
      ) : null}
      {s.open ? (
        <rect
          x={x0 - 12} y={qy < C ? y0 - 62 : y0 - 12} width={TILE + 24} height={TILE + 74} fill="transparent"
          role="link" tabIndex={0} aria-label={`Open ${a.name}`} style={{ cursor: 'pointer', outline: 'none' }}
          onClick={onOpen}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
          onPointerEnter={() => onHover(true)} onPointerLeave={() => onHover(false)}
          onFocus={() => onFocus(true)} onBlur={() => onFocus(false)}
        />
      ) : null}
    </g>
  )
}

// ------------------------------------------------------------------ threads
function spokeGeom(a, bob) {
  const dx = a.x - C
  const dy = a.y - C
  const m = Math.hypot(dx, dy)
  const u = [dx / m, dy / m]
  const S = [C + u[0] * 128, C + u[1] * 128]
  const E = [a.x - u[0] * 112, a.y - u[1] * 112 + bob]
  const bend = a.i % 2 ? 18 : -18
  const M = [(S[0] + E[0]) / 2 - u[1] * bend, (S[1] + E[1]) / 2 + u[0] * bend]
  return { S, E, M }
}
const quad = (g, k) => {
  const q = 1 - k
  return [q * q * g.E[0] + 2 * q * k * g.M[0] + k * k * g.S[0], q * q * g.E[1] + 2 * q * k * g.M[1] + k * k * g.S[1]]
}

function Spokes({ t }) {
  return TILES.map((a) => {
    const s = tileState(a, t)
    const g = spokeGeom(a, s ? s.bob : 0)
    const p = easeOut(prog(t, HIT.spokes + a.i * 0.05, HIT.spokes + a.i * 0.05 + 0.28))
    if (p <= 0) return null
    let bk = easeInOut(prog(t, HIT.data + a.i * 0.03, HIT.data + a.i * 0.03 + 0.3))
    const ph = beadPhase(t, a.i)
    if (ph >= 0 && ph < BEAD_TRIP) bk = easeInOut(ph / BEAD_TRIP)
    const bead = bk > 0 && bk < 1 ? quad(g, bk) : null
    return (
      <g key={a.i}>
        <path d={`M ${g.S[0]} ${g.S[1]} Q ${g.M[0]} ${g.M[1]} ${g.E[0]} ${g.E[1]}`} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} vectorEffect="non-scaling-stroke" />
        {bead ? <circle cx={bead[0]} cy={bead[1]} r={10} fill={ORANGE} stroke={INK} strokeWidth={2.2} vectorEffect="non-scaling-stroke" /> : null}
      </g>
    )
  })
}

const SPARKS = [[0, -250, 0], [250, 0, 1], [0, 250, 2], [-250, 0, 3]]

export default function HeroFilm({ className = '' }) {
  const root = useRef(null)
  const [t, restart] = useClock(root, { still: IDLE + 1, delay: 0.25 })
  const [hover, setHover] = useState(-1)
  const [focus, setFocus] = useState(-1)
  const navigate = useNavigate()

  const pose = iconPose(t)
  const dot = dotState(t)
  const homeDot = dot && dot.onIcon ? (
    <g transform={`translate(${LOGO_DOT_CENTRE.x} ${LOGO_DOT_CENTRE.y}) scale(${dot.scale ?? 1}) translate(${-LOGO_DOT_CENTRE.x} ${-LOGO_DOT_CENTRE.y})`}>
      <DotShape x={LOGO_DOT_CENTRE.x} y={LOGO_DOT_CENTRE.y} r={LOGO_DOT_CENTRE.r} colour={dot.colour} sx={dot.sx} sy={dot.sy} />
    </g>
  ) : null
  const home = iconToWorld(pose, [DOT_HOME.x, DOT_HOME.y])

  return (
    <div ref={root} className={`relative ${className}`}>
      <div className="ink-boil">
        <svg viewBox="40 110 1000 880" className="block h-auto w-full overflow-hidden" role="group" aria-label="4TP and its four systems">
          {t > 0 ? (
            <>
              <Trail t={t} />
              <Spokes t={t} />
              {t < HIT.land ? <FallingSheet t={t} /> : (
                <g transform={`translate(${pose.cx} ${pose.cy}) scale(${pose.s}) translate(${-C} ${-C})`}>
                  {t < HIT.tips[0] ? <Blintz t={t} /> : <Octagon t={t} />}
                  <Letters t={t} dot={homeDot} />
                </g>
              )}
              <Impact x={C} y={C} t={t} at={HIT.land} r0={400} len={34} count={18} life={0.34} width={3} skew={0.1} />
              {TILES.map((a) => (
                <Tile
                  key={a.i} a={a} t={t} hover={hover === a.i} focus={focus === a.i}
                  onOpen={() => navigate(`/${a.slug}`)}
                  onHover={(on) => setHover(on ? a.i : -1)}
                  onFocus={(on) => setFocus(on ? a.i : -1)}
                />
              ))}
              {TILES.map((a) => <Impact key={a.i} x={a.x} y={a.y} t={t} at={a.land + 0.02} r0={100} len={20} count={10} life={0.28} width={2.6} skew={a.i} />)}
              <Impact x={home[0]} y={home[1]} t={t} at={HIT.home} r0={24} len={14} count={8} life={0.26} width={2.4} />
              {SPARKS.map(([x, y, j]) => {
                let k = prog(t, HIT.shimmer + j * 0.07, HIT.shimmer + j * 0.07 + 0.42)
                if (t > IDLE + 1) k = prog(mod(t - IDLE - 1 - j * 1.15, 4.6), 0, 0.5)
                return <Sparkle key={j} x={C + x} y={C + y} s={Math.sin(PI * k) * (j % 2 ? 0.75 : 1)} rot={k * 40} />
              })}
              <FlyingDot s={dot} />
            </>
          ) : null}
        </svg>
      </div>
      {t > IDLE ? (
        <button
          type="button"
          onClick={restart}
          className="hand-note absolute bottom-1 right-2 text-lg text-ink-soft transition-colors hover:text-orange-deep lg:bottom-3 lg:right-4 lg:text-xl"
        >
          ↻ fold it again
        </button>
      ) : null}
    </div>
  )
}
