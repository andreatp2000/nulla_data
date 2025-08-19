import Link from 'next/link'

const ctaClasses =
  'rounded bg-nd-primary px-4 py-2 text-black hover:bg-nd-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nd-ring'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-nd-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-mono text-xl text-nd-primary">
          NullaData
        </Link>
        <Link href="/dashboard" className={ctaClasses}>
          Inizia ora
        </Link>
      </div>
    </nav>
  )
}
