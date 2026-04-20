import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
}

export interface HomeEntry {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  elevation: number;
  sunrise: string;
  sunset: string;
  date: string;
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

export function getHomeEntries(): HomeEntry[] {
  const dbPath = path.join(process.cwd(), 'data', 'home.db');
  if (!fs.existsSync(dbPath)) {
    console.warn(`home.db not found at ${dbPath}`);
    return [];
  }
  const db = new Database(dbPath, { readonly: true });
  try {
    return db.prepare('SELECT * FROM home ORDER BY date DESC').all() as HomeEntry[];
  } finally {
    db.close();
  }
}

