<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.ts';

	type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
	type ButtonSize = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const variantStyles: Record<ButtonVariant, string> = {
		primary:
			'bg-[#C4F042] text-[#0C0C0C] font-medium hover:bg-[#b0db36] hover:shadow-[0_0_8px_rgba(196,240,66,0.4)] transition-all duration-150',
		secondary:
			'bg-[#121212] text-white border border-[#2A2A2A] hover:bg-[#181818] hover:border-white transition-all duration-150',
		outline:
			'bg-transparent text-white border border-[#2A2A2A] hover:border-[#C4F042] hover:text-[#C4F042] transition-all duration-150',
		ghost:
			'bg-transparent text-[#A3A3A3] hover:text-white hover:bg-[#121212] transition-colors duration-150',
		link: 'text-[#A3A3A3] hover:text-[#C4F042] p-0 rounded-none underline-offset-4 hover:underline transition-colors duration-150'
	};

	const sizeStyles: Record<ButtonSize, string> = {
		sm: 'text-[11px] px-2 py-1',
		md: 'text-[12px] px-3 py-2',
		lg: 'text-[14px] px-4 py-2.5'
	};

	const baseStyles =
		'inline-flex items-center justify-center rounded-[5px] cursor-pointer disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-1 focus-visible:ring-[#C4F042]';
</script>

<button class={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</button>
