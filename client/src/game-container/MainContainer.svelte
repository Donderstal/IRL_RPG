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
        z-index:0;
    }

    div {        
        background-color: transparent;
    }

    .background-div {
        width: 95vw;
        left: 2.5vw;        
        z-index: auto;
        position: absolute;
        background-image: url("/static/neckbeard-background@2x.png");    
        z-index:1;
    }

    .background-small {
        height: 50vh;
        background-size: cover;
        background-position: center;
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .background-large {
        height: 90vh;
        top: 5vh;
        background-size:100% 100%;
        z-index:1;
        display: none;
    }

</style>

<div class="main-container" >
    {#if inGame}
        <GfxContainer/>
    {:else if inMainMenu}
        <GameMenu closeMainMenu={() => { startGame() }}/>
    {/if}
</div>
<div class="background-div background-small">
</div>
<div class="background-div background-large">
</div>