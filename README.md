# Kohta Kouchi — Portfolio (2026)

河内光太（Kohta Kouchi）の個人ポートフォリオサイトです。COO・PdM・ソフトウェアエンジニアとしての経歴、制作物、ジャーナルを 1 つのサイトにまとめています。英語（`/`）と日本語（`/ja`）の 2 言語対応で、デザインから実装まで自分で組んでいます。

本番: https://kohta-portfolio.vercel.app （ドメインは環境変数 `NEXT_PUBLIC_SITE_URL` で差し替え）

---

## このサイトについて

ただの作品置き場というより、「どこの誰で、何をしてきて、いま何を作っているか」を、人と検索エンジン、それから LLM の三者がちゃんと読めるように作ったサイトです。具体的には次の 3 点を軸にしています。

- **2 言語をURLで完全に分ける** — `/` が英語、`/ja` が日本語。言語はURLの時点で確定し、サーバー側で辞書を解決する。クライアントの JS には片方の辞書も載せない。
- **構造化を最初から織り込む** — JSON-LD（Person / WebSite / BlogPosting など）、hreflang、動的 OG 画像、sitemap / robots をコードから自動生成する。
- **AI に読ませる前提のページを持つ** — `/ai` に、プロフィール・経歴・スキル・実績・FAQ・連絡先を 1 枚にまとめた機械可読サマリー（LLM README）を用意。生成AI検索（GEO）時代に、引用元として正確に読まれることを狙ったページ。

---

## ページ構成

| パス                         | 内容                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `/` `/ja`                    | トップ。Hero / 経歴 / スキル / 技術スタック / 制作ハイライト / FAQ / お問い合わせ |
| `/works` `/ja/works`         | 制作物の一覧                                                                      |
| `/works/[slug]`              | 制作物の詳細。スラッグは言語間で共通                                              |
| `/blogs` `/ja/blogs`         | ジャーナル（ブログ）の一覧。カテゴリ・目次・進捗レール付き                        |
| `/blogs/[id]`                | 記事ページ                                                                        |
| `/ai` `/ja/ai`               | LLM / AI 検索向けの構造化サマリー                                                 |
| `/og`                        | タイトルを差し込んで動的に描画する OG 画像（1200×630）                            |
| `/sitemap.xml` `/robots.txt` | en/ja・動的ルートまで含めて自動生成                                               |

コンテンツ（経歴・スキル・制作・記事）はコンポーネントから切り離して `dics/` に置いています。`en.ts` / `ja.ts` は共通の型 (`dics/types.ts`) に従うので、片方だけ文言を足すと型エラーで気づける構造です。

---

## 技術スタック

| 領域           | 採用                                                                 |
| -------------- | -------------------------------------------------------------------- |
| フレームワーク | Next.js 16（App Router）/ React 19                                   |
| 言語           | TypeScript 5.9（strict）                                             |
| スタイル       | Tailwind CSS v4（PostCSS 経由）                                      |
| アニメーション | GSAP、自前の Preloader / ScrollReveal                                |
| フォント       | Newsreader（可変フォント・Google）+ Departure Mono（ローカル woff2） |
| 計測           | Google Tag Manager + Consent Mode v2、Vercel Speed Insights          |
| テスト         | Jest 30 + Testing Library                                            |
| UI カタログ    | Storybook 10（nextjs-vite）                                          |
| Lint / Format  | ESLint 9 / Prettier / husky + lint-staged                            |
| パッケージ管理 | pnpm                                                                 |
| ホスティング   | Vercel                                                               |

---

## セットアップ

```bash
pnpm install
cp .env.example .env.local   # 値を埋める（下記参照）
pnpm dev                     # http://localhost:3000
```

### 環境変数

`.env.local` に置く。すべて任意で、未設定でもビルド・起動はできる（計測・所有権確認まわりが無効になるだけ）。

