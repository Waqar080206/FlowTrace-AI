'use client'

import { useState } from 'react'
import SidebarLink from './SidebarLink'
import SidebarSection from './SidebarSection'
import SidebarCaseItem from './SidebarCaseItem'

const RECENT_CASES = [
  { id: 'CR-0847', type: 'Circular transaction', risk: 94 },
  { id: 'ST-0291', type: 'Structuring ₹48K', risk: 88 },
  { id: 'DA-0134', type: 'Dormant abuse', risk: 79 },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed left-0 top-14 bottom-0 bg-bg-primary border-r border-palette-light-gray transition-all duration-300 overflow-y-auto ${
          collapsed ? 'w-16' : 'w-56'
        } hidden lg:flex flex-col z-40`}
      >
        {/* Collapse/expand button */}
        <div className="p-3 border-b border-palette-light-gray">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i className={`ti ti-layout-sidebar-right text-size7 text-text-primary ${collapsed ? 'rotate-180' : ''}`}></i>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {/* Investigation section */}
          <SidebarSection title="Investigation" collapsed={collapsed}>
            <SidebarLink href="/dashboard/overview" label="Overview" icon="ti-layout-dashboard" collapsed={collapsed} />
            <SidebarLink href="/dashboard/graph" label="Graph explorer" icon="ti-topology-star" collapsed={collapsed} />
            <SidebarLink href="/dashboard/replay" label="Temporal replay" icon="ti-player-play" collapsed={collapsed} />
            <SidebarLink href="/dashboard/story" label="Fraud story engine" icon="ti-message-chatbot" collapsed={collapsed} />
            <SidebarLink href="/dashboard/fiu" label="FIU reports" icon="ti-file-check" collapsed={collapsed} />
          </SidebarSection>

          {/* Cases section */}
          {!collapsed && (
            <SidebarSection title="Recent cases" defaultOpen={true}>
              {RECENT_CASES.map((c) => (
                <SidebarCaseItem key={c.id} caseId={c.id} type={c.type} risk={c.risk} collapsed={collapsed} />
              ))}
              <button className="w-full text-left px-4 py-2 text-size5 text-text-text3 hover:text-text-text4 transition-colors">
                View all cases →
              </button>
            </SidebarSection>
          )}

          {/* Tools section */}
          <SidebarSection title="Tools" collapsed={collapsed}>
            <div
              className="px-4 py-3 rounded-lg text-size5 text-text-text5 flex items-center gap-3"
              title="Coming soon"
            >
              <i className="ti ti-search text-size7"></i>
              {!collapsed && (
                <>
                  <span>Account lookup</span>
                  <span className="ml-auto text-size4 bg-bg-secondary px-1.5 py-0.5 rounded">Soon</span>
                </>
              )}
            </div>
            <div className="px-4 py-3 rounded-lg text-size5 text-text-text5 flex items-center gap-3" title="Coming soon">
              <i className="ti ti-network text-size7"></i>
              {!collapsed && (
                <>
                  <span>Path finder</span>
                  <span className="ml-auto text-size4 bg-bg-secondary px-1.5 py-0.5 rounded">Soon</span>
                </>
              )}
            </div>
            <div className="px-4 py-3 rounded-lg text-size5 text-text-text5 flex items-center gap-3" title="Coming soon">
              <i className="ti ti-report-analytics text-size7"></i>
              {!collapsed && (
                <>
                  <span>Batch scorer</span>
                  <span className="ml-auto text-size4 bg-bg-secondary px-1.5 py-0.5 rounded">Soon</span>
                </>
              )}
            </div>
          </SidebarSection>

          {/* Reports section */}
          <SidebarSection title="Reports" collapsed={collapsed}>
            <SidebarLink href="/dashboard/fiu" label="FIU submissions" icon="ti-file-text" collapsed={collapsed} />
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 hover:text-text-text4 hover:bg-bg-secondary transition-all w-full"
              title={collapsed ? 'Export data' : undefined}
            >
              <i className="ti ti-download text-size7"></i>
              {!collapsed && <span className="text-size6 font-poppins font-medium">Export data</span>}
            </button>
          </SidebarSection>
        </div>

        {/* System section (pinned to bottom) */}
        <div className="border-t border-palette-light-gray p-2 space-y-1">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 hover:text-text-text4 hover:bg-bg-secondary transition-all w-full"
            title={collapsed ? 'Settings' : undefined}
          >
            <i className="ti ti-settings text-size7"></i>
            {!collapsed && <span className="text-size6 font-poppins font-medium">Settings</span>}
          </button>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 hover:text-text-text4 hover:bg-bg-secondary transition-all w-full"
            title={collapsed ? 'Help' : undefined}
          >
            <i className="ti ti-help text-size7"></i>
            {!collapsed && <span className="text-size6 font-poppins font-medium">Help</span>}
          </button>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-text5 hover:text-text-text4 hover:bg-bg-secondary transition-all w-full"
            title={collapsed ? 'Profile' : undefined}
          >
            <i className="ti ti-user text-size7"></i>
            {!collapsed && <span className="text-size6 font-poppins font-medium">Investigator</span>}
          </button>
        </div>
      </aside>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 p-3 bg-bg-bg4 text-text-secondary rounded-full shadow-lg lg:hidden z-50"
      >
        <i className="ti ti-menu-2 text-size8"></i>
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="fixed left-0 top-14 bottom-0 w-64 bg-bg-primary shadow-lg overflow-y-auto lg:hidden z-40">
            <div className="p-4 space-y-4">
              <SidebarSection title="Investigation">
                <SidebarLink href="/dashboard/overview" label="Overview" icon="ti-layout-dashboard" />
                <SidebarLink href="/dashboard/graph" label="Graph explorer" icon="ti-topology-star" />
                <SidebarLink href="/dashboard/replay" label="Temporal replay" icon="ti-player-play" />
                <SidebarLink href="/dashboard/story" label="Fraud story engine" icon="ti-message-chatbot" />
                <SidebarLink href="/dashboard/fiu" label="FIU reports" icon="ti-file-check" />
              </SidebarSection>

              <SidebarSection title="Recent cases">
                {RECENT_CASES.map((c) => (
                  <SidebarCaseItem key={c.id} caseId={c.id} type={c.type} risk={c.risk} />
                ))}
              </SidebarSection>

              <SidebarSection title="Reports">
                <SidebarLink href="/dashboard/fiu" label="FIU submissions" icon="ti-file-text" />
              </SidebarSection>
            </div>
          </div>
        </>
      )}
    </>
  )
}
