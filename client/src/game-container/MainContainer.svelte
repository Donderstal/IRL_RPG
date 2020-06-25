<script>
    import StartGameModal from './svelte-partials/StartGameModal.svelte'
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import Buttons from './buttons/Buttons.svelte'
</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }

    input {
        visibility: hidden;
        display: none;
    }

    div {        
        background-color: transparent;
    }

    h1 {
        font-size: 120px;
        font-family: 'Stormfaze', Fallback, sans-serif;
        font: Regular 120px/144px Stormfaze;
        letter-spacing: 0px;
        opacity: 1;
        width: 100vw;
        margin-top: 0;
    }

    .main-header {
        color: #D82BBA;
        z-index:1;
        display: absolute;
        left: 12px;
        top: 12px;
    }

    .shadow-header {
        left: -6px;
        top: -6px;
        color: #00FF9E;
        position: absolute;
        z-index: 3;
        display: absolute;
    }

</style>

<div class="main-container" >
    <div> 
        <h1 class="main-header"> NECKBEARD 2020 </h1> 
        <h1 class="shadow-header"> NECKBEARD 2020 </h1> 
    </div>
    <Buttons/>
    <GfxContainer/>

    <StartGameModal/>
    <input type="file" id="JSON_input" name="JSON_file">
</div>