import TabNav from '../../components/ui/TabNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <TabNav />
      <div className="flex-1 p-6">
        {children}
      </div>
    </main>
  )
}