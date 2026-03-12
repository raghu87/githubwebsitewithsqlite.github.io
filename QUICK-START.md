# 🚀 Quick Start - Deploy to GitHub Pages

## One-Command Setup (Mac/Linux)

```bash
chmod +x setup-github-pages.sh
./setup-github-pages.sh
```

## Manual Setup (All Platforms)

### 1️⃣ Create Repository on GitHub
Go to https://github.com/new and create a repository (make it Public)

### 2️⃣ Initialize and Push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3️⃣ Enable GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**

### 4️⃣ Wait 2-3 Minutes
Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 📝 Update Content

Edit posts in `scripts/init-db.js`, then:

```bash
git add .
git commit -m "Update content"
git push
```

Site updates automatically! 🎉

---

## 📚 Full Documentation

See **GITHUB-PAGES-DEPLOYMENT.md** for complete instructions.

## 🆘 Troubleshooting

- Check the **Actions** tab on GitHub for build status
- Make sure `data/database.db` is committed
- Ensure repository is Public (or you have GitHub Pro)

---

**Your SQLite blog is ready to deploy!** 🚀
