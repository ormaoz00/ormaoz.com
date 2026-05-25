# ⚡ ormaoz.com

> Personal brand hub – Marketing, Automation, AI & Digital Presence.

## 🧭 Overview

This is the central repository for everything related to **Or Maoz** – my digital world.

The main website ([ormaoz.com](https://ormaoz.com)) is hosted on **ClickFunnels** and serves as my primary platform for:
- 📝 Blog posts & content
- 🔄 Marketing funnels
- 🛠️ Services & offerings
- 📊 Lead generation & CRM

This repo manages **all additional digital assets** – landing pages, microsites, and tools built rapidly with AI and deployed on **Vercel** as subdomains of `ormaoz.com`.

## 🏗️ Architecture

```
ormaoz.com (ClickFunnels)
│
│   Main site: blog, funnels, services, content
│
├── funnel.ormaoz.com  →  Vercel  →  pages/funnel/
├── diary.ormaoz.com   →  Vercel  →  pages/diary/
└── [xxx].ormaoz.com   →  Vercel  →  pages/[xxx]/
```

| Layer | Platform | Purpose |
|-------|----------|---------|
| **Main Site** | ClickFunnels | Blog, funnels, services, checkout |
| **Subdomains** | Vercel + GitHub | AI-built landing pages, tools, microsites |
| **Source Control** | GitHub | Version control, backup, collaboration |
| **DNS** | Domain registrar | Route subdomains to Vercel |

## 📂 Repo Structure

```
ormaoz.com/
├── README.md
├── .gitignore
│
├── _templates/              # Reusable page templates
│   └── base/                # Base template (HTML + CSS + JS)
│
├── pages/                   # Each folder = a subdomain on Vercel
│   ├── funnel/              # funnel.ormaoz.com – Automation consulting funnel
│   │   ├── index.html
│   │   ├── index.css
│   │   ├── script.js
│   │   └── thank-you.html
│   │
│   └── diary/               # diary.ormaoz.com – Personal journal
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── [future pages...]
```

## 🚀 Live Pages

| Page | Subdomain | Vercel URL | Status |
|------|-----------|------------|--------|
| Automation Funnel | `funnel.ormaoz.com` | [funnel-two-topaz.vercel.app](https://funnel-two-topaz.vercel.app) | ✅ Live |
| Digital Diary | `diary.ormaoz.com` | [diary-nu-six.vercel.app](https://diary-nu-six.vercel.app) | ✅ Live |

## ⚡ Quick Deploy – New Page

```bash
# 1. Create the page
mkdir pages/my-page
# Add index.html + assets

# 2. Deploy to Vercel
cd pages/my-page
vercel --yes --scope speedclean --prod

# 3. Add subdomain (in Vercel Dashboard + DNS)
# CNAME: my-page → cname.vercel-dns.com

# 4. Commit & push
cd ../..
git add . && git commit -m "Add my-page" && git push
```

## 🛠️ Tech Stack

- **HTML / CSS / JS** – Static pages, no framework needed
- **Vercel** – Hosting & CDN (free tier)
- **GitHub** – Source control
- **ClickFunnels** – Main site platform
- **AI (Antigravity)** – Rapid page generation & design

## 👤 About

**Or Maoz** – Automation & digital strategy expert.  
Helping businesses work smarter with automations, AI, and digital solutions.

- 🌐 [ormaoz.com](https://ormaoz.com)
- 🐙 [github.com/ormaoz00](https://github.com/ormaoz00)

---

© 2026 Or Maoz. All rights reserved.
