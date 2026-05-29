interface BadgeProps {
  score: number;
}

export default function Badge({ score }: BadgeProps) {
  // High risk: red, Medium risk: secondary/dark red, Low risk: blue
  let bgColor = 'bg-palette-blue text-text-secondary';
  
  if (score > 80) {
    bgColor = 'bg-palette-red text-text-secondary';
  } else if (score >= 60) {
    bgColor = 'bg-bg-secondary text-text-secondary';
  }

  return (
    <span className={`px-2 py-0.5 rounded-md text-size3 font-semibold border ${bgColor}`}>
      Risk {score}
    </span>
  )
}
