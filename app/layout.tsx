import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ITP dashboard',
  description: 'Created for ITP',
  generator: 'Squad 6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
