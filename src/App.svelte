<script>

	import initCharacter from './game/character-init/initCharacter.js';
	import MainContainer from './game-container/MainContainer.svelte'
	import Footer from './footer.svelte'
	import Header from './header.svelte'

	export let name;
	export let gameState;
	
</script>

<style>
	div {
		text-align: center;
		height: 100vh;
	}

</style>

<div>
	<Header />
	<MainContainer />	
	<Footer />
</div>


