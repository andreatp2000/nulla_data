import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { renderRequest } from '@/lib/dsar'
import fs from 'node:fs/promises'
import path from 'node:path'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reqRec = await prisma.request.findUnique({
    where: { id: params.id },
    include: { case: true },
  })
  if (!reqRec) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const profile = await prisma.clientProfile.findUnique({
    where: { userId: reqRec.case.userId },
    include: { user: true },
  })
  if (!profile) return NextResponse.json({ error: 'profile' }, { status: 400 })
  const pdf = await renderRequest(reqRec.kind, {
    customer: { name: profile.user.name, email: profile.user.email },
    target: { url: reqRec.payload.targetUrl },
    legal: { basis: reqRec.legalBasis || 'GDPR art.17' },
    response: { windowDays: 30 },
    case: { id: reqRec.caseId },
  })
  const dir = '/var/data/requests'
  await fs.mkdir(dir, { recursive: true })
  const file = path.join(dir, `${reqRec.id}.pdf`)
  await fs.writeFile(file, pdf)
  await prisma.request.update({
    where: { id: reqRec.id },
    data: { pdfPath: file },
  })
  return new NextResponse(pdf, {
    headers: { 'Content-Type': 'application/pdf' },
  })
}
