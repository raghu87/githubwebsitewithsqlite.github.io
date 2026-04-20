import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '@/lib/database';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Convert markdown-like content to basic HTML
  const contentHtml = post.content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('# ')) {
        return `<h1 key=${index}>${line.substring(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 key=${index}>${line.substring(3)}</h2>`;
      }
      if (line.startsWith('- ')) {
        return `<li key=${index}>${line.substring(2)}</li>`;
      }
      if (line.startsWith('1. ') || line.match(/^\d+\. /)) {
        return `<li key=${index}>${line.replace(/^\d+\. /, '')}</li>`;
      }
      if (line.trim() === '') {
        return null;
      }
      return `<p key=${index}>${line}</p>`;
    })
    .filter(Boolean)
    .join('');

  return (
    <>
      <Link href="/" className="back-link" prefetch={false}>
        ← Back to all posts
      </Link>

      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          By <strong>{post.author}</strong> on {date}
        </div>

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </>
  );
}
