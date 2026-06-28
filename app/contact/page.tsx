import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ・削除依頼',
  description:
    '大会情報の修正・削除依頼、掲載のご連絡はこちらからお問い合わせください。',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">お問い合わせ</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">✉️ お問い合わせ・削除依頼</h1>
      <p className="text-gray-600 text-sm mb-8">
        大会情報の修正・削除依頼、新しい大会の掲載依頼などはこちらからご連絡ください。
      </p>

      {/* Purpose boxes */}
      <div className="space-y-4 mb-8">
        <div className="card p-5 border-l-4 border-red-400">
          <h2 className="font-bold text-gray-800 mb-1">🗑️ 掲載削除のご依頼</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            主催者様からの削除依頼は速やかに対応いたします。大会名・削除理由をご明記の上、下記メールアドレスまでご連絡ください。
          </p>
        </div>

        <div className="card p-5 border-l-4 border-yellow-400">
          <h2 className="font-bold text-gray-800 mb-1">✏️ 情報修正のご依頼</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            大会日程・参加資格・参加費などの情報が誤っている場合は、正しい情報とともにご連絡ください。
          </p>
        </div>

        <div className="card p-5 border-l-4 border-green-500">
          <h2 className="font-bold text-gray-800 mb-1">📋 新規大会の掲載依頼</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            掲載希望の大会情報（大会名・日程・会場・対象年齢・公式URL等）をお送りください。内容を確認の上、掲載いたします。
          </p>
        </div>

        <div className="card p-5 border-l-4 border-blue-400">
          <h2 className="font-bold text-gray-800 mb-1">💬 その他のお問い合わせ</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            サイトに関するご意見・ご提案もお気軽にどうぞ。
          </p>
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-800 mb-4">📬 連絡先</h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-gray-700 mb-1">メールアドレス</p>
            <p className="text-gray-600">
              <a
                href="mailto:contact@u10tennis.jp"
                className="text-green-700 hover:underline"
              >
                contact@u10tennis.jp
              </a>
              <span className="text-gray-400 text-xs ml-2">（例）</span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">対応時間</p>
            <p className="text-gray-600">受付後、5営業日以内にご返答いたします</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-yellow-800 mb-3">⚠️ ご注意事項</h2>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            このサイトは非公式サイトです。大会への申込・参加に関するお問い合わせは、各大会の主催者へ直接ご連絡ください。
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            掲載情報の正確性を保証するものではありません。必ず公式ページでご確認ください。
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            主催者様からの削除依頼には速やかに対応いたします。
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            大会要項・告知文の転載はしておらず、公開情報の要点のみを掲載しています。
          </li>
        </ul>
      </div>

      <Link href="/" className="text-sm text-gray-500 hover:text-green-700 flex items-center gap-1">
        ← トップページへ戻る
      </Link>
    </div>
  )
}
