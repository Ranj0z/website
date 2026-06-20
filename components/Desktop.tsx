'use client';

import { useEffect, useState } from 'react';
import { useWindows, WindowId } from '@/hooks/useWindows';
import WindowCard from '../components/WindowCard';
import Taskbar from '../components/Taskbar';
import HeroWindow from '../components/windows/HeroWindow';
import AboutWindow from '../components/windows/AboutWindow';
import SkillsWindow from '../components/windows/SkillsWindow';
import ProjectsWindow from '../components/windows/ProjectsWindow';
import BlogWindow from '../components/windows/BlogWindow';
import ContactWindow from '../components/windows/ContactWindow';

const ACCENT: Record<WindowId, string> = {
  hero:     'var(--clr-blue)',
  about:    'var(--clr-green)',
  skills:   'var(--clr-purple)',
  projects: 'var(--clr-orange)',
  blog:     'var(--clr-purple)',
  contact:  'var(--clr-green)',
};

export default function Desktop() {
  const {
    windows, toggleWindow, closeWindow,
    minimizeWindow, maximizeWindow, moveWindow, bringToFront,
  } = useWindows();

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openWindow = (id: string) => {
    toggleWindow(id as WindowId);
    bringToFront(id as WindowId);
  };

  const renderContent = (id: WindowId) => {
    switch (id) {
      case 'hero':     return <HeroWindow openWindow={openWindow} />;
      case 'about':    return <AboutWindow />;
      case 'skills':   return <SkillsWindow />;
      case 'projects': return <ProjectsWindow />;
      case 'blog':     return <BlogWindow />;
      case 'contact':  return <ContactWindow />;
    }
  };

  return (
    <>
      {/* Desktop canvas */}
      <div style={{
        position: 'fixed',
        inset: 0,
        bottom: 'var(--taskbar-h)',
        overflow: 'hidden',
        /* wallpaper — user drops their image at /public/wallpaper.png */
        backgroundImage: 'url(https://ychxxc3ikcjlk4ux.public.blob.vercel-storage.com/Iron%20Forge%20Wallpaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Dark overlay so windows are readable over the wallpaper */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4, 8, 20, 0.45)',
          pointerEvents: 'none',
        }} />

        {/* Circuit grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,180,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Windows */}
        {(Object.keys(windows) as WindowId[]).map((id) => (
          <WindowCard
            key={id}
            win={windows[id]}
            accent={ACCENT[id]}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onMove={moveWindow}
            onFocus={bringToFront}
          >
            {renderContent(id)}
          </WindowCard>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        time={time}
        date={date}
        onToggle={toggleWindow}
      />
    </>
  );
}
