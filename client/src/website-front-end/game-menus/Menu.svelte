<script lang="ts">
    import { onMount } from 'svelte';

    import { GameMenuType } from '../../enumerables/GameMenuType';
    import { InteractionAnswer } from '../../enumerables/InteractionAnswer';
    import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
	import { ControlState } from '../../enumerables/ControlState';
    import { alterGameControlState } from '../../state/state';
    import Modal from '../menu-partials/Modal.svelte';
    import { closeInGameMenu } from '../../stores';
    import MainMenu from '../views/MainMenu.svelte';
    import WebsiteContainer from '../WebsiteContainer.svelte';
    import SaveGameMenu from './save/SaveGameMenu.svelte';

	export let menuType: GameMenuType;

	let saveGameMenu: SaveGameMenu;
	let showModal = false
	let modalType: SceneAnimationType;
	let modalMessage: string;

	const activateModal = (message: string, type: SceneAnimationType): void => {
		modalType = type;
		showModal = true;
		modalMessage = message;
	}

	const deactivateModal = ( userAnswer: InteractionAnswer ): void => {
		const saveGame = userAnswer === InteractionAnswer.yes && modalType === SceneAnimationType.speakYesNo;
		if ( modalType === SceneAnimationType.speak ) {
			closeInGameMenu();
		}
		showModal = false;
		modalType = null;
		modalMessage = null;

		if ( saveGame ) {
			saveGameMenu.saveGame();
		}
	}

	onMount(()=>{
		alterGameControlState(ControlState.menu)
	})
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
		<SaveGameMenu bind:this={saveGameMenu} setModal={activateModal}/>
	{:else if menuType === GameMenuType.main }
		<MainMenu/>
	{:else if menuType === GameMenuType.log_in }
		<WebsiteContainer setModal={activateModal}/>
	{/if}
	{#if showModal}
		<Modal message={modalMessage} modalType={modalType} deactivate={deactivateModal}/>
	{/if}
</div>