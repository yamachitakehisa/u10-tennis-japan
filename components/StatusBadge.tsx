import { STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'
import type { Status } from '@/lib/types'

interface Props {
  status: Status
}

export default function StatusBadge({ status }: Props) {
  const colors = STATUS_COLORS[status]
  const label = STATUS_LABELS[status]

  return (
    <span
      className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
    >
      {label}
    </span>
  )
}
