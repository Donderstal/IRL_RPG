<script>
    import WebsiteContainer from './WebsiteContainer.svelte'
    import GameContainer from './GameContainer.svelte'
    import { websiteMode, gameMode } from './../stores'
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
        background-image: url("/static/site_assets/neckbeard-background@2x.png");    
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
    {#if $gameMode}
        <GameContainer/>
    {:else if $websiteMode}
        <WebsiteContainer/>
        <div class="background-div background-small">
        </div>
        <div class="background-div background-large">
        </div>
    {/if}
</div>
