# セットアップガイド

このドキュメントでは、Audio Player の開発環境のセットアップ手順を説明します。

## 前提条件

以下のツールがインストールされている必要があります：

- **Node.js**: v18.0.0 以上
- **npm**: v9.0.0 以上（Node.js に付属）
- **Git**: バージョン管理用

### Node.js のインストール確認

```bash
node --version
npm --version
```

## プロジェクトのセットアップ

### 1. リポジトリのクローン（既存プロジェクトの場合）

```bash
git clone https://github.com/ユーザー名/sanae-voice-app.git
cd sanae-voice-app
```

### 2. 依存関係のインストール

```bash
npm install
```

これにより、`package.json` に記載された全ての依存パッケージがインストールされます。

### 3. 音声ファイルの配置

`public/audio/` ディレクトリに MP3 ファイルを配置します：

```
public/
└── audio/
    ├── voice-01.mp3
    ├── voice-02.mp3
    └── .gitkeep
```

**重要**: 音声ファイルは `voice-XX.mp3` 形式で命名してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、アプリケーションが表示されます。

## 開発コマンド

### 開発サーバー

```bash
npm run dev
```

ホットリロード機能付きで開発サーバーを起動します。

### ビルド

```bash
npm run build
```

プロダクション用にアプリケーションをビルドします。出力は `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

ビルドしたアプリケーションをローカルでプレビューします。

### コード品質チェック

#### ESLint

```bash
npm run lint
```

コードの構文エラーやスタイル違反をチェックします。

#### Prettier

```bash
npm run format
```

コードを自動フォーマットします。

## GitHub Pages へのデプロイ

### 初回デプロイ

1. **GitHub リポジトリの作成**
   - GitHub で新しいリポジトリを作成

2. **vite.config.ts の設定**
   - `base` をリポジトリ名に変更：
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/sanae-voice-app/', // リポジトリ名に合わせる
   });
   ```

3. **Git の初期化とプッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/ユーザー名/sanae-voice-app.git
   git branch -M main
   git push -u origin main
   ```

4. **デプロイ**
   ```bash
   npm run deploy
   ```

5. **GitHub Pages の設定**
   - リポジトリの Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`
   - Save

### 更新時のデプロイ

```bash
# コードの変更をコミット
git add .
git commit -m "Update: 変更内容"
git push

# デプロイ
npm run deploy
```

## トラブルシューティング

### 依存関係のインストールエラー

```bash
# node_modules と package-lock.json を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### 開発サーバーが起動しない

- ポート 5173 が既に使用されていないか確認
- Node.js のバージョンを確認（v18.0.0 以上）

### 音声が再生されない

- 音声ファイルが `public/audio/` に配置されているか確認
- ファイル名が `voice-XX.mp3` 形式になっているか確認
- `src/App.tsx` の `playlist` 配列に追加されているか確認

### GitHub Pages でページが表示されない

- `vite.config.ts` の `base` がリポジトリ名と一致しているか確認
- GitHub Pages の設定で `gh-pages` ブランチが選択されているか確認
- デプロイが完了するまで数分待つ

## プロジェクト構造

```
sanae-voice-app/
├── public/
│   └── audio/              # 音声ファイル
├── src/
│   ├── App.tsx             # メインコンポーネント
│   ├── App.css             # プレーヤースタイル
│   ├── main.tsx            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── .eslintrc.cjs           # ESLint 設定
├── .prettierrc             # Prettier 設定
├── .gitignore              # Git 除外設定
├── index.html              # HTML テンプレート
├── package.json            # 依存関係
├── tsconfig.json           # TypeScript 設定
├── vite.config.ts          # Vite 設定
├── README.md               # プロジェクト概要
├── SETUP.md                # このファイル
└── CLAUDE.md               # 開発ガイド
```

## 追加情報

詳細な開発ガイドは [CLAUDE.md](./CLAUDE.md) を参照してください。
