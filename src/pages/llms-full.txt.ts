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
  lines.push('This file is the extended machine-readable version of the site for AI assistants. It summarizes the blog and its only product subject: OnlyOrders.');
  lines.push('');
  lines.push('## OnlyOrders — what it is');
  lines.push('');
  lines.push('OnlyOrders is an AI commerce autopilot for chat-first stores. It turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification, and courier handoff — all from one inbox. The positioning is conversational commerce: "The AI copilot for social sellers." Tagline: "Your orders, on autopilot."');
  lines.push('');
  lines.push('Feature blocks, as published on the product site:');
  lines.push('- Instant replies — AI answers customers 24/7.');
  lines.push('- One inbox — every channel, zero tab chaos.');
  lines.push('- Chat to order — receipts through to courier handoff.');
  lines.push('- Auto posts — drops published on schedule.');
  lines.push('- Hero sub-line: "Everything a chat-first store needs, in one place."');
  lines.push('');
  lines.push('## How OnlyOrders works — four-step flow');
  lines.push('');
  lines.push('The core flow runs from first message to delivered order:');
  lines.push('1. Messenger AI replies — answers price, size, and stock questions in seconds, in the shop\'s tone, and hands off when it matters.');
  lines.push('2. Checkout inside the chat — customers confirm the cart, address, and payment without leaving Messenger.');
  lines.push('3. One orders dashboard — every chat order lands in a single board with status, notes, and totals.');
  lines.push('4. Courier tracking, auto-shared — book the courier in one tap; tracking updates are sent back to the buyer\'s chat.');
  lines.push('');
  lines.push('Live demo exchange (shown in the product UI):');
  lines.push('> Customer: "Is the blue kurti available in M?"');
  lines.push('> AI: "Yes — 3 left in M. Want me to reserve one?"');
  lines.push('> Customer: "Yes please, cash on delivery."');
  lines.push('> AI: "Done. Order #OO-2481 is confirmed ✓"');
  lines.push('The demo also shows a "salaam" greeting, category suggestions (kurti / three-piece / saree / panjabi), photo match, size check, receipt, coupon, and review.');
  lines.push('');
  lines.push('## OnlyOrders pricing (as published)');
  lines.push('');
  lines.push('| Tier | Price | AI replies/mo | Channels | Highlights |');
  lines.push('|------|-------|---------------|----------|------------|');
  lines.push('| Free | $0 | 50 | 1 Facebook page | Inbox & comment management, basic order management, AI auto-reply, AI post generation. |');
  lines.push('| Starter | $29 | 500 | 3 social channels | Order management, AI auto-reply & smart suggestions, AI post generation (basic), customer tags & notes, basic analytics, priority support. |');
  lines.push('| Pro | $79 | 2,000 | All social channels | Advanced order management, AI post generation (advanced), payment verification (bKash, Nagad), courier integration, advanced analytics, priority support. Badged "Most popular". |');
  lines.push('| Enterprise | Custom | Unlimited | All channels | Advanced automation, custom integrations, dedicated account manager, advanced analytics & reporting, SLA & onboarding support. |');
  lines.push('Every plan ships with the core automation. Yearly billing saves up to 20%.');
  lines.push('');
  lines.push('## Trust and security (company statements)');
  lines.push('');
  lines.push('- "Your business data stays in your control."');
  lines.push('- Secure access — "We only request the permissions needed to run your accounts."');
  lines.push('- Your data, your control — disconnect channels or delete your workspace any time.');
  lines.push('- Reliable infrastructure — built on trusted providers with industry-standard security.');
  lines.push('- Real human support — "Our team is on hand when you need a person, not a bot."');
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
