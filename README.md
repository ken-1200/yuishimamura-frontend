# yuishimamura-frontend

| Structure       |                    |
| --------------- | ------------------ |
| Node            | v18.16.1           |
| Package manager | npm v9.7.2         |
| Build tools     | Vite v1.1.1        |
| Framework       | React + TypeScript |
| CSS             | TailWind + Emotion |

※ Node のパッケージマネージャーは volta を推奨

- [Volta](https://volta.sh/)
- [Vite](https://ja.vitejs.dev/)
- [React](https://ja.react.dev/)
- [TailWind](https://tailwindcss.com/)
- [Emotion](https://emotion.sh/)

## Infrastructure

主に AWS のリソースを使用しています。

- Cloudfront
- S3
- ACM
- Route53

```sh
# terraform plan
make plan-wp

# terraform apply
make apply-wp
```

## Deploy

```sh
# upload to S3
make deploy-s3

# deploy to cloudfront
make deploy-cf
```
## Sequence

```mermaid
sequenceDiagram
    participant User as エンドユーザー
    participant Frontend as フロントエンド
    participant Backend as バックエンド
    participant S3 as Amazon S3
    participant Analytics as Google Analytics

    User ->> Frontend: ウェブサイト閲覧
    Frontend ->> User: 静的ページ表示 (CloudFront + S3)

    User ->> Frontend: 画像追加要求
    Frontend ->> Backend: 画像アップロード要求
    Backend ->> S3: 画像アップロード
    S3 -->> Backend: アップロード成功応答
    Backend -->> Frontend: 画像追加成功応答
    Frontend ->> User: 画像追加成功メッセージ

    User ->> Frontend: 画像並び替え要求
    Frontend ->> Backend: 並び替えリクエスト
    Backend ->> Backend: JSONファイル更新
    Backend ->> S3: 更新されたJSONファイル保存
    S3 -->> Backend: 保存成功応答
    Backend -->> Frontend: 並び替え成功応答
    Frontend ->> User: 並び替え成功メッセージ

    User ->> Frontend: 画像削除要求
    Frontend ->> Backend: 画像削除要求
    Backend ->> S3: 画像削除
    S3 -->> Backend: 削除成功応答
    Backend -->> Frontend: 画像削除成功応答
    Frontend ->> User: 画像削除成功メッセージ

    User ->> Frontend: ページ閲覧
    Frontend ->> Analytics: ページビュートラッキング
```
