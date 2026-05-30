import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import Contact from "@/components/common/Contact/Contact";
import Hero from "@/components/layouts/Hero/Hero";
import Career from "@/components/layouts/Career/Career";
import TechStack from "@/components/layouts/TechStack/TechStack";
import Highlights from "@/components/layouts/Highlights/Highlights";
import Projects from "@/components/layouts/Projects/Projects";
import BlogIndex from "@/components/layouts/Blog/BlogIndex";
import Faq from "@/components/layouts/Faq/Faq";

// トップページの構成。言語は上位の LanguageProvider（ルートが決定）から取得される。
export default function HomeView() {
  return (
    <main className="relative mx-auto max-w-[1500px] overflow-x-clip px-5 sm:px-8 lg:px-12">
      <Header />
      <Hero />

      {/* 左：経歴（縦長OK） / 右：個人開発カード + 技術スタック + 実績。
          半分幅が窮屈にならないよう xl(1280px) まで 1 カラムで積む。 */}
      <div className="mt-24 flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-16">
        <div className="xl:w-1/2">
          <Career no="§ 01" />
        </div>
        <div className="xl:w-1/2">
          <Projects no="§ 02" />
          <TechStack />
          <Highlights no="§ 02·c" compact />
        </div>
      </div>

      <BlogIndex no="§ 03" />
      <Faq no="§ 04" />

      <Contact no="§ 05" />
      <Footer />
    </main>
  );
}
