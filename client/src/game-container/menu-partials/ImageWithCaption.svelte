<script lang="ts">
    import { onMount } from 'svelte';
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
		image.src = imageSrc;
		image.onload = ()=>{
			const context = canvas.getContext("2d");
			canvas.width = frame.width;
			canvas.height = frame.height;
			context.drawImage(
				image,
				frame.x, frame.y,
				frame.width, frame.height,
				0, 0,
				frame.width, frame.height
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