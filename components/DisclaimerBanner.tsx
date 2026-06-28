export default function DisclaimerBanner() {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 my-4">
      <div className="flex items-start gap-3">
        <span className="text-yellow-500 text-xl flex-shrink-0">⚠️</span>
        <div className="text-sm text-yellow-800">
          <p className="font-bold mb-1">このサイトは非公式の情報カレンダーです</p>
          <p>
            掲載している大会情報は公開情報をもとに作成していますが、正確性・最新性を保証するものではありません。
            <strong>必ず各大会の公式ページ・主催者サイトで最新情報をご確認ください。</strong>
            申込・参加に関するご質問は主催者へ直接お問い合わせください。
          </p>
        </div>
      </div>
    </div>
  )
}
