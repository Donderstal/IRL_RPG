const state         = require('./state')
const globals         = require('./globals')
const progressStory = require('./storyProgression').progressStory

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
    /* state.currentMap.scriptedEvents.forEach( (e) => {
        if ( TRIGGER == e.trigger && TRIGGER != "ON_POSITION" ) {
            e.fireEvent( args );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
        else if ( TRIGGER == e.trigger && TRIGGER == "ON_POSITION" ) {
            if ( triggerOnPosition( e ) ) {
                e.fireEvent( );
                if ( e.passScene ) {
                    progressStory( );                
                }
            }
        }
    }) */
}

const triggerOnPosition = ( e ) => {
    state.playerCharacter.sprite.calcCellFromXy();
    const position = e.position;
    const player  = state.playerCharacter.sprite
    if ( globals[position.direction] == player.direction ) {
        if ( position.direction == "FACING_RIGHT" && player.col == position.col ) {
            return true;
        }
        if ( position.direction == "FACING_LEFT" && player.col == position.col ) {
            return true;
        }
        if ( position.direction == "FACING_UP" && player.row == position.row) {
            return true;
        }
        if ( position.direction == "FACING_DOWN" && player.row == position.row) {
            return true;
        }
    }

    return false;
}

module.exports = {
    triggerEvent
}