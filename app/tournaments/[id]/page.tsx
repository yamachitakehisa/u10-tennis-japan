import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import tournamentsData from '@/data/tournaments.json'
import type { Tournament } from '@/lib/types'
import {
  formatDateRange,
  formatDate,
  BALL_TYPE_LABELS,
  LEVEL_LABELS,
  EVENT_TYPE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  getGoogleMapsUrl,
} from '@/lib/utils'
import BallBadge from '@/components/BallBadge'
import StatusBadge from '@/components/StatusBadge'

const tournaments = tournamentsData as Tournament[]

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return tournaments.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = tournaments.find((t) => t.id === params.id)
  if (!t) return {}
  return {
    title: t.name,
    description: `${t.name}（${t.startDate}、${t.prefecture}${t.city || ''}、${t.venue}）の大会詳細情報。${BALL_TYPE_LABELS[t.ballType]}・${t.ageCategory.join('/')}対象。`,
  }
}

export default function TournamentDetailPage({ params }: Props) {
  const t = tournaments.find((t) => t.id === params.id)
  if (!t) notFound()

  const mapsUrl = getGoogleMapsUrl(t.venue, t.prefecture, t.city)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">ホーム</Link>
        <span>/</span>
        <Link href="/tournaments" className="hover:text-green-700">大会一覧</Link>
        <span>/</span>
        <span className="text-gray-700 truncate">{t.name}</span>
      </nav>

      {/* Header card */}
      <div className="card mb-6">
        <div
          className={`h-2 ${
            t.ballType === 'Red' ? 'bg-red-500'
            : t.ballType === 'Orange' ? 'bg-orange-500'
            : t.ballType === 'Green' ? 'bg-green-500'
            : t.ballType === 'Mixed' ? 'bg-gradient-to-r from-red-400 via-orange-400 to-green-400'
            : 'bg-gray-300'
          }`}
        />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <StatusBadge status={t.status} />
            <BallBadge ballType={t.ballType} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {t.name}
          </h1>
          <div className="space-y-3 text-sm">
            <InfoRow icon="📅" label="開催日" value={formatDateRange(t.startDate, t.endDate)} />
            <InfoRow
              icon="📍"
              label="会場"
              value={
                <span>
                  {t.prefecture}{t.city ? ` ${t.city}` : ''} {t.venue}
                  {' '}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                  >
                    地図を開く 🗺️
                  </a>
                </span>
              }
            />
            <InfoRow icon="👦" label="対象年齢" value={t.ageCategory.join(' / ')} />
            <InfoRow icon="🎾" label="ボール種別" value={BALL_TYPE_LABELS[t.ballType]} />
            <InfoRow icon="⭐" label="レベル" value={LEVEL_LABELS[t.level]} />
            <InfoRow icon="🏅" label="種目" value={EVENT_TYPE_LABELS[t.eventType]} />
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="card mb-6">
        <div className="p-6">
          <h2 className="font-bold text-gray-800 mb-4 text-base">📋 大会詳細</h2>
          <div className="space-y-3 text-sm">
            <InfoRow icon="🏢" label="主催者" value={t.organizer} />
            {t.entryDeadline && (
              <InfoRow icon="⏰" label="申込締切" value={t.entryDeadline} highlight />
            )}
            {t.entryFee && (
              <InfoRow icon="💴" label="参加費" value={t.entryFee} />
            )}
            {t.eligibility && (
              <InfoRow icon="✅" label="参加資格" value={t.eligibility} />
            )}
            {t.visitorAllowed && (
              <InfoRow
                icon="🌏"
                label="ビジター参加"
                value={
                  t.visitorAllowed === 'Yes' ? '参加可能' :
                  t.visitorAllowed === 'No' ? '参加不可（地域限定）' : '要確認'
                }
              />
            )}
            <InfoRow
              icon="📌"
              label="ステータス"
              value={STATUS_LABELS[t.status]}
            />
            <InfoRow icon="🗓️" label="情報確認日" value={formatDate(t.verifiedAt)} />
            <InfoRow icon="📰" label="情報元" value={t.sourceName} />
          </div>

          {t.notes && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-500 mb-1">備考</p>
              <p className="text-sm text-gray-700">{t.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Suited for / Cautions */}
      {(t.suitedFor || t.cautions || t.level === 'FirstTimer') && (
        <div className="card mb-6">
          <div className="p-6">
            <h2 className="font-bold text-gray-800 mb-4 text-base">👨‍👩‍👧 この大会について</h2>
            <div className="space-y-4">
              {(t.suitedFor || t.level === 'FirstTimer') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-blue-600 mb-1">✨ この大会に向いている子</p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {t.suitedFor ?? (
                      t.level === 'FirstTimer'
                        ? 'テニスの試合が初めてのお子さんに最適です。勝ち負けよりも試合経験を積むことを目的とした大会です。'
                        : t.level === 'Beginner'
                        ? '数回試合経験があり、これからもっと大会に出たいお子さん向けです。'
                        : ''}
                  </p>
                </div>
              )}
              {t.cautions && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-orange-600 mb-1">⚠️ 保護者への注意点</p>
                  <p className="text-sm text-orange-800 leading-relaxed">{t.cautions}</p>
                </div>
              )}
              {t.status === 'CheckRequired' && !t.cautions && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-orange-600 mb-1">⚠️ 保護者への注意点</p>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    この大会は2026年の開催・日程がまだ公式確認されていません。
                    申込前に必ず公式ページで最新情報をご確認ください。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Official URL */}
      <div className="card mb-6 bg-green-50 border-green-200">
        <div className="p-6 text-center">
          <p className="text-sm text-green-800 font-semibold mb-3">
            申込・最新情報は公式ページでご確認ください
          </p>
          <a
            href={t.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow"
          >
            公式ページを開く 🔗
          </a>
          <p className="text-xs text-green-700 mt-3">{t.officialUrl}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-yellow-500 text-xl flex-shrink-0">⚠️</span>
          <div className="text-sm text-yellow-800">
            <p className="font-bold mb-1">必ず公式ページで最新情報を確認してください</p>
            <p>
              このページの情報は公開情報をもとに作成しており、正確性・最新性を保証するものではありません。
              申込方法・参加資格・日程などは変更になる場合があります。
              必ず上記の公式ページで最新情報をご確認の上、主催者へお問い合わせください。
            </p>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="flex justify-between">
        <Link
          href="/tournaments"
          className="text-sm text-gray-600 hover:text-green-700 flex items-center gap-1"
        >
          ← 大会一覧に戻る
        </Link>
        <Link
          href="/contact"
          className="text-sm text-gray-600 hover:text-green-700"
        >
          情報の修正・削除依頼
        </Link>
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string
  label: string
  value: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-6 flex-shrink-0 text-base">{icon}</span>
      <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
      <span className={`flex-1 ${highlight ? 'font-semibold text-orange-700' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  )
}
