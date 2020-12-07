const state = require('../../../game-data/state')
const globals = require('../../../game-data/globals')
const displayText   = require('./displayText')
const soundHelper = require('../../interfaces/I_Sound')

const handleActionButton = ( ) => {
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        return;
    }

    const currentPlayerTileFront = globals.FOREGROUND.activePlayerTile;
    const nextPlayerTileFront = globals.FOREGROUND.nextPlayerTile;

    const currentPlayerTileBack = globals.BACKGROUND.activePlayerTile;
    const nextPlayerTileBack = globals.BACKGROUND.nextPlayerTile;

    if ( currentPlayerTileBack.hasEvent ) {
        console.log( 'handle current tile evneT! ')
        handleAction( currentPlayerTileBack.event )
        return;
    }
    else if ( nextPlayerTileBack.hasEvent ) {
        console.log( 'handle next tile evneT! ')
        handleAction( nextPlayerTileBack.event )
        return;
    }
}

const handleAction = ( action ) => {
    switch ( action.type ) {
        case "TEXT" :
            displayActionText( action )
            break;   
        case "BUS" :
            displayActionText( action )
            state.requestingBus = { 
                'urlToNewMap': action.to,
                'oldMapName': state.currentMap.mapData.mapName
             };
            break;
        case "BATTLE" :
            displayActionText( action )
            state.battleStaging.action = action
            state.battleStaging.requestingBattle = true
            break;            
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