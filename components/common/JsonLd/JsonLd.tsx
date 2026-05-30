// 構造化データ（JSON-LD）をそのまま <script> で出力するサーバーコンポーネント。
// "use client" を付けないことで SSR 時の初期HTMLに必ず含める。
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // データは自前で生成した固定構造のみ。ユーザー入力は通さない。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
