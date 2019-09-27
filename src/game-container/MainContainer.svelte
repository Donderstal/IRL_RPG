<script>
    console.log('hi!!')
    import classList from '../../game/character-initialization/initClasses.js';
    function handleButtonHover() {
        console.log('why u hovering bro?1')
    }
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import UIContainer from './game-ui-container/UIContainer.svelte'
    import TxtContainer from './game-txt-container/TxtContainer.svelte'

</script>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        margin: 0 auto;
        height: 80vh;
        border-left: 1px groove #190019;
        border-right: 1px groove #190019;
        box-shadow: -15px 0 15px -15px inset;
    }

    .buttonCont{
        flex: 50%;
    }

    button {
        margin: 0 auto;
        width: 10vw;
    }

</style>

<div class="main-container">
    <GfxContainer />
    <TxtContainer />
    <UIContainer />
</div>