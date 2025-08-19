'use client'
import { motion, useReducedMotion } from 'framer-motion'

export function DataStreamSVG() {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      aria-hidden
      className="absolute inset-x-0 top-1/2 -z-10 h-40 w-full opacity-30"
      viewBox="0 0 400 100"
    >
      <defs>
        <linearGradient id="stream" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--nd-secondary)" />
          <stop offset="100%" stopColor="var(--nd-primary)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 50 C100 20 300 80 400 50"
        stroke="url(#stream)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="200"
        animate={reduce ? undefined : { strokeDashoffset: [-200, 0] }}
        transition={
          reduce ? undefined : { repeat: Infinity, duration: 5, ease: 'linear' }
        }
      />
    </motion.svg>
  )
}
