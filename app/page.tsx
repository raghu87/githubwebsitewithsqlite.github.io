import Link from 'next/link';
import { getAllPosts, getHomeEntries, HomeEntry } from '@/lib/database';

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  created_at: string;
}

function PostCard({ title, slug, excerpt, author, created_at }: PostCardProps) {
  const date = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="post-card">
      <h2>
        <Link href={`/posts/${slug}`} prefetch={false}>{title}</Link>
      </h2>
      <div className="post-meta">
        By <strong>{author}</strong> on {date}
      </div>
      <p className="post-excerpt">{excerpt}</p>
      <Link href={`/posts/${slug}`} className="read-more" prefetch={false}>
        Read more →
      </Link>
    </article>
  );
}

function HomeCard({ location, latitude, longitude, elevation, sunrise, sunset, date }: HomeEntry) {
  return (
    <article className="post-card">
      <h2>{location}</h2>
      <div className="post-meta">
        {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        {' · '}
        {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
      </div>
      <p className="post-excerpt">
        Elevation: <strong>{elevation.toLocaleString()} m</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Sunrise: <strong>{sunrise}</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Sunset: <strong>{sunset}</strong>
      </p>
    </article>
  );
}

export default async function Home() {
  const [posts, homeEntries] = await Promise.all([
    getAllPosts(),
    Promise.resolve(getHomeEntries()),
  ]);

  return (
    <>
      <h1>Welcome to the Blog</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        This is a static site built with Next.js and SQLite. All posts are generated at build time from our database.
      </p>

      <section>
        {posts.length === 0 ? (
          <p>No posts found. Run the database initialization script to add sample data.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              author={post.author}
              created_at={post.created_at}
            />
          ))
        )}
      </section>

      <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Map Logs</h2>
      <section>
        {homeEntries.length === 0 ? (
          <p>No map log entries found. Run <code>npm run seed-home</code> to add sample data.</p>
        ) : (
          homeEntries.map((entry) => (
            <HomeCard key={entry.id} {...entry} />
          ))
        )}
      </section>
    </>
  );
}
