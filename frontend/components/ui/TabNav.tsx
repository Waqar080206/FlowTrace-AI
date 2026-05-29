"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabNav() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Overview', href: '/dashboard/overview' },
    { name: 'Graph Explorer', href: '/dashboard/graph' },
    { name: 'Temporal Replay', href: '/dashboard/replay' },
    { name: 'Fraud Story Engine', href: '/dashboard/story' },
    { name: 'FIU Reports', href: '/dashboard/fiu' },
  ]

  return (
    <div className="border-b bg-bg-primary flex gap-1 px-4 pt-2 border-palette-light-gray">
      {tabs.map(tab => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`rounded-md px-4 py-2 text-size6 font-semibold font-poppins transition-all ${
              isActive
                ? 'bg-bg-bg4 text-text-secondary border-b-2 border-bg-bg4'
                : 'text-text-text5 hover:text-text-text4'
            }`}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
