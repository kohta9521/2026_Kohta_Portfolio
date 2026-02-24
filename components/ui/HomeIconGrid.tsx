"use client";

import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import HomeIcon from "./HomeIcon";
import type { HomeIconItem } from "@/data/HomeIcons";

type HomeIconGridProps = {
  initialItems: HomeIconItem[];
};

const HomeIconGrid = ({ initialItems }: HomeIconGridProps) => {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // モバイルでのタップとドラッグを区別するため、距離を長めに設定
        distance:
          typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setItems((items) =>
      items.map((item) =>
        item.id === active.id
          ? {
              ...item,
              position: {
                x: (item.position?.x || 0) + delta.x,
                y: (item.position?.y || 0) + delta.y,
              },
            }
          : item
      )
    );
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // 背景クリック時は何もしない（アイコンの選択状態はアイコン自身で管理）
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className="relative w-full h-full min-h-[calc(100vh-4rem)]"
        onClick={handleBackgroundClick}
        onMouseDown={handleBackgroundClick}
      >
        {items.map((item) => (
          <HomeIcon
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            iconImage={item.iconImage}
            href={item.href}
            position={item.position}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default HomeIconGrid;
