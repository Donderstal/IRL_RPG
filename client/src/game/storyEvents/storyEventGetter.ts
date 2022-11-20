import { getRegistryStoryEventsForMap, getStoryEventRegistry, getTriggeredStoryEventIds } from "./storyEventRegistry"

export const mapHasStoryEvents = ( mapKey: string ): boolean => {
    return getStoryEventRegistry().filter( ( e ) => { return e.mapName === mapKey })[0] === undefined;
}
export const getStoryEventsOnActiveMap = ( ) => {
    return getRegistryStoryEventsForMap()
}
export const storyEventHasBeenTriggered = ( id: string ) => {
    const triggeredEvents = getTriggeredStoryEventIds()
    return triggeredEvents.filter( ( e ) => { return e === id } ).length > 0
}