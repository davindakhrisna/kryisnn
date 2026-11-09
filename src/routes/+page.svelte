<script lang="ts">
	import SEO from '#components/seo/SEO.svelte';
	import Navbar from '#components/home/Navbar.svelte';
	import Hero from '#components/home/Hero.svelte';
	import Pillars from '#components/home/Pillars.svelte';
	import Footer from '#components/home/Footer.svelte';
	import { generateJsonLdWebsite } from '#lib/seo/meta.ts';

	const jsonLd = generateJsonLdWebsite({
		name: 'Nexus Neural Framework',
		description: 'Deterministic neural compute and real-time telemetry for ambient systems.',
		url: 'http://localhost:5173'
	});
</script>

<SEO
	title="Nexus Neural Framework"
	description="Deterministic neural compute and real-time telemetry for ambient systems."
	canonical="/"
	{jsonLd}
/>

<div class="flex min-h-screen w-full flex-col bg-[#0C0C0C] text-white">
	<Navbar />
	<main class="flex flex-1 flex-col items-center">
		<Hero />
		<Pillars />
	</main>
	<Footer />
</div>
