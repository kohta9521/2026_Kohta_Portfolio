import { getDictionary, type Lang } from "@/lib/i18n";
import FilePlate from "@/components/common/FilePlate/FilePlate";

// 段落間に挟むドット背景バンド用の図版（順番に使う）。
const INTER_FIGS = [
  { src: "/svg/FIG_020_neural.svg", filename: "FIG.020 / NEURAL" },
  { src: "/svg/FIG_015_pipeline.svg", filename: "FIG.015 / PIPELINE" },
  { src: "/svg/FIG_011_pcb.svg", filename: "FIG.011 / PCB" },
];

export default function Hero({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <section className="py-2">
      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div>
          {/* ページ唯一の h1。氏名を主要見出しに据えて見出し階層の頂点にする
              （以降のセクション見出しは SectionHead の h2）。 */}
          <h1 className="hero-mark flex items-center gap-5">
            {/* LCP 要素。GSAP/SplitText に依存させず CSS だけで即時描画する
                （JS チャンク待ちで LCP が遅延しないように）。reduced-motion では即表示。 */}
            <span className="hero-in">{t.hero.title}</span>
          </h1>
        </div>
        {/* ファーストビュー（above-the-fold）。LCP/FCP を遅らせないため reveal で
            opacity:0 にせず、最初の描画から見せる。演出は下スクロール以降に限定。 */}
        <span className="max-w-[52ch] whitespace-pre-line font-serif text-[0.85rem] italic leading-[1.25] text-ink sm:text-[1rem] sm:leading-[1.25] lg:text-right">
          {t.hero.byline}
        </span>
      </div>

      <div className="dotrule mt-5 lg:mt-8" />

      {/* 左：文章 / 右：ドットを敷き詰めたプレート（フル高さ） */}
      <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="lg:w-[62ch] lg:shrink-0">
          {t.hero.intro.map((para, i) => (
            // 先頭段落は LCP 要素。reveal でゲートせず即描画する（i>0 のみ演出）。
            <div key={i} data-reveal={i === 0 ? undefined : "up"}>
              <div className={i === 0 ? "drop" : "mt-4 lg:mt-6"} lang={lang}>
                <p className="text-left text-[1rem] leading-[1.62] text-ink sm:text-justify">
                  {para}
                </p>
              </div>

              {/* 段落間：ドットを敷き詰めたプレートに図版を1枚ずつ */}
              {i < t.hero.intro.length - 1 && (
                <div className="mt-5 h-48 lg:mt-6 lg:h-56">
                  <FilePlate
                    src={INTER_FIGS[i % INTER_FIGS.length].src}
                    filename={INTER_FIGS[i % INTER_FIGS.length].filename}
                    imgPadding="p-3"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* スマホでは本文より上（タイトル直下）に画像を出す。PC は従来どおり右側。 */}
        <div className="order-first h-52 lg:order-none lg:h-auto lg:flex-1">
          {/* 価値提供のパイプライン図。言語に依存させず常に英語版を表示する。 */}
          <FilePlate
            src="/svg/hero/kohta_value_pipeline_en.svg"
            filename="VALUE_PIPELINE"
            imgPadding="p-4"
          />
        </div>
      </div>

      {/* なぜクリエイティブが好きか：左にドット背景の図版／右に横並び2ブロック */}
      <div className="mt-12 w-full lg:mt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-12">
          {/* 左：ドットを敷き詰めた図版（適当な SVG を中央表示）。
              スマホ(<640px)では上の KOHTA_KOUCHI プレートと縦に2枚並んで冗長になるため非表示。 */}
          <div className="hidden h-56 sm:block lg:h-auto lg:w-[38%] lg:shrink-0">
            <FilePlate
              src="/svg/FIG_018_voxel.svg"
              filename="FIG.018 / VOXEL"
            />
          </div>

          {/* 右：タイトル + 横並び2ブロック（先頭文字を大きくするのは左ブロックのみ） */}
          <div className="lg:flex-1">
            <h2
              data-reveal="up"
              className="font-serif text-h2 font-[430] leading-[1.1] tracking-[-0.01em]"
            >
              {t.hero.creative.title}
            </h2>
            <div className="mt-5 flex flex-col gap-5 lg:mt-6 lg:flex-row lg:gap-10">
              {t.hero.creative.blocks.map((para, i) => (
                <div
                  key={i}
                  data-reveal="up"
                  data-reveal-delay={i === 1 ? "0.12" : undefined}
                  className={`flex-1 ${i === 0 ? "drop" : ""}`}
                  lang={lang}
                >
                  <p className="text-left text-[1rem] leading-[1.62] text-ink-2 sm:text-justify">
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
