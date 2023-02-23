import type { InteractionAnswer } from '../../enumerables/InteractionAnswer';
import { SpriteModuleEnum } from '../../enumerables/SpriteModuleEnum';
import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import type { ActionSelector } from '../map/map-classes/ActionSelector';

import { clearActiveBubbles, clearActiveEmotes } from './bubbleController';
import { addEventToRegistry } from '../../registries/interactionRegistry';
import { checkForQuestTrigger } from '../../registries/questRegistry';
import { checkForEventTrigger } from '../storyEvents/storyEventHandler';

import { PLAYER_ID } from '../../game-data/interactionGlobals';
import { getClosestHitbox } from '../../helpers/utilFunctions';

import { getAssociatedHitbox } from '../modules/hitboxes/hitboxGetter';
import { getPlayer, getSpriteById } from "../modules/sprites/spriteGetter";
import { getSpriteDestination, spriteHasDestination } from '../modules/destinations/destinationGetter';
import { markModuleAsActive, markModuleAsInActive } from '../modules/moduleRegistrySetter';
import { getAllActions } from '../modules/actions/actionRegistry';
import { getActiveMapKey } from '../neighbourhoodModule';
import { addCollectableToRegistry, getCollectableId } from '../../registries/collectableRegistry';
import { queueEvent } from '../../events/eventQueueSetter';

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
    if ( !checkForEventTrigger( CinematicTrigger.interaction, [activeAction.spriteId] ) ) {
        queueEvent( action.activeAction, action.trigger, [sprite.spriteId] );
        if ( sprite.model.isCollectable ) {
            const id = getCollectableId( sprite.column, sprite.row, sprite.model.collectableType, getActiveMapKey() );
            addCollectableToRegistry( id, sprite.model.collectableType )
        }
    }
}

export const dismissActiveAction = (): void => {
    if ( activeAction !== null ) {
        if ( spriteHasDestination( activeAction.spriteId ) ) {
            const destination = getSpriteDestination( activeAction.spriteId );
            const sprite = getSpriteById( activeAction.spriteId );
            sprite.activateMovementModule( destination.getNextStepDirection(sprite) );
            markModuleAsActive( activeAction.spriteId, SpriteModuleEnum.movement );
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