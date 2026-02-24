"use client";

import React, { createContext, useContext, useState, useRef } from "react";

export type WindowData = {
  id: string;
  title: string;
  url: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
};

type WindowContextType = {
  windows: WindowData[];
  activeWindowId: string | null;
  openWindow: (data: {
    title: string;
    url: string;
    component: React.ReactNode;
  }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
  updateWindowSize: (
    id: string,
    size: { width: number; height: number }
  ) => void;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const windowIdCounterRef = useRef(0);

  const openWindow = (data: {
    title: string;
    url: string;
    component: React.ReactNode;
  }) => {
    // 同じURLのウィンドウが既に開いている場合はフォーカス
    const existingWindow = windows.find((w) => w.url === data.url);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    // 新しいウィンドウを作成する場合のみIDをインクリメント
    windowIdCounterRef.current += 1;
    const id = `window-${windowIdCounterRef.current}`;

    // レスポンシブ対応: モバイルではほぼフルスクリーン
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;

    const newWindow: WindowData = {
      ...data,
      id,
      position: isMobile
        ? {
            x: windowWidth * 0.04, // 4% margin (w-11/12の残り)
            y: windowHeight * 0.04,
          }
        : {
            x: 100 + windows.length * 40,
            y: 60 + windows.length * 40,
          },
      size: isMobile
        ? {
            width: windowWidth * 0.92, // 11/12 ≈ 0.9167
            height: windowHeight * 0.92,
          }
        : { width: 800, height: 600 },
      zIndex: zIndexCounter + 1,
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(id);
    setZIndexCounter((prev) => prev + 1);

    // URLは変更しない（SPAとして動作）
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== id);

      // アクティブウィンドウを閉じた場合は最後のウィンドウをアクティブに
      if (activeWindowId === id && filtered.length > 0) {
        const lastWindow = filtered[filtered.length - 1];
        setActiveWindowId(lastWindow.id);
      } else if (filtered.length === 0) {
        setActiveWindowId(null);
      }

      return filtered;
    });
  };

  const focusWindow = (id: string) => {
    setZIndexCounter((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        zIndex: w.id === id ? zIndexCounter + 1 : w.zIndex,
      }))
    );
    setActiveWindowId(id);

    // URLは変更しない（状態管理のみ）
  };

  const updateWindowPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (
    id: string,
    size: { width: number; height: number }
  ) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within WindowProvider");
  }
  return context;
};
