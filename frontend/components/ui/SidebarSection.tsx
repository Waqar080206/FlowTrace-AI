'use client'

import { useState } from 'react'

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  collapsed?: boolean
  defaultOpen?: boolean
}

export default function SidebarSection({ title, children, collapsed = false, defaultOpen = true }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  if (collapsed) {
    return <div className="space-y-1">{children}</div>
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-size3 uppercase font-semibold text-text-text5 hover:text-text-text4 transition-colors"
      >
        <span>{title}</span>
        <i className={`ti ti-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      {isOpen && <div className="space-y-1 mt-2">{children}</div>}
    </div>
  )
}
