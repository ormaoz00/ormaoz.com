# ormaoz.com

Personal brand & digital hub — automation, strategy, and digital solutions.

## Structure

```
ormaoz.com/
├── index.html              # Main homepage
├── CNAME                   # GitHub Pages custom domain
├── assets/
│   ├── css/style.css       # Global styles
│   └── js/main.js          # Global scripts
└── pages/
    └── funnel/             # Marketing funnel page
        ├── index.html      # Landing page
        ├── index.css       # Funnel styles
        ├── script.js       # Funnel scripts
        └── thank-you.html  # Thank you page
```

## Adding New Pages

1. Create a folder inside `pages/` (e.g. `pages/new-page/`)
2. Add `index.html` and any assets
3. Link to it from the main site: `<a href="pages/new-page/">`
4. Commit & push — GitHub Pages auto-deploys

## Live URLs

- **Homepage:** https://ormaoz.com
- **Funnel:** https://ormaoz.com/pages/funnel/

## Deploy

Hosted on GitHub Pages. Push to `main` branch to deploy automatically.
