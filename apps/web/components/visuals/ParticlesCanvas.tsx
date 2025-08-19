'use client'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/a11y'

export function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }))
    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      particles.forEach((p) => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI)
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10"
      width={800}
      height={600}
    />
  )
}
