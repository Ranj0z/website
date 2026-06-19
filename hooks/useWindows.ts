'use client';

import { useState, useCallback } from 'react';

export type WindowId = 'hero' | 'about' | 'skills' | 'projects' | 'blog' | 'contact';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  /** saved position/size before maximizing */
  restore: { x: number; y: number; width: number; height: number } | null;
}

const TASKBAR_H = 56;

const DEFAULTS: Record<WindowId, { title: string; x: number; y: number; width: number; height: number }> = {
  hero:     { title: 'home.exe',      x: 60,  y: 40,  width: 680, height: 480 },
  about:    { title: 'about.exe',     x: 100, y: 60,  width: 640, height: 420 },
  skills:   { title: 'skills.db',     x: 140, y: 80,  width: 660, height: 440 },
  projects: { title: 'projects.log',  x: 80,  y: 50,  width: 720, height: 500 },
  blog:     { title: 'blog.feed',     x: 120, y: 70,  width: 640, height: 400 },
  contact:  { title: 'contact.init',  x: 160, y: 90,  width: 580, height: 460 },
};

const ORDER: WindowId[] = ['hero', 'about', 'skills', 'projects', 'blog', 'contact'];

function makeInitial(): Record<WindowId, WindowState> {
  const result = {} as Record<WindowId, WindowState>;
  ORDER.forEach((id, i) => {
    const d = DEFAULTS[id];
    result[id] = {
      id,
      title: d.title,
      isOpen: id === 'hero',      // only hero open on load
      isMinimized: false,
      isMaximized: false,
      x: d.x,
      y: d.y,
      width: d.width,
      height: d.height,
      zIndex: i + 1,
      restore: null,
    };
  });
  return result;
}

export function useWindows() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(makeInitial);
  const [zCounter, setZCounter] = useState<number>(ORDER.length + 1);

  /** Bring a window to the front */
  const bringToFront = useCallback((id: WindowId) => {
    setZCounter((prev) => {
      const next = prev + 1;
      setWindows((ws) => ({
        ...ws,
        [id]: { ...ws[id], zIndex: next },
      }));
      return next;
    });
  }, []);

  /** Open or restore a window; if already open and not minimized → minimize */
  const toggleWindow = useCallback((id: WindowId) => {
    setWindows((ws) => {
      const w = ws[id];
      if (!w.isOpen) {
        // closed → open
        bringToFront(id);
        return { ...ws, [id]: { ...w, isOpen: true, isMinimized: false } };
      }
      if (w.isMinimized) {
        // minimized → restore
        bringToFront(id);
        return { ...ws, [id]: { ...w, isMinimized: false } };
      }
      // open & visible → minimize
      return { ...ws, [id]: { ...w, isMinimized: true } };
    });
    setZCounter((prev) => {
      const next = prev + 1;
      setWindows((ws) => {
        const w = ws[id];
        if (w.isOpen && !w.isMinimized) return ws; // minimizing, don't raise z
        return { ...ws, [id]: { ...ws[id], zIndex: next } };
      });
      return next;
    });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((ws) => ({
      ...ws,
      [id]: { ...ws[id], isOpen: false, isMinimized: false, isMaximized: false, restore: null },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((ws) => ({
      ...ws,
      [id]: { ...ws[id], isMinimized: true },
    }));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((ws) => {
      bringToFront(id);
      const w = ws[id];
      if (w.isMaximized) {
        // restore
        return {
          ...ws,
          [id]: {
            ...w,
            isMaximized: false,
            x: w.restore?.x ?? DEFAULTS[id].x,
            y: w.restore?.y ?? DEFAULTS[id].y,
            width: w.restore?.width ?? DEFAULTS[id].width,
            height: w.restore?.height ?? DEFAULTS[id].height,
            restore: null,
          },
        };
      }
      // maximize — save current position first
      return {
        ...ws,
        [id]: {
          ...w,
          isMaximized: true,
          restore: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - TASKBAR_H,
        },
      };
    });
  }, []);

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((ws) => ({
      ...ws,
      [id]: { ...ws[id], x, y },
    }));
  }, []);

  return {
    windows,
    toggleWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    bringToFront,
  };
}
