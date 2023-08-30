import { EventType } from "../enumerables/EventType";
import { TriggerType } from "../enumerables/TriggerType";
import { getUniqueId } from "../helpers/utilFunctions";
import type { Trigger } from "./Trigger";

let ids: string[] = [];
let triggers: Trigger[] = [];

const removeId = (id: string): void => {
    ids = [...ids.filter( e => e != id )]   
}
const removeTrigger = ( id: string ): void => {
    triggers = [...triggers.filter( e => e.id != id )];   
}
const addId = ( id: string ): void => {
    ids.push( id );
}
const addTrigger = ( trigger: Trigger ) => {
    triggers.push( trigger );
}
const idInRegistry = ( id: string ) => {
    return ids.indexOf( id ) > -1;
}
const triggerInRegistry = ( id: string ) => {
    return triggers.filter( e => e.id == id ).length > -1;
}

export const registerTrigger = ( trigger: Trigger ): string => {
    const id = getUniqueId( ids );
    trigger.setId( id );
    addTrigger( trigger );
    addId( id );
    return id;
}
export const deregisterTrigger = ( id: string ): void => {
    removeId( id );
    removeTrigger( id );
}
export const clearTriggerRegistry = (): void => {
    ids = [];
    triggers = [];
}
export const getAllTriggers = (): Trigger[] => {
    return triggers;
}
export const getTriggerById = ( id: string ) => {
    return triggers.filter( e => e.id == id )[0]
}
export const isRegisteredInTriggerRegistry = ( id: string ): boolean => {
    return ( idInRegistry( id ) && triggerInRegistry( id ) );
}
export const getTriggersByTriggerType = ( type: TriggerType ): Trigger[] => {
    return triggers.filter( ( e ) => {
        if ( type === e.model.triggeredBy ) return true;
        if ( e.model.triggeredBy !== null && e.model.triggeredBy !== undefined ) return false;

        switch ( e.model.eventType ) {
            case EventType.cutscene:
                return type === TriggerType.interaction;
            case EventType.door:
                return type === TriggerType.interaction || type === TriggerType.collision;
            case EventType.elevator:
                return type === TriggerType.interaction;
            case EventType.save_point:
                return type === TriggerType.interaction;
        }
    } );
}