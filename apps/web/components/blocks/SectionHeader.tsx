interface Props {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-nd-muted">{subtitle}</p>}
    </div>
  )
}
