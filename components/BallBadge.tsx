import { BALL_TYPE_LABELS, BALL_TYPE_COLORS, BALL_DOT_COLORS } from '@/lib/utils'
import type { BallType } from '@/lib/types'

interface Props {
  ballType: BallType
  size?: 'sm' | 'md'
}

export default function BallBadge({ ballType, size = 'md' }: Props) {
  const colors = BALL_TYPE_COLORS[ballType]
  const dotColor = BALL_DOT_COLORS[ballType]
  const label = BALL_TYPE_LABELS[ballType]
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${colors.bg} ${colors.text} ${colors.border} ${sizeClass}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />
      {label}
    </span>
  )
}
