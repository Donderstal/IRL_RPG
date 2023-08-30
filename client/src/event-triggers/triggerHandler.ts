import { TriggerType } from "../enumerables/TriggerType";
import type { Hitbox } from "../game/core/Hitbox";
import type { Sprite } from "../game/core/Sprite";
import { getSpriteRelatedTriggerId, spriteTriggerRelationExists } from "../registries/spriteTriggerRelationRegistry";
import type { Trigger } from "./Trigger";
import { addTriggerToQueue } from "./triggerQueue";
import { getAllTriggers, getTriggerById, getTriggersByTriggerType } from "./triggerRegistry";

export const checkForEventTriggers = ( triggerType: TriggerType, playerHitbox: Hitbox = null ): void => {
    const triggers = getTriggersByTriggerType( triggerType );
    if ( triggers.length === -1 || triggers.length === 0 ) return;

    triggers.forEach( ( e ) => {
        checkForEventTrigger( e, triggerType, playerHitbox );
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
const checkForEventTrigger = ( trigger: Trigger, triggerType: TriggerType, playerHitbox: Hitbox = null ): void => {
    let queueTrigger = false;
    switch ( triggerType ) {
        case TriggerType.collision:
            queueTrigger = playerHitbox.isInDoorRange( trigger );
            break;
        case TriggerType.interaction:
            queueTrigger = playerHitbox.isInActionRange( trigger );
            break;
        case TriggerType.map_enter:
        case TriggerType.map_leave:
            queueTrigger = trigger.model.triggeredBy === triggerType;
            break;
        default:
            console.error(`Trigger has unkown triggertype ${triggerType}`)
    }

    if ( queueTrigger ) {
        console.log( `Queueing trigger` )
        console.log( trigger )
        addTriggerToQueue( trigger.model, triggerType );
    }
}