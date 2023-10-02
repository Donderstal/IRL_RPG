import { getUniqueId, isInArray } from "../helpers/utilFunctions";
import type { IContract } from "./IContract";

let allGeneratedContractIds: string[] = [];
let pendingContracts: IContract[] = [];
let failedContractIds: string[] = [];
let pendingPublishedContractIds: string[] = [];
let resolvedContracts: string[] = [];

export const getPendingContracts = (): IContract[] => {
    return pendingContracts
};
export const markContractAsPending = ( id: string ): void => {
    pendingPublishedContractIds.push( id );
};
export const unmarkContractAsPending = ( id: string ): void => {
    pendingPublishedContractIds = pendingPublishedContractIds.filter( e => e !== id );
}
export const getNewContractId = (): string => {
    return getUniqueId( allGeneratedContractIds );
};
export const registerNewContract = ( contract: IContract ): void => {
    allGeneratedContractIds.push( contract.contractId );
    pendingContracts.push( contract );
};
export const markContractAsAcknowledged = ( id: string ): void => {
    pendingPublishedContractIds = pendingPublishedContractIds.filter( e => e !== id );
    pendingContracts = pendingContracts.filter( e => e.contractId !== id );
};
export const contractIsPublishedAndPending = ( id: string ): boolean => {
    return isInArray( pendingPublishedContractIds, id );
};

export const markContractAsFailed = ( contractId: string ): void => {
    failedContractIds.push( contractId );
    markContractAsAcknowledged( contractId );
};

export const markContractAsResolved = ( contractId: string ): void => {
    markContractAsAcknowledged( contractId );
    resolvedContracts.push( contractId );
}
export const checkIfContractHasResolved = ( contractId: string ): boolean => {
    return isInArray( resolvedContracts, contractId );
}

export const clearContractsRegistry = (): void => {
    allGeneratedContractIds = [];
    pendingContracts = [];
    failedContractIds = [];
    pendingPublishedContractIds = [];
    resolvedContracts = [];
}