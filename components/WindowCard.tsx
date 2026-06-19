'use client';

import { ReactNode } from 'react';
import { WindowId, WindowState } from '../hooks/useWindows';
import { useDrag } from '../hooks/useDrag';

interface WindowCardProps {
  win: WindowState;
  children: ReactNode;
  accent?: string;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onMove: (id: WindowId, x: number, y: number) => void;
  onFocus: (id: WindowId) => void;
}

export default function WindowCard({
  win,
  children,
  accent = 'var(--clr-blue)',
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onFocus,
}: WindowCardProps) {
  const { onMouseDown } = useDrag({
    onMove: (x, y) => onMove(win.id, x, y),
    onFocus: () => onFocus(win.id),
    isMaximized: win.isMaximized,
  });

  // Hidden when minimized — keep mounted to preserve state
  if (!win.isOpen) return null;

  return (
    <div
      onMouseDown={() => onFocus(win.id)}
      style={{
        position: 'absolute',
        left: win.x,
        top: win.y,
        width: win.width,
        display: win.isMinimized ? 'none' : 'flex',
        height: win.height,
        minWidth: 320,
        flexDirection: 'column',
        background: 'rgba(10, 16, 34, 0.78)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(0,180,255,0.18)',
        borderRadius: win.isMaximized ? '0' : '10px',
        zIndex: win.zIndex,
        transition: win.isMaximized
          ? 'left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease'
          : 'none',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(0,180,255,0.08)',
      }}
    >
      {/* ── Title Bar ── */}
      <div
        onMouseDown={onMouseDown}
        style={{
          height: 38,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px 0 14px',
          background: 'rgba(6, 10, 24, 0.85)',
          borderBottom: win.isMinimized ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: win.isMaximized ? '0' : '10px 10px 0 0',
          cursor: win.isMaximized ? 'default' : 'grab',
          userSelect: 'none',
          gap: 10,
        }}
      >
        {/* Accent dot */}
        <div style={{
          width: 7, height: 7,
          borderRadius: '50%',
          background: accent,
          boxShadow: `0 0 8px ${accent}`,
          flexShrink: 0,
        }} />

        {/* Title */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {win.title}
        </span>

        {/* Window controls — right side, Win11 style */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0 }}>
          {/* Minimize */}
          <WinBtn
            label="Minimize"
            onClick={() => onMinimize(win.id)}
            hoverBg="rgba(255,255,255,0.1)"
          >
            <svg width="10" height="1" viewBox="0 0 10 1">
              <line x1="0" y1="0.5" x2="10" y2="0.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
            </svg>
          </WinBtn>

          {/* Maximize / Restore */}
          <WinBtn
            label={win.isMaximized ? 'Restore' : 'Maximize'}
            onClick={() => onMaximize(win.id)}
            hoverBg="rgba(255,255,255,0.1)"
          >
            {win.isMaximized ? (
              /* Restore icon — two overlapping squares */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="2" y="0" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                <rect x="0" y="2" width="8" height="8" rx="1" fill="rgba(10,16,34,0.9)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
              </svg>
            ) : (
              /* Maximize icon — single square */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="0.6" y="0.6" width="8.8" height="8.8" rx="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
              </svg>
            )}
          </WinBtn>

          {/* Close */}
          <WinBtn
            label="Close"
            onClick={() => onClose(win.id)}
            hoverBg="rgba(196,43,28,0.8)"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
            </svg>
          </WinBtn>
        </div>
      </div>

      {/* ── Content ── */}
      {!win.isMinimized && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '1.25rem 1.5rem',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Small helper for window control buttons ── */
function WinBtn({
  children,
  label,
  onClick,
  hoverBg,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  hoverBg: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseDown={(e) => e.stopPropagation()} // prevent drag start
      style={{
        width: 36,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = hoverBg; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}
