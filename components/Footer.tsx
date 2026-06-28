import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>🎾</span> U10 Junior Tennis Japan
            </h3>
            <p className="text-sm leading-relaxed">
              日本全国のU8・U10ジュニアテニス大会を探しやすくするための、保護者向け情報カレンダーです。
            </p>
            <p className="text-xs mt-3 text-yellow-300 font-medium">
              ⚠️ このサイトは非公式サイトです
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-3">ページ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tournaments" className="hover:text-white transition-colors">大会一覧</Link></li>
              <li><Link href="/balls/Red" className="hover:text-white transition-colors">レッドボール大会</Link></li>
              <li><Link href="/balls/Orange" className="hover:text-white transition-colors">オレンジボール大会</Link></li>
              <li><Link href="/balls/Green" className="hover:text-white transition-colors">グリーンボール大会</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ・削除依頼</Link></li>
            </ul>
          </div>

          {/* Region */}
          <div>
            <h3 className="text-white font-bold mb-3">地域別</h3>
            <ul className="space-y-2 text-sm">
              {['北海道・東北', '関東', '中部', '関西', '中国・四国', '九州・沖縄'].map((r) => (
                <li key={r}>
                  <Link href={`/regions/${encodeURIComponent(r)}`} className="hover:text-white transition-colors">
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 space-y-2">
          <p className="text-xs text-gray-400">
            ※ このサイトは公式サイトではありません。掲載情報は公開情報をもとに作成していますが、正確性を保証するものではありません。
            必ず各大会の公式ページ・主催者サイトで最新情報をご確認ください。
          </p>
          <p className="text-xs text-gray-400">
            ※ 掲載情報の削除・修正依頼は<Link href="/contact" className="underline hover:text-white">お問い合わせページ</Link>よりご連絡ください。
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © 2026 U10 Junior Tennis Japan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
