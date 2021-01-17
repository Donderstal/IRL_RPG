const state = require('../../../game-data/state')
const globals = require('../../../game-data/globals')

const handleActionButton = ( ) => {
    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
    }

    const currentPlayerTileFront = globals.GAME.front.class.activePlayerTile;
    const nextPlayerTileFront = globals.GAME.front.class.nextPlayerTile;

    const currentPlayerTileBack = globals.GAME.back.class.activePlayerTile;
    const nextPlayerTileBack = globals.GAME.back.class.nextPlayerTile;

    const spritesById = globals.GAME.front.class.spriteDictionary

    if ( globals.GAME.activeAction != null && globals.GAME.activeAction.needsConfirmation ) {
        globals.GAME.activeAction.confirm( );
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
        return;
    }

    if ( currentPlayerTileFront.hasSprite && spritesById[currentPlayerTileFront.spriteId].action != undefined ) {
        globals.GAME.activeAction = spritesById[currentPlayerTileFront.spriteId].hitbox
    }
    else if ( nextPlayerTileFront.hasSprite && spritesById[nextPlayerTileFront.spriteId].action != undefined ) {
        globals.GAME.activeAction = spritesById[nextPlayerTileFront.spriteId].hitbox
    }
    else if ( currentPlayerTileBack.hasEvent ) {
        globals.GAME.activeAction =  currentPlayerTileBack.event
    }
    else if ( nextPlayerTileBack.hasEvent ) {
        globals.GAME.activeAction =  nextPlayerTileBack.event
    }

    if ( globals.GAME.activeAction != null ) {
        globals.GAME.activeAction.handle( );        
    }
}

module.exports = {
    handleActionButton
}