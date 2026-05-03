# Remotion動画: 株式会社野村総合コンサルティング 紹介

このディレクトリには、`NriConsultingIntro` というRemotionコンポジションを追加しています。

## 構成
- `index.ts`: Remotionエントリポイント
- `Root.tsx`: Composition定義（1920x1080 / 30fps / 450frames）
- `scenes/nri-consulting-intro.tsx`: 会社紹介アニメーション本体

## シーン内容
1. タイトル導入（企業名 + キャッチコピー）
2. 3つの強み表示
3. エンディングメッセージ

## 実行例
```bash
npm install remotion
npx remotion studio remotion/index.ts
npx remotion render remotion/index.ts NriConsultingIntro out/nri-consulting-intro.mp4
```
