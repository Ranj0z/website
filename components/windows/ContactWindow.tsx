'use client';

import { useState } from 'react';

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const textSec: React.CSSProperties = { color: 'var(--clr-text-sec)', fontSize: 14, lineHeight: 1.85 };

const inputStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(0,180,255,0.15)',
  borderRadius: 8, padding: '9px 13px',
  color: 'var(--clr-text)',
  fontFamily: 'var(--font-body)', fontSize: 13,
  outline: 'none', width: '100%',
  transition: 'border-color 0.2s',
};

export default function ContactWindow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.5rem' }}>
      {/* Info */}
      <div>
        <p style={{ ...textSec, marginBottom: '1.2rem' }}>
          Looking to collaborate, connect, or talk engineering?
          I&apos;m always open to exciting projects and opportunities.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, ...mono, fontSize: 12 }}>
          {[
            { key: 'LOC', val: 'Nakuru, Kenya', href: undefined },
            { key: 'LNK', val: 'linkedin.com/in/david-mwangi-k', href: 'https://linkedin.com/in/david-mwangi-k' },
            { key: 'ORG', val: 'DeKUT · IEEE', href: undefined },
          ].map(({ key, val, href }) => (
            <div key={key} style={{ display: 'flex', gap: 10, color: 'var(--clr-text-sec)' }}>
              <span style={{ color: 'var(--clr-blue)', minWidth: 28 }}>{key}</span>
              {href
                ? <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--clr-blue)', textDecoration: 'none' }}>{val}</a>
                : <span>{val}</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.5)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.15)'; }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.5)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.15)'; }}
        />
        <textarea
          placeholder="Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.5)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(0,180,255,0.15)'; }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? 'rgba(0,180,255,0.5)' : 'var(--clr-blue)',
            color: '#040d1c',
            border: 'none', borderRadius: 8, padding: 10,
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: 13, letterSpacing: 1,
            textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%', transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { if (!loading) (e.target as HTMLElement).style.opacity = '0.82'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status feedback */}
        {status === 'success' && (
          <p style={{ ...mono, fontSize: 12, color: 'var(--clr-green)', textAlign: 'center' }}>
            ✓ Message sent successfully!
          </p>
        )}
        {status === 'error' && (
          <p style={{ ...mono, fontSize: 12, color: 'var(--clr-orange)', textAlign: 'center' }}>
            ✕ Failed to send. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
