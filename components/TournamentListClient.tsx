'use client'

import { useState, useMemo } from 'react'
import type { Tournament, FilterState } from '@/lib/types'
import { filterTournaments, sortByDate } from '@/lib/utils'
import TournamentCard from './TournamentCard'
import FilterUI from './FilterUI'

interface Props {
  tournaments: Tournament[]
  initialFilters?: Partial<FilterState>
}

const DEFAULT_FILTERS: FilterState = {
  month: '',
  prefecture: '',
  region: '',
  ageCategory: '',
  ballType: '',
  level: '',
  openOnly: false,
  visitorOnly: false,
  overseasOnly: false,
}

const THIS_MONTH = new Date().toISOString().substring(0, 7)

type QuickKey = 'U8' | 'U10' | 'Red' | 'Orange' | 'Green' | 'Kanto' | 'ThisMonth' | 'OpenOnly'

const QUICK_FILTERS: { key: QuickKey; label: string; color: string }[] = [
  { key: 'U8',        label: 'U8',           color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { key: 'U10',       label: 'U10',          color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { key: 'Red',       label: '🔴 レッド',    color: 'bg-red-50 text-red-700 border-red-300' },
  { key: 'Orange',    label: '🟠 オレンジ',  color: 'bg-orange-50 text-orange-700 border-orange-300' },
  { key: 'Green',     label: '🟢 グリーン',  color: 'bg-green-50 text-green-700 border-green-300' },
  { key: 'Kanto',     label: '🗼 関東',      color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { key: 'ThisMonth', label: '📅 今月',      color: 'bg-indigo-50 text-indigo-700 border-indigo-300' },
  { key: 'OpenOnly',  label: '✅ 募集中',    color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
]

function applyQuick(filters: FilterState, key: QuickKey, active: boolean): FilterState {
  if (!active) {
    if (key === 'U8' || key === 'U10') return { ...filters, ageCategory: '' }
    if (key === 'Red' || key === 'Orange' || key === 'Green') return { ...filters, ballType: '' }
    if (key === 'Kanto') return { ...filters, region: '' }
    if (key === 'ThisMonth') return { ...filters, month: '' }
    if (key === 'OpenOnly') return { ...filters, openOnly: false }
  }
  if (key === 'U8') return { ...filters, ageCategory: 'U8' }
  if (key === 'U10') return { ...filters, ageCategory: 'U10' }
  if (key === 'Red') return { ...filters, ballType: 'Red' }
  if (key === 'Orange') return { ...filters, ballType: 'Orange' }
  if (key === 'Green') return { ...filters, ballType: 'Green' }
  if (key === 'Kanto') return { ...filters, region: '関東' }
  if (key === 'ThisMonth') return { ...filters, month: THIS_MONTH }
  if (key === 'OpenOnly') return { ...filters, openOnly: true }
  return filters
}

function isQuickActive(filters: FilterState, key: QuickKey): boolean {
  if (key === 'U8') return filters.ageCategory === 'U8'
  if (key === 'U10') return filters.ageCategory === 'U10'
  if (key === 'Red') return filters.ballType === 'Red'
  if (key === 'Orange') return filters.ballType === 'Orange'
  if (key === 'Green') return filters.ballType === 'Green'
  if (key === 'Kanto') return filters.region === '関東'
  if (key === 'ThisMonth') return filters.month === THIS_MONTH
  if (key === 'OpenOnly') return filters.openOnly
  return false
}

export default function TournamentListClient({ tournaments, initialFilters }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })

  const filtered = useMemo(
    () => sortByDate(filterTournaments(tournaments, filters)),
    [tournaments, filters]
  )

  const toggleQuick = (key: QuickKey) => {
    const active = isQuickActive(filters, key)
    setFilters(applyQuick(filters, key, active))
  }

  return (
    <div>
      {/* Quick filters */}
      <div className="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
        <p className="text-xs font-semibold text-gray-500 mb-2">クイック絞り込み</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map(({ key, label, color }) => {
            const active = isQuickActive(filters, key)
            return (
              <button
                key={key}
                onClick={() => toggleQuick(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${color} ${
                  active
                    ? 'ring-2 ring-offset-1 ring-green-500 font-bold shadow-sm'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <FilterUI
        filters={filters}
        onChange={setFilters}
        totalCount={tournaments.length}
        filteredCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎾</p>
          <p className="font-medium">条件に一致する大会が見つかりませんでした</p>
          <p className="text-sm mt-1">フィルターを変更してみてください</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      )}
    </div>
  )
}
