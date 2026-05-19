interface BadgeProps {
  score: number;
}

export default function Badge({ score }: BadgeProps) {
  let bgColor = 'bg-green-100 text-green-700 border-green-200';
  
  if (score > 80) {
    bgColor = 'bg-red-100 text-red-700 border-red-200';
  } else if (score >= 60) {
    bgColor = 'bg-amber-100 text-amber-700 border-amber-200';
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${bgColor}`}>
      Risk {score}
    </span>
  )
}
