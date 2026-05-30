import { type Lang } from "@/lib/i18n";
import { blogStats, getBlog } from "@/dics/blog";

// blogs page.png 上部の、モノスペースのメタ統計ブロック。
// 値はデータから決定的に算出（dics/blog.ts の blogStats）。
export default function BlogStatsBar({ lang }: { lang: Lang }) {
  const s = blogStats(lang);
  const labels = getBlog(lang).index.stats;

  const rows: [string, string][] = [
    [labels.finished, s.finished],
    [labels.wordsPerChapter, s.wordsPerChapter],
    [labels.imagesPerChapter, s.imagesPerChapter],
    [labels.currentWords, s.currentWords],
    [labels.estWords, s.estWords],
    [labels.currentImages, s.currentImages],
  ];

  return (
    <dl className="mx-auto grid max-w-xl grid-cols-1 gap-x-16 gap-y-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-6">
          <dt className="label !text-ink-3">{k}</dt>
          <dd className="font-mono text-[0.72rem] tabular-nums text-ink">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
