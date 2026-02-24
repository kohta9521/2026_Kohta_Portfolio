import React from "react";

// components
import HomeHeaderList from "./HomeHeaderList";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

// data
import { homeHeaderLeftData, homeHeaderRightData } from "@/data/HomeHeader";

const HomeHeader = () => {
  return (
    <header
      id="home-header"
      className="fixed top-0 left-0 w-full h-10 z-50 rounded-none bg-(--header-bg) backdrop-blur-md shadow-xl shadow-white/10"
    >
      <div className="w-[97%] h-full mx-auto flex items-center justify-between">
        {/* left navigation menus */}
        <nav className="w-auto h-full flex items-center gap-1">
          {homeHeaderLeftData.map((menuItem) => (
            <HomeHeaderList key={menuItem.id} {...menuItem} />
          ))}
        </nav>

        {/* right side navigation */}
        <nav className="w-auto h-full flex items-center gap-2">
          {homeHeaderRightData.map((menuItem) => (
            <HomeHeaderList key={menuItem.id} {...menuItem} />
          ))}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
