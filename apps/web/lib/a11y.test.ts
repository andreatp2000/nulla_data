import { prefersReducedMotion } from './a11y'
import { vi } from 'vitest'

test('prefersReducedMotion checks media query', () => {
  const mql: MediaQueryList = {
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
  vi.spyOn(window, 'matchMedia').mockReturnValue(mql)
  expect(prefersReducedMotion()).toBe(true)
})
