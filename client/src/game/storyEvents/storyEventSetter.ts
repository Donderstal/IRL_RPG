import { getStoryEventModels } from "../../resources/storyChapters";
import { ScriptedEvent } from "../cutscenes/ScriptedEvent";
import { addStoryEventForMapToRegistry, addStoryEventToRegistry, clearRegistryStoryEventsForMap, getStoryEventRegistry, markStoryEventAsTriggered } from "./storyEventRegistry"

export const setStoryEvents = ( eventIdList: string[] = null ): void => {
    getStoryEventModels().forEach( ( e ) => {
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