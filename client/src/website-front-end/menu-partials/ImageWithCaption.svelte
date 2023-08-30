<script lang="ts">
    import { onMount } from 'svelte';
    import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX } from '../../game-data/globals';
    import type { SpriteFrameModel } from '../../models/SpriteFrameModel';

	export let imageSrc: string;
	export let caption: string;
	export let frame: SpriteFrameModel;

	let canvas: HTMLCanvasElement;

	onMount(()=>{
		if ( imageSrc == null ) {
			return;
		}
		const image = new Image();
		let imageInCanvasWidth = Math.round((frame.width / GRID_BLOCK_IN_SHEET_PX) * GRID_BLOCK_PX);
		let imageInCanvasHeight = Math.round((frame.height / GRID_BLOCK_IN_SHEET_PX) * GRID_BLOCK_PX);
		image.src = imageSrc;
		image.onload = ()=>{
			const context = canvas.getContext("2d");
			canvas.width = imageInCanvasWidth;
			canvas.height = imageInCanvasHeight;

			context.drawImage(
				image,
				frame.x, frame.y,
				frame.width, frame.height,
				0, 0,
				imageInCanvasWidth, imageInCanvasHeight
			)
		}
	})
</script>
<style>
	 p {
		 margin: 0 auto;
	 }
</style>
<div>
	<div>
		<canvas bind:this={canvas}></canvas>
	</div>
	{#if caption !== null} 
		<div>
			<p>{caption}</p>	
		</div>
	{/if}
</div>