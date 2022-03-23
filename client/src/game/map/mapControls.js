const movement          = require('./map-ui/movement')
const actionController  = require('./map-ui/actionController')
const globals           = require('../../game-data/globals');
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../game-data/globals');
const { ON_POSITION } = require('../../game-data/conditionGlobals');
/**
 * Check the event.key prop and prevent its default.
 * If it is the spacebar, call handleActionButton() from the actionController.
 * If it is "e" and there is a speech bubble active, unset the bubble.
 * Else, add the key to the GAME.pressedKeys object.
 * @param {Event} event JS Event objct from DOM 
 */
const handleMapKeyPress = ( event ) => {
    const GAME = globals.GAME;

    if ( event.key == " " ) {
        actionController.handleActionButton( )        
    }
    else if ( event.key == "e" && GAME.bubbleIsActive ) {
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
        GAME.activeAction = null;
    }
    else if ( event.key == "1" ) {
        GAME.cameraFocus.handleScreenFlip( 
            {'col': GAME.PLAYER.col, 'row': GAME.PLAYER.row},
            GAME.activeMap
        )
    }
    else if ( !GAME.cinematicMode ) {
        GAME.pressedKeys[event.key] = true        
    }
}
/**
 * If there is a player sprite, check if w-a-s-d or up-left-down-right has been pressed.
 * If so, call movement.handleMovementOfSprite and pass the player sprite and its direction as arguments 
 * @param {Boolean} touch 
 * @param {Boolean} event 
 */
const handleMovementKeys = ( touch = false, event = false ) => {   
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( PLAYER != undefined ) {
        if ( GAME.pressedKeys.w || GAME.pressedKeys.ArrowUp ) {
            movement.handleMovementOfSprite( PLAYER, FACING_UP)
        }
        else if ( GAME.pressedKeys.a || GAME.pressedKeys.ArrowLeft ) {
            movement.handleMovementOfSprite( PLAYER, FACING_LEFT)
        }
        else if ( GAME.pressedKeys.s || GAME.pressedKeys.ArrowDown ) {
            movement.handleMovementOfSprite( PLAYER, FACING_DOWN)
        }
        else if ( GAME.pressedKeys.d || GAME.pressedKeys.ArrowRight ) {
            movement.handleMovementOfSprite( PLAYER, FACING_RIGHT)
        }
        else {
            PLAYER.playerWalking = false;
        }
        GAME.story.checkForEventTrigger( ON_POSITION );      
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}