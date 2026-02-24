"use client";

import React from "react";
import { useWindows } from "@/contexts/WindowContext";
import Window from "./Window";

const WindowManager = () => {
  const {
    windows,
    activeWindowId,
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindows();

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          url={window.url}
          isActive={window.id === activeWindowId}
          zIndex={window.zIndex}
          position={window.position}
          size={window.size}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
          onSizeChange={(size) => updateWindowSize(window.id, size)}
        >
          {window.component}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
