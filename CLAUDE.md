# Audio Player - Claude開発ガイド（React H5 Audio Player + Chakra UI版）

## プロジェクト概要

React + TypeScript + React H5 Audio Player + Chakra UIで構築されたモダンな音声再生Webアプリケーション。
MP3形式の音声ファイルを再生し、洗練されたUIとプレイリスト機能を提供します。

## 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **オーディオライブラリ**: React H5 Audio Player
- **UIライブラリ**: Chakra UI
- **ビルドツール**: Vite
- **アイコン**: Chakra UI Icons / React Icons
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
   - 再生/一時停止ボタン（React H5 Audio Player内蔵）
   - 前の曲/次の曲ボタン（カスタムコントロール）
   - リピート再生（全曲リピート）

2. **音声調整**
   - 音量調整スライダー（React H5 Audio Player内蔵）
   - シークバー（React H5 Audio Player内蔵）
   - 再生時間表示（React H5 Audio Player内蔵）

3. **プレイリスト**
   - 全曲リスト表示（Chakra UIのList/Stack）
   - クリックで曲を選択
   - 現在再生中の曲をハイライト（Chakra UIのカラースキーム）

#### 不要な機能
- タイトル、アーティスト名の表示
- アルバムアート
- シャッフル再生
- イコライザー
- プレイリストの編集機能

### デザイン要件
- **カラーテーマ**: Chakra UIのカスタムテーマ（ピンク/パープル系）
- **スタイル**: モダンでクリーン、マテリアルデザインの影響
- **レスポンシブ**: モバイルファースト（Chakra UIのレスポンシブProps）
- **UI**: 直感的で使いやすい、アクセシビリティ対応
- **ダークモード**: Chakra UIのColorMode対応（オプション）

## ファイル構成

