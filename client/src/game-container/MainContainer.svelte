<script>
    import StartGameModal from './svelte-partials/StartGameModal.svelte'
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import Header from './header/Header.svelte'
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

</style>

<div class="main-container" >
    <Header/>
    <GfxContainer/>

    <StartGameModal/>
    <input type="file" id="JSON_input" name="JSON_file">
</div>