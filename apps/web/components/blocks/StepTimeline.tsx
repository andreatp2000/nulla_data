interface Step {
  title: string
  text: string
}

interface Props {
  steps: Step[]
}

export function StepTimeline({ steps }: Props) {
  return (
    <ol className="space-y-6">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nd-primary text-black">
            {i + 1}
          </div>
          <div>
            <h4 className="font-semibold">{s.title}</h4>
            <p className="text-sm text-nd-muted">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
