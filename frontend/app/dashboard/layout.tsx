import TabNav from '../../components/ui/TabNav'
import Sidebar from '../../components/ui/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen bg-bg-primary flex flex-col ml-0 lg:ml-56">
        <TabNav />
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </>
  )
}