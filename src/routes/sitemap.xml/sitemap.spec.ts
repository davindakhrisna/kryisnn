import { describe, it, expect, vi } from 'vitest';

vi.mock('$app/env/private', () => ({
	ORIGIN: 'https://kryisnn.dev'
}));

import { GET } from './+server';

import type { RequestEvent } from './$types';

describe('Sitemap Endpoint', () => {
	it('generates valid XML and headers', async () => {
		const response = await GET({} as unknown as RequestEvent);

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toContain('application/xml');
		expect(response.headers.get('Cache-Control')).toContain('max-age=3600');

		const xml = await response.text();
		expect(xml).toContain('<urlset');
		expect(xml).toContain('https://kryisnn.dev/');
		expect(xml).toContain('</urlset>');
	});
});
