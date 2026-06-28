import type { Metadata } from 'next'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament } from '@/lib/types'
import TournamentListClient from '@/components/TournamentListClient'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export const metadata: Metadata = {
  title: '大会一覧',
  description:
    '日本全国のU8・U10ジュニアテニス大会一覧。レッドボール・オレンジボール・グリーンボール、地域・月・レベルで絞り込み検索できます。',
}

const tournaments = tournamentsData as Tournament[]

export default function TournamentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">🏆 大会一覧</h1>
        <p className="text-gray-600 text-sm">
          日本全国のU8・U10ジュニアテニス大会を検索できます。フィルターで絞り込んでください。
        </p>
      </div>

      <DisclaimerBanner />

      <TournamentListClient tournaments={tournaments} />
    </div>
  )
}
