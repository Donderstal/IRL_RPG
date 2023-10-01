import { getUniqueId, isInArray } from "../helpers/utilFunctions";
import type { IContract } from "./IContract";

let pendingContracts: IContract[] = [];
let failedContractIds: string[] = [];
let pendingPublishedContractIds: string[] = [];

export const getPendingContracts = (): IContract[] => {
    return pendingContracts
};
export const addToPendingContractIds = ( id: string ): void => {
    pendingPublishedContractIds.push( id );
};
export const removeFromPendingContractIds = ( id: string ): void => {
    pendingPublishedContractIds = pendingPublishedContractIds.filter( e => e !== id );
}
export const getNewContractId = (): string => {
    return getUniqueId( pendingPublishedContractIds );
};
export const registerNewContract = ( contract: IContract ): void => {
    pendingContracts.push( contract );
};
export const deregisterContractOnCompletion = ( id: string ): void => {
    pendingPublishedContractIds = pendingPublishedContractIds.filter( e => e !== id );
    pendingContracts = pendingContracts.filter( e => e.contractId !== id );
};
export const contractIsPublishedAndPending = ( id: string ): boolean => {
    return isInArray( pendingPublishedContractIds, id );
};
export const markContractAsFailed = ( contractId: string ): void => {
    failedContractIds.push( contractId );
    deregisterContractOnCompletion( contractId );
};