"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Home,
  Lock,
  Star,
  MoreVertical,
  Minus,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

export type WindowProps = {
  id: string;
  title: string;
  url: string;
  children: React.ReactNode;
  isActive: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
};

const Window = ({
  id,
  title,
  url,
  children,
  isActive,
  zIndex,
  position,
  size,
  onClose,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [resizeDirection, setResizeDirection] = useState<string>("");

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onFocus();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized && onSizeChange) {
      const isMobile = window.innerWidth < 768;
      const margin = isMobile ? window.innerWidth * 0.04 : 50;
      const sizeRatio = isMobile ? 0.92 : 1 - 100 / window.innerWidth;

      onSizeChange({
        width: window.innerWidth * sizeRatio,
        height: window.innerHeight * sizeRatio,
      });
      onPositionChange({ x: margin, y: margin });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging || isResizing) {
        e.preventDefault();
        document.body.style.userSelect = "none";
      }

      if (isDragging) {
        onPositionChange({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else if (isResizing && onSizeChange) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(400, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(300, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes("w")) {
          const widthChange = resizeStart.width - deltaX;
          if (widthChange >= 400) {
            newWidth = widthChange;
            newX = position.x + deltaX;
          }
        }
        if (resizeDirection.includes("n")) {
          const heightChange = resizeStart.height - deltaY;
          if (heightChange >= 300) {
            newHeight = heightChange;
            newY = position.y + deltaY;
          }
        }

        onSizeChange({ width: newWidth, height: newHeight });
        if (newX !== position.x || newY !== position.y) {
          onPositionChange({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      document.body.style.userSelect = "";
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [
    isDragging,
    isResizing,
    dragStart,
    resizeStart,
    resizeDirection,
    onPositionChange,
    onSizeChange,
    position,
  ]);

  if (isMinimized) return null;

  return (
    <div
      id={id}
      className={`absolute bg-[var(--window-bg)] rounded-lg shadow-2xl overflow-hidden transition-all ${
        isActive
          ? "ring-2 ring-blue-500"
          : "ring-1 border border-[var(--window-border)]"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onFocus}
    >
      {/* タイトルバー（macOS風） */}
      <div
        className="flex items-center gap-3 px-3 py-2 bg-[var(--bg-secondary)] border-b border-[var(--window-border)] cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        {/* macOSボタン */}
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="cursor-pointer w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            aria-label="Close"
          >
            <X
              size={8}
              className="opacity-0 group-hover:opacity-100 text-white"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
            className="cursor-pointer w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
            aria-label="Minimize"
          >
            <Minus
              size={8}
              className="opacity-0 group-hover:opacity-100 text-white"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="cursor-pointer w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
            aria-label="Maximize"
          >
            {isMaximized ? (
              <Minimize2
                size={8}
                className="opacity-0 group-hover:opacity-100 text-white"
              />
            ) : (
              <Maximize2
                size={8}
                className="opacity-0 group-hover:opacity-100 text-white"
              />
            )}
          </button>
        </div>

        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-[var(--text-primary)] truncate">
            {title}
          </span>
        </div>
      </div>

      {/* ブラウザツールバー */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--window-bg)] border-b border-[var(--window-border)]">
        {/* ナビゲーションボタン */}
        <button
          className="p-1.5 hover:bg-[var(--bg-overlay)] rounded cursor-pointer"
          aria-label="Back"
        >
          <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
        </button>
        <button
          className="p-1.5 hover:bg-[var(--bg-overlay)] rounded cursor-pointer"
          aria-label="Forward"
        >
          <ChevronRight size={18} className="text-[var(--text-secondary)]" />
        </button>
        <button
          className="p-1.5 hover:bg-[var(--bg-overlay)] rounded cursor-pointer"
          aria-label="Reload"
        >
          <RotateCw size={16} className="text-[var(--text-secondary)]" />
        </button>
        <button
          className="p-1.5 hover:bg-[var(--bg-overlay)] rounded cursor-pointer"
          aria-label="Home"
        >
          <Home size={16} className="text-[var(--text-secondary)]" />
        </button>

        {/* アドレスバー */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] rounded-full border border-[var(--window-border)]">
          <Lock size={14} className="text-[var(--text-tertiary)]" />
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none"
          />
          <Star
            size={14}
            className="text-[var(--text-tertiary)] cursor-pointer"
          />
        </div>

        {/* その他のアイコン */}
        <button
          className="p-1.5 hover:bg-[var(--bg-overlay)] rounded cursor-pointer"
          aria-label="More"
        >
          <MoreVertical size={18} className="text-[var(--text-secondary)]" />
        </button>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 overflow-auto bg-[var(--window-bg)]">
        {children}
      </div>

      {/* リサイズハンドル */}
      {!isMaximized && (
        <>
          {/* 右端 */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          {/* 下端 */}
          <div
            className="absolute left-0 right-0 bottom-0 h-1 cursor-ns-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          {/* 左端 */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          {/* 上端 */}
          <div
            className="absolute left-0 right-0 top-0 h-1 cursor-ns-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          {/* 右下コーナー */}
          <div
            className="absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          {/* 右上コーナー */}
          <div
            className="absolute right-0 top-0 w-4 h-4 cursor-nesw-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          {/* 左下コーナー */}
          <div
            className="absolute left-0 bottom-0 w-4 h-4 cursor-nesw-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          {/* 左上コーナー */}
          <div
            className="absolute left-0 top-0 w-4 h-4 cursor-nwse-resize hover:bg-blue-500/50"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
        </>
      )}
    </div>
  );
};

export default Window;
