'use client';

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

function Tag({ label, color = 'var(--clr-blue)' }: { label: string; color?: string }) {
  return (
    <span style={{
      ...mono,
      fontSize: 10,
      color,
      border: `1px solid ${color}40`,
      borderRadius: 4,
      padding: '2px 9px',
      background: `${color}0d`,
    }}>
      {label}
    </span>
  );
}

const POSTS = [
  { date: '2025-05-10', tag: 'Opinion',  color: 'var(--clr-blue)',   title: 'Why Mechatronics is the Future of Engineering' },
  { date: '2025-04-22', tag: 'Tutorial', color: 'var(--clr-green)',  title: 'Building My First IoT Dashboard with MQTT' },
  { date: '2025-03-15', tag: 'Research', color: 'var(--clr-purple)', title: 'AR in Education: A DeKUT Case Study' },
];

export default function BlogWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {POSTS.map(({ date, tag, color, title }) => (
        <div
          key={title}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            padding: '12px 14px',
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 8, cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,180,255,0.05)'; el.style.borderColor = 'rgba(0,180,255,0.15)'; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,0,0,0.2)'; el.style.borderColor = 'rgba(255,255,255,0.05)'; }}
        >
          <span style={{ ...mono, fontSize: 10, color: 'var(--clr-text-muted)', minWidth: 75 }}>{date}</span>
          <Tag label={tag} color={color} />
          <span style={{ fontSize: 13, color: 'var(--clr-text-sec)', flex: 1, minWidth: 160 }}>{title}</span>
        </div>
      ))}
    </div>
  );
}
