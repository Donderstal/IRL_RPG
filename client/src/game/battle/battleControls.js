const globals = require('../../game-data/globals');
const { BATTLE_PHASE_DO_MOVES, BATTLE_PHASE_SELECT_MOVE } = require('../../game-data/battleGlobals');
/**
 * Call functionalities depending on the key pressed
 * @param {Event} event js browser Event class
 */
const handleBattleKeyPress = ( event ) => {
    const BATTLE = globals.GAME.battle;
    if ( event.key == " " && BATTLE.inDoMovesPhase && !BATTLE.activeSlot.performingBattleMove ) {
        BATTLE.getNextSlotForDoMove( );
    }
    else if ( event.key == " " && BATTLE.inSelectMovePhase ) {
        BATTLE.handleActionKeyInSelectMovePhase( );
        //BATTLE.getNextCharacterForMoveSelection( );
    }
    else if ( event.key == " " && BATTLE.inEndBattlePhase ) {
        BATTLE.getNextBattleEndText( );
    }
    else if ( event.key == " " && !BATTLE.inDoMovesPhase ) {
        BATTLE.goToNextBattlePhase( );
    }

    if ( event.key == "z" && BATTLE.inSelectMovePhase ) {
        BATTLE.handleReturnKeyInSelectMovePhase( );
    }

    if ( BATTLE.inSelectMovePhase ) {
        handleDirectonKeysInBattleMenu( event.key );
    }

    if ( event.key == "q" ) {
        BATTLE.endBattle( );
    }
    if ( event.key == "l" ) {
        console.log(BATTLE);
    }
};

const handleDirectonKeysInBattleMenu = ( key ) => {
    const BATTLE = globals.GAME.battle;
    switch( key ) {
        case "w":
        case "ArrowUp":
            BATTLE.moveButtonCursor( "UP" )
            break;
        case "a":
        case "ArrowLeft":
            BATTLE.moveButtonCursor( "LEFT" )
            break;
        case "s":
        case "ArrowDown":
            BATTLE.moveButtonCursor( "DOWN" )
            break;
        case "d":
        case "ArrowRight":
            BATTLE.moveButtonCursor( "RIGHT" )
            break;
    }
} 

module.exports = {
    handleBattleKeyPress
}