import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(['general', 'erasure', 'deindex', 'incident', 'other']).default('general'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  caseId: z.string().optional(),
})

export async function POST(req: Request) {
  const token = await getToken({ req })
  if (!token?.sub) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const json = await req.json()
  const data = createSchema.parse(json)
  const code = `T-${new Date().getFullYear()}-${Math.floor(Math.random() * 1e6)
    .toString()
    .padStart(6, '0')}`

  const ticket = await prisma.ticket.create({
    data: {
      code,
      title: data.title,
      description: data.description,
      type: data.type,
      priority: data.priority,
      requesterId: token.sub,
      caseId: data.caseId,
    },
  })

  await prisma.auditLog.create({
    data: {
      action: 'TICKET_CREATE',
      actorUserId: token.sub,
      details: { ticketId: ticket.id },
    },
  })

  return NextResponse.json(ticket)
}
