import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'U10 Junior Tennis Japan | ジュニアテニス大会カレンダー',
    template: '%s | U10 Junior Tennis Japan',
  },
  description:
    '日本全国のU8・U10ジュニアテニス大会（レッドボール・オレンジボール・グリーンボール）を地域・日程・ボール種別で検索できる保護者向け大会カレンダーです。',
  keywords: [
    'ジュニアテニス',
    '大会',
    'U10',
    'U8',
    'レッドボール',
    'オレンジボール',
    'グリーンボール',
    '小学生テニス',
    '子どもテニス',
    '初めてのテニス大会',
  ],
  openGraph: {
    title: 'U10 Junior Tennis Japan | ジュニアテニス大会カレンダー',
    description:
      '日本全国のU8・U10ジュニアテニス大会を地域・日程・ボール種別で検索。保護者向け大会カレンダー。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'U10 Junior Tennis Japan',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
