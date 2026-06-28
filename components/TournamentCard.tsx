import Link from 'next/link'
import type { Tournament } from '@/lib/types'
import { formatDateRange, LEVEL_LABELS, EVENT_TYPE_LABELS, DATE_STATUS_LABELS, DATE_STATUS_COLORS } from '@/lib/utils'
import BallBadge from './BallBadge'
import StatusBadge from './StatusBadge'

interface Props {
  tournament: Tournament
}

export default function TournamentCard({ tournament: t }: Props) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      {/* Top color bar by ball type */}
      <div
        className={`h-1.5 ${
          t.ballType === 'Red'
            ? 'bg-red-500'
            : t.ballType === 'Orange'
            ? 'bg-orange-500'
            : t.ballType === 'Green'
            ? 'bg-green-500'
            : t.ballType === 'Yellow'
            ? 'bg-yellow-400'
            : t.ballType === 'Mixed'
            ? 'bg-gradient-to-r from-red-400 via-orange-400 to-green-400'
            : 'bg-gray-300'
        }`}
      />
      <div className="p-4">
        {/* Status + Ball + DateStatus */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <StatusBadge status={t.status} />
          <BallBadge ballType={t.ballType} size="sm" />
          {t.dateStatus && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DATE_STATUS_COLORS[t.dateStatus].bg} ${DATE_STATUS_COLORS[t.dateStatus].text}`}>
              {DATE_STATUS_LABELS[t.dateStatus]}
            </span>
          )}
        </div>

        {/* Title */}
        <Link
          href={`/tournaments/${t.id}`}
          className="block text-base font-bold text-gray-900 hover:text-green-700 leading-snug mb-2"
        >
          {t.name}
        </Link>

        {/* Key info */}
        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">📅</span>
            <span>{formatDateRange(t.startDate, t.endDate)}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">📍</span>
            <span>
              {t.prefecture}{t.city ? ` ${t.city}` : ''} / {t.venue}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">👦</span>
            <span>{t.ageCategory.join(' / ')} ・ {LEVEL_LABELS[t.level]}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg leading-none mt-0.5">🎾</span>
            <span>{EVENT_TYPE_LABELS[t.eventType]}</span>
          </div>
        </div>

        {/* Entry deadline */}
        {t.entryDeadline && (
          <div className="mt-3 text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5">
            申込締切：{t.entryDeadline}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">確認日：{t.verifiedAt}</span>
          <Link
            href={`/tournaments/${t.id}`}
            className="text-xs font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            詳細を見る →
          </Link>
        </div>
      </div>
    </div>
  )
}
