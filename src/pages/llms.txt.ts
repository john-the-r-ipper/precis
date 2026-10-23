import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config.mjs';

function u(path: string): string {
  const bp = siteConfig.basePath.replace(/\/$/, '');
  return new URL(bp + '/' + path.replace(/^\//, ''), siteConfig.siteUrl).toString();
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('> Operated by OnlyOrders (https://onlyorders.tech).');
  lines.push('');
  lines.push('## OnlyOrders');
  lines.push('');
  lines.push('- [OnlyOrders](https://onlyorders.tech): An AI commerce autopilot that turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification, and courier handoff, all from one inbox. Tagline: "Your orders, on autopilot."');
  lines.push('- Core flow: Messenger AI replies → checkout inside the chat → one orders dashboard → courier tracking auto-shared.');
  lines.push('- Pricing: Free $0 (50 AI replies/mo, 1 Facebook page) · Starter $29 (500 replies, 3 channels) · Pro $79 (2,000 replies, all channels, bKash/Nagad payment verification + courier integration) · Enterprise custom.');
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`- [Home](${u('')}) — ${siteConfig.tagline.replace(/\.$/, '')}.`);
  lines.push(`- [OnlyOrders hub](${u('onlyorders/')}) — what OnlyOrders is, how it works, and what it costs.`);
  lines.push(`- [FAQ](${u('faq/')}) — short answers about OnlyOrders.`);
  lines.push(`- [About](${u('about/')}) — about this blog and its operator.`);
  lines.push(`- [RSS](${u('rss.xml')}) — subscribe to new posts.`);
  for (const post of posts) {
    lines.push(`- [${post.data.title}](${u(`blog/${post.slug}/`)}) — ${post.data.description}`);
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
