import Card from '../ui/Card'

interface StoryBoxProps {
  narrative: string
  isLoading: boolean
}

export default function StoryBox({ narrative, isLoading }: StoryBoxProps) {
  return (
    <Card title="AI-Generated Fraud Narrative" className="min-h-[400px]">
      <div className="prose prose-sm max-w-none">
        <p className="text-text-primary text-size6 leading-relaxed whitespace-pre-wrap">
          {isLoading ? (
            <span className="text-text-text5 italic">
              <span className="inline-block animate-pulse">Generating narrative</span>
              <span className="inline-block animate-pulse ml-1">.</span>
              <span className="inline-block animate-pulse ml-1">.</span>
              <span className="inline-block animate-pulse ml-1">.</span>
            </span>
          ) : (
            narrative
          )}
          {!isLoading && narrative && <span className="animate-pulse ml-1">|</span>}
        </p>
      </div>
    </Card>
  )
}