```
audio-player/
├── public/
│   └── audio/              # 音声ファイル配置ディレクトリ
│       ├── voice-01.mp3
│       ├── voice-02.mp3
│       └── .gitkeep
├── src/
│   ├── components/         # コンポーネントディレクトリ
│   │   ├── AudioPlayer.tsx # メインプレーヤーコンポーネント
│   │   └── Playlist.tsx    # プレイリストコンポーネント
│   ├── theme/              # Chakra UIカスタムテーマ
│   │   └── index.ts        # テーマ設定
│   ├── App.tsx             # アプリケーションルート
│   ├── main.tsx            # Reactエントリーポイント
│   └── vite-env.d.ts       # Vite型定義
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
- React H5 Audio Playerの型定義を活用

#### React
- 関数コンポーネントを使用
- Hooksを活用（useState, useRef, useEffect, useCallback）
- propsの型を明確に定義
- コンポーネントは責務ごとに分割（AudioPlayer, Playlist）

#### Chakra UI
- スタイリングはChakra UIのPropsシステムを優先
- `sx` propは複雑なスタイルのみに使用
- カスタムテーマでブランドカラーを定義
- レスポンシブデザインはChakra UIの配列記法を活用
  ```tsx
  <Box width={{ base: "100%", md: "80%", lg: "60%" }} />
  ```

#### スタイル
- CSS/App.cssは最小限に（グローバルスタイルのみ）
- Chakra UIのテーマシステムで一元管理
- カラーは`theme.colors`で定義
- スペーシングは`theme.space`を使用

#### レイアウト
左側にプレイリストを配置
中央にプレイヤーを配置する
右側に関連リンク、使用ライブラリの情報を配置

プレイヤーの見た目は角が丸い四角形で、上側にアルバム画像を配置(画像は後で用意)
真ん中にシークバー、下側に左から「前に戻るボタン」「再生ボタン」「次に進むボタン」「リピートボタン」を配置する。

プレイリストはシンプルな見た目で、左側に再生ボタン(プレーヤーのものと同じ)があり、隣にタイトル。
再生中の項目には「Now Playing」を表示し、再生している項目を分かりやすくする。

アプリの背景はピンクのグラデーション。


### コード品質

#### ESLint
```bash
npm run lint
```
- TypeScript推奨ルールを適用
- React Hooksルールを適用
- Chakra UI関連のアクセシビリティチェック
- 未使用変数の警告

#### Prettier
```bash
npm run format
```
- セミコロン: 使用する
- クォート: シングルクォート
- 行幅: 100文字
- タブ幅: 2スペース
- JSX: シングルクォート

## プレイリストの管理

### 音声ファイルの追加方法

1. `public/audio/` に新しいMP3ファイルを配置
   ```
   public/audio/voice-03.mp3
   ```

2. プレイリストデータを管理する状態を更新
   ```typescript
   const playlist = [
     { id: '01', src: '/audio/voice-01.mp3' },
     { id: '02', src: '/audio/voice-02.mp3' },
     { id: '03', src: '/audio/voice-03.mp3' }  // 追加
   ];
   ```

### 命名規則の重要性
- ファイル名は必ず `voice-XX.mp3` 形式で統一
- 数字は2桁（01, 02, 03...）を推奨
- 一貫性を保つことで管理が容易

## 主要コンポーネント

### App.tsx の役割
- 全体のレイアウト管理
- Chakra UIの `ChakraProvider` でラップ
- カスタムテーマの適用
- AudioPlayerとPlaylistコンポーネントの統合

### AudioPlayer.tsx の主な state

```typescript
const [currentTrackIndex, setCurrentTrackIndex] = useState(0);  // 現在の曲インデックス
const [playlist] = useState([...]);                              // プレイリスト
const [isRepeat, setIsRepeat] = useState(false);                 // リピート状態
const audioPlayerRef = useRef<ReactAudioPlayer>(null);           // H5 Audio Playerの参照
```

### React H5 Audio Playerの主要Props

```typescript
<ReactAudioPlayer
  src={playlist[currentTrackIndex].src}
  autoPlay={false}
  controls
  onEnded={handleTrackEnd}
  onPlay={handlePlay}
  onPause={handlePause}
  customAdditionalControls={[
    <IconButton key="prev" icon={<ChevronLeftIcon />} onClick={playPrevious} />,
    <IconButton key="next" icon={<ChevronRightIcon />} onClick={playNext} />,
    <IconButton key="repeat" icon={<RepeatIcon />} onClick={toggleRepeat} />
  ]}
  customVolumeControls={[]}
  showJumpControls={false}
  layout="horizontal"
/>
```

### Playlist.tsx の機能
- プレイリストの表示（Chakra UIの `List`, `ListItem`）
- 現在再生中のトラックをハイライト（`colorScheme="pink"`）
- クリックでトラックを選択
- レスポンシブデザイン

### Chakra UIカスタムテーマ

```typescript
// src/theme/index.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#ffe0f0',
      100: '#ffb3d9',
      200: '#ff80c2',
      300: '#ff4dab',
      400: '#ff1a94',
      500: '#e6007a',
      600: '#b3005f',
      700: '#800045',
      800: '#4d002a',
      900: '#1a000f',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme;
```

## 依存関係のインストール

### 必須パッケージ

```bash
# Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# React H5 Audio Player
npm install react-h5-audio-player

# アイコン（オプション）
npm install react-icons

