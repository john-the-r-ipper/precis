import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';

const agents = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'Bingbot',
  'Claude-SearchBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
];

const lines = ['User-agent: *', 'Allow: /', ''];

for (const agent of agents) {
  lines.push(`User-agent: ${agent}`, 'Allow: /', '');
}

lines.push(`Sitemap: ${siteConfig.siteUrl}${siteConfig.basePath}sitemap-index.xml`, '');

export const GET: APIRoute = () =>
  new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
