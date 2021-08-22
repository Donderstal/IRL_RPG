const globals = require('../../../game-data/globals')

const handleActionButton = ( ) => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( GAME.bubbleIsActive ) {
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
    }

    const currentPlayerTileBack = GAME.getTileOnCanvasAtIndex( "BACK", PLAYER.activeTileIndex );
    const nextPlayerTileBack = GAME.getTileOnCanvasAtIndex( "BACK", PLAYER.nextTileIndex );

    if ( GAME.activeAction != undefined && GAME.activeAction.needsConfirmation ) {
        GAME.activeAction.confirm( );
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
        return;
    }

    GAME.FRONT.allSprites.forEach( ( e ) => {
        if ( PLAYER.hitbox.checkForActionRange( e.hitbox, PLAYER.direction ) ) {
            GAME.activeAction = e.hitbox;
        }
    } )
    
    if ( currentPlayerTileBack.hasEvent ) {
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