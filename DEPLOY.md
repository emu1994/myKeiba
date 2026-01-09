# GitHub Pages デプロイ手順

## 問題の確認

アプリが反映されない場合、以下の点を確認してください：

### 1. GitHub Actionsの確認

1. リポジトリの「Actions」タブを開く
2. 最新のワークフロー実行を確認
3. 「build」と「deploy」のジョブが成功しているか確認
4. エラーがある場合は、ログを確認

### 2. GitHub Pagesの設定確認

1. リポジトリの「Settings」→「Pages」に移動
2. 「Source」が「GitHub Actions」に設定されているか確認
3. 「Custom domain」が設定されていないか確認（設定されている場合は削除）

### 3. ビルドされたファイルの確認

1. リポジトリの「Actions」タブで、最新のワークフロー実行を開く
2. 「build」ジョブの「Upload artifact」ステップを確認
3. アーティファクトが正しくアップロードされているか確認

### 4. ブラウザの確認

1. `https://emu1994.github.io/myKeiba/` にアクセス
2. ブラウザの開発者ツール（F12）を開く
3. 「Console」タブでエラーを確認
4. 「Network」タブで、アセットが正しく読み込まれているか確認

### 5. よくある問題と解決方法

#### 問題: 404エラーが表示される
- **原因**: パスが正しく設定されていない
- **解決**: `vite.config.js`の`base: '/myKeiba/'`が正しく設定されているか確認

#### 問題: 白い画面が表示される
- **原因**: JavaScriptが読み込まれていない、またはエラーが発生している
- **解決**: ブラウザのコンソールでエラーを確認

#### 問題: アセットが読み込まれない
- **原因**: パスが正しく設定されていない
- **解決**: `dist/index.html`で、アセットのパスが`/myKeiba/assets/...`になっているか確認

#### 問題: GitHub Actionsが失敗する
- **原因**: 依存関係のインストールやビルドに失敗している
- **解決**: ワークフローのログを確認し、エラーメッセージを確認

## 手動デプロイ（緊急時）

GitHub Actionsが動作しない場合：

1. ローカルでビルド
   ```bash
   npm run build
   ```

2. `dist`フォルダの内容を`gh-pages`ブランチにプッシュ
   ```bash
   git checkout -b gh-pages
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. GitHub Pagesの設定で「Deploy from a branch」を選択
4. ブランチ: `gh-pages`、フォルダ: `/ (root)` を選択
