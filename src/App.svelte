<script>
	export let name;
	import initCharacter from '../game/character-initialization/initCharacter.js';
	import MainContainer from './game-container/MainContainer.svelte'
	const inf  = initCharacter.getClass('influencer')
	console.log(inf)
</script>

<style>
	div {
		text-align: center;
	}

	h1, h3 {
		color: purple;
	}


</style>

<div>
	<h1>Choose your class!!</h1>
	<MainContainer />	
</div>


