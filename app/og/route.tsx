import { ImageResponse } from "next/og";

// 動的 OG 画像（1200×630）。/og?title=…&subtitle=… で生成。
// 外部フォント取得に依存しないようシステムフォントで描画する。
export const contentType = "image/png";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Kohta Kouchi").slice(0, 90);
  const subtitle = (
    searchParams.get("subtitle") ?? "COO · PdM · Software Engineer"
  ).slice(0, 80);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        padding: "72px",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#7aa2ff",
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span>Kohta Kouchi</span>
        <span style={{ color: "#666" }}>Portfolio · 2026</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#fafafa",
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 28, color: "#9a9a9a", fontSize: 34 }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#7aa2ff",
          fontSize: 24,
        }}
      >
        <div style={{ width: 56, height: 4, background: "#7aa2ff" }} />
        <span>kohta.dev</span>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
