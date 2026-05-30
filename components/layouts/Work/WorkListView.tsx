import { getDictionary, type Lang } from "@/lib/i18n";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import Contact from "@/components/common/Contact/Contact";
import Projects from "@/components/layouts/Projects/Projects";

// "/works"（および "/ja/works"）— 個人開発のハブ（一覧）ページ。
// 既存の Projects セクションを流用し、内部リンク導線とクロール導線を確保する。
export default function WorkListView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <main className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
      <Header lang={lang} />

      <div className="pt-20">
        <Projects no="§ 01" lang={lang} />
      </div>

      <Contact no="§ 02" data={t.contact} lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
