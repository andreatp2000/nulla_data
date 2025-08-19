import { NextRequest, NextResponse } from 'next/server'
import { dsarQueue } from '@/jobs/dsar'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dsarQueue.add('send', { id: params.id })
  return NextResponse.json({ queued: true })
}
