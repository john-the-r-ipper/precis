import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './site.config.mjs';

const primaryPaths = [
  '/onlyorders/',
  '/blog/attention-is-all-you-need-transformer/',
  '/blog/rag-grounded-generation/',
];

export default defineConfig({
  site: siteConfig.siteUrl,
  base: siteConfig.basePath,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.priority = primaryPaths.some((p) => path.endsWith(p)) ? 1.0 : 0.6;
        item.changefreq = 'weekly';
        return item;
      },
    }),
  ],
});
