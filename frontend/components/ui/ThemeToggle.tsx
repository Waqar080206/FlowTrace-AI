'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  collapsed?: boolean
}

export default function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 w-full"
        aria-label="Toggle theme"
        disabled
      >
        <i className="ti ti-sun text-size7"></i>
        {!collapsed && <span className="text-size6 font-poppins font-medium">Theme</span>}
      </button>
    )
  }

  const isDark = (resolvedTheme ?? theme) === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 hover:text-text-text4 hover:bg-bg-secondary transition-all w-full"
      title={collapsed ? (isDark ? 'Light mode' : 'Dark mode') : undefined}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={`ti ${isDark ? 'ti-sun' : 'ti-moon'} text-size7`}></i>
      {!collapsed && (
        <span className="text-size6 font-poppins font-medium">{isDark ? 'Light mode' : 'Dark mode'}</span>
      )}
    </button>
  )
}
