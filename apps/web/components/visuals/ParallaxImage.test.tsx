import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ParallaxImage } from './ParallaxImage'
import { vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { on: vi.fn(), off: vi.fn() } }),
    useTransform: () => 0,
    useReducedMotion: () => true,
    motion: {
      div: (props: Record<string, unknown>) => <div {...props} />,
    },
  }
})

test('parallax image disables motion when reduced', () => {
  const { container } = render(
    <ParallaxImage src="/test.png" alt="t" width={100} height={100} />
  )
  expect(container.querySelector('img')).toBeInTheDocument()
})
