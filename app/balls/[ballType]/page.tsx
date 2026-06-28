import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament, BallType } from '@/lib/types'
import { BALL_TYPE_LABELS, sortByDate } from '@/lib/utils'
import TournamentCard from '@/components/TournamentCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'

const tournaments = tournamentsData as Tournament[]

const VALID_BALL_TYPES: BallType[] = ['Red', 'Orange', 'Green']

interface Props {
  params: { ballType: string }
}

export async function generateStaticParams() {
  return VALID_BALL_TYPES.map((b) => ({ ballType: b }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ballType = params.ballType as BallType
  const label = BALL_TYPE_LABELS[ballType] || params.ballType
  return {
    title: `${label}大会一覧`,
    description: `日本全国の${label}ジュニアテニス大会一覧。U8・U10の子どもが参加できる${label}の試合情報をまとめました。`,
  }
}

const BALL_INFO: Record<string, {
  label: string
  color: string
  bgColor: string
  textColor: string
  borderColor: string
  dotColor: string
  emoji: string
  age: string
  description: string
  points: string[]
}> = {
  Red: {
    label: 'レッドボール',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-300',
    dotColor: 'bg-red-500',
    emoji: '🔴',
    age: '5〜8歳が目安',
    description: 'レッドボール大会は、テニスを始めたばかりのお子さんの初めての試合経験に最適です。通常のテニスボールより弾みにくく、コートも小さいため、小さなお子さんでもラリーが続きやすく、試合を楽しめます。',
    points: [
      '5〜8歳のお子さんが対象の大会が多い',
      'コートが小さく（ミニコート）、ボールがゆっくり飛ぶ',
      '初めての試合デビューにぴったり',
      'マッチ練習会形式で初心者でも参加しやすい',
    ],
  },
  Orange: {
    label: 'オレンジボール',
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    dotColor: 'bg-orange-500',
    emoji: '🟠',
    age: '8〜10歳が目安',
    description: 'オレンジボール大会は、レッドボールを卒業してグリーンボールに進む前の段階のお子さんに向いています。少し大きめのコートで、ラリーもより本格的になってきます。',
    points: [
      '8〜10歳のお子さんが対象の大会が多い',
      'レッドとグリーンの中間のボール・コートサイズ',
      '初級〜中級のお子さんにぴったり',
      'U10大会の多くで採用されている',
    ],
  },
  Green: {
    label: 'グリーンボール',
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-300',
    dotColor: 'bg-green-500',
    emoji: '🟢',
    age: 'U10（10歳以下）が中心',
    description: 'グリーンボール大会はU10の公式大会で多く使われます。通常コートに近い形式で行われることが多く、より本格的な試合経験を積むことができます。JTAの公認大会でも採用されています。',
    points: [
      'U10公式大会で標準的に使用される',
      '通常コートに近いサイズで試合',
      '中級〜競技志向のお子さん向け',
      'JTA公認大会でも採用',
    ],
  },
}

export default function BallTypePage({ params }: Props) {
  const ballType = params.ballType as BallType
  if (!VALID_BALL_TYPES.includes(ballType)) notFound()

  const info = BALL_INFO[ballType]

  const ballTournaments = sortByDate(
    tournaments.filter((t) => t.ballType === ballType || t.ballType === 'Mixed')
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">{info.label}大会</span>
      </nav>

      {/* Header */}
      <div className={`rounded-xl border ${info.borderColor} ${info.bgColor} p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-3">
          <span className={`w-8 h-8 rounded-full ${info.dotColor} flex-shrink-0`} />
          <h1 className={`text-2xl font-bold ${info.textColor}`}>{info.emoji} {info.label}大会</h1>
        </div>
        <p className={`text-sm font-semibold ${info.textColor} mb-2`}>{info.age}</p>
        <p className={`text-sm ${info.textColor} opacity-90 leading-relaxed mb-4`}>{info.description}</p>
        <ul className="space-y-1">
          {info.points.map((point, i) => (
            <li key={i} className={`text-sm ${info.textColor} flex items-start gap-2`}>
              <span className="flex-shrink-0 mt-0.5">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Ball type nav */}
      <div className="flex gap-3 mb-6">
        {VALID_BALL_TYPES.map((bt) => (
          <Link
            key={bt}
            href={`/balls/${bt}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              bt === ballType
                ? bt === 'Red' ? 'bg-red-500 text-white border-red-500'
                  : bt === 'Orange' ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${bt === 'Red' ? 'bg-red-400' : bt === 'Orange' ? 'bg-orange-400' : 'bg-green-400'} ${bt === ballType ? 'bg-white' : ''}`} />
            {BALL_TYPE_LABELS[bt]}
          </Link>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          {ballTournaments.length}件の大会が見つかりました
          <span className="text-xs text-gray-400 ml-2">（複数ボール種別の大会を含む）</span>
        </p>
      </div>

      <DisclaimerBanner />

      {ballTournaments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎾</p>
          <p className="font-medium">{info.label}の大会はまだ登録されていません</p>
          <p className="text-sm mt-2">
            情報をお持ちの方は
            <Link href="/contact" className="text-green-700 underline ml-1">お問い合わせ</Link>
            ください
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ballTournaments.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      )}
    </div>
  )
}
