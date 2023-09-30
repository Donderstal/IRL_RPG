import { DoorInteractionType } from "../enumerables/DoorInteractionType";
import { EventChainType } from "../enumerables/EventChainType";
import { TriggerType } from "../enumerables/TriggerType";
import { createCutsceneEventScript, createEnterMapEventScript, createLeaveMapEventScript } from "../factories/eventFactory";
import { getActiveMapKey } from "../game/neighbourhoodModule";
import { conditionIsTrue } from "../helpers/conditionalHelper";
import type { CutsceneEventChain } from "../models/eventChains/CutsceneEventChain";
import type { DoorEventChain } from "../models/eventChains/DoorEventChain";
import type { IEventChain } from "../models/eventChains/IEventChain";
import type { LoadMapOnStartEventChain } from "../models/eventChains/LoadMapOnStartEventChain";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import type { EnterMapEventScript } from "../models/eventScripts/EnterMapEventScript";
import type { IEventScript } from "../models/eventScripts/IEventScript";
import { addDoorToUnlockedDoorsRegistry, inUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { isInInteractionRegistry } from "../registries/interactionRegistry";
import { CUTSCENE_SCRIPTS } from "../resources/cutsceneScripts";
import { startEventChain } from "./activeEventChain";
import { clearEventChainQueue, getEventChainQueue } from "./eventChainQueue";

let pendingEventChain = null

export const handleEventChainQueue = ( triggerType: TriggerType = null ): void => {
    let triggerableEvent = null;
    let queueItemIndex = 0;

    const queue = sortEventChainQueue( triggerType );

    if ( queue.length < 1 ) return;

    while ( triggerableEvent === null && queueItemIndex < queue.length ) {
        pendingEventChain = queue[queueItemIndex];
        triggerableEvent = getTriggerableEvent( pendingEventChain );
        queueItemIndex++
    }

    if ( triggerableEvent !== null ) {
        startEventChain( pendingEventChain, triggerableEvent )
    }

    clearEventChainQueue();
    pendingEventChain = null;
}
const sortEventChainQueue = ( triggerType: TriggerType ): IEventChain[] => {
    const queue = getEventChainQueue();
    if ( triggerType !== null ) {
        return queue.filter( e => e.triggerType == triggerType )
    }
    return [
        ...queue.filter( e => e.triggerType == TriggerType.interaction ),
        ...queue.filter( e => e.triggerType == TriggerType.collision )
    ];
}
const getTriggerableEvent = ( eventChain: IEventChain ): IEventScript => {
    switch ( eventChain.eventChainType ) {
        case EventChainType.cutscene:
            return getCutsceneEventScript( eventChain as CutsceneEventChain );
        case EventChainType.door:
            return getDoorEventScript( eventChain as DoorEventChain );
        case EventChainType.elevator:
            break;
        case EventChainType.loadMapOnStart:
            return getLoadMapOnStartEventScript( eventChain as LoadMapOnStartEventChain );
        case EventChainType.savepoint:
            break;
    }

    return null;
}
const getLoadMapOnStartEventScript = ( eventChain: LoadMapOnStartEventChain ): EnterMapEventScript => {
    return createEnterMapEventScript( eventChain.startingMap, null, eventChain.playerStart );
}
const getDoorEventScript = ( eventChain: DoorEventChain ): IEventScript => {
    const activeMapName = getActiveMapKey();   
    console.log( `Active map is ${activeMapName}` )

    if ( eventChain.lockedBy !== null ) {
        const doorIsUnlocked = isInInteractionRegistry( eventChain.lockedBy );
        if ( !doorIsUnlocked ) {
            pendingEventChain = augmentDoorEventChain( eventChain, DoorInteractionType.locked, activeMapName )
            return createCutsceneEventScript( CUTSCENE_SCRIPTS.LOCKED_DOOR );
        }

        if ( !inUnlockedDoorsRegistry( eventChain.doorId ) ) {
            pendingEventChain = augmentDoorEventChain( eventChain, DoorInteractionType.unlock, activeMapName )
            addDoorToUnlockedDoorsRegistry( eventChain.doorId )
            return createCutsceneEventScript( CUTSCENE_SCRIPTS.UNLOCK_DOOR );
        }
    }

    pendingEventChain = augmentDoorEventChain( eventChain, DoorInteractionType.unlocked, activeMapName )
    return createLeaveMapEventScript( eventChain.mapA === activeMapName ? eventChain.mapB : eventChain.mapA, eventChain.doorId );
}
const getCutsceneEventScript = ( eventChain: CutsceneEventChain ): CutsceneEventScript => {
    let eventIndex = 0;

    while ( eventIndex < eventChain.triggerableCutscenes.length ) {
        const eventWithCondition = eventChain.triggerableCutscenes[eventIndex];
        if ( conditionIsTrue( eventWithCondition.condition.type, eventWithCondition.condition.value ) ) {
            return eventWithCondition.event as CutsceneEventScript;
        }
        eventIndex++
    }
    return null;
}
const augmentDoorEventChain = ( eventChain: DoorEventChain, interactionType: DoorInteractionType, initialMap: string): DoorEventChain => {
    return {
        ...eventChain,
        doorInteractionType: interactionType,
        initialMap: initialMap
    };
}