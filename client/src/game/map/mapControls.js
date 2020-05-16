const movement          = require('./map-ui/movement')
const changeMode        = require('../../game-data/changeMode')
const state             = require('../../game-data/state')
const actionController  = require('./map-ui/actionController')

const handleMapKeyPress = ( event ) => {
    if ( event.key == "q" && !state.battleState.requestingBattle ) {
        event.preventDefault()
        actionController.handleActionButton( )        
    }
    else if ( event.key == "e" && state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        state.battleState.requestingBattle = false
    }
    else if ( event.key == "q" && state.currentMap.bubbleIsActive && state.battleState.requestingBattle ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        changeMode.requestModeChange( 'BATTLE' )
    }
    else {
        state.pressedKeys[event.key] = true        
    }
}

const handleMovementKeys = ( touch = false, event = false ) => {   
    let touchLeft = false;
    let touchRight = false;
    let touchUp = false;
    let touchDown = false;

    if ( touch && state.playerCharacter.sprite != undefined ) {
        var rect = document.getElementById('game-front-canvas').getBoundingClientRect();
        const touch = event.touches[0]
    
        let touchX = touch.clientX - rect.left;
        let touchY = touch.clientY - rect.top;
    
        let playerX = state.playerCharacter.sprite.x;
        let playerY = state.playerCharacter.sprite.y;
        let playerBottom = playerY + state.playerCharacter.sprite.height;
        let playerRight = playerX + state.playerCharacter.sprite.width;
    
        touchLeft = ( touchX < playerX )
        touchRight = ( touchX > playerRight )
        touchUp = ( touchY < playerY )
        touchDown = ( touchY > playerBottom )
    }

    if ( state.playerCharacter.sprite != undefined ) {
        if ( state.pressedKeys.w || state.pressedKeys.ArrowUp || touchUp ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_UP')
        }
        else if ( state.pressedKeys.a || state.pressedKeys.ArrowLeft || touchLeft ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_LEFT')
        }
        else if ( state.pressedKeys.s || state.pressedKeys.ArrowDown || touchDown ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_DOWN')
        }
        else if ( state.pressedKeys.d || state.pressedKeys.ArrowRight || touchRight ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_RIGHT')
        }    
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}