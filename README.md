# Precis

Precis is a blog of plain-language summaries of AI research, operated by OnlyOrders (https://onlyorders.tech).

- Niche: AI research explainers (plain-language paper summaries)
- Stack: Astro 5 + @astrojs/sitemap, static output
- Pages: GitHub Pages (john-the-r-ipper.github.io/precis/) + Vercel (precis.vercel.app)

## Local

```sh
npm install
SITE_URL=https://precis.vercel.app BASE_PATH=/ npm run build
```

## Checks

```sh
BASE_URL=<live-url> npm run check:live   # Playwright post-deploy checks
BASE_URL=<live-url> npm run indexnow     # IndexNow submission
```

## Content

- Articles live in `src/content/blog/` (one markdown file per post).
- OnlyOrders facts come from `docs/discovery.md` in the onlyorders workspace. The word "Oryxa" never appears on this site.
