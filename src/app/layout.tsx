import type { Metadata } from 'next'
import './globals.css'

const metadata: Metadata = {
  title: 'Agent Task Board',
  description: 'A modern task management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
