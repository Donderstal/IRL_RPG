<script>
    import classList from '../game/character-init/initClasses.js';
    import stateLogger from '../game-data/saveState.js';
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import UIContainer from './game-ui-container/UIContainer.svelte'
    import TxtContainer from './game-txt-container/TxtContainer.svelte'

</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        width: 1320px;
        margin: 0 auto;
        height: 100vh;
        box-shadow: -15px 0 15px -15px inset;
    }

</style>

<div class="main-container">
    <GfxContainer
        classList={classList}
     />
    <UIContainer /> 
    <TxtContainer />

    <button on:click={stateLogger.logState}> SAVE ME </button>
</div>