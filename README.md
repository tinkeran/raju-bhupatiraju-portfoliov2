# studior.cc — v2.0

Personal website of Raju Bhupatiraju. Built on **Cloudflare Pages + Workers**.

## Stack
- Pure HTML/CSS/JS — zero build step, zero dependencies at runtime
- Cloudflare Pages (static hosting)
- Cloudflare Functions (middleware for clean URL routing)

## Structure
```
studior-v2/
├── public/
│   ├── index.html          ← Landing page (animated 3-slide showcase)
│   ├── resume.html         ← Full resume with timeline + sidebar
│   ├── photography.html    ← Photography portfolio (placeholder)
│   ├── tools.html          ← Tools directory
│   └── assets/
│       ├── style.css       ← Shared styles
│       └── main.js         ← Shared JS (cursor, scroll reveal)
├── functions/
│   └── _middleware.js      ← Clean URL routing (/resume → /resume.html)
├── wrangler.toml
├── package.json
└── README.md
```

## Local Dev
```bash
npm install
npm run dev
# → http://localhost:8788
```

## Deploy to Cloudflare Pages

### First time setup
```bash
npm install
npx wrangler login
npx wrangler pages project create studior-cc
npm run deploy
```

### Subsequent deploys
```bash
npm run deploy
```

### Connect to custom domain (studior.cc)
1. Go to Cloudflare Dashboard → Pages → studior-cc → Custom Domains
2. Add `studior.cc` and `www.studior.cc`
3. DNS records will be configured automatically (domain already on Cloudflare)

## Push to GitHub
```bash
# If updating existing repo:
git add .
git commit -m "feat: studior.cc v2.0 — Bold redesign with resume, photography, tools"
git push origin main

# If creating new repo:
git init
git add .
git commit -m "feat: studior.cc v2.0 initial commit"
git remote add origin https://github.com/tinkeran/YOUR-REPO-NAME.git
git push -u origin main
```

## Pages in this release (v2.0)
| Page | Status |
|------|--------|
| Landing (/) | ✅ Complete — 3-slide animated showcase |
| Resume (/resume) | ✅ Complete — full timeline, skills, certs, awards |
| Photography (/photography) | 🚧 Placeholder — ready for gallery |
| Tools (/tools) | ✅ Complete — RemindMe live + 2 coming soon |

---
© 2025 Raju Bhupatiraju
