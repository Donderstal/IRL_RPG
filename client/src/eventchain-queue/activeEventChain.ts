import { DoorInteractionType } from "../enumerables/DoorInteractionType";
import { EventChainType } from "../enumerables/EventChainType";
import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import { getTriggersByTriggerType } from "../event-triggers/triggerRegistry";
import { handleActiveEventScript } from "../events/eventHandler";
import { createCutsceneEventScript, createEnterMapEventScript, createLeaveMapEventScript } from "../factories/eventFactory";
import type { DoorEventChain } from "../models/eventChains/DoorEventChain";
import type { IEventChain } from "../models/eventChains/IEventChain";
import type { CutsceneEventDto } from "../models/events/CutsceneEventDto";
import type { IEventDto } from "../models/events/IEventDto";
import { CUTSCENE_SCRIPTS } from "../resources/cutsceneScripts";
import { setEventChainGameState } from "../state/state";

let activeEventChain: IEventChain = null;
let mainEventScript: IEventDto = null;
let activeEventScript: IEventDto = null;
let previousEventTypesInChain: EventType[] = [];

export const startEventChain = ( eventChain: IEventChain, mainEvent: IEventDto ): void => {
    console.log( `Activating eventchain ${eventChain.eventChainType}` );
    console.log( `Main eventscript: ${mainEvent.eventType}` );
    setEventChainGameState( true );
    activeEventChain = eventChain;
    mainEventScript = mainEvent;

    const firstEvent = determineFirstEventScript();
    console.log( `Determining first eventscript in chain ${activeEventChain.eventChainType}` );
    console.log( `First eventscript: ${firstEvent.eventType}` );
    setActiveEventScript( firstEvent );
}
export const handleActiveEventChain = (): void => {
    const eventScriptIsStillActive = handleActiveEventScript( activeEventScript )
    if ( eventScriptIsStillActive ) return;

    previousEventTypesInChain.push( activeEventScript.eventType );

    const nextEvent = determineNextEventScript();
    console.log( `Determining next eventscript in chain ${activeEventChain.eventChainType}` )
    console.log( `Next eventscript: ${nextEvent?.eventType}` )
    if ( nextEvent !== null ) {
        setActiveEventScript( nextEvent );
    }
    else {
        clearEventChain()
    }
}
const clearEventChain = (): void => {
    console.log( `Ending eventchain ${activeEventChain.eventChainType}` );
    unsetActiveEventScript();
    previousEventTypesInChain = [];
    mainEventScript = null;
    activeEventChain = null;
    setEventChainGameState( false );
}
const setActiveEventScript = ( script: IEventDto ): void => {
    activeEventScript = script;
}
const unsetActiveEventScript = ( ): void => {
    activeEventScript = null;
}
const determineNextEventScript = ( currentEvent: IEventDto = activeEventScript ): IEventDto => {
    const currentEventType = currentEvent.eventType;
    const eventChainType = activeEventChain.eventChainType
    let nextEvent: IEventDto = null;

    switch ( currentEventType ) {
        case EventType.cutscene:
            nextEvent = getNextEventAfterCutscene( currentEvent as CutsceneEventDto, eventChainType );
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
const determineFirstEventScript = ( ): IEventDto => {
    let startingEventScript: IEventDto = null;

    if ( mainEventScript?.eventType === EventType.leave_map ) {
        startingEventScript = getNextEventBeforeLeaveMap();
    }

    if ( startingEventScript === null ) return mainEventScript;

    return startingEventScript;
};
const getNextEventAfterCutscene = ( currentEvent: CutsceneEventDto, eventChainType: EventChainType ): IEventDto => {
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
const getNextEventAfterLeaveMap = ( ): IEventDto => {
    const doorChain = activeEventChain as DoorEventChain;
    return createEnterMapEventScript( doorChain.initialMap === doorChain.mapA ? doorChain.mapB : doorChain.mapA, doorChain.doorId );
}
const getNextEventAfterPrompt = ( ): IEventDto => {
    // HANDLE PROMPT ANSWER
    return null;
}
const getNextEventBeforeLeaveMap = (): IEventDto => {
    const leaveMapTrigger = getTriggersByTriggerType( TriggerType.map_leave )[0];
    if ( leaveMapTrigger != undefined && leaveMapTrigger != undefined ) {
        const cinematicScript = CUTSCENE_SCRIPTS[leaveMapTrigger.model.eventId];
        return createCutsceneEventScript( cinematicScript );
    }
    return null;
};
const getNextEventAfterEnterMap = (): IEventDto => {
    const enterMapTrigger = getTriggersByTriggerType( TriggerType.map_enter )[0];
    if ( enterMapTrigger != undefined && enterMapTrigger != undefined ) {
        const cinematicScript = CUTSCENE_SCRIPTS[enterMapTrigger.model.eventId];
        return createCutsceneEventScript( cinematicScript );
    }
    return null;
};
const eventTypeWasPreviousInChain = ( eventType: EventType ): boolean => {
    return previousEventTypesInChain.indexOf( eventType ) > -1;
}