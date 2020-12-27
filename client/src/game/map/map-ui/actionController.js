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

    const currentPlayerTileFront = globals.GAME.front.class.activePlayerTile;
    const nextPlayerTileFront = globals.GAME.front.class.nextPlayerTile;

    const currentPlayerTileBack = globals.GAME.back.class.activePlayerTile;
    const nextPlayerTileBack = globals.GAME.back.class.nextPlayerTile;

    const spritesById = globals.GAME.front.class.spriteDictionary

    if ( currentPlayerTileFront.hasSprite && spritesById[currentPlayerTileFront.spriteId].action != undefined ) {
        handleAction( spritesById[currentPlayerTileFront.spriteId].hitbox )
        return;
    }
    else if ( nextPlayerTileFront.hasSprite && spritesById[nextPlayerTileFront.spriteId].action != undefined ) {
        handleAction( spritesById[nextPlayerTileFront.spriteId].hitbox )
        return;
    }
    else if ( currentPlayerTileBack.hasEvent ) {
        handleAction( currentPlayerTileBack.event )
        return;
    }
    else if ( nextPlayerTileBack.hasEvent ) {
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