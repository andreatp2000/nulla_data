interface FAQItemProps {
  q: string
  a: string
}

export function FAQItem({ q, a }: FAQItemProps) {
  return (
    <details className="rounded border border-nd-surface p-4">
      <summary className="cursor-pointer font-medium">{q}</summary>
      <p className="mt-2 text-sm text-nd-muted">{a}</p>
    </details>
  )
}
