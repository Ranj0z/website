'use client';

import { useState } from 'react';
import { Home, User, Cpu, FolderKanban, FileText, Mail, Wifi, Battery, Volume2 } from 'lucide-react';
import { WindowId, WindowState } from '../hooks/useWindows';

interface TaskbarProps {
  windows: Record<WindowId, WindowState>;
  time: string;
  date: string;
  onToggle: (id: WindowId) => void;
}

const NAV: { id: WindowId; Icon: React.ElementType; label: string }[] = [
  { id: 'hero',     Icon: Home,         label: 'Home'     },
  { id: 'about',    Icon: User,         label: 'About'    },
  { id: 'skills',   Icon: Cpu,          label: 'Skills'   },
  { id: 'projects', Icon: FolderKanban, label: 'Projects' },
  { id: 'blog',     Icon: FileText,     label: 'Blog'     },
  { id: 'contact',  Icon: Mail,         label: 'Contact'  },
];

export default function Taskbar({ windows, time, date, onToggle }: TaskbarProps) {
  const [hovered, setHovered] = useState<WindowId | null>(null);

  return (
    <nav
      aria-label="Taskbar"
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 'var(--taskbar-h)',
        background: 'rgba(8, 12, 24, 0.82)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: 0,
      }}
    >
      {/* Left — branding */}
      <div style={{
        position: 'absolute', left: '1rem',
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--clr-green)',
          display: 'inline-block',
          animation: 'pulse-dot 2s ease-in-out infinite',
        }} />
        DM_OS
      </div>

      {/* Center — app icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {NAV.map(({ id, Icon, label }) => {
          const w = windows[id];
          const isOpen = w.isOpen && !w.isMinimized;
          const isOpenAny = w.isOpen; // open OR minimized
          const isHov = hovered === id;

          return (
            <div key={id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Tooltip */}
              {isHov && (
                <div style={{
                  position: 'absolute',
                  bottom: 52, left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(8,12,24,0.96)',
                  border: '1px solid rgba(0,180,255,0.25)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10000,
                }}>
                  {label}
                </div>
              )}

              <button
                onClick={() => onToggle(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={label}
                style={{
                  width: 48, height: 44,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  background: isOpen
                    ? 'rgba(0,180,255,0.14)'
                    : isHov
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.15s, transform 0.15s',
                  transform: isHov && !isOpen ? 'translateY(-3px)' : 'none',
                  color: isOpen ? 'var(--clr-blue)' : 'rgba(255,255,255,0.82)',
                }}
              >
                <Icon size={20} strokeWidth={isOpen ? 2 : 1.5} />
                {/* Active indicator dot */}
                <div style={{
                  width: isOpenAny ? (isOpen ? 4 : 2) : 0,
                  height: 3,
                  borderRadius: 2,
                  background: isOpen ? 'var(--clr-blue)' : 'rgba(255,255,255,0.45)',
                  boxShadow: isOpen ? '0 0 6px var(--clr-blue)' : 'none',
                  transition: 'width 0.2s',
                }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Right — system tray */}
      <div style={{
        position: 'absolute', right: '1rem',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.5)' }}>
          <Volume2 size={14} />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'rgba(255,255,255,0.82)',
          textAlign: 'right', lineHeight: 1.4,
        }}>
          <div style={{ fontWeight: 500 }}>{time}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{date}</div>
        </div>
      </div>
    </nav>
  );
}
