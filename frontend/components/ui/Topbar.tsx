'use client'

import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-bg-primary px-3 sm:px-4 border-palette-light-gray shadow-sm min-w-0">
      <div className="flex items-center gap-2 min-w-0">
        <Image
          src="/logo.png"
          alt="FlowTrace AI Logo"
          width={32}
          height={32}
          className="rounded-md shrink-0"
        />
        <span className="text-size7 sm:text-size8 font-bold font-poppins text-text-primary truncate">
          <span className="sm:hidden">FlowTrace</span>
          <span className="hidden sm:inline">FlowTrace AI</span>
        </span>
        <span className="shrink-0 rounded-full bg-palette-red px-2 py-0.5 text-size3 font-semibold text-text-secondary border border-palette-red">
          LIVE
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 text-size5 sm:text-size6 font-poppins shrink-0">
        <span className="hidden md:inline font-medium text-text-text4">Union Bank CBS</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-palette-blue"></div>
          <span className="hidden sm:inline text-text-text5">Connected</span>
        </div>
        <div className="lg:hidden">
          <ThemeToggle collapsed />
        </div>
      </div>
    </header>
  )
}
