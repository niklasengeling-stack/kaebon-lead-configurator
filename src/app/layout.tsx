import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const gotham = localFont({
  src: [
    { path: '../fonts/Gotham-Light.otf', weight: '300', style: 'normal' },
    { path: '../fonts/Gotham-Book.otf', weight: '400', style: 'normal' },
    { path: '../fonts/Gotham-Medium.otf', weight: '500', style: 'normal' },
    { path: '../fonts/Gotham-Bold.otf', weight: '700', style: 'normal' },
    { path: '../fonts/Gotham-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-gotham',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kaebon Konfigurator',
  description: 'Konfiguriere deinen Kaebon Elektroboot und erhalte ein persönliches Angebot.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${gotham.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-gotham)]">
        {children}
      </body>
    </html>
  )
}
