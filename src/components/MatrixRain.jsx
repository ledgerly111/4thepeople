import { useEffect, useRef } from 'react'

const GLYPHS = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ4TP#$%*+<>'

export default function MatrixRain({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let disposed = false
    let cols = []
    let cell = 14
    let colsCount = 0
    let rowsCount = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const cssW = Math.max(1, canvas.clientWidth)
      const cssH = Math.max(1, canvas.clientHeight)
      canvas.width = Math.floor(cssW * dpr)
      canvas.height = Math.floor(cssH * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = cssW < 640 ? 13 : 15
      colsCount = Math.max(8, Math.floor(cssW / cell))
      rowsCount = Math.max(6, Math.floor(cssH / cell))
      cols = Array.from({ length: colsCount }, (_, i) => ({
        x: i,
        y: Math.random() * rowsCount,
        speed: 0.18 + Math.random() * 0.42,
        length: 8 + Math.floor(Math.random() * 12),
      }))
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, cssW, cssH)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const draw = () => {
      if (disposed) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.fillStyle = 'rgba(5,5,5,0.18)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `600 ${Math.floor(cell * 0.78)}px "IBM Plex Mono", ui-monospace, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'

      cols.forEach((col) => {
        for (let i = 0; i < col.length; i += 1) {
          const row = Math.floor(col.y - i)
          if (row < -1 || row > rowsCount + 1) continue
          const glyph = GLYPHS[(col.x * 13 + row * 7 + i * 3) % GLYPHS.length]
          const t = i / col.length
          if (i === 0) {
            ctx.fillStyle = '#f6f3e4'
          } else {
            const a = (1 - t) * 0.85
            ctx.fillStyle = `rgba(255, 117, 31, ${a})`
          }
          ctx.fillText(glyph, (col.x + 0.5) * cell, row * cell)
        }
        if (!reduce) {
          col.y += col.speed
          if (col.y - col.length > rowsCount + 2) {
            col.y = -Math.random() * 6
            col.speed = 0.18 + Math.random() * 0.42
            col.length = 8 + Math.floor(Math.random() * 12)
          }
        }
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
