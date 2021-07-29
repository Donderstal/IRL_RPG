const globals = require('../../../game-data/globals')

const handleActionButton = ( ) => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( GAME.bubbleIsActive ) {
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
    }

    const currentPlayerTileFront = GAME.getTileOnCanvasAtIndex( "FRONT", PLAYER.activeTileIndex );
    const nextPlayerTileFront = GAME.getTileOnCanvasAtIndex( "FRONT", PLAYER.nextTileIndex );

    const currentPlayerTileBack = GAME.getTileOnCanvasAtIndex( "BACK", PLAYER.activeTileIndex );
    const nextPlayerTileBack = GAME.getTileOnCanvasAtIndex( "BACK", PLAYER.nextTileIndex );

    const spritesById = GAME.front.class.spriteDictionary

    if ( GAME.activeAction != null && GAME.activeAction.needsConfirmation ) {
        GAME.activeAction.confirm( );
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
        return;
    }

    if ( currentPlayerTileFront.hasSprite && spritesById[currentPlayerTileFront.spriteId].action != undefined ) {
        GAME.activeAction = spritesById[currentPlayerTileFront.spriteId].hitbox
    }
    else if ( nextPlayerTileFront != undefined && nextPlayerTileFront.hasSprite && spritesById[nextPlayerTileFront.spriteId].action != undefined ) {
        GAME.activeAction = spritesById[nextPlayerTileFront.spriteId].hitbox
    }
    else if ( currentPlayerTileBack.hasEvent ) {
        GAME.activeAction =  currentPlayerTileBack.event
    }
    else if ( nextPlayerTileBack.hasEvent ) {
        GAME.activeAction =  nextPlayerTileBack.event
    }

    if ( GAME.activeAction != null ) {
        GAME.activeAction.handle( );        
    }
}

module.exports = {
    handleActionButton
}