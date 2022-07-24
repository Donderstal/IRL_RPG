import type { InteractionAnswer } from '../../../enumerables/InteractionAnswer';
import globals from '../../../game-data/globals';
import { PLAYER_ID } from '../../../game-data/interactionGlobals';
import { xyDistanceSquared } from '../../../helpers/utilFunctions';
import { getAllActions } from '../../modules/actionModule';
import { getAssociatedHitbox } from '../../modules/hitboxModule';
import type { ActionSelector } from '../map-classes/ActionSelector';

let activeAction: ActionSelector = null; 

export const handleActionButton = ( ): void => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;
    const playerHitbox = getAssociatedHitbox( PLAYER_ID );

    if ( activeAction !== null && activeAction.needsConfirmation ) {
        confirmActiveAction();
    }

    const actions = getAllActions();
    const actionsInRange = actions.filter( ( e ) => { return playerHitbox.checkForActionRange( e, PLAYER.direction ); } );

    let closestActionDistance = null; 
    actionsInRange.forEach( ( e ) => {
        const distance = xyDistanceSquared( { x: PLAYER.x, y: PLAYER.y }, { x: e.x, y: e.y } );
        if ( closestActionDistance == null || distance < closestActionDistance ) {
            setActiveAction( e );
        }
    } );

    if ( activeAction !== null ) {
        activeAction.handle();
    }
}

const setActiveAction = ( action: ActionSelector ): void => {
    activeAction = action;
}

export const dismissActiveAction = (): void => {
    activeAction.dismiss();
    activeAction = null;
}

export const confirmActiveAction = (): void => {
    activeAction.confirm();
    globals.GAME.activeBubble = null;
    globals.GAME.bubbleIsActive = false;
}

export const registerActionSelection = ( selection: InteractionAnswer ): void => {
    activeAction.registerSelection( selection );
}