<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	interface Props extends HTMLInputAttributes {
		class?: string;
		value?: string | number;
	}

	let { class: className = '', value = $bindable(), ...rest }: Props = $props();
</script>

<input
	bind:value
	class={cn(
		'w-full rounded-[5px] border border-[#2A2A2A] bg-[#0C0C0C] px-3 py-2 text-[14px] text-white placeholder-[#A3A3A3]',
		'transition-colors duration-150 focus:border-[#C4F042] focus:ring-1 focus:ring-[#C4F042] focus:outline-none',
		'disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
/>
