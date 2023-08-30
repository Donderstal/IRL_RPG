import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import type { EventModel } from "../models/events/EventModel";
import { startEvent } from "./eventController";
import { getEventQueue } from "./eventQueue"

export const handleEventQueue = (): void => {
    const eventsInQueue = getEventQueue();
    if ( eventsInQueue.length < 1 ) return
    const sortedEvent = getEventWithPriority( eventsInQueue );
    startEvent(sortedEvent);
}
const getEventWithPriority = ( events: EventModel[] ): EventModel => {
    const interactionEvents = events.filter( e => e.triggerType == TriggerType.interaction );
    const collisionEvents = events.filter( e => e.triggerType == TriggerType.collision );

    let sortedEvents: EventModel[] = [];
    if ( interactionEvents != undefined && interactionEvents.length >= 1 ) {
        sortedEvents = [ ...sortEventsByEventType( interactionEvents) ];
    }
    if ( collisionEvents != undefined && collisionEvents.length >= 1 ) {
        sortedEvents = [...sortedEvents, ...sortEventsByEventType( interactionEvents )];
    }
    return sortedEvents[0];
}
const sortEventsByEventType = ( events: EventModel[] ): EventModel[] => {
    const cutscenEvents = events.filter( e => e.eventType == EventType.cutscene );
    const doornEvents = events.filter( e => e.eventType == EventType.door );
    const elevatorEvents = events.filter( e => e.eventType == EventType.elevator );
    const savepointEvents = events.filter( e => e.eventType == EventType.save_point );

    let sortedEvents = [];
    if ( savepointEvents != undefined && savepointEvents.length >= 1 ) {
        sortedEvents = [...sortedEvents, ...savepointEvents];
    }
    if ( elevatorEvents != undefined && elevatorEvents.length >= 1 ) {
        sortedEvents = [...sortedEvents, ...elevatorEvents];
    }
    if ( cutscenEvents != undefined && cutscenEvents.length >= 1 ) {
        sortedEvents = [...sortedEvents,...cutscenEvents];
    }
    if ( doornEvents != undefined && doornEvents.length >= 1 ) {
        sortedEvents = [...sortedEvents, ...doornEvents];
    }
    return sortedEvents;
}
 