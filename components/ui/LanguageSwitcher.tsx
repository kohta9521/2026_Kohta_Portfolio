"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      // パスから現在のlocaleを削除して新しいlocaleに置き換え
      const pathWithoutLocale = pathname.replace(`/${locale}`, "");
      const newPath = `/${newLocale}${pathWithoutLocale || ""}`;
      router.push(newPath);
    });
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button
          className="flex items-center justify-center px-2 py-2 text-[var(--header-text)] hover:text-white/80 hover:bg-white/10 rounded-md transition-all focus:outline-none focus-visible:ring-0"
          aria-label="言語切替"
        >
          <Languages size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-40 w-auto border border-white/50 bg-gray-500/40 backdrop-blur-md mix-blend-screen shadow-xl shadow-white/10"
        align="end"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`flex items-center gap-2 text-white hover:text-white/80 cursor-pointer ${
              locale === lang.code ? "bg-white/20" : ""
            }`}
          >
            <span className="text-xs font-semibold">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
