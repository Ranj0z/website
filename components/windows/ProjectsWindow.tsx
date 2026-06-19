'use client';

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

function Tag({ label, color = 'var(--clr-orange)' }: { label: string; color?: string }) {
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

const PROJECTS = [
  {
    title: 'Smart Irrigation System',
    desc: 'Automated soil-moisture sensing with ESP32, MQTT broker and a live web dashboard.',
    tags: ['IoT', 'ESP32', 'Python', 'MQTT'],
    accent: 'var(--clr-blue)',
  },
  {
    title: 'AR Campus Navigator',
    desc: 'Augmented reality indoor navigation prototype built for DeKUT campus corridors.',
    tags: ['AR/XR', 'Unity', 'C#'],
    accent: 'var(--clr-purple)',
  },
  {
    title: 'E-Bike Motor Controller',
    desc: 'Embedded motor controller for electric bicycle with regenerative braking logic.',
    tags: ['Embedded C', 'AutoCAD'],
    accent: 'var(--clr-green)',
  },
];

export default function ProjectsWindow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 12 }}>
      {PROJECTS.map(({ title, desc, tags, accent }) => (
        <div
          key={title}
          style={{
            background: 'rgba(0,0,0,0.28)',
            border: '1px solid rgba(0,180,255,0.1)',
            borderRadius: 10, padding: '1.1rem',
            transition: 'border-color 0.2s, transform 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,180,255,0.35)'; el.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,180,255,0.1)'; el.style.transform = 'none'; }}
        >
          <div style={{ width: 22, height: 2, background: accent, borderRadius: 1, marginBottom: 10 }} />
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--clr-text)', marginBottom: 7 }}>{title}</h3>
          <p style={{ fontSize: 12, color: 'var(--clr-text-sec)', lineHeight: 1.65, marginBottom: 10 }}>{desc}</p>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
