import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { renderPdf } from '../../../../../lib/dsar'
import fs from 'node:fs'
import path from 'node:path'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const request = await prisma.request.findUnique({
    where: { id: params.id },
    include: { case: { include: { user: true } } },
  })
  if (!request) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  const payload = request.payload as { targetUrl: string }
  const pdf = await renderPdf(request.kind, {
    customer: {
      name: request.case.user.name,
      email: request.case.user.email,
    },
    target: { url: payload.targetUrl },
    legal: { basis: request.legalBasis },
    response: { windowDays: 30 },
    case: { id: request.caseId },
    recipientName: request.recipientName,
  })
  const pdfPath = path.join('/var/data/requests', `${request.id}.pdf`)
  await fs.promises.mkdir(path.dirname(pdfPath), { recursive: true })
  await fs.promises.writeFile(pdfPath, pdf)
  await prisma.request.update({ where: { id: request.id }, data: { pdfPath } })
  return new NextResponse(pdf as unknown as BodyInit, {
    headers: { 'Content-Type': 'application/pdf' },
  })
}
