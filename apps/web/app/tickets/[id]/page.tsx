import { AppLayout } from '@/components/layout/AppLayout'

export default function TicketDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const ticketId = params.id
  return (
    <AppLayout>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Ticket {ticketId}</h1>
        <p>TODO: ticket detail</p>
      </div>
    </AppLayout>
  )
}
