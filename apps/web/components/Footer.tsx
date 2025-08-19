import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-nd-surface py-6 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <span className="font-mono text-nd-primary">NullaData</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-nd-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-nd-primary">
            Termini
          </Link>
          <a href="mailto:info@nulladata.com" className="hover:text-nd-primary">
            Contatti
          </a>
        </div>
      </div>
    </footer>
  )
}
