import { prefersReducedMotion } from './a11y'
 codex/create-nulladata-landing-page-p24bat
import { vi, test, expect } from 'vitest'

test('prefersReducedMotion checks media query', () => {
  const mql = {

import { vi } from 'vitest'

test('prefersReducedMotion checks media query', () => {
  const mql: MediaQueryList = {
 main
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
 codex/create-nulladata-landing-page-p24bat
    addListener: vi.fn(),
    removeListener: vi.fn(),
  } as unknown as MediaQueryList

  }
 main
  vi.spyOn(window, 'matchMedia').mockReturnValue(mql)
  expect(prefersReducedMotion()).toBe(true)
})
