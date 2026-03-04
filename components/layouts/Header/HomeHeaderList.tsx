"use client";

// next
import Link from "next/link";

// lucide-react
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Search,
  Settings,
  Palette,
  Languages,
  type LucideIcon,
} from "lucide-react";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// data
import type {
  HeaderMenuItem,
  DropdownItem,
  DropdownSubMenu,
} from "@/data/HomeHeader";

const iconMap: Record<string, LucideIcon> = {
  Home,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Search,
  Settings,
  Palette,
  Languages,
};

const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Home;
};

const isSubMenu = (
  item: DropdownItem | DropdownSubMenu
): item is DropdownSubMenu => {
  return "items" in item;
};

const HomeHeaderList = ({
  id,
  label,
  icon: iconName,
  displayType = "icon",
  align = "center",
  items,
  hideOnMobile = false,
}: HeaderMenuItem) => {
  const renderIcon = (name: string, size: number) => {
    const IconComponent = getIcon(name);
    return <IconComponent size={size} />;
  };

  return (
    <div className={hideOnMobile ? "hidden md:block" : ""}>
      <DropdownMenu key={id}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <button
            className="flex items-center justify-center px-2 py-2 text-(--header-text) hover:text-white/80 hover:bg-white/10 rounded-md transition-all focus:outline-none focus-visible:ring-0"
            aria-label={label}
          >
            {displayType === "icon" ? (
              renderIcon(iconName, 16)
            ) : (
              <span className="text-xs font-semibold">{label}</span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-40 w-auto border border-white/50 bg-white/40 backdrop-blur-md mix-blend-screen shadow-xl shadow-white/10"
          align={align}
        >
          <DropdownMenuGroup>
            {items.map((item, index) => {
              if (isSubMenu(item)) {
                return (
                  <div key={item.id}>
                    {index > 0 && (
                      <DropdownMenuSeparator className="bg-white/50" />
                    )}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center gap-2 text-white hover:text-white/80">
                        {renderIcon(item.icon, 12)}
                        <span className="text-xs font-semibold font-sans">
                          {item.label}
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="min-w-40 w-auto border border-white/50 bg-white/40 backdrop-blur-md mix-blend-screen shadow-xl shadow-white/10">
                          {item.items.map((subItem) => {
                            return (
                              <DropdownMenuItem key={subItem.id} asChild>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center gap-2 text-white hover:text-white/80 cursor-pointer"
                                  target={
                                    subItem.href.startsWith("http")
                                      ? "_blank"
                                      : undefined
                                  }
                                  rel={
                                    subItem.href.startsWith("http")
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                >
                                  {renderIcon(subItem.icon, 12)}
                                  <span>{subItem.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </div>
                );
              }

              return (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-white hover:text-white/80 cursor-pointer"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {renderIcon(item.icon, 14)}
                    <span className="text-xs font-semibold">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomeHeaderList;
