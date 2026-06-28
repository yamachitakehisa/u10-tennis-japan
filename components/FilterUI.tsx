'use client'

import { useState } from 'react'
import type { FilterState } from '@/lib/types'
import { ALL_REGIONS, REGIONS, PREFECTURES_BY_REGION } from '@/lib/utils'

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
  totalCount: number
  filteredCount: number
}

const MONTHS = (() => {
  const months: { value: string; label: string }[] = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = `${d.getFullYear()}年${d.getMonth() + 1}月`
    months.push({ value, label })
  }
  return months
})()

export default function FilterUI({ filters, onChange, totalCount, filteredCount }: Props) {
  const [expanded, setExpanded] = useState(false)

  const update = (key: keyof FilterState, value: string | boolean) => {
    onChange({ ...filters, [key]: value })
  }

  const reset = () => {
    onChange({
      month: '',
      prefecture: '',
      region: '',
      ageCategory: '',
      ballType: '',
      level: '',
      openOnly: false,
      visitorOnly: false,
      overseasOnly: false,
    })
  }

  const allPrefs = Object.values(PREFECTURES_BY_REGION).flat()

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <span className="font-semibold text-gray-800">絞り込み検索</span>
          <span className="text-sm text-gray-500">
            {filteredCount}/{totalCount}件
          </span>
        </div>
        <span className="text-gray-400 text-sm">{expanded ? '▲ 閉じる' : '▼ 開く'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {/* Quick filters */}
          <div className="mt-3 mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">ボール種別</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: '', label: 'すべて', color: 'bg-gray-100 text-gray-700 border-gray-300' },
                { value: 'Red', label: '🔴 レッド', color: 'bg-red-50 text-red-700 border-red-300' },
                { value: 'Orange', label: '🟠 オレンジ', color: 'bg-orange-50 text-orange-700 border-orange-300' },
                { value: 'Green', label: '🟢 グリーン', color: 'bg-green-50 text-green-700 border-green-300' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update('ballType', opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${opt.color} ${
                    filters.ballType === opt.value ? 'ring-2 ring-offset-1 ring-green-500 font-bold' : 'opacity-80'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Month */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">開催月</label>
              <select
                value={filters.month}
                onChange={(e) => update('month', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">すべての月</option>
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">地域</label>
              <select
                value={filters.region}
                onChange={(e) => {
                  update('region', e.target.value)
                  update('prefecture', '')
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">すべての地域</option>
                {ALL_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Prefecture */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">都道府県</label>
              <select
                value={filters.prefecture}
                onChange={(e) => update('prefecture', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">すべての都道府県</option>
                {(filters.region
                  ? PREFECTURES_BY_REGION[filters.region] || []
                  : allPrefs
                ).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">年齢区分</label>
              <select
                value={filters.ageCategory}
                onChange={(e) => update('ageCategory', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">すべての年齢</option>
                <option value="U8">U8（8歳以下）</option>
                <option value="U10">U10（10歳以下）</option>
                <option value="U12">U12（12歳以下）</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">レベル</label>
              <select
                value={filters.level}
                onChange={(e) => update('level', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">すべてのレベル</option>
                <option value="FirstTimer">初めての試合</option>
                <option value="Beginner">初級</option>
                <option value="Intermediate">中級</option>
                <option value="Competitive">競技向け</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-4 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.openOnly}
                onChange={(e) => update('openOnly', e.target.checked)}
                className="w-4 h-4 rounded accent-green-600"
              />
              <span className="text-sm text-gray-700">募集中のみ表示</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.visitorOnly}
                onChange={(e) => update('visitorOnly', e.target.checked)}
                className="w-4 h-4 rounded accent-green-600"
              />
              <span className="text-sm text-gray-700">ビジター参加可のみ</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.overseasOnly}
                onChange={(e) => update('overseasOnly', e.target.checked)}
                className="w-4 h-4 rounded accent-green-600"
              />
              <span className="text-sm text-gray-700">🌏 海外大会のみ</span>
            </label>
          </div>

          {/* Reset */}
          <div className="mt-4 flex justify-end">
            <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-800 underline">
              絞り込みをリセット
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
