<script lang="ts">
	import SEO from '#components/seo/SEO.svelte';
	import Hero from '#components/home/Hero.svelte';
	import { generateJsonLdWebsite } from '#lib/seo/meta.ts';

	const jsonLd = generateJsonLdWebsite({
		name: 'Kryisnn',
		description: 'Blazingly Fast, Resilient Full-Stack Architecture built with SvelteKit.',
		url: 'http://localhost:5173'
	});
</script>

<SEO
	title="Home"
	description="Blazingly Fast, Resilient Full-Stack Architecture built with SvelteKit, NeonDB, Better Auth, and Cloudflare R2."
	canonical="/"
	{jsonLd}
/>

<main class="flex min-h-screen w-full flex-col items-center bg-[#0C0C0C]">
	<Hero />
</main>
