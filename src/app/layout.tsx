import type { Metadata } from 'next'
import '@fontsource-variable/inter'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrashcanWrangler | Curb-to-Door Bin Return in NW DFW',
  description:
    'Never drag your trash cans in again. We return your bins from the curb to your garage or side yard — every pickup day in NW DFW. Starting at $3.49/can.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
