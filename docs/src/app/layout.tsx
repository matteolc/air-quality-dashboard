import { type Metadata } from 'next'
import { Poppins } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { Background } from '@/components/Background'

const inter = Poppins({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Air Quality Dashboard',
  description:
    'A real-time and historycal dashboard for Air Quality monitoring',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-cornflower-400 h-full scroll-smooth antialiased',
        inter.variable,
      )}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="fixed -z-10 h-[1800px] w-[1900px] rotate-90 2xl:left-80">
          <Background />
        </div>
        {children}
      </body>
    </html>
  )
}
