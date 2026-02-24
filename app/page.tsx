"use client";

// components
import HomeHeader from "@/components/layouts/Header/HomeHeader";
import HomeIconGrid from "@/components/ui/HomeIconGrid";
import { useTheme } from "@/contexts/ThemeContext";

// data
import { homeIconsData } from "@/data/HomeIcons";

export default function Home() {
  const { effectiveTheme } = useTheme();
  const bgImage =
    effectiveTheme === "dark"
      ? "/images/service-bg-dark.webp"
      : "/images/service-bg-light.webp";

  return (
    <div className="w-full min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none select-none transition-all duration-500"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <HomeHeader />
      {/* main contents */}
      <div className="relative w-full h-full pt-0">
        <HomeIconGrid initialItems={homeIconsData} />
      </div>
    </div>
  );
}
