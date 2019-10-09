<script>
    import classList from '../game/character-init/initClasses.js';
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import UIContainer from './game-ui-container/UIContainer.svelte'
    import TxtContainer from './game-txt-container/TxtContainer.svelte'

    function handleHoverOverClass(event) {
        console.log(event.detail.chosenClass)
    }

	export let gameState;

</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        max-width: 900px;
        margin: 0 auto;
        height: 90vh;
        border-left: 1px groove #190019;
        border-right: 1px groove #190019;
        box-shadow: -15px 0 15px -15px inset;
    }

</style>

<div class="main-container">
    <GfxContainer
        {classList}
     />
    <TxtContainer />
    <UIContainer 
        on:hoverOverClass={handleHoverOverClass} 
        {classList} 
    />
</div>