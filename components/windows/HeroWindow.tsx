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

function Btn({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
        letterSpacing: 1, textTransform: 'uppercase',
        padding: '9px 22px',
        background: primary ? 'var(--clr-blue)' : 'transparent',
        color: primary ? '#040d1c' : 'var(--clr-blue)',
        border: primary ? 'none' : '1px solid rgba(0,180,255,0.35)',
        borderRadius: 8, cursor: 'pointer',
        transition: 'opacity 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
      onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
    >
      {children}
    </button>
  );
}

export default function HeroWindow({ openWindow }: { openWindow: (id: string) => void }) {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      <p style={{ ...mono, fontSize: 11, color: 'var(--clr-text-muted)', marginBottom: '1.4rem' }}>
        <span style={{ color: 'var(--clr-green)' }}>&gt;</span> root@david-os:~$ ./load_profile --user=david.mwangi
      </p>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: 2,
        marginBottom: '0.35rem',
        color: 'var(--clr-text)',
      }}>
        DAVID
        <span style={{ display: 'block', color: 'var(--clr-blue)', textShadow: '0 0 40px rgba(0,180,255,0.35)' }}>
          MWANGI
        </span>
      </h1>

      <p style={{ ...mono, fontSize: 12, color: 'var(--clr-green)', letterSpacing: 2, marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: 4 }}>
        MECHATRONIC STUDENT ENGINEER
        <span style={{ display: 'inline-block', width: 2, height: 13, background: 'var(--clr-green)', animation: 'blink 1s step-end infinite' }} />
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: '1.8rem' }}>
        {['IoT', 'Embedded Systems', 'AI/ML', 'AR/VR/XR', 'E-mobility', 'Full Stack'].map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Btn primary onClick={() => openWindow('projects')}>View Projects</Btn>
        <Btn onClick={() => openWindow('contact')}>Contact Me</Btn>
      </div>
    </div>
  );
}
