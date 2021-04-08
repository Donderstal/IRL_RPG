const globals = require('../../game-data/globals');
/**
 * Call functionalities depending on the key pressed
 * @param {Event} event js browser Event class
 */
const handleBattleKeyPress = ( event ) => {
    if ( event.key == " " ) {
        globals.GAME.battle.goToNextBattlePhase( );
    }
 };

module.exports = {
    handleBattleKeyPress
}