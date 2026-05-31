import Card from '../ui/Card'

interface PatternTag {
  emoji: string
  label: string
  detail?: string
}

interface PatternTagsProps {
  patterns: PatternTag[]
}

export default function PatternTags({ patterns }: PatternTagsProps) {
  return (
    <Card title="Fraud Patterns Detected">
      {patterns.length === 0 ? (
        <p className="text-text-text5 text-size6">No suspicious patterns detected in this network.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {patterns.map((pattern, idx) => (
            <div
              key={idx}
              className="px-3 py-2 bg-bg-secondary text-text-primary rounded-lg text-size5 sm:text-size6 font-semibold font-poppins flex items-center gap-2 hover:bg-palette-red hover:text-text-secondary transition-colors break-words"
              title={pattern.detail}
            >
              <span>{pattern.emoji}</span>
              <span>
                {pattern.label} {pattern.detail && <span className="font-normal text-text-text5">{pattern.detail}</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
