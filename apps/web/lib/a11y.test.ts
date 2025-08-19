import { prefersReducedMotion } from './a11y'
import { vi, test, expect } from 'vitest'

test('prefersReducedMotion checks media query', () => {
  const mql: MediaQueryList = {
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  } as unknown as MediaQueryList

  vi.spyOn(window, 'matchMedia').mockReturnValue(mql)
  expect(prefersReducedMotion()).toBe(true)
})
