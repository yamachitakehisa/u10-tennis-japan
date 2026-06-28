import type { Metadata } from 'next'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament } from '@/lib/types'
import { sortByDate } from '@/lib/utils'
import TournamentCard from '@/components/TournamentCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export const metadata: Metadata = {
  title: '海外ジュニアテニス大会（シンガポール・マレーシア）',
  description:
    'シンガポール・マレーシアのU8・U10ジュニアテニス大会情報。STA・LTAMの公式大会やカラーボール大会をまとめています。',
}

const tournaments = tournamentsData as Tournament[]

const COUNTRY_INFO: Record<string, {
  flag: string
  label: string
  org: string
  orgUrl: string
  description: string
}> = {
  Singapore: {
    flag: '🇸🇬',
    label: 'シンガポール',
    org: 'Singapore Tennis Association (STA)',
    orgUrl: 'https://www-new.singtennis.org.sg/juniors-competition',
    description: 'JTT/UFIT Savitar主催のJunior Team Tennis League（JTTL）がSTA公認で年2シーズン開催（Season 1: 2〜5月、Season 2: 9〜11月）。U10はグリーンドットボール使用。チームまたは個人での参加が可能です。',
  },
  Malaysia: {
    flag: '🇲🇾',
    label: 'マレーシア',
    org: 'Lawn Tennis Association of Malaysia（LTAM / TennisMalaysia）',
    orgUrl: 'https://www.ltam.my/tournaments',
    description: 'TennisMalaysiaがジュニアツアーと全国選手権を年間を通じて開催。全国選手権では8&U・9&U・10&Uも含む全カテゴリーが実施されます。申込はBOUNXアプリ経由。',
  },
}

export default function OverseasPage() {
  const overseasTournaments = sortByDate(
    tournaments.filter((t) => t.country && t.country !== 'Japan')
  )

  const singapore = overseasTournaments.filter((t) => t.country === 'Singapore')
  const malaysia = overseasTournaments.filter((t) => t.country === 'Malaysia')
  const others = overseasTournaments.filter((t) => t.country !== 'Singapore' && t.country !== 'Malaysia')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">海外大会</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">🌏 海外ジュニアテニス大会</h1>
        <p className="text-gray-600 text-sm">
          シンガポール・マレーシアなど海外のU8・U10ジュニアテニス大会をまとめています。
          順次情報を追加していきます。
        </p>
      </div>

      <DisclaimerBanner />

      {/* Country guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(COUNTRY_INFO).map(([key, info]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{info.flag}</span>
              <div>
                <h2 className="font-bold text-gray-800">{info.label}</h2>
                <p className="text-xs text-gray-500">{info.org}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{info.description}</p>
            <a
              href={info.orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 hover:underline font-medium"
            >
              公式大会情報を見る →
            </a>
          </div>
        ))}
      </div>

      {/* Singapore tournaments */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          🇸🇬 シンガポール大会
          <span className="text-sm font-normal text-gray-500">({singapore.length}件)</span>
        </h2>
        {singapore.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {singapore.map((t) => <TournamentCard key={t.id} tournament={t} />)}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500">
            <p className="text-2xl mb-2">🎾</p>
            <p className="text-sm font-medium">シンガポールの大会情報を収集中です</p>
            <a
              href="https://www-new.singtennis.org.sg/juniors-competition"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-green-700 hover:underline"
            >
              STA（シンガポールテニス協会）で最新大会を確認 →
            </a>
          </div>
        )}
      </section>

      {/* Malaysia tournaments */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          🇲🇾 マレーシア大会
          <span className="text-sm font-normal text-gray-500">({malaysia.length}件)</span>
        </h2>
        {malaysia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {malaysia.map((t) => <TournamentCard key={t.id} tournament={t} />)}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500">
            <p className="text-2xl mb-2">🎾</p>
            <p className="text-sm font-medium">マレーシアの大会情報を収集中です</p>
            <a
              href="https://www.ltam.my/tournaments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-green-700 hover:underline"
            >
              LTAM（マレーシアテニス協会）で最新大会を確認 →
            </a>
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">その他の海外大会</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((t) => <TournamentCard key={t.id} tournament={t} />)}
          </div>
        </section>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-bold text-blue-800 mb-2">📬 海外大会情報のご提供について</h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          シンガポール・マレーシア・その他アジアのジュニアテニス大会情報をお持ちの方は、
          <Link href="/contact" className="underline hover:text-blue-900">お問い合わせページ</Link>
          からご連絡ください。大会名・日程・公式URL等をお送りいただければ掲載検討いたします。
        </p>
      </div>
    </div>
  )
}
