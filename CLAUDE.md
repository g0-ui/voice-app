# Audio Player - Claude開発ガイド

## プロジェクト概要

React + TypeScriptで構築されたシンプルな音声再生Webアプリケーション。
MP3形式の音声ファイルを再生し、基本的なプレイリスト機能を提供します。

## 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **ビルドツール**: Vite
- **コード品質**: ESLint + Prettier
- **バージョン管理**: Git
- **ホスティング**: GitHub Pages

## プロジェクト要件

### 音声ファイル
- **フォーマット**: MP3
- **命名規則**: `voice-01.mp3`, `voice-02.mp3`, `voice-03.mp3`...（`voice-〇〇(数字).mp3`で統一）
- **配置場所**: `public/audio/`
- **現在の音声数**: 2ファイル（今後追加予定）
- **メタデータ**: タイトル、アーティスト名などは不要

### 機能要件

#### 必須機能
1. **再生コントロール**
   - 再生/一時停止ボタン
   - 前の曲/次の曲ボタン
   - リピート再生

2. **音声調整**
   - 音量調整スライダー
   - シークバー（再生位置の表示と変更）
   - 再生時間表示（現在時刻/総時間）

3. **プレイリスト**
   - 全曲リスト表示
   - クリックで曲を選択
   - 現在再生中の曲をハイライト

#### 不要な機能
- タイトル、アーティスト名の表示
- アルバムアート
- シャッフル再生
- イコライザー
- プレイリストの編集機能

### デザイン要件
- **カラーテーマ**: ピンクのグラデーション
- **スタイル**: シンプルでモダン
- **レスポンシブ**: モバイル対応
- **UI**: 直感的で使いやすい

## ファイル構成

```
audio-player/
├── public/
│   └── audio/              # 音声ファイル配置ディレクトリ
│       ├── voice-01.mp3
│       ├── voice-02.mp3
│       └── .gitkeep
├── src/
│   ├── App.tsx             # メインコンポーネント（プレーヤーロジック）
│   ├── App.css             # プレーヤースタイル
│   ├── main.tsx            # Reactエントリーポイント
│   └── index.css           # グローバルスタイル
├── .eslintrc.cjs           # ESLint設定
├── .prettierrc             # Prettier設定
├── .gitignore              # Git除外設定
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係とスクリプト
├── tsconfig.json           # TypeScript設定
├── tsconfig.node.json      # Vite用TypeScript設定
├── vite.config.ts          # Vite設定（GitHub Pages用）
├── README.md               # プロジェクトドキュメント
├── SETUP.md                # セットアップガイド
└── CLAUDE.md               # このファイル
```

## 開発ルール

### コーディング規約

#### TypeScript
- 厳格な型チェックを有効化
- `any` 型の使用は極力避ける
- インターフェースまたは型エイリアスで型を定義

#### React
- 関数コンポーネントを使用
- Hooksを活用（useState, useRef, useEffect）
- propsの型を明確に定義

#### スタイル
- CSS Modulesは使用せず、通常のCSSファイルを使用
- クラス名はケバブケース（例: `.player-container`）
- グラデーションカラーはピンク系（`#ff6b9d`, `#ffc3e0`など）

### コード品質

#### ESLint
```bash
npm run lint
```
- TypeScript推奨ルールを適用
- React Hooksルールを適用
- 未使用変数の警告

#### Prettier
```bash
npm run format
```
- セミコロン: 使用する
- クォート: シングルクォート
- 行幅: 100文字
- タブ幅: 2スペース

## プレイリストの管理

### 音声ファイルの追加方法

1. `public/audio/` に新しいMP3ファイルを配置
   ```
   public/audio/voice-03.mp3
   ```

2. `src/App.tsx` の `playlist` 配列を更新
   ```typescript
   const playlist = [
     'voice-01.mp3',
     'voice-02.mp3',
     'voice-03.mp3'  // 追加
   ];
   ```

### 命名規則の重要性
- ファイル名は必ず `voice-XX.mp3` 形式で統一
- 数字は2桁（01, 02, 03...）を推奨
- 一貫性を保つことで管理が容易

## 主要コンポーネント

### App.tsx の主な state

```typescript
const [currentTrack, setCurrentTrack] = useState(0);     // 現在の曲インデックス
const [isPlaying, setIsPlaying] = useState(false);       // 再生状態
const [currentTime, setCurrentTime] = useState(0);       // 現在の再生位置
const [duration, setDuration] = useState(0);             // 曲の総時間
const [volume, setVolume] = useState(1);                 // 音量（0-1）
const [isRepeat, setIsRepeat] = useState(false);         // リピート状態
```

### 主な機能

- `togglePlay()`: 再生/一時停止の切り替え
- `playPrevious()`: 前の曲へ移動
- `playNext()`: 次の曲へ移動
- `handleSeek()`: シークバーの操作
- `handleVolumeChange()`: 音量調整
- `toggleRepeat()`: リピートのON/OFF
- `selectTrack()`: プレイリストから曲を選択

## デプロイ

### GitHub Pagesへのデプロイ手順

1. **リポジトリの作成**
   - GitHubで新規リポジトリを作成

2. **vite.config.ts の設定**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/リポジトリ名/',  // 重要: リポジトリ名に合わせる
   });
   ```

3. **初回デプロイ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/ユーザー名/リポジトリ名.git
   git branch -M main
   git push -u origin main
   npm run deploy
   ```

4. **GitHub Pagesの設定**
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`

5. **更新時のデプロイ**
   ```bash
   npm run deploy
   ```

### デプロイURL
```
https://ユーザー名.github.io/リポジトリ名/
```

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（ポート: 5173）
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# コードのリント
npm run lint

# コードのフォーマット
npm run format

# GitHub Pagesへデプロイ
npm run deploy
```

## トラブルシューティング

### 音声が再生されない
- ファイルパスが `/audio/voice-XX.mp3` になっているか確認
- ブラウザのコンソールでエラーを確認
- 音声ファイルが正しい場所に配置されているか確認

### GitHub Pagesで404エラー
- `vite.config.ts` の `base` がリポジトリ名と一致しているか確認
- `npm run deploy` が正常に完了したか確認
- GitHub Pagesの設定で `gh-pages` ブランチが選択されているか確認

### スタイルが反映されない
- ブラウザのキャッシュをクリア
- `npm run build` でビルドが成功しているか確認

## 今後の拡張可能性

### 追加を検討できる機能
- プレイリストのドラッグ&ドロップ並び替え
- ダークモード
- キーボードショートカット
- 再生速度の変更
- ローカルストレージで状態の保存

### 非推奨の機能
- 複雑なメタデータ管理
- 外部APIとの連携
- ユーザー認証
- サーバーサイドの機能

## メンテナンス

### 定期的に行うべき作業
- 依存関係の更新（`npm update`）
- ESLintとPrettierのルール見直し
- 不要なコードの削除
- パフォーマンスの確認

### 音声ファイルの管理
- ファイルサイズに注意（大きすぎると読み込みが遅い）
- 命名規則の遵守
- バックアップの作成

## プロジェクトの目標

このプロジェクトは以下を目指します：
- シンプルで使いやすい音声プレーヤー
- 保守性の高いコード
- 拡張可能な設計
- 美しいデザイン

---

**最終更新**: 2024年11月
**開発者向けドキュメント**: このファイルはClaudeが開発をサポートするための情報を含みます。
