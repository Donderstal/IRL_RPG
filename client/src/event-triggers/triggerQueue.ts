import { EventChainType } from "../enumerables/EventChainType";
import type { TriggerType } from "../enumerables/TriggerType";
import { addToEventChainQueue } from "../eventchain-queue/eventChainQueue";
import type { IEventChain } from "../models/eventChains/IEventChain";
import type { TriggerModel } from "../models/TriggerModel";
import { CUTSCENE_EVENT_CHAINS } from "../resources/eventChainResources/cutsceneEventChains";
import { DOOR_EVENT_CHAINS } from "../resources/eventChainResources/doorEventChains";
import { ELEVATOR_EVENT_CHAINS } from "../resources/eventChainResources/elevatorEventChains";
import { SAVEPOINT_EVENT_CHAINS } from "../resources/eventChainResources/savePointEventChains";

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
export const checkQueuedTriggers = (): void => {
    triggerQueue.forEach( checkQueuedTrigger );
    clearTriggerQueue();
}

const checkQueuedTrigger = ( queuedTrigger: QueuedTrigger ): void => {
    const event = getTriggerAssociatedEvent( queuedTrigger.trigger )
    if ( event == null ) {
        console.warn( `Tried to trigger unknown event with id ${queuedTrigger.trigger.eventId}` );
    }

    addToEventChainQueue( event, queuedTrigger.type );
}
const getTriggerAssociatedEvent = ( model: TriggerModel ): IEventChain => {
    let event = null;

    switch ( model.eventChainType ) {
        case EventChainType.cutscene:
            event = CUTSCENE_EVENT_CHAINS[model.eventId];
            break;
        case EventChainType.door:
            event = DOOR_EVENT_CHAINS[model.eventId];
            break;
        case EventChainType.elevator:
            event = ELEVATOR_EVENT_CHAINS[model.eventId];
            break;
        case EventChainType.savepoint:
            event = SAVEPOINT_EVENT_CHAINS[model.eventId];
            break;
    }

    return event;
}
const clearTriggerQueue = (): void => {
    triggerQueue = [];
}
