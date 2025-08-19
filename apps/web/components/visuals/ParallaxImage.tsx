'use client'
import Image, { ImageProps } from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

export function ParallaxImage(props: ImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const reduce = useReducedMotion()
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : y }}>
        <Image {...props} alt={props.alt} />
      </motion.div>
    </div>
  )
}
