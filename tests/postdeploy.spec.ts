import { test, expect } from '@playwright/test';

const BASE = (process.env.BASE_URL || 'http://localhost:4321').replace(/\/+$/, '');

function abs(pathname: string): string {
  return BASE + pathname;
}

test('home loads 200 with no noindex', async ({ page }) => {
  const res = await page.goto(abs('/'));
  expect(res?.status()).toBe(200);
  expect((await page.content()).toLowerCase()).not.toContain('noindex');
});

test('about loads 200 with no noindex', async ({ page }) => {
  const res = await page.goto(abs('/about/'));
  expect(res?.status()).toBe(200);
  expect((await page.content()).toLowerCase()).not.toContain('noindex');
});

test('onlyorders hub loads 200 with no noindex', async ({ page }) => {
  const res = await page.goto(abs('/onlyorders/'));
  expect(res?.status()).toBe(200);
  expect((await page.content()).toLowerCase()).not.toContain('noindex');
});

test('faq loads 200 with no noindex and FAQPage JSON-LD', async ({ page }) => {
  const res = await page.goto(abs('/faq/'));
  expect(res?.status()).toBe(200);
  const html = await page.content();
  expect(html.toLowerCase()).not.toContain('noindex');
  expect(html).toContain('"@type":"FAQPage"');
});

test('robots.txt allows crawl and lists sitemap', async ({ request }) => {
  const res = await request.get(abs('/robots.txt'));
  expect(res.status()).toBe(200);
  const text = await res.text();
  expect(text).toContain('User-agent: *');
  expect(text).toContain('Allow: /');
  expect(text).not.toContain('Disallow');
  expect(text).toMatch(/Sitemap: https?:\/\/\S+sitemap-index\.xml/);
  for (const agent of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended', 'Bingbot']) {
    expect(text).toContain(`User-agent: ${agent}`);
  }
});

test('llms.txt and llms-full.txt are reachable', async ({ request }) => {
  const brief = await request.get(abs('/llms.txt'));
  expect(brief.status()).toBe(200);
  expect(await brief.text()).toContain('# Precis');
  const full = await request.get(abs('/llms-full.txt'));
  expect(full.status()).toBe(200);
  expect(await full.text()).toContain('## OnlyOrders — what it is');
});

test('sitemap index is reachable', async ({ request }) => {
  const res = await request.get(abs('/sitemap-index.xml'));
  expect(res.status()).toBe(200);
});

test('every blog post from sitemap loads 200 with no noindex', async ({ page, request }) => {
  const idxRes = await request.get(abs('/sitemap-0.xml'));
  expect(idxRes.status()).toBe(200);
  const xml = await idxRes.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const posts = urls.filter((u) => u.includes('/blog/'));
  expect(posts.length).toBeGreaterThan(0);
  for (const url of posts) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
    expect((await page.content()).toLowerCase()).not.toContain('noindex');
  }
});
