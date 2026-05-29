'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarLinkProps {
  href: string
  label: string
  icon: string
  collapsed?: boolean
}

export default function SidebarLink({ href, label, icon, collapsed = false }: SidebarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive
          ? 'bg-bg-secondary text-text-primary border-l-4 border-bg-bg4'
          : 'text-text-text5 hover:text-text-text4 hover:bg-bg-secondary'
      }`}
      title={collapsed ? label : undefined}
    >
      <i className={`ti ${icon} text-size7`}></i>
      {!collapsed && <span className="text-size6 font-poppins font-medium">{label}</span>}
    </Link>
  )
}
