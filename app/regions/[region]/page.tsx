import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament, Region } from '@/lib/types'
import { REGIONS, sortByDate } from '@/lib/utils'
import TournamentCard from '@/components/TournamentCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'

const tournaments = tournamentsData as Tournament[]

interface Props {
  params: { region: string }
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ region: encodeURIComponent(r) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = decodeURIComponent(params.region)
  return {
    title: `${region}のジュニアテニス大会`,
    description: `${region}エリアのU8・U10ジュニアテニス大会一覧。レッドボール・オレンジボール・グリーンボール大会を探せます。`,
  }
}

const REGION_EMOJI: Record<string, string> = {
  '北海道・東北': '🌿',
  '関東': '🗼',
  '中部': '🏔️',
  '関西': '⛩️',
  '中国・四国': '🌊',
  '九州・沖縄': '🌺',
}

const REGION_DESC: Record<string, string> = {
  '北海道・東北': '北海道・青森・岩手・宮城・秋田・山形・福島のU8・U10ジュニアテニス大会をまとめています。各県テニス協会主催の公式大会から、スクール・クラブ主催のカラーボール大会まで掲載しています。',
  '関東': '東京・神奈川・埼玉・千葉・茨城・栃木・群馬のU8・U10ジュニアテニス大会をまとめています。関東ジュニア選手権（U10グリーンボール）や、各県協会・民間クラブのレッド・オレンジボール大会を掲載しています。',
  '中部': '愛知・静岡・長野・岐阜・新潟・富山・石川・福井・山梨のU8・U10ジュニアテニス大会をまとめています。愛知カラーボールプロジェクトをはじめ、中部地方のジュニア大会を幅広く掲載しています。',
  '関西': '大阪・兵庫・京都・奈良・滋賀・和歌山・三重のU8・U10ジュニアテニス大会をまとめています。関西U10グリーンボール選手権や兵庫県テニス協会主催大会、万博テニスガーデンなどの大会を掲載しています。',
  '中国・四国': '広島・岡山・山口・鳥取・島根・愛媛・香川・徳島・高知のU8・U10ジュニアテニス大会をまとめています。各県・地域テニス協会主催の公式大会を掲載しています。',
  '九州・沖縄': '福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島・沖縄のU8・U10ジュニアテニス大会をまとめています。JTA全国大会（宮崎）や福岡パシフィックぴよぴよCUPなどを掲載しています。',
}

export default function RegionPage({ params }: Props) {
  const region = decodeURIComponent(params.region) as Region
  if (!REGIONS.includes(region as typeof REGIONS[number])) notFound()

  const regionTournaments = sortByDate(
    tournaments.filter((t) => t.region === region)
  )

  const emoji = REGION_EMOJI[region] || '📍'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">{region}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {emoji} {region}のジュニアテニス大会
        </h1>
        {REGION_DESC[region] && (
          <p className="text-gray-600 text-sm leading-relaxed mb-2">{REGION_DESC[region]}</p>
        )}
        <p className="text-gray-500 text-xs">{regionTournaments.length}件の大会が見つかりました</p>
      </div>

      {/* Region nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        {REGIONS.map((r) => (
          <Link
            key={r}
            href={`/regions/${encodeURIComponent(r)}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              r === region
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-700'
            }`}
          >
            {r}
          </Link>
        ))}
      </div>

      <DisclaimerBanner />

      {regionTournaments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎾</p>
          <p className="font-medium">{region}エリアの大会はまだ登録されていません</p>
          <p className="text-sm mt-2">
            情報をお持ちの方は
            <Link href="/contact" className="text-green-700 underline ml-1">お問い合わせ</Link>
            ください
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionTournaments.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      )}
    </div>
  )
}
