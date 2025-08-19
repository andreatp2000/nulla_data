import { describe, expect, it } from 'vitest'
import { engineLink, mapFindingToRequest } from './deindex'

describe('deindex helper', () => {
  it('maps ScanFinding to request', () => {
    const req = mapFindingToRequest({ url: 'https://example.com' })
    expect(req).toEqual({
      targetUrl: 'https://example.com',
      legalBasis: 'GDPR art.17',
    })
  })

  it('resolves engine link from config', () => {
    const link = engineLink('google')
    expect(link).toMatch(/^https:\/\//)
  })
})
