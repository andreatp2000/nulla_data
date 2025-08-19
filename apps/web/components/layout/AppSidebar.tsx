import Link from 'next/link'

const linkClasses = 'block rounded px-3 py-2 text-sm hover:bg-neutral-800'

export function AppSidebar() {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/cases', label: 'Cases' },
    { href: '/requests', label: 'Requests' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <aside className="w-48 border-r border-neutral-800">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={linkClasses}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
