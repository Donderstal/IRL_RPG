<script>
    import GameMenu from './GameMenu.svelte'
    import GfxContainer from './GfxContainer.svelte'

    let inGame = false;
</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }

    div {        
        background-color: transparent;
    }
</style>

<div class="main-container" >
    {#if inGame}
        <GfxContainer/>
    {:else}
        <GameMenu/>
    {/if}
</div>