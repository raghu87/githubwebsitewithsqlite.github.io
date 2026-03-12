# GitHub Website with SQLite

A fully static Next.js website that fetches data from an SQLite database at **build time** to generate static HTML pages, deployed automatically to GitHub Pages.

## 🚀 Features

- **Static Site Generation (SSG)** - All pages are pre-rendered as static HTML
- **SQLite Database** - Content stored in a simple SQLite database
- **Zero Runtime** - No server needed, pure static files on GitHub Pages
- **TypeScript** - Full type safety
- **Responsive Design** - Mobile-friendly styling included
- **Automated Deployment** - GitHub Actions workflow for CI/CD

## 📋 Prerequisites

- Node.js 18+
- npm or similar package manager
- Git

## 🏃 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Database

This creates the SQLite database and seeds it with sample blog posts:

```bash
npm run init-db
```

### 3. Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build

Generate the static export:

```bash
npm run build
```

This creates an `out/` directory containing all static HTML files.

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page (lists all posts)
│   ├── posts/[slug]/        # Dynamic post pages
│   ├── not-found.tsx        # 404 page
│   └── globals.css          # Global styles
├── lib/
│   └── database.ts          # SQLite access functions
├── scripts/
│   └── init-db.js           # Database initialization script
├── data/
│   └── database.db          # SQLite database (created by init-db)
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions workflow
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🗄️ Database Schema

The default schema includes a `posts` table:

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Modifying Content

To add or update posts:

1. Edit `scripts/init-db.js` to add/modify posts in the sample data
2. Delete the existing database: `rm data/database.db`
3. Reinitialize: `npm run init-db`
4. Or directly use a SQLite client to modify `data/database.db`

## 🚢 Deployment

### GitHub Pages Setup

1. Ensure your repository is named `acharrag.github.io` (or update the Pages settings)
2. Go to repository **Settings** → **Pages**
3. Set **Source** to "GitHub Actions"

### Automatic Deployment

The workflow in `.github/workflows/deploy.yml` automatically:

1. Installs dependencies when you push to `main`
2. Initializes the database
3. Builds the static site
4. Deploys to GitHub Pages

Just push your changes:

```bash
git add .
git commit -m "Add new content"
git push origin main
```

The site will be live at `https://acharrag.github.io/`

## 🔄 Updating Content

To update your site content:

1. Modify the database (either by editing `scripts/init-db.js` or directly)
2. Commit and push changes
3. GitHub Actions automatically rebuilds and deploys

```bash
npm run init-db    # Update local database
git add data/database.db
git commit -m "Update blog content"
git push origin main
```

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build static export
- `npm run init-db` - Initialize/seed the database
- `npm run start` - Start production server (for testing)
- `npm run lint` - Run ESLint

## ⚙️ Configuration

### Customize Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
};
```

### Change Database Location

The database path is defined in `lib/database.ts` and `scripts/init-db.js`. By default, it's stored in `data/database.db`.

### Add More Content Types

To add new content types (e.g., projects, portfolio items):

1. Extend the database schema in `scripts/init-db.js`
2. Add query functions in `lib/database.ts`
3. Create new pages in `app/`

## 📝 How It Works

1. **Build Time**: When you run `npm run build`, Next.js:
   - Reads `generateStaticParams()` to learn what pages exist
   - Queries the SQLite database **directly** for each post's data using better-sqlite3
   - Generates static HTML files with the data baked in

2. **Result**: All data is embedded into the HTML at build time

3. **Deployment**: GitHub Actions runs the build process and deploys to Pages

4. **Serving**: Users get pure HTML files served directly from GitHub Pages

**Note**: The SQLite database is only accessed during the build process. At runtime, everything is static HTML.

## 🚫 Limitations

- **No Dynamic Data**: Updates require rebuilding (no instant updates)
- **No User Interactions**: No forms, comments, or dynamic features
- **Database Size**: SQLite file size is limited (GitHub's file size limits)
- **Build Time**: Very large datasets may slow down builds

## ✨ Best Use Cases

- 📝 Blogs
- 🎨 Portfolios
- 📚 Documentation sites
- 📰 News sites
- 🏪 Product catalogs
- 🎯 Static content sites

## 🔒 Security

- No server-side code runs on production
- Database only accessed at build time
- All content is pre-rendered HTML
- Safe to version control the database

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages](https://pages.github.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## 📄 License

MIT - Feel free to use this as a template for your own projects.