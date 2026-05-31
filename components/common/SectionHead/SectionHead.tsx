// §NN — kicker / title のセクション見出し（全セクション共通の表現）
// 文言は呼び出し側から受け取るだけのプレゼンテーショナルなコンポーネント。

export default function SectionHead({
  no,
  kicker,
  title,
  id,
  titleClassName = "max-w-[22ch]",
}: {
  no: string;
  kicker: string;
  title: string;
  id?: string;
  /** 見出しの幅制御（狭いカラムでは max-w-none を渡す等） */
  titleClassName?: string;
}) {
  return (
    <div id={id} className="scroll-mt-8">
      <div
        data-reveal="up"
        className="flex items-baseline justify-between gap-4 border-t border-rule-strong pt-3"
      >
        <span className="label !text-accent">{no}</span>
        <span className="label">{kicker}</span>
      </div>
      <h2
        data-reveal="up"
        data-reveal-delay="0.12"
        className={`mt-5 ${titleClassName} font-serif text-h1 font-[430] leading-[1.04] tracking-[-0.015em]`}
      >
        {title}
      </h2>
    </div>
  );
}
