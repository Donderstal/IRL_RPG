import { EventType } from "../enumerables/EventType";
import type { IEventScript } from "../models/eventScripts/IEventScript";

export const handleActiveEventScript = ( eventScript: IEventScript ): boolean => {
    switch ( eventScript.eventType ) {
        case EventType.cutscene:
            break;
        case EventType.enter_map:
            break;
        case EventType.leave_map:
            break;
        case EventType.prompt:
            break;
    }
    return false;
}
const clearActiveEventModifiers = (): void => { };