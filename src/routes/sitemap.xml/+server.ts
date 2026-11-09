import type { RequestHandler } from './$types';
import { ORIGIN } from '$app/env/private';

export const GET: RequestHandler = () => {
	const base = ORIGIN || 'http://localhost:5173';
	const pages = [
		{ url: '/', priority: '1.0', changefreq: 'daily' },
		{ url: '/about', priority: '0.8', changefreq: 'monthly' }
	];

	const now = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${base}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
