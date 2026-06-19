import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'David Mwangi — Mechatronic Engineer',
  description: 'Personal portfolio of David Mwangi, Mechatronic Student Engineer at DeKUT.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
