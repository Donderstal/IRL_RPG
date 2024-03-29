import type { DirectionEnum } from "../enumerables/DirectionEnum";
import { StateType } from "../enumerables/StateType";
import { TriggerType } from "../enumerables/TriggerType";
import type { Hitbox } from "../game/core/Hitbox";
import type { Sprite } from "../game/core/Sprite";
import { getSpriteRelatedTriggerId, spriteTriggerRelationExists } from "../registries/spriteTriggerRelationRegistry";
import { getGameState } from "../state/state";
import type { Trigger } from "./Trigger";
import { addTriggerToQueue } from "./triggerQueue";
import { getAllTriggers, getTriggerById, getTriggersByTriggerType } from "./triggerRegistry";

export const checkForEventTriggers = ( triggerType: TriggerType, playerHitbox: Hitbox = null, direction: DirectionEnum = null ): void => {
    if ( getGameState( StateType.inEvent ) ) return;
    const triggers = getTriggersByTriggerType( triggerType );
    if ( triggers.length === -1 || triggers.length === 0 ) return;

    triggers.forEach( ( e ) => {
        checkForEventTrigger( e, triggerType, playerHitbox, direction );
    } );
}
export const updateAssociatedTrigger = ( sprite: Sprite ): void => {
    if ( spriteTriggerRelationExists( sprite.spriteId ) ) {
        updateTriggerXyToSpriteXy( sprite );
    }
}
export const drawTriggers = (): void => {
    const triggers = getAllTriggers();
    triggers.forEach( ( e ) => { e.draw(); } );
}

const updateTriggerXyToSpriteXy = ( sprite: Sprite ): void => {
    const triggerId = getSpriteRelatedTriggerId( sprite.spriteId );
    const trigger = getTriggerById( triggerId );
    trigger.updateXy( sprite.x, sprite.y );
}
const checkForEventTrigger = ( trigger: Trigger, triggerType: TriggerType, playerHitbox: Hitbox = null, direction: DirectionEnum = null ): void => {
    let queueTrigger = false;
    switch ( triggerType ) {
        case TriggerType.collision:
            queueTrigger = playerHitbox.isInDoorRange( trigger ) && (trigger.model.direction === undefined || trigger.model.direction === direction);
            break;
        case TriggerType.interaction:
            queueTrigger = playerHitbox.isInActionRange( trigger );
            break;
        default:
            console.error(`Trigger has unkown triggertype ${triggerType}`)
    }

    if ( queueTrigger ) {
        if ( getGameState( StateType.debugMode ) ) {
            console.log( `Queueing trigger` )
            console.log( trigger.model )
            console.log( triggerType )
        }

        addTriggerToQueue( trigger.model, triggerType );
    }
}