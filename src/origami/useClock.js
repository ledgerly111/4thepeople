import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from './motion'

// Seconds since the scene started, ticking only while `ref` is on screen. With
// reduced motion it stays at `still`. restart() runs the scene again from 0.
export function useClock(ref, { still = 0, delay = 0 } = {}) {
  const [t, setT] = useState(() => (reducedMotion() ? still : -delay))
  const elapsed = useRef(-delay)

  useEffect(() => {
    if (reducedMotion()) return undefined
    let raf = 0
    let last = 0
    let visible = true
    const frame = (now) => {
      if (last) elapsed.current += Math.min(0.05, (now - last) / 1000)
      last = now
      setT(elapsed.current)
      raf = window.requestAnimationFrame(frame)
    }
    const start = () => {
      if (raf) return
      last = 0
      raf = window.requestAnimationFrame(frame)
    }
    const stop = () => {
      window.cancelAnimationFrame(raf)
      raf = 0
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !document.hidden) start()
      else stop()
    })
    if (ref.current) io.observe(ref.current)
    const onVisibility = () => (document.hidden || !visible ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ref])

  const restart = () => {
    elapsed.current = 0
  }
  return [t, restart]
}
