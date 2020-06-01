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

const triggerEvent = ( TRIGGER ) => {
    state.currentMap.scriptedEvents.forEach( (e) => {
        if ( TRIGGER == e.trigger && TRIGGER != "ON_POSITION" ) {
            e.fireEvent( );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
        else if ( TRIGGER == e.trigger && TRIGGER == "ON_POSITION" ) {
            triggerOnPosition( e );
        }
    })
}

const triggerOnPosition = ( e ) => {
    const position = e.position;
    const player  = state.playerCharacter.sprite
    if ( globals[position.direction] == player.direction ) {
        if ( position.direction == "FACING_RIGHT" && player.col >= position.col ) {
            e.fireEvent( );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
        if ( position.direction == "FACING_LEFT" && player.col <= position.col ) {
            e.fireEvent( );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
        if ( position.direction == "FACING_UP" && player.row >= position.row) {
            e.fireEvent( );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
        if ( position.direction == "FACING_DOWN" && player.row <= position.row) {
            e.fireEvent( );
            if ( e.passScene ) {
                progressStory( );                
            }
        }
    }
}

module.exports = {
    triggerEvent
}