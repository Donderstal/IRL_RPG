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
        width: 1296px;
        margin: 0 auto;
        height: 100vh;
        box-shadow: -15px 0 15px -15px inset;
    }

    #save-button {
        background-color: #464F51;
        color: #defff2;
        border: 1px groove #D68Fd6;
        border-radius: 5px;
        width: 5vw;
        position: fixed;
        right: 1vw;
        top: 1vw;
    }

    #save-button:hover {
        color: #D68Fd6;
        border-color:  #defff2;
        cursor: pointer;
    }

</style>

<div class="main-container">
    <GfxContainer
        classList={classList}
     />
    <UIContainer /> 
    <TxtContainer />

    <button id="save-button" on:click={stateLogger.logState}> SAVE GAME </button>
</div>