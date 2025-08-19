import { describe, it, expect } from 'vitest'
import { createRequestSchema, renderRequest } from './dsar'

describe('createRequestSchema', () => {
  it('validates basic payload', () => {
    const data = {
      kind: 'GDPR_ERASURE',
      targetUrl: 'https://example.com',
      recipientEmail: 'test@example.com',
    }
    expect(() => createRequestSchema.parse(data)).not.toThrow()
  })
})

describe('renderRequest', () => {
  it('renders template to pdf', async () => {
    const buf = await renderRequest('GDPR_ERASURE', {
      customer: { name: 'Mario', email: 'mario@example.com' },
      target: { url: 'https://example.com' },
      legal: { basis: 'GDPR art.17' },
      response: { windowDays: 30 },
      case: { id: 'case1' },
    })
    expect(buf.subarray(0, 4).toString()).toBe('%PDF')
  })
})
