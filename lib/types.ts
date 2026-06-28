export type BallType = 'Red' | 'Orange' | 'Green' | 'Yellow' | 'Mixed' | 'Unknown'
export type Level = 'FirstTimer' | 'Beginner' | 'Intermediate' | 'Competitive' | 'Unknown'
export type EventType = 'Singles' | 'Doubles' | 'Team' | 'MatchPractice' | 'LessonEvent' | 'Unknown'
export type Status = 'Open' | 'ClosingSoon' | 'Closed' | 'Finished' | 'CheckRequired'
export type VisitorAllowed = 'Yes' | 'No' | 'Unknown'

export type Region =
  | '北海道・東北'
  | '関東'
  | '中部'
  | '関西'
  | '中国・四国'
  | '九州・沖縄'
  | 'シンガポール'
  | 'マレーシア'
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
  entryDeadline?: string
  entryFee?: string
  eligibility?: string
  visitorAllowed?: VisitorAllowed
  officialUrl: string
  sourceName: string
  verifiedAt: string
  status: Status
  notes?: string
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
