const globals = require('../../game-data/globals');
const { BATTLE_PHASE_DO_MOVES } = require('../../game-data/battleGlobals');
/**
 * Call functionalities depending on the key pressed
 * @param {Event} event js browser Event class
 */
const handleBattleKeyPress = ( event ) => {
    const BATTLE = globals.GAME.battle;
    if ( event.key == " " && BATTLE.phase == BATTLE_PHASE_DO_MOVES && !BATTLE.activeSlot.performingBattleMove ) {
        BATTLE.getNextSlotForDoMove( );
    }
    else if ( event.key == " " && BATTLE.phase != BATTLE_PHASE_DO_MOVES ) {
        BATTLE.goToNextBattlePhase( );
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