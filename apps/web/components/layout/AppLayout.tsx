import type { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
