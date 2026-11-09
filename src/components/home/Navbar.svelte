<script lang="ts">
	import Button from '#components/ui/button/Button.svelte';
	import { resolve } from '$app/paths';
</script>

<header
	class="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-[#2A2A2A] bg-[#0C0C0C]/80 px-6 backdrop-blur-md"
>
	<div class="flex items-center gap-6">
		<a
			href={resolve('/')}
			class="flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
		>
			<span
				class="flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#C4F042] text-[11px] font-bold text-[#0C0C0C]"
			>
				N
			</span>
			<span class="text-[13px] font-medium tracking-wide">Nexus Neural</span>
		</a>

		<div
			class="hidden items-center gap-2 rounded-[5px] border border-[#2A2A2A] bg-[#121212] px-2.5 py-1 text-[11px] text-[#A3A3A3] sm:flex"
		>
			<span class="relative flex h-2 w-2">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C4F042] opacity-75"
				></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-[#C4F042]"></span>
			</span>
			<span>Cluster 01 • 99.98% Healthy</span>
		</div>
	</div>

	<nav class="hidden items-center gap-6 md:flex">
		<a href="#architecture" class="text-[13px] text-[#A3A3A3] transition-colors hover:text-white"
			>Architecture</a
		>
		<a href="#telemetry" class="text-[13px] text-[#A3A3A3] transition-colors hover:text-white"
			>Telemetry</a
		>
		<a href="#models" class="text-[13px] text-[#A3A3A3] transition-colors hover:text-white"
			>Models</a
		>
		<a href="#docs" class="text-[13px] text-[#A3A3A3] transition-colors hover:text-white"
			>Documentation</a
		>
	</nav>

	<div class="flex items-center gap-3">
		<Button variant="outline" size="sm">Sign In</Button>
		<Button variant="primary" size="sm">Open Console</Button>
	</div>
</header>
