<script lang="ts">
	import { formatPageTitle, buildCanonicalUrl } from '#lib/seo/meta.ts';

	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		image?: string;
		type?: 'website' | 'article';
		siteName?: string;
		jsonLd?: Record<string, unknown>;
	}

	let {
		title = '',
		description = 'High-performance web application built with SvelteKit, NeonDB, and Cloudflare R2.',
		canonical = '/',
		image = '/og-image.png',
		type = 'website',
		siteName = 'Kryisnn',
		jsonLd
	}: Props = $props();

	const pageTitle = $derived(formatPageTitle(title, siteName));
	const fullCanonicalUrl = $derived(buildCanonicalUrl(canonical));
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={fullCanonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={fullCanonicalUrl} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if jsonLd}
		<svelte:element this={"script"} type="application/ld+json">
			{JSON.stringify(jsonLd)}
		</svelte:element>
	{/if}
</svelte:head>
