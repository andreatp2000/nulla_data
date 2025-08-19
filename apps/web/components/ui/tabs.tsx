'use client'
import { createContext, useContext, useState } from 'react'

type TabsCtx = { value: string; setValue: (v: string) => void }
const TabsContext = createContext<TabsCtx | null>(null)

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string
  children: React.ReactNode
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div role="tablist" className="flex gap-2 border-b mb-4">
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')
  const active = ctx.value === value
  return (
    <button
      role="tab"
      aria-selected={active}
      className={`px-3 py-1 ${active ? 'border-b-2 border-nd-primary' : ''}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  const ctx = useContext(TabsContext)
  if (!ctx || ctx.value !== value) return null
  return (
    <div role="tabpanel" className="mt-4">
      {children}
    </div>
  )
}
