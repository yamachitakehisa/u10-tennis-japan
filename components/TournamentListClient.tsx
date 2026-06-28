'use client'

import { useState } from 'react'
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

export default function TournamentListClient({ tournaments, initialFilters }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })

  const filtered = sortByDate(filterTournaments(tournaments, filters))

  return (
    <div>
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
