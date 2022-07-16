import globals from '../../../game-data/globals';

export const handleActionButton = ( ): void => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( GAME.activeAction !== undefined && GAME.activeAction.needsConfirmation ) {
        GAME.activeAction.confirm( );
        GAME.activeBubble = {}
        GAME.bubbleIsActive = false
        return;
    }

    GAME.FRONT.allSprites.forEach( ( e ) => {
        if ( PLAYER.hitbox.checkForActionRange( e.hitbox, PLAYER.direction ) ) {
            GAME.activeAction = e.actionSelector.evaluate( );
        }
    } )
    
    if ( PLAYER.currentTileBack !== undefined && PLAYER.currentTileBack.hasEvent ) {
        GAME.activeAction =  PLAYER.currentTileBack.event
    }
    else if ( PLAYER.nextTileBack !== undefined && PLAYER.nextTileBack.hasEvent ) {
        GAME.activeAction =  PLAYER.nextTileBack.event
    }

    if ( GAME.activeAction !== null ) {
        GAME.activeAction.handle();
    }
}