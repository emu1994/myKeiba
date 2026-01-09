# NEO HORSE RACING

リアルタイム・シミュレーション競馬ゲーム

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで `http://localhost:5173` を開く

## ビルド

本番用ビルド:
```bash
npm run build
```

ビルドのプレビュー:
```bash
npm run preview
```

## 機能

- 11レースの競馬シミュレーション
- 複数の投票タイプ（単勝、複勝、馬連、馬単、三連複、三連単）
- ボックス、フォーメーション、ながしなどの投票方法
- リアルタイムレースアニメーション
- 払戻計算と結果表示
- ゲーム設定（初期所持金、レース数のカスタマイズ）
- ゲームオーバー/クリア判定
- 購入金額の直接入力と全額按分機能

## GitHubへのアップロード手順

### 方法1: Gitコマンドを使用（推奨）

1. **GitHubでリポジトリを作成**
   - GitHubにログインして、新しいリポジトリを作成
   - リポジトリ名を入力（例: `neo-horse-racing`）
   - PublicまたはPrivateを選択
   - 「Initialize this repository with a README」はチェックしない

2. **Gitリポジトリを初期化**
   ```bash
   git init
   ```

3. **ファイルをステージング**
   ```bash
   git add .
   ```

4. **初回コミット**
   ```bash
   git commit -m "Initial commit: NEO HORSE RACING game"
   ```

5. **リモートリポジトリを追加**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   （YOUR_USERNAMEとYOUR_REPO_NAMEを実際の値に置き換えてください）

6. **ブランチ名を設定（必要に応じて）**
   ```bash
   git branch -M main
   ```

7. **GitHubにプッシュ**
   ```bash
   git push -u origin main
   ```

### 方法2: GitHub Desktopを使用

1. [GitHub Desktop](https://desktop.github.com/)をダウンロードしてインストール
2. GitHub Desktopを開き、GitHubアカウントでログイン
3. 「File」→「Add Local Repository」を選択
4. プロジェクトフォルダを選択
5. 「Publish repository」をクリックしてGitHubにアップロード

### 方法3: GitHub Webインターフェースを使用

1. GitHubで新しいリポジトリを作成
2. 「uploading an existing file」をクリック
3. プロジェクトフォルダ内のファイルをドラッグ&ドロップ
4. 「Commit changes」をクリック

## 技術スタック

- React 18
- Vite
- Tailwind CSS
- Lucide React (アイコン)

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── BetAmountSelector.jsx
│   ├── BetCart.jsx
│   ├── BettingScreen.jsx
│   ├── GameClear.jsx
│   ├── GameOver.jsx
│   ├── GameSettings.jsx
│   ├── LiveRace.jsx
│   ├── Lobby.jsx
│   ├── ResultScreen.jsx
│   └── RunnerTable.jsx
├── constants.js         # 定数定義
├── utils.js            # ユーティリティ関数
├── App.jsx             # メインアプリケーション
├── main.jsx            # エントリーポイント
└── index.css           # スタイル
