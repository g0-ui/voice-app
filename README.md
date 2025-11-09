# Audio Player

React + TypeScriptで構築されたシンプルな音声再生Webアプリケーション。

## 主な機能

- **音声再生コントロール**: 再生/一時停止、前の曲/次の曲、リピート
- **音量調整**: スライダーで音量を調整
- **シークバー**: 再生位置の表示と変更
- **プレイリスト**: 全曲リスト表示と選択

## 技術スタック

- React 18
- TypeScript
- Vite
- ESLint + Prettier

## デザイン

- ピンクのグラデーション
- レスポンシブデザイン（モバイル対応）
- シンプルでモダンなUI

## セットアップ

詳しいセットアップ手順は [SETUP.md](./SETUP.md) をご覧ください。

### クイックスタート

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

## 音声ファイルの追加

1. `public/audio/` に MP3 ファイルを配置（`voice-01.mp3`, `voice-02.mp3` など）
2. `src/App.tsx` の `playlist` 配列を更新

```typescript
const playlist = [
  'voice-01.mp3',
  'voice-02.mp3',
  'voice-03.mp3'  // 追加
];
```

## デプロイ

GitHub Pages へのデプロイ:

```bash
npm run deploy
```

デプロイ前に `vite.config.ts` の `base` をリポジトリ名に合わせて設定してください。

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run preview  # ビルドのプレビュー
npm run lint     # ESLint
npm run format   # Prettier
npm run deploy   # GitHub Pages へデプロイ
```

## ライセンス

MIT