| 変数                                   | 用途                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | 本番ドメイン。canonical / OGP の絶対URL生成に使う                                      |
| `NEXT_PUBLIC_GTM_ID`                   | GTM コンテナID。`GTM-XXXXXXX` のままだと無効扱いになり、空 ID でのスクリプト注入を防ぐ |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console の所有権確認                                                            |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Bing の所有権確認                                                                      |

---

## スクリプト

```bash
pnpm dev              # 開発サーバー
pnpm build            # 本番ビルド
pnpm start            # ビルド済みを起動

pnpm lint             # ESLint
pnpm lint:fix         # ESLint --fix
pnpm format           # Prettier で整形
pnpm format:check     # 整形チェックのみ

pnpm test             # Jest
pnpm test:watch       # watch モード
pnpm test:coverage    # カバレッジ

pnpm storybook        # Storybook（:6006）
pnpm build-storybook  # Storybook の静的ビルド
```

コミット時は husky + lint-staged が走り、ステージしたファイルにだけ `eslint --fix` と `prettier --write` をかけます。

---

## ディレクトリ

```
app/                App Router。en はルート直下、ja は app/ja/ にミラー
  og/route.tsx      動的 OG 画像
  sitemap.ts        en/ja・動的ルート込みの sitemap
  robots.ts
components/
  layouts/          ページを構成する大きめのセクション（Hero, Career, Skills…）
  common/           ページ間で使い回す部品（Header, Footer, Contact, JsonLd…）
  ui/               テーマ切替・言語切替・同意バナー
  fx/               Preloader / ScrollReveal などの演出
  analytics/        ルート遷移ごとのページビュー送信
dics/               全コンテンツと文言。en.ts / ja.ts / blog.ts / works.ts
  types.ts          en/ja 共通の型（差分があれば型エラー）
lib/
  i18n.ts           言語ごとの辞書解決とリンク base
  seo.ts            メタデータ生成・JSON-LD ビルダー・ページ別コピー
  gtm.ts            dataLayer / Consent Mode の薄いラッパー
public/             フォント・画像・アイコン・manifest
styles/globals.css  Tailwind v4 + テーマ変数
```

---

## 設計メモ

実装上、少し工夫した部分の記録。

**i18n は「URL で確定 → サーバーで解決」。** 言語コンテキストをクライアントに持たせず、ページ（サーバーコンポーネント）が `lang` を解決して、各コンポーネントへ解決済みの slice を props で配ります。`lib/i18n.ts` と `dics/*` は en/ja の両辞書を import するため、import してよいのはサーバーコンポーネントだけ、というルールです。おかげでクライアントバンドルに辞書が二重で載りません。

**テーマのチラつき防止。** ペイント前に同期実行する小さなインラインスクリプトで `<html>` に `data-theme` を当てています。既定は常にライト（OS のダーク設定は初期値に反映しない）で、ユーザーがトグルで明示的に選んだときだけ `localStorage` に永続化して尊重します。JS が動く環境でだけ要素を初期非表示にするので、クローラや JS 無効環境では全文がそのまま見えます。

**Consent Mode v2 を GTM より前に。** 同意の既定値（`denied`）を GTM 読み込み前に設定し、同意済みの再訪ユーザーだけ `analytics_storage` を `granted` で開始します。お問い合わせ送信はバックエンドを持たない mailto 方式なので、「送信意図（ボタン押下）」を `generate_lead` イベントとして計測し、GTM 側で GA4 のコンバージョンに紐づけます。

**SEO / GEO。** メタデータ・hreflang・JSON-LD・OG 画像はすべて `lib/seo.ts` 経由で組み立て、ページからは必要な値を渡すだけにしています。OG 画像は外部フォント取得に依存させず、`next/og` でシステムフォント描画。`/ai` ページは、AI 検索や LLM が引用元として読みやすいよう、人物情報を 1 ドキュメントに構造化したものです。

---

## ライセンス

個人プロジェクト（private）です。コードや構成は参考にしてもらって構いませんが、文章・画像・経歴などのコンテンツは河内光太に帰属します。
