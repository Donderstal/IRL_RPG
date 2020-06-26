<script>
	import MainContainer from './game-container/MainContainer.svelte'
</script>

<style>
	@font-face {
		font-family: 'Stormfaze';
		src: URL('/static/stormfaze.ttf') format('truetype');
	}

	@font-face {
		font-family: 'Retro Gaming';
		src: URL('/static/Retro_Gaming.ttf') format('truetype');
	}
	div {
		text-align: center;
		background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
		height: 100vh;
        width: 100vw;
        text-align: center;
		font-family: 'Retro Gaming', Fallback, sans-serif;
		font-size: 36px;
	}
	

</style>

<div>
	<MainContainer />	
</div>


