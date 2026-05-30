"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import FilePlate from "@/components/common/FilePlate/FilePlate";

// 段落間に挟むドット背景バンド用の図版（順番に使う）。
const INTER_FIGS = [
  { src: "/svg/FIG_020_neural.svg", filename: "FIG.020 / NEURAL" },
  { src: "/svg/FIG_015_pipeline.svg", filename: "FIG.015 / PIPELINE" },
  { src: "/svg/FIG_011_pcb.svg", filename: "FIG.011 / PCB" },
];

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-2">
      <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div>
          <div className="hero-mark flex items-center gap-5">
            <span>{t.hero.title}</span>
          </div>
        </div>
        <span className="max-w-[52ch] whitespace-pre-line font-serif text-[1.15rem] italic leading-[1.3] text-ink sm:text-[1rem] sm:leading-[1.25] lg:text-right">
          {t.hero.byline}
        </span>
      </div>

      <div className="dotrule mt-8" />

      {/* 左：文章 / 右：ドットを敷き詰めたプレート（フル高さ） */}
      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="lg:w-[62ch] lg:shrink-0">
          {t.hero.intro.map((para, i) => (
            <div key={i}>
              <div className={i === 0 ? "drop" : "mt-6"} lang={lang}>
                <p className="text-left text-[1rem] leading-[1.62] text-ink sm:text-justify">
                  {para}
                </p>
              </div>

              {/* 段落間：ドットを敷き詰めたプレートに図版を1枚ずつ */}
              {i < t.hero.intro.length - 1 && (
                <div className="mt-6 h-56">
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

        <div className="h-64 lg:h-auto lg:flex-1">
          <FilePlate filename="KOHTA_KOUCHI" />
        </div>
      </div>

      {/* なぜクリエイティブが好きか：左にドット背景の図版／右に横並び2ブロック */}
      <div className="mt-20 w-full">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
          {/* 左：ドットを敷き詰めた図版（適当な SVG を中央表示） */}
          <div className="h-72 lg:h-auto lg:w-[38%] lg:shrink-0">
            <FilePlate
              src="/svg/FIG_018_voxel.svg"
              filename="FIG.018 / VOXEL"
            />
          </div>

          {/* 右：タイトル + 横並び2ブロック（先頭文字を大きくするのは左ブロックのみ） */}
          <div className="lg:flex-1">
            <h2 className="font-serif text-[length:--text-h2] font-[430] leading-[1.1] tracking-[-0.01em]">
              {t.hero.creative.title}
            </h2>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:gap-10">
              {t.hero.creative.blocks.map((para, i) => (
                <div
                  key={i}
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
