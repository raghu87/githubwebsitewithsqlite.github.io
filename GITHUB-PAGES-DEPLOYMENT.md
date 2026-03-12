# GitHub Pages Deployment Guide

This guide will help you deploy your SQLite-powered static blog to GitHub Pages with automatic deployments.

---

## 🚀 Quick Deployment Steps

### Step 1: Create GitHub Repository

#### Option A: Use GitHub Website
1. Go to https://github.com/new
2. Enter repository name (e.g., `my-blog` or `username.github.io`)
3. Make it **Public**
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

#### Option B: Personal Site (username.github.io)
- Repository name **must be**: `yourusername.github.io`
- This will be accessible at: `https://yourusername.github.io`

---

### Step 2: Initialize Git and Push Code

Extract the ZIP file and navigate to the directory:

```bash
# Navigate to the extracted folder
cd path/to/extracted/folder

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: SQLite blog setup"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save (if there's a save button)

That's it! The workflow will automatically run.

---

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be live!

---

## 🌐 Accessing Your Site

### Regular Repository
- URL: `https://yourusername.github.io/repository-name/`

### Personal Site (username.github.io)
- URL: `https://yourusername.github.io/`

---

## 🔄 How Automatic Deployments Work

Every time you push to the `main` branch:
1. GitHub Actions workflow triggers automatically
2. Installs Node.js and dependencies
3. Runs `npm run init-db` to create the database
4. Runs `npm run build` to generate static HTML
5. Deploys the `out/` folder to GitHub Pages

**Your site updates automatically!** 🎉

---

## ✏️ How to Update Content

### Method 1: Edit Database and Push

1. **Edit `scripts/init-db.js`** to add/modify posts
2. **Commit and push**:
   ```bash
   git add scripts/init-db.js
   git commit -m "Add new blog post"
   git push
   ```
3. **Wait 2-3 minutes** for automatic deployment

### Method 2: Edit Database Directly

1. **Edit `data/database.db`** using DB Browser for SQLite
2. **Commit and push**:
   ```bash
   git add data/database.db
   git commit -m "Update blog content"
   git push
   ```
3. **Wait 2-3 minutes** for automatic deployment

---

## 🛠️ Troubleshooting

### Issue: Workflow fails with "Page build failed"

**Check the Actions tab** for detailed error logs.

Common fixes:
```bash
# Test locally first
npm install
npm run init-db
npm run build

# If it works locally, push again
git push
```

### Issue: 404 Page Not Found

**Solution 1**: Check repository settings
- Settings → Pages → Ensure source is "GitHub Actions"

**Solution 2**: Check the URL
- Regular repo: `https://username.github.io/repo-name/`
- Personal site: `https://username.github.io/`

**Solution 3**: Wait a few minutes
- First deployment can take up to 10 minutes

### Issue: Workflow doesn't run

**Check these:**
1. Actions tab → Ensure workflow is enabled
2. Settings → Actions → General → Ensure "Allow all actions" is selected
3. Try manual trigger: Actions tab → Deploy to GitHub Pages → Run workflow

### Issue: Database not found error

**Solution**: Ensure `data/database.db` is committed
```bash
git add data/database.db
git commit -m "Add database"
git push
```

---

## 📝 Managing Multiple Posts

### Adding a New Post

Edit `scripts/init-db.js`:

```javascript
const posts = [
  // Existing posts...
  {
    title: 'My New Post Title',
    slug: 'my-new-post',  // URL-friendly version
    excerpt: 'A short description of the post',
    content: `# My New Post

Full content here in Markdown format.

## Section 1
Content...

## Section 2
More content...`,
    author: 'Your Name'
  }
];
```

Then:
```bash
npm run init-db  # Test locally
git add scripts/init-db.js data/database.db
git commit -m "Add new post: My New Post Title"
git push
```

### Updating Existing Post

1. Find the post in `scripts/init-db.js`
2. Edit the content
3. Run `npm run init-db` locally to update database
4. Commit and push both files

---

## 🎨 Customizing Your Site

### Change Site Title and Description

Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Blog Title',
  description: 'Your blog description',
};
```

### Modify Styles

Edit `app/globals.css` to change colors, fonts, and layout.

### Add More Pages

Create new files in the `app/` directory following Next.js app router conventions.

---

## 🔒 Repository Visibility

### Public Repository (Recommended for GitHub Pages)
- Free GitHub Pages hosting
- Anyone can see your code
- Perfect for blogs and portfolios

### Private Repository
- Requires GitHub Pro, Team, or Enterprise
- Code is private, but the website is still public
- Costs $4/month for Pro plan

---

## 📊 GitHub Pages Limitations

- **File size**: Max 100 MB per file
- **Bandwidth**: 100 GB/month soft limit
- **Build time**: 10 minutes max
- **Static files only**: No server-side processing (but we handle this!)

Your SQLite blog fits perfectly within these limits! 🎉

---

## 🚦 Deployment Checklist

Before your first push:
- [ ] Database file exists (`data/database.db`)
- [ ] `.github/workflows/deploy.yml` is present
- [ ] `package.json` has all dependencies
- [ ] `.gitignore` excludes node_modules
- [ ] Repository is created on GitHub
- [ ] Git remote is configured

After pushing:
- [ ] Check Actions tab for workflow status
- [ ] Wait for deployment to complete
- [ ] Visit your site URL
- [ ] Test navigation and blog posts

---

## 💡 Pro Tips

1. **Test Locally First**: Always run `npm run build` locally before pushing
2. **Use Branches**: Create feature branches for major changes
3. **Commit Database**: Don't forget to commit `database.db` after updates
4. **Monitor Actions**: Check the Actions tab after each push
5. **Cache Busting**: GitHub Pages may cache old versions; wait a few minutes

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check the Actions tab** for detailed logs
2. **Test locally**: `npm install && npm run init-db && npm run build`
3. **Verify files**: Ensure all necessary files are committed
4. **Check GitHub Pages settings**: Settings → Pages → Source: GitHub Actions

---

## 🎉 Success!

Once deployed, your blog is:
- ✅ Live on the internet
- ✅ Automatically updated on every push
- ✅ Fast (static HTML)
- ✅ Free to host
- ✅ Easy to maintain

Happy blogging! 🚀
