import type { ReactNode } from 'react'

type BadgeLevel = 'high' | 'medium' | 'low'

interface BadgeProps {
  score?: number
  level?: BadgeLevel
  children?: ReactNode
}

export default function Badge({ score, level, children }: BadgeProps) {
  const resolvedLevel =
    level ??
    (score !== undefined
      ? score > 80
        ? 'high'
        : score >= 60
        ? 'medium'
        : 'low'
      : 'low')

  let bgColor = 'bg-palette-blue text-text-secondary';
  
  if (resolvedLevel === 'high') {
    bgColor = 'bg-palette-red text-text-secondary';
  } else if (resolvedLevel === 'medium') {
    bgColor = 'bg-bg-secondary text-text-secondary';
  }

  return (
    <span className={`px-2 py-0.5 rounded-md text-size3 font-semibold border ${bgColor}`}>
      {children ?? `Risk ${score}`}
    </span>
  )
}
