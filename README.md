## 重要
今回からPull Requestを使っていきたいので、mainにマージする前にPRしてください

下記gitコマンドの流れです

### Gitコマンドの流れ（例：feature/my-page機能を作るまで）
1. git checkout main（mainに移動）
2. git pull origin main（mainを最新状態にする）
3. git checkout -b feature/my-page（ブランチを新規作成）
作業完了
4. git status（ブランチの状態を確認）
5. git add .（すべてのファイルを追加） 
5. git commit -m "commit memo"（コミット）
6. git push origin feature/my-page（プッシュ）
7. PRを作成、レビュー、マージ（相手にPRを作成したことを報告、レビューとマージしてもらう）
8. git checkout main（PRでmainにマージ済みなのでmainに移動）
9. git pull origin main（mainを最新状態にする）
10. git branch -d feature/my-page（ローカルでブランチの削除）
11. git push origin --delete feature/my-page（ブランチ削除を同期）

### 補足
- PRですが、mainを自身のブランチにマージしてコンフリクトが起きた場合だけPRを作成するという方法も視野です。（すべてのマージをPRすると確認が大変なので）
- 今回は同じ機能を2人で作成しているのでPRを作成してレビューしてマージの流れにします。

## データ構造

データ構造は `interface.ts` を参照。

### 変更点

- `Routine` に以下を追加
  - `routineName: string` ─ ルーティンの名前
  - `restTime: number` ─ 共通の休憩時間（秒）
- `SetDetail` に以下を追加
  - `restTime?: number` ─ 個別の休憩時間（秒）。未設定時は共通の休憩時間を使う

## 画面配置

- `app/page.tsx` に大まかな配置を行う（横並びでOK）
- 表示する要素
  1. ルーティンの名前
  2. 共通の休憩時間
  3. トレーニングの内容一覧

## 編集機能

- 各トレーニングごとに、個別の休憩時間と詳細を編集できるようにする

## 動作確認方法

- 現時点ではUI表示は最小限でよく、**動作確認はコンソール出力で行う**
- 各操作（編集・保存など）が発火した後、`console.log` で結果を表示する
- 発火条件となるボタンは、画面上に表示する