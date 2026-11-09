<script lang="ts">
	import Card from '#components/ui/card/Card.svelte';
	import Badge from '#components/ui/badge/Badge.svelte';

	const pillars = [
		{
			badge: 'Execution',
			title: 'Zero-Copy Neural Pipeline',
			description:
				'Inference buffers stream directly through SharedArrayBuffer allocations, eliminating JSON and IPC serialization overhead entirely.',
			metric: '< 1.4ms time to first token'
		},
		{
			badge: 'Persistence',
			title: 'Neon Serverless State',
			description:
				'Drizzle ORM schema-driven persistence with instant branch isolation and serverless Postgres connection pooling at scale.',
			metric: '100% type-safe queries'
		},
		{
			badge: 'Storage',
			title: 'Cloudflare R2 Distribution',
			description:
				'Model weights, LoRA checkpoints, and embeddings are synced globally across S3-compatible buckets with zero egress tax.',
			metric: 'Global edge propagation'
		}
	];
</script>

<section id="architecture" class="flex w-full max-w-5xl flex-col items-center px-4 py-20">
	<div class="flex flex-col items-center text-center">
		<Badge variant="default">System Pillars</Badge>
		<h2 class="mt-3 text-[28px] font-medium tracking-[-0.02em] text-white sm:text-[32px]">
			Engineered for extreme throughput and predictability
		</h2>
		<p class="mt-2 max-w-xl text-[14px] text-[#A3A3A3]">
			Every layer is designed with strict performance bounds: low memory footprint, constant time
			allocations, and zero egress overhead.
		</p>
	</div>

	<div class="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
		{#each pillars as pillar (pillar.title)}
			<Card interactive class="flex flex-col justify-between p-5 text-left">
				<div>
					<Badge variant="outline">{pillar.badge}</Badge>
					<h3 class="mt-4 text-[16px] font-medium text-white">{pillar.title}</h3>
					<p class="mt-2 text-[13px] leading-[20px] text-[#A3A3A3]">
						{pillar.description}
					</p>
				</div>
				<div class="mt-6 border-t border-[#2A2A2A] pt-3 font-mono text-[11px] text-[#C4F042]">
					{pillar.metric}
				</div>
			</Card>
		{/each}
	</div>
</section>
