'use client';

import { useCallback, useRef } from 'react';

const TASKBAR_H = 56;
const TITLE_BAR_H = 38;

interface UseDragOptions {
  onMove: (x: number, y: number) => void;
  onFocus: () => void;
  isMaximized: boolean;
}

export function useDrag({ onMove, onFocus, isMaximized }: UseDragOptions) {
  const dragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only drag on left click; ignore clicks on buttons inside the title bar
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest('button')) return;
      if (isMaximized) return;

      e.preventDefault();
      onFocus();

      dragging.current = true;
      startMouse.current = { x: e.clientX, y: e.clientY };
      startPos.current = { x: (e.currentTarget.parentElement as HTMLElement).offsetLeft, y: (e.currentTarget.parentElement as HTMLElement).offsetTop };

      const onMouseMove = (me: MouseEvent) => {
        if (!dragging.current) return;

        const dx = me.clientX - startMouse.current.x;
        const dy = me.clientY - startMouse.current.y;

        let newX = startPos.current.x + dx;
        let newY = startPos.current.y + dy;

        // Clamp: can't drag above top or off left/right; bottom limited by taskbar
        const maxX = window.innerWidth - 120;
        const maxY = window.innerHeight - TASKBAR_H - TITLE_BAR_H;

        newX = Math.max(-100, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        onMove(newX, newY);
      };

      const onMouseUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [onMove, onFocus, isMaximized]
  );

  return { onMouseDown };
}
