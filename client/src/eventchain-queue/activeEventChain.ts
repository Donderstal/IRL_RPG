import { DoorInteractionType } from "../enumerables/DoorInteractionType";
import { EventChainType } from "../enumerables/EventChainType";
import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import { getTriggersByTriggerType } from "../event-triggers/triggerRegistry";
import { handleActiveEventScript } from "../event-scripts/eventScriptHandler";
import { createEnterMapEventScript, createLeaveMapEventScript } from "../factories/eventFactory";
import type { DoorEventChain } from "../models/eventChains/DoorEventChain";
import type { IEventChain } from "../models/eventChains/IEventChain";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import type { IEventScript } from "../models/eventScripts/IEventScript";
import { setEventChainGameState } from "../state/state";
import { updateGameControlState } from "../state/stateSetter";
import { State } from "../enumerables/StateEnum";
import { CUTSCENE_EVENT_CHAINS } from "../resources/eventChainResources/cutsceneEventChains";
import { inDebugState } from "../state/stateGetter";

let activeEventChain: IEventChain = null;
let mainEventScript: IEventScript = null;
let activeEventScript: IEventScript = null;
let previousEventTypesInChain: EventType[] = [];

export const startEventChain = ( eventChain: IEventChain, mainEvent: IEventScript ): void => {
    if ( inDebugState() ) {
        console.log( `Activating eventchain ${eventChain.eventChainType}` );
        console.log( `Main eventscript: ${mainEvent.eventType}` );
    }

    setEventChainGameState( true );
    activeEventChain = eventChain;
    mainEventScript = mainEvent;

    const firstEvent = determineFirstEventScript();
    if ( inDebugState() ) {
        console.log( `Determining first eventscript in chain ${activeEventChain.eventChainType}` );
        console.log( `First eventscript: ${firstEvent.eventType}` );
    }

    setActiveEventScript( firstEvent );
    updateGameControlState( State.cinematic );
}
export const handleActiveEventChain = (): void => {
    const eventScriptIsStillActive = handleActiveEventScript( activeEventScript )
    if ( eventScriptIsStillActive ) return;

    previousEventTypesInChain.push( activeEventScript.eventType );

    const nextEvent = determineNextEventScript();
    if ( inDebugState() ) {
        console.log( `Determining next eventscript in chain ${activeEventChain.eventChainType}` )
        console.log( `Next eventscript: ${nextEvent?.eventType}` )
    }

    if ( nextEvent !== null ) {
        setActiveEventScript( nextEvent );
    }
    else {
        clearEventChain()
    }
}
const clearEventChain = (): void => {
    if ( inDebugState() ) {
        console.log( `Ending eventchain ${activeEventChain.eventChainType}` );
    }

    unsetActiveEventScript();
    previousEventTypesInChain = [];
    mainEventScript = null;
    activeEventChain = null;
    setEventChainGameState( false );
    updateGameControlState( State.open_world );
}
const setActiveEventScript = ( script: IEventScript ): void => {
    activeEventScript = script;
}
const unsetActiveEventScript = ( ): void => {
    activeEventScript = null;
}
const determineNextEventScript = ( currentEvent: IEventScript = activeEventScript ): IEventScript => {
    const currentEventType = currentEvent.eventType;
    const eventChainType = activeEventChain.eventChainType
    let nextEvent: IEventScript = null;

    switch ( currentEventType ) {
        case EventType.cutscene:
            nextEvent = getNextEventAfterCutscene( currentEvent as CutsceneEventScript, eventChainType );
            break;
        case EventType.enter_map:
            nextEvent = getNextEventAfterEnterMap();
            break;
        case EventType.leave_map:
            nextEvent = getNextEventAfterLeaveMap();
            break;
        case EventType.prompt:
            nextEvent = getNextEventAfterPrompt();
            break;
    }

    if ( nextEvent?.eventType === EventType.leave_map && !eventTypeWasPreviousInChain( EventType.cutscene ) ) {
        nextEvent = getNextEventBeforeLeaveMap();
    }

    if ( nextEvent === null && activeEventScript === null ) return currentEvent;

    return nextEvent;
};
const determineFirstEventScript = ( ): IEventScript => {
    let startingEventScript: IEventScript = null;

    if ( mainEventScript?.eventType === EventType.leave_map ) {
        startingEventScript = getNextEventBeforeLeaveMap();
    }

    if ( startingEventScript === null ) return mainEventScript;

    return startingEventScript;
};
const getNextEventAfterCutscene = ( currentEvent: CutsceneEventScript, eventChainType: EventChainType ): IEventScript => {
    if ( eventChainType === EventChainType.cutscene ) {
        return null;
    }
    if ( eventChainType === EventChainType.door ) {
        const doorEvent = activeEventChain as DoorEventChain;

        if ( doorEvent.doorInteractionType === DoorInteractionType.locked ) return null;
        if ( eventTypeWasPreviousInChain( EventType.enter_map ) ) return null;

        if ( !eventTypeWasPreviousInChain( EventType.leave_map ) ) {
            return createLeaveMapEventScript( doorEvent.initialMap, doorEvent.doorId );
        }
    }
    if ( eventChainType === EventChainType.elevator ) {
        // IF NOT TRIGGER PROMPT
        // trigger Prompt
        // ELSE 
        // trigger Leave_Map
    }
    if ( eventChainType === EventChainType.savepoint ) {
        // trigger prompt
    }
}
const getNextEventAfterLeaveMap = ( ): IEventScript => {
    const doorChain = activeEventChain as DoorEventChain;
    return createEnterMapEventScript( doorChain.initialMap === doorChain.mapA ? doorChain.mapB : doorChain.mapA, doorChain.doorId );
}
const getNextEventAfterPrompt = ( ): IEventScript => {
    // HANDLE PROMPT ANSWER
    return null;
}
const getNextEventBeforeLeaveMap = (): IEventScript => {
    const leaveMapTrigger = getTriggersByTriggerType( TriggerType.map_leave )[0];
    if ( leaveMapTrigger != undefined && leaveMapTrigger != undefined ) {
        const eventChain = CUTSCENE_EVENT_CHAINS[leaveMapTrigger.model.eventId];
        return { ...eventChain.triggerableCutscenes[0].event };
    }
    return null;
};
const getNextEventAfterEnterMap = (): IEventScript => {
    const enterMapTrigger = getTriggersByTriggerType( TriggerType.map_enter )[0];
    if ( enterMapTrigger != undefined && enterMapTrigger != undefined ) {
        const eventChain = CUTSCENE_EVENT_CHAINS[enterMapTrigger.model.eventId];
        return { ...eventChain.triggerableCutscenes[0].event };
    }
    return null;
};
const eventTypeWasPreviousInChain = ( eventType: EventType ): boolean => {
    return previousEventTypesInChain.indexOf( eventType ) > -1;
}