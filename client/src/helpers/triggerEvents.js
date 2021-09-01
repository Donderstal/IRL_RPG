const globals           = require('../game-data/globals')
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")
const { 
    ON_POSITION
}  = require('../game-data/conditionGlobals')
/**
 * @param {string} TRIGGER - Trigger type as a string
 * Possible triggers:
 * ON_ENTER - When map loads;
 * ON_LEAVE - Before map exit;
 * ON_POSITION - Specific position on map;
 * ON_BATTLE_START" - Before battle starts;
 * ON_BATTLE_END" - After battle ends;
 */

const triggerEvent = ( TRIGGER, args = null ) => {
    const currentStoryEvent = globals.GAME.story.currentStoryEvent;
    if  ( globals.GAME.activeMapName == currentStoryEvent.mapName && TRIGGER == currentStoryEvent.trigger ) {
        if ( TRIGGER != ON_POSITION ) {
            currentStoryEvent.fireEvent( args );
        }
        else if ( TRIGGER == ON_POSITION && triggerOnPosition( ) ) {
            currentStoryEvent.fireEvent( );
        }
        globals.GAME.story.goToNextStoryScene( );  
    }
}

const triggerOnPosition = ( ) => {
    const position = globals.GAME.story.currentStoryEvent.position;
    if ( globals[position.direction] == globals.GAME.PLAYER.direction ) {
        if ( position.direction == FACING_RIGHT && globals.GAME.PLAYER.col == position.col ) {
            return true;
        }
        if ( position.direction == FACING_LEFT && globals.GAME.PLAYER.col == position.col ) {
            return true;
        }
        if ( position.direction == FACING_UP && globals.GAME.PLAYER.row == position.row) {
            return true;
        }
        if ( position.direction == FACING_DOWN && globals.GAME.PLAYER.row == position.row) {
            return true;
        }
    }

    return false;
}

module.exports = {
    triggerEvent
}