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
    <div className="border-b bg-gray-100 flex gap-1 px-4 pt-2">
      {tabs.map(tab => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium ${
              isActive
                ? 'bg-white text-blue-900 border-x border-t'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
