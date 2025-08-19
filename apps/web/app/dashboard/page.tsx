/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions as any)) as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session?.user as any)?.role

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {role === 'client' ? <p>Client area</p> : <p>Management area</p>}
    </div>
  )
}
