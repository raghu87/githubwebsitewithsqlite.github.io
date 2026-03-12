import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
}

let SQL: any = null;

async function initSQL() {
  if (SQL) return SQL;
  
  // Explicitly locate the WASM binary so Next.js bundler can find it
  SQL = await initSqlJs({
    locateFile: (file: string) =>
      path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
  });
  return SQL;
}

function rowToPost(columns: string[], values: any[]): Post {
  const post: any = {};
  columns.forEach((col, i) => {
    post[col] = values[i];
  });
  return post as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const SQL = await initSQL();
  const dbPath = path.join(process.cwd(), 'data', 'database.db');
  
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database not found at ${dbPath}. Please run 'npm run init-db' first.`);
  }

  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);
  
  const results = db.exec('SELECT * FROM posts ORDER BY created_at DESC');
  db.close();
  
  if (results.length === 0) {
    return [];
  }

  const { columns, values } = results[0];
  return values.map((row: any[]) => rowToPost(columns, row));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const SQL = await initSQL();
  const dbPath = path.join(process.cwd(), 'data', 'database.db');
  
  if (!fs.existsSync(dbPath)) {
    return null;
  }

  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);
  
  const results = db.exec('SELECT * FROM posts WHERE slug = ?', [slug]);
  db.close();
  
  if (results.length === 0 || results[0].values.length === 0) {
    return null;
  }

  const { columns, values } = results[0];
  return rowToPost(columns, values[0]);
}

export async function getPostSlugs(): Promise<string[]> {
  const SQL = await initSQL();
  const dbPath = path.join(process.cwd(), 'data', 'database.db');
  
  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);
  
  const results = db.exec('SELECT slug FROM posts');
  db.close();
  
  if (results.length === 0) {
    return [];
  }

  return results[0].values.map((row: any[]) => row[0] as string);
}


