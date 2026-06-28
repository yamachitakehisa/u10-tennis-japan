import type { Metadata } from 'next'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament } from '@/lib/types'
import { getUpcomingTournaments } from '@/lib/utils'
import TournamentCard from '@/components/TournamentCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export const metadata: Metadata = {
  title: 'U10 Junior Tennis Japan | 日本全国ジュニアテニス大会カレンダー',
  description:
    '日本全国のU8・U10ジュニアテニス大会（レッドボール・オレンジボール・グリーンボール）を地域・日程・ボール種別で検索。小学生・幼児のテニス試合情報を保護者向けにまとめた大会カレンダー。',
}

const tournaments = tournamentsData as Tournament[]

export default function HomePage() {
  const upcoming = getUpcomingTournaments(tournaments).slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🎾</div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
            U8・U10の大会を<br className="md:hidden" />かんたんに探せる
          </h1>
          <p className="text-green-100 text-base md:text-lg mb-6 leading-relaxed">
            地域・開催月・ボール種別（レッド・オレンジ・グリーン）で<br className="hidden md:block" />
            日本全国のジュニアテニス大会をまとめて検索できます
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tournaments"
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
            >
              🏆 大会を探す
            </Link>
            <Link
              href="/balls/Red"
              className="bg-red-500 text-white font-bold px-5 py-3 rounded-full hover:bg-red-600 transition-colors shadow"
            >
              🔴 レッド
            </Link>
            <Link
              href="/balls/Orange"
              className="bg-orange-500 text-white font-bold px-5 py-3 rounded-full hover:bg-orange-600 transition-colors shadow"
            >
              🟠 オレンジ
            </Link>
            <Link
              href="/balls/Green"
              className="bg-emerald-800 text-white font-bold px-5 py-3 rounded-full hover:bg-emerald-900 transition-colors shadow"
            >
              🟢 グリーン
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <DisclaimerBanner />

        {/* Ball type guide */}
        <section className="mb-10">
          <h2 className="section-title">🎯 ボール種別ガイド</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/balls/Red" className="card p-4 hover:shadow-md transition-shadow border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-800">レッドボール</h3>
              </div>
              <p className="text-sm text-gray-600">目安は5〜8歳。初めての試合経験に向いています。コートが小さく、ボールもゆっくり飛びます。</p>
              <span className="inline-block mt-3 text-xs text-red-600 font-semibold">対象大会を見る →</span>
            </Link>
            <Link href="/balls/Orange" className="card p-4 hover:shadow-md transition-shadow border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-5 h-5 rounded-full bg-orange-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-800">オレンジボール</h3>
              </div>
              <p className="text-sm text-gray-600">目安は8〜10歳。レッドからグリーンへの移行期。少し広いコートで試合を楽しめます。</p>
              <span className="inline-block mt-3 text-xs text-orange-600 font-semibold">対象大会を見る →</span>
            </Link>
            <Link href="/balls/Green" className="card p-4 hover:shadow-md transition-shadow border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-800">グリーンボール</h3>
              </div>
              <p className="text-sm text-gray-600">U10公式大会で多く使われます。通常コートに近い形式で行われることが多い大会です。</p>
              <span className="inline-block mt-3 text-xs text-green-600 font-semibold">対象大会を見る →</span>
            </Link>
          </div>
        </section>

        {/* Upcoming tournaments */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">📅 直近の大会</h2>
            <Link href="/tournaments" className="text-sm text-green-700 font-medium hover:underline">
              すべて見る →
            </Link>
          </div>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">現在募集中の大会はありません。</p>
          )}
        </section>

        {/* Region links */}
        <section className="mb-10">
          <h2 className="section-title">🗾 地域から探す</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['北海道・東北', '関東', '中部', '関西', '中国・四国', '九州・沖縄'].map((region) => (
              <Link
                key={region}
                href={`/regions/${encodeURIComponent(region)}`}
                className="card p-4 text-center hover:shadow-md hover:border-green-300 transition-all group"
              >
                <span className="text-2xl block mb-1">
                  {region === '北海道・東北' ? '🌿' : region === '関東' ? '🗼' : region === '中部' ? '🏔️' : region === '関西' ? '⛩️' : region === '中国・四国' ? '🌊' : '🌺'}
                </span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">{region}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-green-800 mb-4 text-center">📊 サイト概要</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-700">{tournaments.length}</div>
              <div className="text-xs text-green-600 mt-1">掲載大会数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">6</div>
              <div className="text-xs text-green-600 mt-1">対応地域</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">3</div>
              <div className="text-xs text-green-600 mt-1">ボール種別</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
