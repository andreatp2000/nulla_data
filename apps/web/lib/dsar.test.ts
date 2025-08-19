import { describe, expect, it } from 'vitest'
import { createRequestSchema, renderPdf, sendEmail } from './dsar'

describe('dsar utils', () => {
  it('validates request body', () => {
    expect(() =>
      createRequestSchema.parse({
        kind: 'GDPR_ERASURE',
        targetUrl: 'https://example.com',
        recipientEmail: 'test@example.com',
      })
    ).not.toThrow()
    expect(() =>
      createRequestSchema.parse({
        kind: 'GDPR_ERASURE',
        targetUrl: 'bad-url',
        recipientEmail: 'not-an-email',
      })
    ).toThrow()
  })

  it('renders pdf', async () => {
    const buf = await renderPdf('GDPR_ERASURE', {
      recipientName: 'Org',
      customer: { name: 'Alice', email: 'alice@example.com' },
      target: { url: 'https://example.com' },
      legal: { basis: 'GDPR art.17' },
      response: { windowDays: 30 },
      case: { id: '123' },
    })
    expect(buf.length).toBeGreaterThan(0)
  })

  it('sends email', async () => {
    await expect(
      sendEmail({
        to: 'test@example.com',
        subject: 'hi',
        text: 'body',
      })
    ).resolves.toBeUndefined()
  })
})
