"use client";

import React from "react";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Sun, Moon, Monitor } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] =
    [
      { value: "light", label: "ライトモード", icon: <Sun size={14} /> },
      { value: "dark", label: "ダークモード", icon: <Moon size={14} /> },
      { value: "system", label: "システム設定", icon: <Monitor size={14} /> },
    ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button
          className="flex items-center justify-center px-2 py-2 text-[var(--header-text)] hover:text-white/80 hover:bg-white/10 rounded-md transition-all focus:outline-none focus-visible:ring-0"
          aria-label="テーマ切替"
        >
          <Palette size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-40 w-auto border border-white/50 bg-gray-500/40 backdrop-blur-md mix-blend-screen shadow-xl shadow-white/10"
        align="end"
      >
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex items-center gap-2 text-white hover:text-white/80 cursor-pointer ${
              theme === option.value ? "bg-white/20" : ""
            }`}
          >
            {option.icon}
            <span className="text-xs font-semibold">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
