import type { Metadata } from 'next'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament } from '@/lib/types'
import TournamentListClient from '@/components/TournamentListClient'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export const metadata: Metadata = {
  title: '大会一覧 | U10ジュニアテニス大会カレンダー',
  description:
    '日本全国のU8・U10ジュニアテニス大会一覧。レッドボール・オレンジボール・グリーンボール大会を地域・開催月・レベルで絞り込み検索。小学生・幼児の初めてのテニス大会を探す保護者向けカレンダー。',
}

const tournaments = tournamentsData as Tournament[]
// 日本国内大会のみ表示（海外大会は /overseas へ）
const domesticTournaments = tournaments.filter(
  (t) => !t.country || t.country === 'Japan'
)

export default function TournamentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">🏆 大会一覧（国内）</h1>
        <p className="text-gray-600 text-sm">
          日本全国のU8・U10ジュニアテニス大会を検索できます。
          <Link href="/overseas" className="text-green-700 underline ml-1">東南アジアの大会はこちら →</Link>
        </p>
      </div>

      <DisclaimerBanner />

      <TournamentListClient tournaments={domesticTournaments} />
    </div>
  )
}
