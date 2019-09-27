<script>
	export let name;
	import initCharacter from '../game/character-initialization/initCharacter.js';
	import MainContainer from './game-container/MainContainer.svelte'
	import Footer from './footer.svelte'
	import Header from './header.svelte'
	const inf  = initCharacter.getClass('influencer')
	console.log(inf)
	export let gameState;
	console.log(gameState)
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


