import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AnimatedCursor from 'react-animated-cursor'

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
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="247, 212, 136"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
    </html>
  )
}
