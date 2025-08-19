import { NextRequest, NextResponse } from 'next/server'
import { createRequestSchema, calcDueAt } from '@/lib/dsar'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const body = await req.json()
  const parsed = createRequestSchema.parse(body)
  const created = await prisma.request.create({
    data: {
      caseId: params.caseId,
      kind: parsed.kind,
      payload: parsed,
      recipientEmail: parsed.recipientEmail,
      recipientName: parsed.recipientName,
      dueAt: calcDueAt(),
    },
  })
  await prisma.auditLog.create({
    data: {
      caseId: params.caseId,
      action: 'REQUEST_CREATE',
      details: { requestId: created.id },
    },
  })
  return NextResponse.json({ id: created.id })
}
