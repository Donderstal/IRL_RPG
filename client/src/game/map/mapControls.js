const movement          = require('./map-ui/movement')
const actionController  = require('./map-ui/actionController')

const globals           = require('../../game-data/globals')
/**
 * Check the event.key prop and prevent its default.
 * If it is the spacebar, call handleActionButton() from the actionController.
 * If it is "e" and there is a speech bubble active, unset the bubble.
 * Else, add the key to the GAME.pressedKeys object.
 * @param {Event} event JS Event objct from DOM 
 */
const handleMapKeyPress = ( event ) => {
    const GAME = globals.GAME;

    event.preventDefault()    

    if ( event.key == " " ) {
        actionController.handleActionButton( )        
    }
    else if ( event.key == "e" && GAME.bubbleIsActive ) {
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
    }
    else if ( !GAME.cinematicMode ) {
        GAME.pressedKeys[event.key] = true        
    }
}
/**
 * If there is a player sprite, check if w-a-s-d or up-left-down-right has been pressed.
 * If so, call movement.handleMovementOfSprite and pass the player sprite and its direction as arguments 
 * ( TODO: Seperate touch and non-touch controls )
 * @param {Boolean} touch 
 * @param {Boolean} event 
 */
const handleMovementKeys = ( touch = false, event = false ) => {   
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;
    let touchLeft = false;
    let touchRight = false;
    let touchUp = false;
    let touchDown = false;

    if ( touch && PLAYER != undefined && !GAME.cinematicMode ) {
        var rect = document.getElementById('game-front-canvas').getBoundingClientRect();
        const touch = event.touches[0]
    
        let touchX = touch.clientX - rect.left;
        let touchY = touch.clientY - rect.top;
    
        let playerX = PLAYER.x;
        let playerY = PLAYER.y;
        let playerBottom = playerY + PLAYER.height;
        let playerRight = playerX + PLAYER.width;
    
        touchLeft = ( touchX < playerX )
        touchRight = ( touchX > playerRight )
        touchUp = ( touchY < playerY )
        touchDown = ( touchY > playerBottom )
    }

    if ( PLAYER != undefined ) {
        if ( GAME.pressedKeys.w || GAME.pressedKeys.ArrowUp || touchUp ) {
            movement.handleMovementOfSprite( PLAYER, 'FACING_UP')
        }
        else if ( GAME.pressedKeys.a || GAME.pressedKeys.ArrowLeft || touchLeft ) {
            movement.handleMovementOfSprite( PLAYER, 'FACING_LEFT')
        }
        else if ( GAME.pressedKeys.s || GAME.pressedKeys.ArrowDown || touchDown ) {
            movement.handleMovementOfSprite( PLAYER, 'FACING_DOWN')
        }
        else if ( GAME.pressedKeys.d || GAME.pressedKeys.ArrowRight || touchRight ) {
            movement.handleMovementOfSprite( PLAYER, 'FACING_RIGHT')
        }    
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}