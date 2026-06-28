import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ・掲載依頼・削除依頼 | U10ジュニアテニス大会カレンダー',
  description:
    '大会情報の修正・削除依頼、掲載のご連絡はこちら。主催者様からの修正・削除依頼にも速やかに対応いたします。',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">お問い合わせ</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">✉️ お問い合わせ</h1>
      <p className="text-gray-600 text-sm mb-8">
        大会情報の修正・削除依頼、新しい大会の掲載依頼などはこちらからご連絡ください。
      </p>

      {/* 主催者向けセクション */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-blue-800 text-base mb-3">🏢 主催者・関係者の方へ</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="text-red-500">🗑️</span> 掲載削除のご依頼
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              主催者様・関係者様からの削除依頼は<strong>速やかに対応</strong>いたします。
              大会名と削除理由をご明記の上、下記メールアドレスまでご連絡ください。
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="text-yellow-500">✏️</span> 情報修正のご依頼
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              日程・会場・参加資格・参加費などの情報に誤りがある場合は、正しい情報とともにご連絡ください。
              確認後、速やかに修正いたします。
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="text-green-600">📋</span> 大会掲載依頼
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              U8・U10を対象としたジュニアテニス大会の掲載を希望される場合は、以下の情報をお送りください。
            </p>
            <ul className="text-xs text-gray-500 space-y-1 pl-3">
              <li>• 大会名・開催日・会場（都道府県・市区町村・施設名）</li>
              <li>• 対象年齢・ボール種別（Red / Orange / Green）</li>
              <li>• 主催者名・公式URL（申込ページ）</li>
              <li>• 参加費・参加資格（任意）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 保護者・一般向けセクション */}
      <div className="space-y-4 mb-8">
        <div className="card p-5 border-l-4 border-purple-400">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span>🌏</span> 東南アジア・海外大会情報のご提供
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            シンガポール・マレーシアなど海外のU8・U10テニス大会情報をお持ちの方は、大会名・日程・公式URLをお送りください。掲載を検討いたします。
          </p>
        </div>

        <div className="card p-5 border-l-4 border-blue-400">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span>💬</span> その他のお問い合わせ
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            サイトに関するご意見・ご提案・大会情報の追加・不具合のご報告もお気軽にどうぞ。
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
                href="mailto:yamachitakehisa@gmail.com"
                className="text-green-700 hover:underline"
              >
                yamachitakehisa@gmail.com
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">対応時間</p>
            <p className="text-gray-600">受付後、5営業日以内にご返答いたします</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
            ⚠️ このサイトは個人が運営する非公式の情報カレンダーです。大会への申込・参加に関するお問い合わせは、各大会の主催者へ直接ご連絡ください。
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
            主催者様からの削除・修正依頼には速やかに対応いたします。
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
