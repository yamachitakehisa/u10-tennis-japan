import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎾</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">ページが見つかりません</h1>
      <p className="text-gray-500 text-sm mb-6">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
      >
        トップページへ戻る
      </Link>
    </div>
  )
}