# 型定義
npm install -D @types/react-h5-audio-player
```

### package.jsonの例

```json
{
  "dependencies": {
    "@chakra-ui/react": "^2.8.2",
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "framer-motion": "^11.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-h5-audio-player": "^3.9.1",
    "react-icons": "^5.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@types/react-h5-audio-player": "^3.0.3",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "prettier": "^3.2.4",
    "typescript": "^5.3.3",
    "vite": "^5.0.12"
  }
}
```

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
   git commit -m "feat: initial commit with React H5 Audio Player and Chakra UI"
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
- React H5 Audio Playerの `src` propが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認
- 音声ファイルが正しい場所に配置されているか確認

### Chakra UIのスタイルが適用されない
- `ChakraProvider` でアプリケーションがラップされているか確認
- カスタムテーマが正しくインポートされているか確認
- `@emotion/react` と `@emotion/styled` がインストールされているか確認

### React H5 Audio Playerのカスタマイズができない
- `customAdditionalControls` propを使用してカスタムボタンを追加
- `customVolumeControls` でボリュームコントロールをカスタマイズ
- CSSで `.rhap_container` クラスをオーバーライド（最終手段）

### GitHub Pagesで404エラー
- `vite.config.ts` の `base` がリポジトリ名と一致しているか確認
- `npm run deploy` が正常に完了したか確認
- GitHub Pagesの設定で `gh-pages` ブランチが選択されているか確認

### ダークモードが動作しない
- `ChakraProvider` に `theme` propが渡されているか確認
- `ColorModeScript` が `index.html` に追加されているか確認
- `useColorMode` hookを正しく使用しているか確認

## React H5 Audio Player カスタマイズ

### 基本設定

```typescript
<ReactAudioPlayer
  // 必須props
  src={currentTrack}
  
  // 自動再生
  autoPlay={false}
  
  // 標準コントロール表示
  controls
  
  // イベントハンドラ
  onEnded={handleEnded}
  onPlay={handlePlay}
  onPause={handlePause}
  onLoadedMetadata={handleLoadedMetadata}
  
  // レイアウト
  layout="horizontal"  // または "stacked", "stacked-reverse"
  
  // 追加コントロール
  customAdditionalControls={[...]}
  
  // ボリュームコントロール
  customVolumeControls={[...]}
  
  // ジャンプコントロール（10秒スキップ）
  showJumpControls={false}
  
  // ダウンロードボタン
  showDownloadProgress={false}
  
  // フィルパーセンテージ
  showFilledProgress={true}
/>
```

### スタイルのカスタマイズ

```css
/* グローバルスタイルまたはApp.cssに追加 */
.rhap_container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
}

.rhap_progress-filled,
.rhap_progress-indicator {
  background-color: #fff;
}

.rhap_time {
  color: #fff;
}

.rhap_button-clear {
  color: #fff;
}
```

## Chakra UI活用例

### レスポンシブレイアウト

```tsx
<Container maxW="container.xl">
  <Stack
    direction={{ base: 'column', md: 'row' }}
    spacing={8}
    align="stretch"
  >
    <Box flex={1}>
      <AudioPlayer />
    </Box>
    <Box
      flex={{ base: 1, md: 0.4 }}
      maxH={{ base: 'auto', md: '600px' }}
      overflowY="auto"
    >
      <Playlist />
    </Box>
  </Stack>
</Container>
```

### カスタムボタンコンポーネント

```tsx
<IconButton
  aria-label="Previous track"
  icon={<ChevronLeftIcon />}
  onClick={playPrevious}
  colorScheme="pink"
  variant="ghost"
  size="lg"
  isRound
  _hover={{
    bg: 'pink.100',
    transform: 'scale(1.1)',
  }}
  transition="all 0.2s"
/>
```

### プレイリストアイテム

```tsx
<ListItem
  p={4}
  cursor="pointer"
  bg={isCurrentTrack ? 'pink.100' : 'white'}
  borderRadius="md"
  _hover={{
    bg: isCurrentTrack ? 'pink.200' : 'gray.100',
  }}
  onClick={() => onSelectTrack(index)}
  transition="all 0.2s"
>
  <HStack justify="space-between">
    <HStack>
      <Icon as={isCurrentTrack ? MdPlayArrow : MdMusicNote} />
      <Text fontWeight={isCurrentTrack ? 'bold' : 'normal'}>
        Track {track.id}
      </Text>
    </HStack>
    {isCurrentTrack && <Badge colorScheme="pink">Playing</Badge>}
  </HStack>
