"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { useWindows } from "@/contexts/WindowContext";
import { loadWindowComponent } from "@/utils/windowComponentLoader";

export type HomeIconProps = {
  id: string;
  title: string;
  description?: string;
  iconImage: string;
  href: string;
  position?: { x: number; y: number };
};

const HomeIcon = ({
  id,
  title,
  description,
  iconImage,
  href,
  position = { x: 0, y: 0 },
}: HomeIconProps) => {
  const { openWindow } = useWindows();
  const [isSelected, setIsSelected] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const style = {
    position: "absolute" as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleDoubleClick = async () => {
    // 選択状態を解除
    setIsSelected(false);

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      try {
        // キャッシュ付き動的インポート
        const PageComponent = await loadWindowComponent(
          href,
          title,
          description
        );

        // ウィンドウとして開く
        openWindow({
          title,
          url: href,
          component: <PageComponent />,
        });
      } catch (error) {
        console.error("Failed to load page:", error);
      }
    }
  };

  const handleClick = async () => {
    // ドラッグ中はクリックイベントを無視
    if (isDragging) return;

    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTime;

    // ダブルタップ判定（300ms以内の2回タップ）
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // ダブルタップ処理（PC用のonDoubleClickと重複しないよう、モバイルのみ）
      if (isMobile) {
        await handleDoubleClick();
      }
    } else {
      // シングルタップ処理
      setIsSelected(true);
      setLastTapTime(currentTime);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      onClick={handleClick}
      onDoubleClick={isMobile ? undefined : handleDoubleClick}
      role="button"
      tabIndex={0}
      className={`flex flex-col items-center justify-center gap-1 p-2 ${
        isMobile ? "cursor-pointer" : "cursor-move"
      } group w-20 rounded-lg transition-colors ${
        isSelected ? "bg-white/10" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-1 select-none">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <Image
            src={`/images/icons/${iconImage}`}
            alt={title}
            width={48}
            height={48}
            className="object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-[var(--header-text)] drop-shadow-lg whitespace-nowrap">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeIcon;
