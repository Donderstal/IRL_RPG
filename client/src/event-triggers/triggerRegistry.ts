import type { TriggerType } from "../enumerables/TriggerType";
import { getUniqueId } from "../helpers/utilFunctions";
import type { Trigger } from "./Trigger";

let ids: string[]
let triggers: Trigger[];

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

export const registerTrigger = ( trigger: Trigger ) => {
    const id = getUniqueId( ids );
    trigger.setId( id );
    addTrigger( trigger );
    addId( id );
}
export const deregisterTrigger = ( id: string ): void => {
    removeId( id );
    removeTrigger( id );
}
export const clearTriggerRegistry = (): void => {
    ids = [];
    triggers = [];
}
export const getTriggerById = ( id: string ) => {
    return triggers.filter( e => e.id == id )[0]
}
export const isRegisteredInTriggerRegistry = ( id: string ): boolean => {
    return ( idInRegistry( id ) && triggerInRegistry( id ) );
}
export const getTriggersByTriggerType = ( type: TriggerType ): Trigger[] => {
    return triggers.filter( e => e.event.trigger == type );
}