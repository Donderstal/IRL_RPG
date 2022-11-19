import type { InteractionAnswer } from '../../enumerables/InteractionAnswer';
import { PLAYER_ID } from '../../game-data/interactionGlobals';
import { getClosestHitbox } from '../../helpers/utilFunctions';
import { getAssociatedHitbox } from '../modules/hitboxes/hitboxGetter';
import type { ActionSelector } from '../map/map-classes/ActionSelector';
import { clearActiveBubbles, clearActiveEmotes } from './bubbleController';
import { addEventToRegistry } from '../../registries/interactionRegistry';
import { checkForQuestTrigger } from '../../registries/questRegistry';
import { getPlayer, getSpriteById } from "../modules/sprites/spriteGetter";
import { getSpriteDestination, spriteHasDestination } from '../modules/destinations/destinationGetter';
import { markModuleAsInActive } from '../spriteModuleHandler';
import { SpriteModuleEnum } from '../../enumerables/SpriteModuleEnum';
import { getAllActions } from '../modules/actions/actionRegistry';

let activeAction: ActionSelector = null; 

export const handleActionButton = ( ): void => {
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
    if ( playerHitbox.actionInRange( closestAction, getPlayer().direction ) ) {
        setActiveAction( closestAction as ActionSelector );
    }
    else {
        dismissActiveAction();
    }
}

const setActiveAction = ( action: ActionSelector ): void => {
    activeAction = action;
    const sprite = getSpriteById( activeAction.spriteId );
    if ( spriteHasDestination( activeAction.spriteId ) ) {
        markModuleAsInActive( activeAction.spriteId, SpriteModuleEnum.movement );
        sprite.deactivateMovementModule();
    }
    activeAction.handle( sprite );
}

export const dismissActiveAction = (): void => {
    if ( activeAction !== null ) {
        if ( spriteHasDestination( activeAction.spriteId ) ) {
            const destination = getSpriteDestination( activeAction.spriteId );
            const sprite = getSpriteById( activeAction.spriteId );
            destination.setPath( sprite );
        }
        addActionSelectorEventToRegistry( activeAction );
        activeAction.dismiss();
        activeAction = null;
    }
    clearActiveBubbles();
}

export const confirmActiveAction = (): void => {
    activeAction.confirm();
    clearActiveEmotes();
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