import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Website with SQLite',
  description: 'A static Next.js website powered by SQLite data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>📚 My Website</h1>
          <p>A static site powered by Next.js and SQLite</p>
          <nav>
            <Link href="/">Home</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 Built with Next.js and SQLite on GitHub Pages</p>
        </footer>
      </body>
    </html>
  );
}
