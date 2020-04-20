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

const handleMovementKeys = ( ) => {   

    if ( state.playerCharacter.sprite != undefined ) {
        if ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_UP')
        }
        if ( state.pressedKeys.a || state.pressedKeys.ArrowLeft ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_LEFT')
        }
        if ( state.pressedKeys.s || state.pressedKeys.ArrowDown ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_DOWN')
        }
        if ( state.pressedKeys.d || state.pressedKeys.ArrowRight ) {
            movement.handleMovementOfSprite(state.playerCharacter.sprite, 'FACING_RIGHT')
        }    
        
        state.currentMap.layeredSprites.push(state.playerCharacter.sprite)
    }
    
}

module.exports = {
    handleMapKeyPress,
    handleMovementKeys
}