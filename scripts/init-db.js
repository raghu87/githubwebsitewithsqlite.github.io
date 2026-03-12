const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  const SQL = await initSqlJs();

  const dbDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'database.db');

  let db;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create posts table
  db.run(`
    DROP TABLE IF EXISTS posts;
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      author TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert sample posts
  const posts = [
    {
      title: 'Welcome to Our Blog',
      slug: 'welcome',
      excerpt: 'This is the first post on our blog. Learn about what we do.',
      content: `# Welcome to Our Blog

This is the first blog post. We're using Next.js with SQLite to create a static site that pulls data from a database at build time.

## Why This Approach?

- **Fast**: Static HTML pages load instantly
- **Scalable**: No server overhead
- **Simple**: Just push your database changes and redeploy
- **Secure**: No dynamic endpoints to worry about

Enjoy exploring our content!`,
      author: 'Admin'
    },
    {
      title: 'Getting Started with Next.js',
      slug: 'getting-started-nextjs',
      excerpt: 'A beginner\'s guide to Next.js and static site generation.',
      content: `# Getting Started with Next.js

Next.js is a React framework that makes building web applications easier. In this post, we'll explore static site generation.

## Key Features

1. **App Router** - Modern file-based routing
2. **Static Export** - Generate pure HTML files
3. **TypeScript Support** - Full type safety
4. **Image Optimization** - Built-in image handling

## Next Steps

Learn more at [nextjs.org](https://nextjs.org)`,
      author: 'Developer'
    },
    {
      title: 'SQLite in Production',
      slug: 'sqlite-production',
      excerpt: 'Using SQLite as a data source for static site generation.',
      content: `# Using SQLite for Static Site Generation

SQLite is a lightweight database that works perfectly for static site generation. Build time data fetching ensures your site is always up-to-date.

## Benefits

- **Lightweight**: Single file database
- **Fast**: ACID transactions
- **Reliable**: Battle-tested by millions
- **Simple**: No server infrastructure needed

This approach scales well for content-heavy sites!`,
      author: 'Data Engineer'
    }
  ];

  posts.forEach(post => {
    db.run(
      'INSERT INTO posts (title, slug, excerpt, content, author) VALUES (?, ?, ?, ?, ?)',
      [post.title, post.slug, post.excerpt, post.content, post.author]
    );
  });

  // Write database file
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);

  console.log('Database initialized successfully at', dbPath);
}

initDatabase().catch(err => {
  console.error('Error initializing database:', err);
  process.exit(1);
});

