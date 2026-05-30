"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabNav() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Overview', shortName: 'Overview', href: '/dashboard/overview' },
    { name: 'Graph Explorer', shortName: 'Graph', href: '/dashboard/graph' },
    { name: 'Temporal Replay', shortName: 'Replay', href: '/dashboard/replay' },
    { name: 'Fraud Story Engine', shortName: 'Story', href: '/dashboard/story' },
    { name: 'FIU Reports', shortName: 'FIU', href: '/dashboard/fiu' },
  ]

  return (
    <div className="border-b bg-bg-primary border-palette-light-gray overflow-x-auto scrollbar-thin max-w-full">
      <div className="flex flex-nowrap gap-1 px-3 sm:px-4 pt-2 pb-0 w-max min-w-full sm:w-auto">
        {tabs.map(tab => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`shrink-0 rounded-md px-3 sm:px-4 py-2 text-size5 sm:text-size6 font-semibold font-poppins transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-bg-bg4 text-text-secondary border-b-2 border-bg-bg4'
                  : 'text-text-text5 hover:text-text-text4'
              }`}
            >
              <span className="sm:hidden">{tab.shortName}</span>
              <span className="hidden sm:inline">{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
