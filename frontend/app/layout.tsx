import '../styles/globals.css'
import '../styles/tokens.css'
import Topbar from '../components/ui/Topbar'
import ThemeProvider from '../components/ui/ThemeProvider'

export const metadata = {
  title: 'FlowTrace AI',
  description: 'Fund Flow Fraud Detection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-w-0 overflow-x-hidden">
        <ThemeProvider>
          <Topbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
