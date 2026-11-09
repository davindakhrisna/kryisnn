<script lang="ts">
	import Button from '#components/ui/button/Button.svelte';
	import Card from '#components/ui/card/Card.svelte';
	import Badge from '#components/ui/badge/Badge.svelte';
</script>

<section
	class="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-8"
>
	<!-- Accent Tag -->
	<div class="mb-6 flex items-center justify-center">
		<Badge variant="accent">Nexus Neural Framework • v0.1</Badge>
	</div>

	<!-- Hero Heading (Display-LG: 48px, 500 weight, -0.025em tracking) -->
	<h1
		class="max-w-3xl text-[36px] leading-[40px] font-medium tracking-[-0.025em] text-white sm:text-[48px] sm:leading-[48px]"
	>
		Blazingly Fast, Resilient Full-Stack Architecture
	</h1>

	<!-- Body Text (Body-MD: 14px, 400 weight, 22.75px line-height) -->
	<p class="mt-4 max-w-xl text-[14px] leading-[22.75px] font-normal text-[#A3A3A3]">
		Built with SvelteKit 5 runes, Neon serverless PostgreSQL, Drizzle ORM, Better Auth, and
		Cloudflare R2 object storage.
	</p>

	<!-- Call To Actions -->
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<Button variant="primary" size="lg">Get Started</Button>
		<Button variant="secondary" size="lg">Read Documentation</Button>
	</div>

	<!-- Stack Overview Cards -->
	<div class="mt-16 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
		<Card interactive class="text-left">
			<Badge variant="default">Backend</Badge>
			<h3 class="mt-3 text-[14px] font-medium text-white">Neon PostgreSQL</h3>
			<p class="mt-1 text-[12px] leading-[18px] text-[#A3A3A3]">
				Serverless database with Drizzle ORM type-safety and migrations.
			</p>
		</Card>

		<Card interactive class="text-left">
			<Badge variant="default">Auth</Badge>
			<h3 class="mt-3 text-[14px] font-medium text-white">Better Auth</h3>
			<p class="mt-1 text-[12px] leading-[18px] text-[#A3A3A3]">
				Full session lifecycle, GitHub OAuth, and Google OAuth out of the box.
			</p>
		</Card>

		<Card interactive class="text-left">
			<Badge variant="default">Storage</Badge>
			<h3 class="mt-3 text-[14px] font-medium text-white">Cloudflare R2</h3>
			<p class="mt-1 text-[12px] leading-[18px] text-[#A3A3A3]">
				S3-compatible zero-egress asset management and presigned upload pipelines.
			</p>
		</Card>
	</div>
</section>
