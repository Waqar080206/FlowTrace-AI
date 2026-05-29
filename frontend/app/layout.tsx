import '../styles/globals.css'
import '../styles/tokens.css'
import Topbar from '../components/ui/Topbar'

export const metadata = {
  title: 'FlowTrace AI',
  description: 'Fund Flow Fraud Detection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  )
}
