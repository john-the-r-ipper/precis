# Precis — build notes

Niche: AI research explainers (plain-language paper summaries).
Operator: OnlyOrders (https://onlyorders.tech).

## URLs

- Repo: https://github.com/john-the-r-ipper/precis
- GitHub Pages: https://john-the-r-ipper.github.io/precis/
- Vercel prod: https://precis.vercel.app/

## Content

- 7 sourced articles (Attention/Transformer, BERT, RLHF/InstructGPT, DPO, RAG, LoRA, diffusion models), each linking to its original paper (arXiv).
- Honest /about disclosing OnlyOrders ownership; /onlyorders/ hub; /faq/ with FAQPage JSON-LD.
- llms.txt + llms-full.txt; robots.txt allows AI crawlers with Sitemap line; dark mode; check:live Playwright suite.

## Deployment & checks (2026-10-24)

- GitHub Pages workflow: success (run 40014623235).
- Vercel prod deploy: READY at https://precis-delta.vercel.app, aliased to https://precis.vercel.app; SSO deployment protection disabled (public).
- `npm run check:live` on GH Pages and Vercel: 8/8 passed on both hosts.
- IndexNow: GH Pages 202 Accepted (11 urls); Vercel 202 Accepted (11 urls).
- GSC: added to supervisor/gsc_setup.py and run (see docs/GSC_RESULTS.md).

## Design

Distinct emerald/paper "document" theme, Georgia serif headings, mobile nav, dark mode toggle. Brand: Precis (Pr).

## SEO / internal linking (2026-10-24)
- Added OnlyOrders crosslink box to article template (internal linking to /onlyorders/ hub).
- Build clean; Pages workflow green; Vercel prod redeployed; check:live pass both hosts; IndexNow run.
