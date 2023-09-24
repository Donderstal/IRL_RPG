import type { TriggerType } from "../enumerables/TriggerType";
import type { IEventChain } from "../models/eventChains/IEventChain";

let eventChainQueue: IEventChain[] = [];

export const clearEventChainQueue = (): void => {
    eventChainQueue = [];
}
export const addToEventChainQueue = ( triggeredEvent: IEventChain, triggerType: TriggerType ): void => {
    const eventToAdd = getEventChainWithTriggerType( triggeredEvent, triggerType );
    console.log( 'adding eventChain to queue...' )
    console.log( eventToAdd );
    eventChainQueue.push( eventToAdd );
}
export const getEventChainQueue = (): IEventChain[] => {
    return eventChainQueue;
}
const getEventChainWithTriggerType = ( triggeredEvent: IEventChain, triggerType: TriggerType ): IEventChain => {
    return {
        ...triggeredEvent,
        triggerType: triggerType
    }
}