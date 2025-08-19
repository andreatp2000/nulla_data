import { NextRequest, NextResponse } from 'next/server'
import { createRequestSchema, computeDueAt } from '../../../../../lib/dsar'
import { prisma } from '../../../../../lib/prisma'

function legalBasis(kind: string) {
  switch (kind) {
    case 'GDPR_ERASURE':
      return 'GDPR art.17'
    case 'CCPA_DELETE':
      return 'CCPA 1798.105'
    case 'DEINDEX':
      return 'GDPR art.17'
    default:
      return ''
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const body = createRequestSchema.parse(await req.json())
  const c = await prisma.case.findUnique({
    where: { id: params.caseId },
    include: { user: { include: { clientProfile: true } } },
  })
  if (!c) {
    return NextResponse.json({ error: 'case not found' }, { status: 404 })
  }
  if (body.attachIdDoc && c.user.clientProfile?.kycStatus !== 'VERIFIED') {
    return NextResponse.json({ error: 'KYC required' }, { status: 400 })
  }
  const request = await prisma.request.create({
    data: {
      caseId: c.id,
      kind: body.kind,
      legalBasis: legalBasis(body.kind),
      recipientEmail: body.recipientEmail,
      recipientName: body.recipientName,
      payload: { targetUrl: body.targetUrl, notes: body.notes },
      dueAt: computeDueAt(),
    },
  })
  await prisma.auditLog.create({
    data: {
      caseId: c.id,
      action: 'REQUEST_CREATE',
      details: { requestId: request.id },
    },
  })
  return NextResponse.json(request)
}
