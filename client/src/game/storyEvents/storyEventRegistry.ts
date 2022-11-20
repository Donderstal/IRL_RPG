import type { ScriptedEvent } from "../cutscenes/ScriptedEvent";

let events: ScriptedEvent[] = [];
let triggeredEventIds: string[] = [];
let disableStoryMode: boolean = false;
let storyEventsForMap: ScriptedEvent[] = [];
export const addStoryEventForMapToRegistry = ( event: ScriptedEvent ): void => {
    storyEventsForMap.push( event );
}
export const getRegistryStoryEventsForMap = (): ScriptedEvent[] => {
    return storyEventsForMap;
}
export const clearRegistryStoryEventsForMap = (): void => {
    storyEventsForMap = [];
}
export const setDisableStoryMode = ( disable: boolean ): void => {
    disableStoryMode = disable;
}
export const getDisableStoryMode = (): boolean => {
    return disableStoryMode;
}
export const getStoryEventRegistry = (): ScriptedEvent[] => {
    return events;
}
export const getTriggeredStoryEventIds = (): string[] => {
    return triggeredEventIds;
}
export const addStoryEventToRegistry = ( event: ScriptedEvent ) => {
    events.push( event );
}
export const markStoryEventAsTriggered = ( eventId: string ) => {
    triggeredEventIds.push( eventId );
}