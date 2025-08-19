import { describe, it, expect } from 'vitest'
import { normalizeDiscovery } from './normalize'

describe('normalizeDiscovery', () => {
  it('trims and lowercases input', () => {
    expect(normalizeDiscovery(' Hello ')).toBe('hello')
  })
})
