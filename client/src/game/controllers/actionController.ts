import type { InteractionAnswer } from '../../enumerables/InteractionAnswer';
import globals from '../../game-data/globals';
import { PLAYER_ID } from '../../game-data/interactionGlobals';
import { getClosestHitbox } from '../../helpers/utilFunctions';
import { getAllActions } from '../modules/actionModule';
import { getAssociatedHitbox } from '../modules/hitboxModule';
import type { ActionSelector } from '../map/map-classes/ActionSelector';
import { clearActiveBubbles } from './bubbleController';
import type { InteractionModel } from '../../models/InteractionModel';
import { addEventToRegistry } from '../../helpers/interactionRegistry';
import { checkForQuestTrigger } from '../../helpers/questRegistry';

let activeAction: ActionSelector = null; 

export const handleActionButton = ( ): void => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;
    const playerHitbox = getAssociatedHitbox( PLAYER_ID );

    if ( activeAction !== null ) {
        if ( activeAction.needsConfirmation ) {
            confirmActiveAction();
        }
        else {
            dismissActiveAction();
        }
    }

    const actions = getAllActions();
    if ( actions.length === 0 ) return;
    const closestAction = getClosestHitbox( playerHitbox, actions );
    if ( playerHitbox.actionInRange( closestAction, PLAYER.direction ) ) {
        setActiveAction( closestAction as ActionSelector );
    }
    else {
        dismissActiveAction();
    }
}

const setActiveAction = ( action: ActionSelector ): void => {
    activeAction = action;
    activeAction.handle();
}

export const dismissActiveAction = (): void => {
    if ( activeAction !== null ) {
        addActionSelectorEventToRegistry( activeAction );
        activeAction.dismiss();
        activeAction = null;
    }
}

export const confirmActiveAction = (): void => {
    activeAction.confirm();
    clearActiveBubbles();
}

export const registerActionSelection = ( selection: InteractionAnswer ): void => {
    activeAction.registerSelection( selection );
}

const addActionSelectorEventToRegistry = ( actionSelector: ActionSelector): void => {
    if ( actionSelector.activeAction.shouldBeRegistered && actionSelector.registeredSelection ) {
        addEventToRegistry( actionSelector.activeAction.registryKey, actionSelector.registeredSelection )
    }
    else if ( actionSelector.activeAction.shouldBeRegistered ) {
        addEventToRegistry( actionSelector.activeAction.registryKey );
    }
    checkForQuestTrigger( actionSelector.activeAction.registryKey );
}