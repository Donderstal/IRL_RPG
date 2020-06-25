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
        { id : "new-game-button", vh: '27vh', text : 'New Game', action : showStartGameModal },
        { id : "load-button", vh: '37.7vh', text : 'Load Game', action :startGame.loadGame },
        { id : "options-button", vh: '48.4vh', text : 'Options', action : stateLogger.logState },

        { id : "help-button", vh: '59.1vh', text : 'Help', action : stateLogger.logState },

        { id : "quit-button", vh: '69.8vh', text : 'Quit', action : stateLogger.logState },
    ]
</script>

{ #each buttons as button }
    <MainUiButton vhFromTop={button.vh} elementId={button.id} on:buttonPress={ button.action } buttonText={button.text} />
{/each}