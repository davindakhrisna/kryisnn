import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
	it('merges class names correctly', () => {
		expect(cn('px-2 py-1', 'bg-black')).toBe('px-2 py-1 bg-black');
	});

	it('resolves conflicting tailwind classes cleanly', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
	});

	it('handles conditionals and falsy values', () => {
		const isActive = false;
		const isVisible = true;
		expect(cn('base', isActive && 'active', isVisible && 'visible', null, undefined)).toBe(
			'base visible'
		);
	});
});
