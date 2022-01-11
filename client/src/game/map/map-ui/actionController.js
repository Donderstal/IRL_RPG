const { EVENT_DOOR } = require('../../../game-data/conditionGlobals');
const globals = require('../../../game-data/globals');
const { tryCatch } = require('../../../helpers/errorHelpers');

const handleActionButton = ( ) => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

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

    GAME.BACK.grid.array.forEach( ( e ) => { 
        if ( e.hasEvent && e.eventType == EVENT_DOOR) {
            if ( PLAYER.hitbox.checkForActionRange( e.event.hitbox, PLAYER.direction ) && e.event.direction == PLAYER.direction) {
                GAME.activeAction = e.event.hitbox;
            }
        }
    })
    
    if ( PLAYER.currentTileBack != undefined && PLAYER.currentTileBack.hasEvent ) {
        GAME.activeAction =  PLAYER.currentTileBack.event
    }
    else if ( PLAYER.nextTileBack != undefined && PLAYER.nextTileBack.hasEvent ) {
        GAME.activeAction =  PLAYER.nextTileBack.event
    }

    if ( GAME.activeAction != null ) {
        tryCatch(GAME.activeAction.handle.bind(GAME.activeAction));
    }
}

module.exports = {
    handleActionButton
}