interface SkeletonProps {
  className?: string
  count?: number
}

function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`} />
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 space-y-3 ${className}`}>
      <SkeletonLine className="h-6 w-1/3" />
      <SkeletonLine className="h-4 w-full" />
      <SkeletonLine className="h-4 w-5/6" />
    </div>
  )
}

export function SkeletonAccountDetails() {
  return (
    <div className="space-y-6">
      <SkeletonCard className="col-span-2" />
      <div className="grid grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonCard />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonLine key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100 flex gap-4">
          {[1, 2, 3, 4].map((j) => (
            <SkeletonLine key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonGrid({ cols = 3, items = 6 }: { cols?: number; items?: number }) {
  return (
    <div className={`grid grid-cols-${cols} gap-4`}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
