import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/global.css'
import { RootLayoutInner } from '@/components/RootLayoutInner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thomas Cosialls | Portfolio',
  description: 'Modern & Minimal JS Mastery Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
    </html>
  )
}
