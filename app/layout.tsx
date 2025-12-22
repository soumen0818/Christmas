import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Christmas Magic - Create Your Gift Card',
  description: 'Create personalized Christmas gift cards and receive magical gifts from Santa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
