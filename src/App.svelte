<script>
	import MainContainer from './game-container/MainContainer.svelte'
	import Footer from './footer.svelte'
	import Header from './header.svelte'

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
	<MainContainer gameState={gameState} />	
	<Footer/>
</div>


