<script lang="ts">
    import { GameMenuType } from '../../enumerables/GameMenuType';
    import MainMenu from '../views/MainMenu.svelte';
    import SaveGameMenu from './save/SaveGameMenu.svelte';

	export let menuType: GameMenuType;
</script>

<style>
	.game-menu-div {
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: 30;
        background-color: rgba(255, 0, 0, 0.2);
	}

	h2 {
		color: white;
	}
</style>

<div class="game-menu-div">
	{#if menuType == GameMenuType.save}
		<div><h2>Choose a save slot to overwrite</h2></div>
		<SaveGameMenu/>
	{:else if menuType === GameMenuType.main }
		<MainMenu/>
	{/if}
</div>