<script>
    import stateLogger from '../../game-data/saveState.js';
    import startGame from '../../game/startGame.js';
    import globals from '../../game-data/globals.js';
    import utilFunctions from '../../helpers/utilFunctions.js'

    import MainUiButton from '../svelte-partials/main-ui-button.svelte'

    const showStartGameModal = ( ) => {
        document.getElementsByClassName('Modal')[0].style.visibility = "visible";
    }

    const buttons = [
        { id : "hide-buttons-button", vh: '0vh', text : 'HIDE UI', action : utilFunctions.hideButtons },
        { id : "log-in-button", vh: '12.5vh', text : 'LOG IN', action : utilFunctions.hideButtons },
        { id : "register-button", vh: '25vh', text : 'SIGN UP', action : stateLogger.logState },

        { id : "help-button", vh: '37.5vh', text : 'HELP', action : stateLogger.logState },

        { id : "new-game-button", vh: '50vh', text : 'NEW GAME', action : showStartGameModal },
        { id : "load-button", vh: '62.5vh', text : 'LOAD GAME', action : startGame.loadGame },
        { id : "save-button", vh: '75vh', text : 'SAVE GAME', action : startGame.saveGame },
        { id : "save-and-quit-button", vh: '87.5vh', text : 'SAVE & QUIT', action : startGame.stopGame }
    ]
</script>

{ #each buttons as button }
    <MainUiButton vhFromTop={button.vh} elementId={button.id} on:buttonPress={ button.action } buttonText={button.text} />
{/each}