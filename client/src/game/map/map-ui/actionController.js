const state = require('../../../game-data/state')
const displayText   = require('./displayText')
const soundHelper = require('../../interfaces/I_Sound')

const handleActionButton = ( ) => {
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
    }

    if ( state.currentMap.availableAction != null ) {
        handleAction( state.currentMap.availableAction )
        return;
    }
}

const handleAction = ( action ) => {
    switch ( action.type ) {
        case "TEXT" :
            displayActionText( action )
            break            
        case "BATTLE" :
            displayActionText( action )
            state.battleState.opponent.action = action
            state.battleState.requestingBattle = true
            break            
        }
}

const displayActionText = ( action ) => {
    if ( !document.getElementById(action.sfx) ) {
        const sfx = new soundHelper.Sound( action.sfx, true )
        sfx.play()
        setTimeout( () => {
            document.getElementById(action.sfx).remove()                    
        }, 1500)
    } 
    displayText.getSpeechBubble( action )
}
module.exports = {
    handleActionButton
}