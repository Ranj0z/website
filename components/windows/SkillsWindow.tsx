'use client';

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

const SKILLS = [
  { name: 'IoT',          level: 85 },
  { name: 'Embedded Sys', level: 80 },
  { name: 'Python',       level: 78 },
  { name: 'Full Stack',   level: 72 },
  { name: 'MATLAB',       level: 70 },
  { name: 'AutoCAD',      level: 68 },
  { name: 'SolidWorks',   level: 65 },
  { name: 'AR/VR/XR',    level: 60 },
  { name: 'E-mobility',   level: 60 },
  { name: 'AI / ML',      level: 55 },
];

export default function SkillsWindow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px,1fr))', gap: 10 }}>
      {SKILLS.map(({ name, level }) => (
        <div key={name} style={{
          background: 'rgba(0,0,0,0.28)',
          border: '1px solid rgba(0,180,255,0.08)',
          borderRadius: 8, padding: 12,
        }}>
          <div style={{ ...mono, fontSize: 11, color: 'var(--clr-text-sec)', marginBottom: 8 }}>{name}</div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
            <div style={{
              height: '100%', width: `${level}%`,
              background: 'linear-gradient(90deg, var(--clr-blue), var(--clr-green))',
              borderRadius: 2,
            }} />
          </div>
          <div style={{ ...mono, fontSize: 10, color: 'var(--clr-text-muted)', marginTop: 4, textAlign: 'right' }}>
            {level}%
          </div>
        </div>
      ))}
    </div>
  );
}
