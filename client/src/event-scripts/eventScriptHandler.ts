import { EventType } from "../enumerables/EventType";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import type { EnterMapEventScript } from "../models/eventScripts/EnterMapEventScript";
import type { IEventScript } from "../models/eventScripts/IEventScript";
import type { LeaveMapEventScript } from "../models/eventScripts/LeaveMapEventScript";
import { handleActiveCutsceneEventScript } from "./handleCutscene";
import { handleActiveEnterMapEventScript } from "./handleEnterMap";
import { handleActiveLeaveMapEventScript } from "./handleLeaveMap";

export const handleActiveEventScript = ( eventScript: IEventScript ): boolean => {
    let eventScriptIsStillActive;
    switch ( eventScript.eventType ) {
        case EventType.cutscene:
            eventScriptIsStillActive = handleActiveCutsceneEventScript( eventScript as CutsceneEventScript );
            break;
        case EventType.enter_map:
            eventScriptIsStillActive = handleActiveEnterMapEventScript( eventScript as EnterMapEventScript );
            break;
        case EventType.leave_map:
            eventScriptIsStillActive = handleActiveLeaveMapEventScript( eventScript as LeaveMapEventScript );
            break;
        case EventType.prompt:
            break;
    }
    return eventScriptIsStillActive;
}