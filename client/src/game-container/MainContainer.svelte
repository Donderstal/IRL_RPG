<script>
    import classList from '../game/character-init/initClasses.js';
    import stateLogger from '../game-data/saveState.js';
    import GfxContainer from './game-gfx-container/GfxContainer.svelte'
    import MainUiButton from './svelte-partials/main-ui-button.svelte'
    import startGame from '../game/startGame.js';

    let buttonsAreHidden = false;

    const hideButtons = ( ) => {
        const allButtons = Array.from( document.getElementsByTagName('button') );

        allButtons.forEach( ( e ) => {
            if ( e.id !== 'hide-buttons-button' ) {
                if ( buttonsAreHidden ) {
                    e.style.visibility = 'visible'
                    document.getElementById('hide-buttons-button').innerText = "HIDE BUTTONS"
                }
                else {
                    e.style.visibility =  'hidden'
                    document.getElementById('hide-buttons-button').innerText = "SHOW"                    
                }
            }
        })

        buttonsAreHidden = !buttonsAreHidden;
    }

    const buttons = [
        { id : "hide-buttons-button", vw: '1vw', text : 'HIDE BUTTONS', action : hideButtons },
        { id : "log-in-button", vw: '9vw', text : 'LOG IN', action : hideButtons },
        { id : "register-button", vw: '17vw', text : 'REGISTER', action : stateLogger.logState },

        { id : "help-button", vw: '46.5vw', text : 'HELP', action : stateLogger.logState },

        { id : "new-game-button", vw: '68vw', text : 'NEW GAME', action : startGame.startGame },
        { id : "load-button", vw: '76vw', text : 'LOAD GAME', action : startGame.loadGameFromSave },
        { id : "save-button", vw: '84vw', text : 'SAVE GAME', action : startGame.saveGame },
        { id : "save-and-quit-button", vw: '92vw', text : 'SAVE & QUIT', action : startGame.stopGame }
    ]
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

</style>

<div class="main-container">
    <GfxContainer
        classList={classList}
    />

    { #each buttons as button }
        <MainUiButton vwFromLeft={button.vw} elementId={button.id} on:buttonPress={ button.action } buttonText={button.text} />
    {/each}

</div>