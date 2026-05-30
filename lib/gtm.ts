// GTM / dataLayer の薄いラッパー。
// コンポーネントは window.dataLayer を直接触らず、ここ経由でイベントを送る。
// GA4・コンバージョンの設定は GTM 側で行い、コードには GTM の ID だけを置く。

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// プレースホルダ（GTM-XXXXXXX）や未設定のときは無効扱いにして、
// 誤ったコンテナの読み込み・空 ID でのスクリプト注入を防ぐ。
export const isGtmEnabled =
  /^GTM-[A-Z0-9]+$/.test(GTM_ID) && GTM_ID !== "GTM-XXXXXXX";

type DataLayerObject = Record<string, unknown>;
type GtagArgs = [command: string, ...rest: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    // Consent Mode 用。layout の先頭スクリプトで定義される。
    gtag?: (...args: GtagArgs) => void;
  }
}

/** dataLayer へ任意オブジェクトを push（SSR時は no-op） */
export function pushToDataLayer(obj: DataLayerObject) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

/** dataLayer のカスタムイベント名（GTM トリガーと一致させる） */
export const GTM_EVENT = {
  pageView: "page_view",
  generateLead: "generate_lead", // ← お問い合わせ送信（CV）
  emailClick: "email_click",
  outboundClick: "outbound_click",
} as const;

/** カスタムイベントを送る */
export function pushEvent(event: string, params: DataLayerObject = {}) {
  pushToDataLayer({ event, ...params });
}

/** SPA のページビュー（初回＋ルート遷移ごとに呼ぶ） */
export function sendPageView(params: DataLayerObject = {}) {
  pushEvent(GTM_EVENT.pageView, params);
}

export type ConsentValue = "granted" | "denied";

/**
 * Consent Mode v2 の更新。同意バナーの選択を反映する。
 * gtag は arguments 形式での push が必要なため、window.gtag（layout で定義）を使う。
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const value: ConsentValue = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: value,
  });
}
