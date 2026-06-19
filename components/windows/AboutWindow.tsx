'use client';

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const textSec: React.CSSProperties = { color: 'var(--clr-text-sec)', fontSize: 14, lineHeight: 1.85 };

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

export default function AboutWindow() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Avatar */}
      <div style={{
        width: 110, height: 110, flexShrink: 0,
        background: 'rgba(0,180,255,0.06)',
        border: '2px solid rgba(0,180,255,0.2)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontSize: '1.8rem',
        color: 'var(--clr-blue)', fontWeight: 900,
      }}>
        DM
      </div>

      <div style={{ flex: 1, minWidth: 220 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: 2, marginBottom: '0.9rem', color: 'var(--clr-text)' }}>
          DAVID MWANGI K.
        </h2>
        <p style={{ ...textSec, marginBottom: '0.9rem' }}>
          Mechatronic Student Engineer at Dedan Kimathi University of Technology (DeKUT).
          Somewhere between late-night experiments, broken prototypes, and endless curiosity,
          engineering stopped being something I studied — it became something I am.
        </p>
        <p style={textSec}>
          I&apos;ve built systems, led teams, designed products, and immersed myself in IoT,
          E-mobility, AR/VR/XR, and embedded technology. Vice Chair of the DeKUT Engineering
          Students Association and proud IEEE member.
        </p>
        <div style={{ display: 'flex', gap: 7, marginTop: '1rem', flexWrap: 'wrap' }}>
          {['DeKUT', 'IEEE', 'DESA Vice Chair', 'Nakuru, Kenya'].map((b) => (
            <Tag key={b} label={b} color="var(--clr-green)" />
          ))}
        </div>
      </div>
    </div>
  );
}
