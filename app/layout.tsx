import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navigation/Navbar'

export const metadata: Metadata = {
  title: 'HireGo - Next LinkedIn 2.0 | AI-Powered Hiring',
  description: 'Connect with top talent instantly using AI-driven candidate screening and matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
