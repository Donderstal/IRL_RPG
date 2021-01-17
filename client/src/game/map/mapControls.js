const movement          = require('./map-ui/movement')
const triggerEvent      = require('../../game-data/triggerEvents').triggerEvent   
const actionController  = require('./map-ui/actionController')

const globals           = require('../../game-data/globals')

const handleMapKeyPress = ( event ) => {
    event.preventDefault()    

    if ( event.key == " " ) {
        actionController.handleActionButton( )        
    }
    else if ( event.key == "e" && globals.GAME.bubbleIsActive ) {
        globals.GAME.activeBubble = {}
        globals.GAME.bubbleIsActive = false
    }
    else if ( !globals.GAME.cinematicMode ) {
        globals.GAME.pressedKeys[event.key] = true        
    }
}

const handleMovementKeys = ( touch = false, event = false ) => {   
    let touchLeft = false;
    let touchRight = false;
    let touchUp = false;
    let touchDown = false;

    if ( touch && globals.GAME.PLAYER != undefined && !globals.GAME.cinematicMode ) {
        var rect = document.getElementById('game-front-canvas').getBoundingClientRect();
        const touch = event.touches[0]
    
        let touchX = touch.clientX - rect.left;
        let touchY = touch.clientY - rect.top;
    
        let playerX = globals.GAME.PLAYER.x;
        let playerY = globals.GAME.PLAYER.y;
        let playerBottom = playerY + globals.GAME.PLAYER.height;
        let playerRight = playerX + sglobals.GAME.PLAYER.width;
    
        touchLeft = ( touchX < playerX )
        touchRight = ( touchX > playerRight )
        touchUp = ( touchY < playerY )
        touchDown = ( touchY > playerBottom )
    }

    if ( globals.GAME.PLAYER != undefined ) {
        if ( globals.GAME.pressedKeys.w || globals.GAME.pressedKeys.ArrowUp || touchUp ) {
            movement.handleMovementOfSprite( globals.GAME.PLAYER, 'FACING_UP')
        }
        else if ( globals.GAME.pressedKeys.a || globals.GAME.pressedKeys.ArrowLeft || touchLeft ) {
            movement.handleMovementOfSprite( globals.GAME.PLAYER, 'FACING_LEFT')
        }
        else if ( globals.GAME.pressedKeys.s || globals.GAME.pressedKeys.ArrowDown || touchDown ) {
            movement.handleMovementOfSprite( globals.GAME.PLAYER, 'FACING_DOWN')
        }
        else if ( globals.GAME.pressedKeys.d || globals.GAME.pressedKeys.ArrowRight || touchRight ) {
            movement.handleMovementOfSprite( globals.GAME.PLAYER, 'FACING_RIGHT')
        }    
        triggerEvent("ON_POSITION")
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}