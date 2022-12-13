import { STORY_EVENT_LIST } from "../../resources/storyEventResources";
import { ScriptedEvent } from "../cutscenes/ScriptedEvent";
import { addStoryEventForMapToRegistry, addStoryEventToRegistry, clearRegistryStoryEventsForMap, getStoryEventRegistry, markStoryEventAsTriggered } from "./storyEventRegistry"

export const setStoryEvents = ( eventIdList: string[] = null ): void => {
    STORY_EVENT_LIST.forEach( ( e ) => {
        addStoryEventToRegistry( new ScriptedEvent( e ) );
    } )
    if ( eventIdList !== null ) {
        eventIdList.forEach( markStoryEventAsTriggered );
    }
}
export const setStoryEventsForMap = ( mapKey: string ): void => {
    const events = getStoryEventRegistry();
    events.forEach( ( e ) => {
        if ( e.mapName === mapKey ) {
            addStoryEventForMapToRegistry( e );
        }
    } )
}
export const clearStoryEventsForMap = (): void => {
    clearRegistryStoryEventsForMap();
}