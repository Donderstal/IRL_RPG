import { TriggerType } from "../enumerables/TriggerType";
import type { Hitbox } from "../game/core/Hitbox";
import type { Trigger } from "./Trigger";
import { getTriggersByTriggerType } from "./triggerRegistry";

export const checkForEventTriggers = ( playerhitbox: Hitbox, triggerType: TriggerType ): void => {
    const triggers = getTriggersByTriggerType( triggerType );
    if ( triggers.length === -1 || triggers.length === 0 ) return;

    triggers.forEach( ( e ) => {
        checkForEventTrigger( playerhitbox, e );
    } );
}

const checkForEventTrigger = ( playerHitbox: Hitbox, trigger: Trigger ): void => {
    let eventShouldTrigger = false;
    switch ( trigger.triggerType ) {
        case TriggerType.collision:
            eventShouldTrigger = playerHitbox.isInDoorRange( trigger );
            break;
        case TriggerType.interaction:
            eventShouldTrigger = playerHitbox.isInActionRange( trigger );
            break;
        default:
            console.error(`Trigger has unkown triggertype ${trigger.triggerType}`)
    }

    if ( eventShouldTrigger ) triggerEvent( trigger );
}

const triggerEvent = ( trigger: Trigger ): void => {
    console.log( trigger );
}