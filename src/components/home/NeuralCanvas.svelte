<script lang="ts">
	let canvasElement: HTMLCanvasElement;

	$effect(() => {
		if (!canvasElement) return;
		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let width = (canvasElement.width =
			canvasElement.offsetWidth * Math.min(window.devicePixelRatio, 2));
		let height = (canvasElement.height =
			canvasElement.offsetHeight * Math.min(window.devicePixelRatio, 2));

		const spacing = 36 * Math.min(window.devicePixelRatio, 2);
		let mouseX = width / 2;
		let mouseY = height / 2;
		let time = 0;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvasElement.getBoundingClientRect();
			mouseX = (e.clientX - rect.left) * Math.min(window.devicePixelRatio, 2);
			mouseY = (e.clientY - rect.top) * Math.min(window.devicePixelRatio, 2);
		};

		const handleResize = () => {
			width = canvasElement.width =
				canvasElement.offsetWidth * Math.min(window.devicePixelRatio, 2);
			height = canvasElement.height =
				canvasElement.offsetHeight * Math.min(window.devicePixelRatio, 2);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);

		const render = () => {
			time += 0.02;
			ctx.clearRect(0, 0, width, height);

			const cols = Math.floor(width / spacing);
			const rows = Math.floor(height / spacing);
			const offsetX = (width - cols * spacing) / 2;
			const offsetY = (height - rows * spacing) / 2;

			for (let i = 0; i <= cols; i++) {
				for (let j = 0; j <= rows; j++) {
					const px = offsetX + i * spacing;
					const py = offsetY + j * spacing;

					const dx = px - mouseX;
					const dy = py - mouseY;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const mouseEffect = Math.max(0, 1 - dist / (200 * Math.min(window.devicePixelRatio, 2)));

					const pulse = Math.sin(time + (i + j) * 0.3) * 0.5 + 0.5;
					const alpha = 0.08 + pulse * 0.12 + mouseEffect * 0.45;
					const radius =
						(1.2 + pulse * 0.6 + mouseEffect * 1.5) * Math.min(window.devicePixelRatio, 2);

					ctx.fillStyle = `rgba(196, 240, 66, ${alpha})`;
					ctx.beginPath();
					ctx.arc(px, py, radius, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<canvas
	bind:this={canvasElement}
	class="pointer-events-none absolute inset-0 h-full w-full opacity-60"
	aria-hidden="true"
></canvas>
