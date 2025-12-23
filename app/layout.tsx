import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marry Christmas - Create Your Gift Card',
  description: 'Create personalized Christmas gift cards and receive magical gifts from Santa',
  icons: {
    icon: '/santa-favicon.svg',
    shortcut: '/santa-favicon.svg',
    apple: '/santa-favicon.svg',
  },
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
