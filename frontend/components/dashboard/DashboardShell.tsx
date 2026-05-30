'use client'

import type { ReactNode } from 'react'
import TabNav from '../ui/TabNav'
import { useSidebar } from '../ui/SidebarContext'

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar()

  return (
    <main
      className={`min-h-screen bg-bg-primary flex flex-col min-w-0 overflow-x-hidden transition-[margin] duration-300 ml-0 ${
        collapsed ? 'lg:ml-16' : 'lg:ml-56'
      }`}
    >
      <TabNav />
      <div className="flex-1 p-4 sm:p-6 min-w-0 pb-20 lg:pb-6 [&_h1]:text-size7 [&_h1]:sm:text-size8 [&_h1]:lg:text-size9">
        {children}
      </div>
    </main>
  )
}
