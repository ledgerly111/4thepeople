// Fold math for paper flaps (a real 3D fold flattened to an affine map) and the 4TP icon.
const R2 = Math.SQRT1_2

export const pts = (P) => P.map((p) => p.join(',')).join(' ')

// A flap folds about the crease through P0; n points from the crease into the flap.
// At angle a its points at distance d from the crease sit d·cos(a) from it.
export function foldMatrix(P0, n, a) {
  const k = 1 - Math.cos(a)
  const dn = n[0] * P0[0] + n[1] * P0[1]
  return `matrix(${1 - k * n[0] * n[0]} ${-k * n[0] * n[1]} ${-k * n[0] * n[1]} ${1 - k * n[1] * n[1]} ${k * dn * n[0]} ${k * dn * n[1]})`
}

export const applyFold = (p, P0, n, a) => {
  const d = n[0] * (p[0] - P0[0]) + n[1] * (p[1] - P0[1])
  const kk = d * (1 - Math.cos(a))
  return [p[0] - n[0] * kk, p[1] - n[1] * kk]
}

export function hull(points) {
  const P = [...points].sort((p, q) => p[0] - q[0] || p[1] - q[1])
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lower = []
  for (const p of P) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
    lower.push(p)
  }
  const upper = []
  for (const p of P.reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
    upper.push(p)
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1))
}

// Light from the top left, a little in front of the page.
const LIGHT = (() => {
  const v = [-0.42, -0.55, 0.72]
  const m = Math.hypot(...v)
  return v.map((x) => x / m)
})()
// How lit a flap's visible face is compared with lying flat (1). dir +1 for a valley
// fold (the flap lifts towards us), -1 for a mountain fold.
export function faceLight(n, a, dir = 1) {
  const s = Math.sin(a)
  const c = Math.cos(a)
  let N = [-dir * n[0] * s, -dir * n[1] * s, c]
  if (c < 0) N = N.map((x) => -x)
  return (N[0] * LIGHT[0] + N[1] * LIGHT[1] + N[2] * LIGHT[2]) / LIGHT[2]
}

// The 4TP icon's folds: a square sheet, its four corners blintz-folded to the centre
// (an orange diamond), the diamond's tips folded behind (an octagon) and the octagon's
// corners folded behind too (a round 16-sided disc).
export function blintzGeometry(C, H) {
  const T = [C, C - H]
  const R = [C + H, C]
  const B = [C, C + H]
  const L = [C - H, C]
  const MID = [C, C]
  const FLAPS = [
    { corner: [C - H, C - H], a: T, b: L, n: [-R2, -R2], P0: T },
    { corner: [C + H, C - H], a: R, b: T, n: [R2, -R2], P0: T },
    { corner: [C + H, C + H], a: B, b: R, n: [R2, R2], P0: R },
    { corner: [C - H, C + H], a: L, b: B, n: [-R2, R2], P0: L },
  ]
  const FACETS = [[MID, T, L], [MID, R, T], [MID, B, R], [MID, L, B]]
  const A = H * R2
  const OCT = [
    [C - (H - A), C - A], [C + (H - A), C - A], [C + A, C - (H - A)], [C + A, C + (H - A)],
    [C + (H - A), C + A], [C - (H - A), C + A], [C - A, C + (H - A)], [C - A, C - (H - A)],
  ]
  const TIPS = [
    { poly: [T, OCT[1], OCT[0]], P0: [C, C - A], n: [0, -1] },
    { poly: [R, OCT[3], OCT[2]], P0: [C + A, C], n: [1, 0] },
    { poly: [B, OCT[5], OCT[4]], P0: [C, C + A], n: [0, 1] },
    { poly: [L, OCT[7], OCT[6]], P0: [C - A, C], n: [-1, 0] },
  ]
  const RV = A / Math.cos(Math.PI / 8)
  const CORNERS = OCT.map((V, i) => {
    const u = [(V[0] - C) / RV, (V[1] - C) / RV]
    const at = (W) => {
      const s = (RV - A) / (RV - ((W[0] - C) * u[0] + (W[1] - C) * u[1]))
      return [V[0] + (W[0] - V[0]) * s, V[1] + (W[1] - V[1]) * s]
    }
    const p = at(OCT[(i + 7) % 8])
    const q = at(OCT[(i + 1) % 8])
    return { poly: [V, q, p], P0: [C + u[0] * A, C + u[1] * A], n: u }
  })
  const DISC = CORNERS.flatMap((c) => [c.poly[2], c.poly[1]])
  return { C, H, A, T, R, B, L, MID, FLAPS, FACETS, OCT, TIPS, CORNERS, DISC }
}
