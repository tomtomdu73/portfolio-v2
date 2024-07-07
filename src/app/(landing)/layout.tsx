import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'

import '@/styles/global.css'
import { RootLayoutInner } from '@/components/RootLayoutInner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrain = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrain',
})

export const metadata: Metadata = {
  title: 'Thomas Cosialls | Portfolio',
  description:
    'Blockchain Engineer, Full-stack Developer, Full-time Learner. I build decentralized applications and tools for the web.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrain.variable} `}>
        <RootLayoutInner>{children}</RootLayoutInner>
      </body>
      <GoogleAnalytics />
    </html>
  )
}
