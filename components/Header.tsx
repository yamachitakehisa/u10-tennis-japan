'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎾</span>
            <div className="leading-tight">
              <div className="text-sm font-bold text-green-700">U10 Junior Tennis Japan</div>
              <div className="text-xs text-gray-500">ジュニアテニス大会カレンダー</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/tournaments" className="hover:text-green-700 transition-colors">
              大会一覧
            </Link>
            <div className="relative group">
              <button className="hover:text-green-700 transition-colors">地域別 ▾</button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] hidden group-hover:block">
                {['北海道・東北', '関東', '中部', '関西', '中国・四国', '九州・沖縄'].map((r) => (
                  <Link
                    key={r}
                    href={`/regions/${encodeURIComponent(r)}`}
                    className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                  >
                    {r}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative group">
              <button className="hover:text-green-700 transition-colors">ボール別 ▾</button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] hidden group-hover:block">
                <Link href="/balls/Red" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />レッドボール
                </Link>
                <Link href="/balls/Orange" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />オレンジボール
                </Link>
                <Link href="/balls/Green" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />グリーンボール
                </Link>
              </div>
            </div>
            <Link href="/overseas" className="hover:text-green-700 transition-colors">
              🌏 海外大会
            </Link>
            <Link href="/contact" className="hover:text-green-700 transition-colors">
              お問い合わせ
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/tournaments"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              🏆 大会一覧
            </Link>
            <div className="py-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">地域別</p>
              {['北海道・東北', '関東', '中部', '関西', '中国・四国', '九州・沖縄'].map((r) => (
                <Link
                  key={r}
                  href={`/regions/${encodeURIComponent(r)}`}
                  className="block py-1.5 pl-3 text-sm text-gray-600 hover:text-green-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {r}
                </Link>
              ))}
            </div>
            <div className="py-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">ボール別</p>
              <Link href="/balls/Red" className="flex items-center gap-2 py-1.5 pl-3 text-sm text-gray-600 hover:text-red-700" onClick={() => setMenuOpen(false)}>
                <span className="w-2 h-2 rounded-full bg-red-500" />レッドボール
              </Link>
              <Link href="/balls/Orange" className="flex items-center gap-2 py-1.5 pl-3 text-sm text-gray-600 hover:text-orange-700" onClick={() => setMenuOpen(false)}>
                <span className="w-2 h-2 rounded-full bg-orange-500" />オレンジボール
              </Link>
              <Link href="/balls/Green" className="flex items-center gap-2 py-1.5 pl-3 text-sm text-gray-600 hover:text-green-700" onClick={() => setMenuOpen(false)}>
                <span className="w-2 h-2 rounded-full bg-green-500" />グリーンボール
              </Link>
            </div>
            <Link
              href="/overseas"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              🌏 海外大会（シンガポール・マレーシア）
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              ✉️ お問い合わせ
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
