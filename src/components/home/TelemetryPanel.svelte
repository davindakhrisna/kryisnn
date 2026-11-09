<script lang="ts">
	import Badge from '#components/ui/badge/Badge.svelte';

	let activeTab = $state<'latency' | 'memory' | 'throughput'>('latency');
	let latencyValues = $state<number[]>([
		2.1, 2.4, 2.3, 2.6, 2.2, 2.5, 2.4, 2.3, 2.7, 2.4, 2.2, 2.3, 2.5, 2.4
	]);

	$effect(() => {
		const interval = setInterval(() => {
			const jitter = +(2.2 + Math.random() * 0.5).toFixed(2);
			latencyValues = [...latencyValues.slice(1), jitter];
		}, 1200);

		return () => clearInterval(interval);
	});

	const currentLatency = $derived(latencyValues[latencyValues.length - 1] ?? 2.4);
</script>

<div
	class="relative w-full max-w-4xl overflow-hidden rounded-[5px] border border-[#2A2A2A] bg-[#121212] p-5 shadow-2xl"
>
	<!-- Top Bar -->
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] pb-4">
		<div class="flex items-center gap-2">
			<Badge variant="accent">Live Telemetry</Badge>
			<span class="text-[12px] text-[#A3A3A3]">region: us-east • endpoint: worker-iad-04</span>
		</div>

		<div class="flex items-center gap-1">
			<button
				onclick={() => (activeTab = 'latency')}
				class="rounded-[5px] px-2.5 py-1 text-[12px] transition-colors {activeTab === 'latency'
					? 'bg-[#181818] text-white'
					: 'text-[#A3A3A3] hover:text-white'}"
			>
				Latency Stream
			</button>
			<button
				onclick={() => (activeTab = 'throughput')}
				class="rounded-[5px] px-2.5 py-1 text-[12px] transition-colors {activeTab === 'throughput'
					? 'bg-[#181818] text-white'
					: 'text-[#A3A3A3] hover:text-white'}"
			>
				Throughput
			</button>
			<button
				onclick={() => (activeTab = 'memory')}
				class="rounded-[5px] px-2.5 py-1 text-[12px] transition-colors {activeTab === 'memory'
					? 'bg-[#181818] text-white'
					: 'text-[#A3A3A3] hover:text-white'}"
			>
				VRAM Pool
			</button>
		</div>
	</div>

	<!-- Core Metrics Grid -->
	<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
		<div class="rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] p-3">
			<div class="text-[11px] text-[#A3A3A3]">P95 Latency</div>
			<div class="mt-1 font-mono text-[20px] font-medium text-[#C4F042]">{currentLatency}ms</div>
			<div class="text-[10px] text-[#A3A3A3]">±0.12ms jitter</div>
		</div>

		<div class="rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] p-3">
			<div class="text-[11px] text-[#A3A3A3]">Throughput</div>
			<div class="mt-1 font-mono text-[20px] font-medium text-white">
				14.8k <span class="text-[12px] text-[#A3A3A3]">tok/s</span>
			</div>
			<div class="text-[10px] text-[#C4F042]">+8.4% vs peak</div>
		</div>

		<div class="rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] p-3">
			<div class="text-[11px] text-[#A3A3A3]">Active Edge Nodes</div>
			<div class="mt-1 font-mono text-[20px] font-medium text-white">
				48 <span class="text-[12px] text-[#A3A3A3]">nodes</span>
			</div>
			<div class="text-[10px] text-[#A3A3A3]">0 cold starts</div>
		</div>

		<div class="rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] p-3">
			<div class="text-[11px] text-[#A3A3A3]">KV Cache Hit Rate</div>
			<div class="mt-1 font-mono text-[20px] font-medium text-white">99.4%</div>
			<div class="text-[10px] text-[#A3A3A3]">1.2 GB consumed</div>
		</div>
	</div>

	<!-- Live Stream Histogram Bars -->
	<div class="mt-4 rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] p-3">
		<div class="flex items-center justify-between text-[11px] text-[#A3A3A3]">
			<span>Rolling Window (last 14 samples)</span>
			<span class="font-mono text-[#C4F042]">steady state</span>
		</div>
		<div class="mt-3 flex h-16 items-end gap-1.5">
			{#each latencyValues as val, idx (idx)}
				{@const heightPercent = Math.min(100, Math.max(20, (val / 3.0) * 100))}
				<div class="group relative flex-1">
					<div
						class="w-full rounded-[2px] bg-[#C4F042]/20 transition-all duration-300 hover:bg-[#C4F042]"
						style="height: {heightPercent}%;"
					></div>
				</div>
			{/each}
		</div>
	</div>
</div>
