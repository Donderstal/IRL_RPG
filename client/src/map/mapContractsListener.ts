import type { EnterMapContract } from "../contracts/EnterMapContract";
import type { LeaveMapContract } from "../contracts/LeaveMapContract";
import type { SwitchCutsceneMapContract } from "../contracts/SwitchCutsceneMapContract";
import { deregisterContractOnCompletion, markContractAsFailed } from "../contracts/contractRegistry";
import { loadMap } from "./mapLoader";

export const acknowledgeEnterMapContract = ( contract: EnterMapContract ): void => {
    try {
        loadMap( contract );
        deregisterContractOnCompletion( contract.contractId );
    }
    catch ( exception ) {
        contract.attempts++
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete EnterMapContract with id ${contract.contractId}. Map ${contract.mapId}, door ${contract.doorId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeLeaveMapContract = ( contract: LeaveMapContract ): void => {

}
export const acknowledgeSwitchCutsceneMapContract = ( contract: SwitchCutsceneMapContract ): void => {

}