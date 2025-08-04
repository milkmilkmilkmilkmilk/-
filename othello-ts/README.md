# オセロゲーム (Othello Game)

TypeScriptとReactで作成されたシンプルなオセロゲームです。

## 🎮 機能

- 8x8のオセロボード
- 有効な手の視覚的表示
- リアルタイムスコア表示
- ゲーム終了判定
- リセット機能
- レスポンシブデザイン

## 🚀 デモ

[デモリンクをここに追加]

## 🛠️ 技術スタック

- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **CSS3** - スタイリング

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/othello-game.git

# ディレクトリに移動
cd othello-game

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🎯 遊び方

1. 黒が先手で開始
2. 黄色の点で表示される有効な手に石を置く
3. 相手の石を挟んで自動的にひっくり返す
4. 両者とも置けなくなったらゲーム終了
5. 「ゲームをリセット」ボタンで新しいゲーム開始

## 🏗️ ビルド

```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── OthelloBoard.tsx    # オセロボードコンポーネント
│   └── GameInfo.tsx        # ゲーム情報コンポーネント
├── hooks/
│   └── useOthello.ts       # ゲームロジック
├── App.tsx                 # メインコンポーネント
└── App.css                 # スタイル
```

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

## 📄 ライセンス

MIT License

## 👨‍💻 作者

[あなたの名前]
