// Palette and easing shared with the 4TP origami film (4tp-video/src/origami).
export const PAPER = '#f2ebdc'
export const SHEET = '#fbf6ea'
export const CREAM = '#f6f3e4'
export const INK = '#241f1b'
export const ORANGE = '#ff751f'
export const EMBER = '#a9440a'
export const LOGO_INK = '#2c2e39'
// The four faces of a folded diamond, lit from the top left.
export const FACET = ['#ff8d42', '#fe7b29', '#ea6411', '#f6721f']

export const clamp01 = (x) => Math.min(1, Math.max(0, x))
export const prog = (t, a, b) => clamp01((t - a) / (b - a))
export const easeOut = (x) => 1 - (1 - x) ** 3
export const easeIn = (x) => x ** 3
export const easeInOut = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2)
export const backOut = (x, s = 1.9) => 1 + (s + 1) * (x - 1) ** 3 + s * (x - 1) ** 2
export const lerp = (a, b, x) => a + (b - a) * x
// A quick swell and settle after t0, 0 outside.
export const bump = (t, t0, len = 0.28) => {
  const x = (t - t0) / len
  return x < 0 || x > 1 ? 0 : Math.sin(Math.PI * x) * (1 - x)
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
