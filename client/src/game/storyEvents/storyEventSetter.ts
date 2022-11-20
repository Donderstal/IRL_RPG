import { getStoryEventModels } from "../../resources/storyChapters";
import { ScriptedEvent } from "../cutscenes/ScriptedEvent";
import { addStoryEventForMapToRegistry, addStoryEventToRegistry, clearRegistryStoryEventsForMap, getStoryEventRegistry, markStoryEventAsTriggered, setDisableStoryMode } from "./storyEventRegistry"

export const setStoryEvents = ( disableStoryMode: boolean, eventIdList: string[] = null ): void => {
    setDisableStoryMode( disableStoryMode );
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