# U10 Junior Tennis Japan - 起動手順

## セットアップ

```bash
# プロジェクトフォルダに移動
cd "U10ジュニアテニス大会HP作成"

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## ページ構成

| URL | 説明 |
|-----|------|
| / | トップページ |
| /tournaments | 大会一覧（フィルター付き） |
| /tournaments/[id] | 大会詳細ページ |
| /regions/関東 | 地域別ページ |
| /balls/Red | レッドボール大会 |
| /balls/Orange | オレンジボール大会 |
| /balls/Green | グリーンボール大会 |
| /contact | お問い合わせ |

## 大会データの追加方法

`data/tournaments.json` に大会情報を追加します。
型定義は `lib/types.ts` を参照してください。

## 静的サイトとしてビルド

```bash
npm run build
```

`out/` フォルダに静的HTMLが生成されます。
Vercel・Netlify・GitHub Pagesなどにデプロイできます。
