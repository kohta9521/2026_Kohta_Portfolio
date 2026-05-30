// クッキー同意バナーの文言だけを切り出した、極小・クライアント安全なモジュール。
// ConsentBanner（クライアント島）はここだけを import する。
// 全文辞書(en.ts/ja.ts)を client から import すると数百行が丸ごとバンドルへ載るため、
// バナーが必要とする数文字列だけをこの単一ソースで提供する。

export interface ConsentCopy {
  message: string;
  accept: string;
  decline: string;
}

export const consentCopy: Record<"en" | "ja", ConsentCopy> = {
  en: {
    message:
      "This site uses cookies for anonymous analytics (Google Analytics) to understand how it's used. Nothing is shared for ads.",
    accept: "Accept",
    decline: "Decline",
  },
  ja: {
    message:
      "このサイトでは、利用状況の把握のために匿名のアクセス解析（Google Analytics）クッキーを使用します。広告目的の共有は行いません。",
    accept: "同意する",
    decline: "拒否する",
  },
};
