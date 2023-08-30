import type { TriggerType } from "../enumerables/TriggerType";
import type { EventModel } from "../models/events/EventModel";

let eventQueue: EventModel[] = [];

export const clearEventQueue = (): void => {
    eventQueue = [];
}
export const addToEventQueue = (triggeredEvent: EventModel, eventScriptIndex: number, triggerType: TriggerType): void => {
    eventQueue.push( copyEventModel( triggeredEvent, eventScriptIndex, triggerType ) );
}
export const getEventQueue = (): EventModel[] => {
    return eventQueue;
}
const copyEventModel = ( triggeredEvent: EventModel, eventScriptIndex: number, triggerType: TriggerType ): EventModel => {
    return {
        ...triggeredEvent,
        selectedEventIndex: eventScriptIndex,
        triggerType: triggerType
    }
}