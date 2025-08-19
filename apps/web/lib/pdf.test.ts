import { describe, it, expect } from 'vitest'
import { createPdf } from './pdf'

// basic check that PDF buffer starts with %PDF

describe('createPdf', () => {
  it('creates a PDF buffer', async () => {
    const buf = await createPdf('hello')
    expect(buf.subarray(0, 4).toString()).toBe('%PDF')
  })
})
