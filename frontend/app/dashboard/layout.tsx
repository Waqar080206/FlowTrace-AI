import Sidebar from '../../components/ui/Sidebar'
import { SidebarProvider } from '../../components/ui/SidebarContext'
import DashboardShell from '../../components/dashboard/DashboardShell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  )
}
