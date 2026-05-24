# 🚀 ormaoz.com – Pages Hub

Central repo for all landing pages, funnels, and microsites under `ormaoz.com` subdomains.

## 🏗️ Architecture

```
ormaoz.com (ClickFunnels)     ← Main domain stays on ClickFunnels
├── funnel.ormaoz.com         ← Vercel → pages/funnel/
├── diary.ormaoz.com          ← Vercel → pages/diary/
├── portfolio.ormaoz.com      ← Vercel → pages/portfolio/
└── [anything].ormaoz.com     ← Vercel → pages/[anything]/
```

## 📂 Repo Structure

```
ormaoz.com/
├── README.md
├── pages/
│   ├── funnel/           ← funnel.ormaoz.com
│   │   ├── index.html
│   │   ├── index.css
│   │   ├── script.js
│   │   └── thank-you.html
│   ├── diary/            ← diary.ormaoz.com (example)
│   │   └── index.html
│   └── [new-page]/       ← [new-page].ormaoz.com
│       └── index.html
```

## ⚡ How to Add a New Page

### Step 1: Create the page
```bash
mkdir pages/my-new-page
# Add index.html and any assets
```

### Step 2: Deploy to Vercel
```bash
cd pages/my-new-page
vercel --yes
```

### Step 3: Connect subdomain
1. In Vercel dashboard → Project Settings → Domains
2. Add: `my-new-page.ormaoz.com`
3. In your DNS provider, add CNAME: `my-new-page` → `cname.vercel-dns.com`

Done! ✅

## 🔗 Live Pages

| Page | Subdomain | Status |
|------|-----------|--------|
| Automation Funnel | `funnel.ormaoz.com` | 🟡 Ready to deploy |

## 💡 Tips

- Each page is self-contained in its folder
- Vercel auto-deploys on push to `main`
- Free tier supports unlimited deployments
