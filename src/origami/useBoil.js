import { useEffect } from 'react'
import { reducedMotion } from './motion'

// Re-rolls the ink filters' turbulence so every boiled outline redraws its wobble.
export function useBoil(fps = 8) {
  useEffect(() => {
    if (reducedMotion()) return undefined
    const nodes = document.querySelectorAll('feTurbulence[data-boil]')
    let seed = 1
    const id = window.setInterval(() => {
      if (document.hidden) return
      seed = (seed % 97) + 1
      nodes.forEach((node) => node.setAttribute('seed', String(seed)))
    }, 1000 / fps)
    return () => window.clearInterval(id)
  }, [fps])
}
