import { getDictionary, type Lang } from "@/lib/i18n";
import SectionHead from "@/components/common/SectionHead/SectionHead";

export default function Skills({
  no = "§ —",
  lang,
}: {
  no?: string;
  lang: Lang;
}) {
  const t = getDictionary(lang);

  return (
    <section className="pt-24">
      <SectionHead no={no} kicker={t.skills.kicker} title={t.skills.title} />

      {/* 6 グループを大きめのパネル 2×3 に。各項目 hover で実務メモのツールチップを表示 */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {t.skills.groups.map((g) => (
          <div
            key={g.label}
            className="group relative rounded-[--radius-card] border border-rule bg-paper-raised p-7 transition-[border-color,transform] duration-200 hover:z-30 hover:-translate-y-0.5 hover:border-accent"
          >
            {/* hover で左から伸びるアクセントバー */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
            />

            {/* パネル見出し：大きな番号 + ラベル + 件数 */}
            <div className="flex items-baseline justify-between border-b border-rule-strong pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[1.6rem] leading-none text-accent">
                  {g.no}
                </span>
                <span className="label !text-[0.8rem] !text-ink">
                  {g.label}
                </span>
              </div>
              <span className="font-mono text-[0.62rem] tracking-[0.12em] text-ink-3">
                {String(g.items.length).padStart(2, "0")} / tools
              </span>
            </div>

            {/* 項目：番号 + 名称 + hover で点灯するドット + ツールチップ */}
            <ul className="mt-1">
              {g.items.map((item, i) => (
                <li
                  key={item.name}
                  className="group/row relative flex items-baseline gap-3 border-b border-rule py-3 last:border-b-0"
                >
                  <span className="w-5 shrink-0 font-mono text-[0.62rem] text-ink-3 transition-colors group-hover/row:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[1.1rem] leading-none text-ink transition-colors group-hover/row:text-accent">
                    {item.name}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-rule-strong opacity-40 transition-all duration-200 group-hover/row:bg-accent group-hover/row:opacity-100"
                  />

                  {/* ツールチップ：対応バージョン + 実務メモ */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-0 z-40 mb-2.5 w-[17rem] origin-bottom-left translate-y-1 scale-[0.97] rounded-[--radius-card] border border-rule-strong bg-paper-raised p-4 opacity-0 shadow-[0_10px_34px_rgba(0,0,0,0.14)] transition-all duration-200 group-hover/row:translate-y-0 group-hover/row:scale-100 group-hover/row:opacity-100"
                  >
                    {/* 左のアクセントライン */}
                    <span
                      aria-hidden
                      className="absolute inset-y-2.5 left-0 w-[2px] rounded-full bg-accent"
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[0.72rem] tracking-[0.08em] text-ink">
                        {item.name}
                      </span>
                      {item.version && (
                        <span className="shrink-0 rounded-full border border-accent px-2 py-[2px] font-mono text-[0.56rem] leading-none tracking-[0.06em] text-accent">
                          {item.version}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 font-serif text-[0.86rem] leading-[1.5] text-ink-2">
                      {item.note}
                    </p>
                    {/* 下向きの吹き出し三角 */}
                    <span
                      aria-hidden
                      className="absolute left-6 top-full -mt-px h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-solid border-rule-strong bg-paper-raised"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
