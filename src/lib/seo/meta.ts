export interface SeoMetadataOptions {
	title?: string;
	description?: string;
	canonical?: string;
	image?: string;
	type?: 'website' | 'article';
	siteName?: string;
}

export interface JsonLdWebsiteOptions {
	name: string;
	description: string;
	url: string;
	logo?: string;
}

export function formatPageTitle(title?: string, siteName = 'Kryisnn'): string {
	if (!title || title.trim() === siteName) {
		return siteName;
	}
	return `${title.trim()} | ${siteName}`;
}

export function buildCanonicalUrl(path: string, origin = 'http://localhost:5173'): string {
	const cleanBase = origin.replace(/\/+$/, '');
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `${cleanBase}${cleanPath}`;
}

export function generateJsonLdWebsite({
	name,
	description,
	url,
	logo
}: JsonLdWebsiteOptions): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		description,
		url,
		...(logo ? { publisher: { '@type': 'Organization', name, logo } } : {})
	};
}
