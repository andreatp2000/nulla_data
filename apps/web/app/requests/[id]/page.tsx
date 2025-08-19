import { AppLayout } from '@/components/layout/AppLayout'

export default function RequestDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const requestId = params.id
  return (
    <AppLayout>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Request {requestId}</h1>
        <p>TODO: request detail</p>
      </div>
    </AppLayout>
  )
}
