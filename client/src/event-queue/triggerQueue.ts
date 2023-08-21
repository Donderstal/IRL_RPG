import { EventType } from "../enumerables/EventType";
import type { TriggerEvent } from "../models/TriggerEvent";

let triggerQueue: TriggerEvent[] = [];

const addToTriggerQueue = ( trigger: TriggerEvent ): void => {
    triggerQueue.push( trigger );
}
const getFirstInQueue = (): TriggerEvent => {
    return triggerQueue.slice( 0, 1 )[0];
}
const eventIsTriggerable = ( trigger: TriggerEvent ): boolean => {
    return true;
}
const triggerEvent = ( trigger: TriggerEvent ): any => {
    const type = trigger.type;
    if ( type !== EventType.cutscene ) return true;

    return true;
}

export const pushToTriggerQueue = ( trigger: TriggerEvent ): void => {
    addToTriggerQueue( trigger );
}
export const checkTriggerQueueForEvents = (): void => {
    let foundTriggerableEvent = false;
    let eventTrigger = undefined;

    while ( !foundTriggerableEvent ) {
        eventTrigger = getFirstInQueue();
        if ( eventTrigger == undefined ) return;

        foundTriggerableEvent = eventIsTriggerable( eventTrigger );
    }

    triggerEvent( eventTrigger );
}
export const clearTriggerQueue = (): void => {
    triggerQueue = [];
}