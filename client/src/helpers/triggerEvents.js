const globals           = require('../game-data/globals')
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")

/**
 * @param {string} TRIGGER - Trigger type as a string
 * Possible triggers:
 * "ON_ENTER" - When map loads;
 * "ON_LEAVE" - Before map exit;
 * "ON_POSITION" - Specific position on map;
 * "ON_BATTLESTART" - Before battle starts;
 * "ON_BATTLEEND" - After battle ends;
 * "ON_EVENT" - After event in map;
 */

const triggerEvent = ( TRIGGER, args = null ) => {
    globals.GAME.story.sceneEvents.forEach( (e) => {
        if ( TRIGGER == e.trigger && TRIGGER != "ON_POSITION" ) {
            e.fireEvent( args );
            if ( e.passScene ) {
                globals.GAME.story.goToNextSceneEvent( );               
            }
        }
        else if ( TRIGGER == e.trigger && TRIGGER == "ON_POSITION" ) {
            if ( triggerOnPosition( e ) ) {
                e.fireEvent( );
                if ( e.passScene ) {
                    globals.GAME.story.goToNextSceneEvent( );                
                }
            }
        }
    })
}

const triggerOnPosition = ( e ) => {
    const position = e.position;
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