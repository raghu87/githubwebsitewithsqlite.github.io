import fs from 'fs';
import path from 'path';

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
}

function getDataPath(): string {
  return path.join(process.cwd(), 'data', 'posts.json');
}

function loadPostsData(): Post[] {
  try {
    const dataPath = getDataPath();
    if (!fs.existsSync(dataPath)) {
      console.warn(`Posts data file not found at ${dataPath}`);
      return [];
    }
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileContent) as Post[];
  } catch (error) {
    console.error('Error loading posts data:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = loadPostsData();
  return posts.sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = loadPostsData();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = loadPostsData();
  return posts.map(post => post.slug);
}


