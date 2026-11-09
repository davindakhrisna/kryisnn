<script lang="ts">
	import Button from '#components/ui/button/Button.svelte';
	import Badge from '#components/ui/badge/Badge.svelte';
	import NeuralCanvas from './NeuralCanvas.svelte';
	import TelemetryPanel from './TelemetryPanel.svelte';
</script>

<section
	class="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-12 text-center sm:px-8"
>
	<!-- Ambient Interactive Neural Lattice Canvas -->
	<NeuralCanvas />

	<!-- Hero Foreground -->
	<div class="relative z-10 flex flex-col items-center">
		<!-- Accent Tag -->
		<div class="mb-5 flex items-center justify-center">
			<Badge variant="accent">Nexus Neural Framework • v0.1-alpha</Badge>
		</div>

		<!-- Display Heading (48px, 500 weight, -0.025em tracking) -->
		<h1
			class="max-w-3xl text-[38px] leading-[42px] font-medium tracking-[-0.025em] text-white sm:text-[48px] sm:leading-[50px]"
		>
			Deterministic neural compute for ambient systems
		</h1>

		<!-- Body MD (14px, 400 weight, 22.75px line-height) -->
		<p class="mt-4 max-w-xl text-[14px] leading-[22.75px] font-normal text-[#A3A3A3]">
			Deploy ultra low-latency neural pipelines across edge clusters with sub-millisecond telemetry,
			typed Neon state, and S3-compatible R2 weight caches.
		</p>

		<!-- Action Cluster -->
		<div class="mt-7 flex flex-wrap items-center justify-center gap-3">
			<Button variant="primary" size="lg">Deploy Cluster</Button>
			<Button variant="secondary" size="lg">Read System Architecture</Button>
		</div>

		<!-- Live Telemetry Console Panel -->
		<div id="telemetry" class="mt-14 w-full">
			<TelemetryPanel />
		</div>
	</div>
</section>
