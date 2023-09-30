import type { EnterMapContract } from "../contracts/EnterMapContract";
import type { LeaveMapContract } from "../contracts/LeaveMapContract";
import type { SwitchCutsceneMapContract } from "../contracts/SwitchCutsceneMapContract";
import { deregisterContractOnCompletion, markContractAsFailed, removeFromPendingContractIds } from "../contracts/contractRegistry";
import { clearMap } from "./mapCloser";
import { loadMap } from "./mapLoader";

export const acknowledgeEnterMapContract = ( contract: EnterMapContract ): void => {
    try {
        loadMap( contract );
        deregisterContractOnCompletion( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to complete EnterMapContract with id ${contract.contractId}. Map ${contract.mapId}, door ${contract.doorId}.` );
        console.error( exception );
        console.log( contract )
        markContractAsFailed( contract.contractId );
    }
}
export const acknowledgeLeaveMapContract = ( contract: LeaveMapContract ): void => {
    try {
        clearMap( );
        deregisterContractOnCompletion( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++;
        removeFromPendingContractIds( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete EnterMapContract with id ${contract.contractId}. Door ${contract.doorId}.` );
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeSwitchCutsceneMapContract = ( contract: SwitchCutsceneMapContract ): void => {

}