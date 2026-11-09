<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		interactive?: boolean;
		children?: Snippet;
	}

	let { interactive = false, class: className = '', children, ...rest }: Props = $props();
</script>

<div
	class={cn(
		'rounded-[5px] border border-[#2A2A2A] bg-[#121212] p-[9px] text-white transition-all duration-150',
		interactive &&
			'cursor-pointer hover:border-[#C4F042]/50 hover:shadow-[0_0_8px_rgba(196,240,66,0.2)]',
		className
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</div>
