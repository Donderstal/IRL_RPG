import { EventType } from "../enumerables/EventType";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import type { IEventScript } from "../models/eventScripts/IEventScript";
import { handleActiveCutsceneEventScript } from "./handleCutscene";

export const handleActiveEventScript = ( eventScript: IEventScript ): boolean => {
    let eventScriptIsStillActive;
    switch ( eventScript.eventType ) {
        case EventType.cutscene:
            eventScriptIsStillActive = handleActiveCutsceneEventScript( eventScript as CutsceneEventScript );
            break;
        case EventType.enter_map:
            break;
        case EventType.leave_map:
            break;
        case EventType.prompt:
            break;
    }
    return eventScriptIsStillActive;
}