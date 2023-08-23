import { EventType } from "../enumerables/EventType";
import type { TriggerType } from "../enumerables/TriggerType";
import { conditionIsTrue } from "../helpers/conditionalHelper";
import type { EventModel } from "../models/events/EventModel";
import type { TriggerModel } from "../models/TriggerModel";
import { CUTSCENE_EVENTS } from "../resources/eventResources/cutsceneEvents";
import { DOOR_EVENTS } from "../resources/eventResources/doorEvents";
import { ELEVATOR_EVENTS } from "../resources/eventResources/elevatorEvents";
import { SAVEPOINT_EVENTS } from "../resources/eventResources/savePointEvents";

type QueuedTrigger = {
    trigger: TriggerModel,
    type: TriggerType
}

let triggerQueue: QueuedTrigger[] = []

export const addTriggerToQueue = ( trigger: TriggerModel, type: TriggerType ): void => {
    const queueTrigger: QueuedTrigger = {
        trigger: trigger,
        type: type
    }
    triggerQueue.push( queueTrigger );
}
export const checkQueuedTriggers = ( ): void => {
    triggerQueue.forEach( checkQueuedTrigger );
}
export const checkQueuedTrigger = ( queuedTrigger: QueuedTrigger ): void => {
    const event = getTriggerAssociatedEvent( queuedTrigger.trigger )
    if ( event == null ) {
        console.warn( `Tried to trigger unkown event with id ${queuedTrigger.trigger}` );
    }

    const triggerablEventScripts = event.triggerableEvents.filter( ( e ) => { return queuedTrigger.type === e.triggerType  && conditionIsTrue(e.condition.type, e.condition.value); } );
    console.log( triggerablEventScripts );
}
export const clearTriggerQueue = (): void => {
    triggerQueue = [];
}

const getTriggerAssociatedEvent = ( model: TriggerModel ): EventModel => {
    let event = null;

    switch ( model.eventType ) {
        case EventType.cutscene:
            event = CUTSCENE_EVENTS[model.eventId];
            break;
        case EventType.door:
            event = DOOR_EVENTS[model.eventId];
            break;
        case EventType.elevator:
            event = ELEVATOR_EVENTS[model.eventId];
            break;
        case EventType.save_point:
            event = SAVEPOINT_EVENTS[model.eventId];
            break;
    }

    return event;
}
