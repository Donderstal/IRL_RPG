const movement          = require('./map-ui/movement')
const triggerEvent      = require('../../game-data/triggerEvents').triggerEvent   
const actionController  = require('./map-ui/actionController')

const globals           = require('../../game-data/globals')

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
        triggerEvent("ON_POSITION")
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}