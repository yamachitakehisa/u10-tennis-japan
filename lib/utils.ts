import type { Tournament, FilterState, BallType, Level, EventType, Status } from './types'

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

export function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate || startDate === endDate) return formatDate(startDate)
  const start = new Date(startDate)
  const end = new Date(endDate)
  const startStr = start.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
  const endStr = end.toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
  return `${startStr}〜${endStr}`
}

export const BALL_TYPE_LABELS: Record<BallType, string> = {
  Red: 'レッドボール',
  Orange: 'オレンジボール',
  Green: 'グリーンボール',
  Yellow: 'イエローボール',
  Mixed: '複数種別',
  Unknown: '要確認',
}

export const BALL_TYPE_COLORS: Record<BallType, { bg: string; text: string; border: string }> = {
  Red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  Orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  Green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  Yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  Mixed: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  Unknown: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
}

export const BALL_DOT_COLORS: Record<BallType, string> = {
  Red: 'bg-red-500',
  Orange: 'bg-orange-500',
  Green: 'bg-green-500',
  Yellow: 'bg-yellow-500',
  Mixed: 'bg-purple-500',
  Unknown: 'bg-gray-400',
}

export const LEVEL_LABELS: Record<Level, string> = {
  FirstTimer: '初めての試合',
  Beginner: '初級',
  Intermediate: '中級',
  Competitive: '競技向け',
  Unknown: '不明',
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  Singles: 'シングルス',
  Doubles: 'ダブルス',
  Team: '団体戦',
  MatchPractice: 'マッチ練習会',
  LessonEvent: '練習会',
  Unknown: '要確認',
}

export const STATUS_LABELS: Record<Status, string> = {
  Open: '募集中',
  ClosingSoon: '締切間近',
  Closed: '締切済',
  Finished: '終了',
  CheckRequired: '要確認',
}

export const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  Open: { bg: 'bg-green-500', text: 'text-white' },
  ClosingSoon: { bg: 'bg-orange-500', text: 'text-white' },
  Closed: { bg: 'bg-gray-400', text: 'text-white' },
  Finished: { bg: 'bg-gray-300', text: 'text-gray-700' },
  CheckRequired: { bg: 'bg-yellow-400', text: 'text-yellow-900' },
}

export const REGIONS = [
  '北海道・東北',
  '関東',
  '中部',
  '関西',
  '中国・四国',
  '九州・沖縄',
] as const

export const OVERSEAS_REGIONS = [
  'シンガポール',
  'マレーシア',
  'その他海外',
] as const

export const ALL_REGIONS = [...REGIONS, ...OVERSEAS_REGIONS] as const

export const PREFECTURES_BY_REGION: Record<string, string[]> = {
  '北海道・東北': ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '関西': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国・四国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'],
  '九州・沖縄': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
}

export function filterTournaments(tournaments: Tournament[], filters: FilterState): Tournament[] {
  return tournaments.filter((t) => {
    if (filters.month) {
      const month = t.startDate.substring(0, 7) // YYYY-MM
      if (month !== filters.month) return false
    }
    if (filters.prefecture && t.prefecture !== filters.prefecture) return false
    if (filters.region && t.region !== filters.region) return false
    if (filters.ageCategory && !t.ageCategory.includes(filters.ageCategory)) return false
    if (filters.ballType) {
      if (filters.ballType === 'Mixed') {
        // show all
      } else if (t.ballType !== filters.ballType && t.ballType !== 'Mixed') {
        return false
      }
    }
    if (filters.level && t.level !== filters.level) return false
    if (filters.openOnly && t.status !== 'Open' && t.status !== 'ClosingSoon') return false
    if (filters.visitorOnly && t.visitorAllowed !== 'Yes') return false
    if (filters.overseasOnly && (t.country === 'Japan' || !t.country)) return false
    return true
  })
}

export function sortByDate(tournaments: Tournament[]): Tournament[] {
  return [...tournaments].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )
}

export function getUpcomingTournaments(tournaments: Tournament[]): Tournament[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return sortByDate(
    tournaments.filter((t) => new Date(t.startDate) >= today && t.status !== 'Finished')
  )
}

export function getGoogleMapsUrl(venue: string, prefecture: string, city?: string): string {
  const query = encodeURIComponent(`${prefecture}${city || ''}${venue}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
