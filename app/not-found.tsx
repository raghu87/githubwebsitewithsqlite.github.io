import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#666' }}>
          Oops! This page could not be found.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Return to Home
        </Link>
      </div>
    </>
  );
}
