interface PricingCardProps {
  title: string
  price: string
  features: string[]
  highlight?: boolean
}

const buttonClasses =
  'rounded bg-nd-primary py-2 text-black hover:bg-nd-secondary focus-visible:outline-none focus-visible:' +
  'ring-2 focus-visible:ring-nd-ring'

export function PricingCard({
  title,
  price,
  features,
  highlight,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 ${highlight ? 'border-nd-primary' : 'border-nd-surface'} flex flex-col`}
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-3xl font-bold">{price}</p>
      <ul className="mb-6 flex-1 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <button className={buttonClasses}>Scegli</button>
    </div>
  )
}
