<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	type BadgeVariant = 'default' | 'outline' | 'accent';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: BadgeVariant;
		class?: string;
		children?: Snippet;
	}

	let { variant = 'default', class: className = '', children, ...rest }: Props = $props();

	const variantStyles: Record<BadgeVariant, string> = {
		default: 'bg-[#181818] text-[#A3A3A3] border border-[#2A2A2A]',
		outline: 'bg-transparent text-white border border-[#2A2A2A]',
		accent: 'bg-[#C4F042]/10 text-[#C4F042] border border-[#C4F042]/30'
	};
</script>

<span
	class={cn(
		'inline-flex items-center rounded-[5px] px-2 py-0.5 text-[12px] leading-[16px] font-medium tracking-tight',
		variantStyles[variant],
		className
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</span>
