const globals = require('../../game-data/globals');
const { BATTLE_PHASE_DO_MOVES, BATTLE_PHASE_SELECT_MOVE } = require('../../game-data/battleGlobals');
/**
 * Call functionalities depending on the key pressed
 * @param {Event} event js browser Event class
 */
const handleBattleKeyPress = ( event ) => {
    const BATTLE = globals.GAME.battle;
    if ( event.key == " " && BATTLE.phase == BATTLE_PHASE_DO_MOVES && !BATTLE.activeSlot.performingBattleMove ) {
        BATTLE.getNextSlotForDoMove( );
    }
    else if ( event.key == " " && BATTLE.phase == BATTLE_PHASE_SELECT_MOVE  ) {
        BATTLE.getNextCharacterForMoveSelection( );
    }
    else if ( event.key == " " && BATTLE.phase != BATTLE_PHASE_DO_MOVES ) {
        BATTLE.goToNextBattlePhase( );
    }

    if ( BATTLE.phase == BATTLE_PHASE_SELECT_MOVE && event.key == "w" || event.key == "ArrowUp"  ) {
        BATTLE.moveButtonCursor( "UP" )
    }
    else if ( BATTLE.phase == BATTLE_PHASE_SELECT_MOVE && event.key == "a" || event.key == "ArrowLeft" ) {
        BATTLE.moveButtonCursor( "LEFT" )
    }
    else if ( BATTLE.phase == BATTLE_PHASE_SELECT_MOVE && event.key == "s" || event.key == "ArrowDown" ) {
        BATTLE.moveButtonCursor( "DOWN" )
    }
    else if ( BATTLE.phase == BATTLE_PHASE_SELECT_MOVE && event.key == "d" || event.key == "ArrowRight" ) {
        BATTLE.moveButtonCursor( "RIGHT" )
    }

    if ( event.key == "z" ) {
        BATTLE.endBattle( );
    }
    if ( event.key == "l" ) {
        console.log(BATTLE);
    }
 };

module.exports = {
    handleBattleKeyPress
}