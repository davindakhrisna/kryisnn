import { describe, it, expect } from 'vitest';
import { formatPageTitle, buildCanonicalUrl, generateJsonLdWebsite } from './meta';

describe('SEO Metadata Helper', () => {
	it('formats page title with site suffix', () => {
		expect(formatPageTitle('Dashboard')).toBe('Dashboard | Kryisnn');
	});

	it('returns default site name when title is empty', () => {
		expect(formatPageTitle()).toBe('Kryisnn');
		expect(formatPageTitle('')).toBe('Kryisnn');
		expect(formatPageTitle('Kryisnn')).toBe('Kryisnn');
	});

	it('builds absolute canonical URLs properly', () => {
		expect(buildCanonicalUrl('/about', 'https://example.com')).toBe('https://example.com/about');
		expect(buildCanonicalUrl('contact', 'https://example.com/')).toBe(
			'https://example.com/contact'
		);
	});

	it('generates valid Schema.org JSON-LD website structure', () => {
		const jsonLd = generateJsonLdWebsite({
			name: 'Kryisnn',
			description: 'High performance web application',
			url: 'https://example.com',
			logo: 'https://example.com/logo.png'
		});

		expect(jsonLd).toEqual({
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Kryisnn',
			description: 'High performance web application',
			url: 'https://example.com',
			publisher: {
				'@type': 'Organization',
				name: 'Kryisnn',
				logo: 'https://example.com/logo.png'
			}
		});
	});
});
