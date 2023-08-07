<script lang="ts">
    import { activateControls } from './controls/controlController';
	import { onMount } from 'svelte';
	import MainContainer from "./game-container/MainContainer.svelte";

	onMount(()=>{
		activateControls();
	})
</script>

<style>
	@font-face {
		font-family: 'Stormfaze';
		src: URL('/static/site_assets/stormfaze.ttf') format('truetype');
	}

	@font-face {
		font-family: 'Retro Gaming';
		src: URL('/static/site_assets/Retro_Gaming.ttf') format('truetype');
	}
	div {
		text-align: center;
		background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
		height: 100vh;
        width: 100vw;
        text-align: center;
		font-family: 'Retro Gaming', Fallback, sans-serif;
		font-size: 3.33vh;
	}
</style>

<div id="app-div">
	<MainContainer />	
</div>


