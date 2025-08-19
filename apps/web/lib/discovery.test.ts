import { describe, it, expect } from 'vitest'
import { normalizeFindings, dedupeFindings, RawFinding } from './discovery'

const samples: RawFinding[] = [
  { url: 'https://example.com/a', title: ' A ', snippet: 'test' },
  { url: 'https://example.com/a', title: 'dup', snippet: 'dup' },
  { url: 'invalid', title: 'bad' },
]

describe('normalizeFindings', () => {
  it('normalizes url and domain', () => {
    const norm = normalizeFindings(samples)
    expect(norm[0]).toMatchObject({
      url: 'https://example.com/a',
      domain: 'example.com',
      title: 'A',
      snippet: 'test',
    })
  })
})

describe('dedupeFindings', () => {
  it('removes duplicate urls', () => {
    const norm = normalizeFindings(samples)
    const deduped = dedupeFindings(norm)
    expect(deduped.length).toBe(1)
  })
})
