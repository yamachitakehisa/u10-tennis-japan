export type BallType = 'Red' | 'Orange' | 'Green' | 'Yellow' | 'Mixed' | 'Unknown'
export type Level = 'FirstTimer' | 'Beginner' | 'Intermediate' | 'Competitive' | 'Unknown'
export type EventType = 'Singles' | 'Doubles' | 'Team' | 'MatchPractice' | 'LessonEvent' | 'Unknown'
export type Status = 'Open' | 'ClosingSoon' | 'Closed' | 'Finished' | 'CheckRequired'
export type VisitorAllowed = 'Yes' | 'No' | 'Unknown'

/** 日程の確度 */
export type DateStatus = 'Confirmed' | 'Estimated' | 'Historical'

/** 主催者種別 */
export type OrganizerType = 'Official' | 'Private' | 'MatchPlay'

/** 大会レベル詳細 */
export type CompetitionLevel = 'National' | 'Regional' | 'Prefecture' | 'Club' | 'Open'

export type Region =
  | '北海道・東北'
  | '関東'
  | '中部'
  | '関西'
  | '中国・四国'
  | '九州・沖縄'
  | '東南アジア'
  | 'その他海外'

export type Country = 'Japan' | 'Singapore' | 'Malaysia' | 'Other'

export interface Tournament {
  id: string
  name: string
  startDate: string
  endDate?: string
  prefecture: string
  city?: string
  venue: string
  region: Region
  country?: Country
  ballType: BallType
  ageCategory: string[]
  level: Level
  eventType: EventType
  organizer: string
  organizerType?: OrganizerType
  competitionLevel?: CompetitionLevel
  entryDeadline?: string
  entryFee?: string
  eligibility?: string
  visitorAllowed?: VisitorAllowed
  officialUrl: string
  sourceName: string
  verifiedAt: string
  dateStatus?: DateStatus
  status: Status
  notes?: string
  /** この大会に向いている子（詳細ページ表示用） */
  suitedFor?: string
  /** 保護者への注意点（詳細ページ表示用） */
  cautions?: string
}

export interface FilterState {
  month: string
  prefecture: string
  region: string
  ageCategory: string
  ballType: string
  level: string
  openOnly: boolean
  visitorOnly: boolean
  overseasOnly: boolean
}