</ListItem>
```

## 今後の拡張可能性

### 追加を検討できる機能
- ダークモード切り替え（Chakra UIの `useColorMode`）
- プレイリストのドラッグ&ドロップ並び替え（`react-beautiful-dnd`）
- キーボードショートカット（`useHotkeys`）
- 再生速度の変更（React H5 Audio Playerの拡張）
- ローカルストレージで状態の保存（`useLocalStorage` hook）
- アニメーション効果（Framer Motion）
- ビジュアライザー（Web Audio API）

### Chakra UIとの統合アイデア
- モーダルでプレイリスト編集
- トースト通知でトラック変更を通知
- ドロワーでサイドバープレイリスト
- ポップオーバーで詳細設定
- スケルトンローディング

### 非推奨の機能
- 複雑なメタデータ管理
- 外部APIとの連携（ストリーミングサービス等）
- ユーザー認証
- サーバーサイドの機能

## メンテナンス

### 定期的に行うべき作業
- 依存関係の更新（`npm update`）
  - 特に `@chakra-ui/*` パッケージは頻繁に更新
  - React H5 Audio Playerのバグ修正を確認
- ESLintとPrettierのルール見直し
- 不要なコードの削除
- パフォーマンスの確認（React DevTools Profiler）
- アクセシビリティの検証（Chakra UIは基本的に対応済み）

### 音声ファイルの管理
- ファイルサイズに注意（大きすぎると読み込みが遅い）
- 命名規則の遵守
- バックアップの作成
- 圧縮形式の検討（MP3のビットレート）

## プロジェクトの目標

このプロジェクトは以下を目指します：
- モダンでアクセシブルな音声プレーヤー
- 保守性の高いコード（Chakra UIとReact H5 Audio Playerの活用）
- 拡張可能な設計（コンポーネント分割）
- 美しいデザイン（Chakra UIのデザインシステム）
- レスポンシブ対応（モバイルファースト）

## パフォーマンス最適化

### React最適化
```typescript
// useCallbackでコールバック関数をメモ化
const handleTrackEnd = useCallback(() => {
  if (isRepeat || currentTrackIndex < playlist.length - 1) {
    playNext();
  }
}, [isRepeat, currentTrackIndex, playlist.length]);

// useMemoでプレイリストデータをメモ化
const playlistData = useMemo(() => 
  playlist.map((track, index) => ({
    ...track,
    isActive: index === currentTrackIndex
  }))
, [playlist, currentTrackIndex]);
```

### Chakra UI最適化
- `shouldForwardProp` でDOMに不要なpropsを渡さない
- 大きなリストは仮想化（`react-window` + Chakra UI）
- アニメーションは `framer-motion` のパフォーマンス機能を活用

---

# AI駆動開発 共通ガイドライン

## 開発の基本理念
- 動くコードを書くだけでなく、品質・保守性・安全性を常に意識する
- プロジェクトの段階（プロトタイプ、MVP、本番環境）に応じて適切なバランスを取る
- 問題を見つけたら放置せず、必ず対処または明示的に記録する
- ボーイスカウトルール：コードを見つけた時よりも良い状態で残す

## エラーハンドリングの原則
- 関連が薄く見えるエラーでも必ず解決する
- エラーの抑制（@ts-ignore、try-catch で握りつぶす等）ではなく、根本原因を修正
- 早期にエラーを検出し、明確なエラーメッセージを提供
- エラーケースも必ずテストでカバーする
- 外部APIやネットワーク通信は必ず失敗する可能性を考慮

## コード品質の基準
- DRY原則：重複を避け、単一の信頼できる情報源を維持
- 意味のある変数名・関数名で意図を明確に伝える
- プロジェクト全体で一貫したコーディングスタイルを維持
- 小さな問題も放置せず、発見次第修正（Broken Windows理論）
- コメントは「なぜ」を説明し、「何を」はコードで表現

## テスト規律
- テストをスキップせず、問題があれば修正する
- 実装詳細ではなく振る舞いをテスト
- テスト間の依存を避け、任意の順序で実行可能に
- テストは高速で、常に同じ結果を返すように
- カバレッジは指標であり、質の高いテストを重視

## 保守性とリファクタリング
- 機能追加と同時に既存コードの改善を検討
- 大規模な変更は小さなステップに分割
- 使用されていないコードは積極的に削除
- 依存関係は定期的に更新（セキュリティと互換性のため）
- 技術的負債は明示的にコメントやドキュメントに記録

## セキュリティの考え方
- APIキー、パスワード等は環境変数で管理（ハードコード禁止）
- すべての外部入力を検証
- 必要最小限の権限で動作（最小権限の原則）
- 不要な依存関係を避ける
- セキュリティ監査ツールを定期的に実行

## パフォーマンスの意識
- 推測ではなく計測に基づいて最適化
- 初期段階から拡張性を考慮
- 必要になるまでリソースの読み込みを遅延
- キャッシュの有効期限と無効化戦略を明確に
- N+1問題やオーバーフェッチを避ける

## 信頼性の確保
- タイムアウト処理を適切に設定
- リトライ機構の実装（指数バックオフを考慮）
- サーキットブレーカーパターンの活用
- 一時的な障害に対する耐性を持たせる
- 適切なログとメトリクスで可観測性を確保

## プロジェクトコンテキストの理解
- ビジネス要件と技術要件のバランスを取る
- 現在のフェーズで本当に必要な品質レベルを判断
- 時間制約がある場合でも、最低限の品質基準を維持
- チーム全体の技術レベルに合わせた実装選択

## トレードオフの認識
- すべてを完璧にすることは不可能（銀の弾丸は存在しない）
- 制約の中で最適なバランスを見つける
- プロトタイプなら簡潔さを、本番なら堅牢性を優先
- 妥協点とその理由を明確にドキュメント化

## Git運用の基本
- コンベンショナルコミット形式を使用（feat:, fix:, docs:, test:, refactor:, chore:）
- コミットは原子的で、単一の変更に焦点を当てる
- 明確で説明的なコミットメッセージを英語で記述
- main/masterブランチへの直接コミットは避ける

## コードレビューの姿勢
- レビューコメントは建設的な改善提案として受け取る
- 個人ではなくコードに焦点を当てる
- 変更の理由と影響を明確に説明
- フィードバックを学習機会として歓迎

## デバッグのベストプラクティス
- 問題を確実に再現できる手順を確立
- 二分探索で問題の範囲を絞り込む
- 最近の変更から調査を開始
- デバッガー、プロファイラー等の適切なツールを活用
- 調査結果と解決策を記録し、知識を共有

## 依存関係の管理
- 本当に必要な依存関係のみを追加
- package-lock.json等のロックファイルを必ずコミット
- 新しい依存関係追加前にライセンス、サイズ、メンテナンス状況を確認
- セキュリティパッチとバグ修正のため定期的に更新

## ドキュメントの基準
- READMEにプロジェクトの概要、セットアップ、使用方法を明確に記載
- ドキュメントをコードと同期して更新
- 実例を示すことを優先
- 重要な設計判断はADR (Architecture Decision Records)で記録

## 継続的な改善
- 学んだことを次のプロジェクトに活かす
- 定期的に振り返りを行い、プロセスを改善
- 新しいツールや手法を適切に評価して取り入れる
- チームや将来の開発者のために知識を文書化

---

**最終更新**: 2024年11月
**開発者向けドキュメント**: このファイルはClaudeが開発をサポートするための情報を含みます。
**主な変更点**: React H5 Audio PlayerとChakra UIを使用したモダンなアーキテクチャに更新
