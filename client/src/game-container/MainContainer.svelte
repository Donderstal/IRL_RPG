<script>
    import GameMenu from './GameMenu.svelte'
    import GfxContainer from './GfxContainer.svelte'
    import state from '../game-data/state.js'

    let inGame = false;
    let inMainMenu = true;

    export function startGame( ) {
        inMainMenu = false;
        inGame  = true;
    }
</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
    }

    div {        
        background-color: transparent;
    }
</style>

<div class="main-container" >
    {#if inGame}
        <GfxContainer/>
    {:else if inMainMenu}
        <GameMenu closeMainMenu={() => { startGame() }}/>
    {/if}
</div>