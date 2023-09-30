import { registerNewContract } from "../contracts/contractRegistry";
import { getLeaveMapContract } from "../factories/contractFactory";
import type { LeaveMapEventScript } from "../models/eventScripts/LeaveMapEventScript";
import { getClearingMapGameState, getPausedGameState, setClearingMapGameState, setPausedGameState } from "../state/state";

export const handleActiveLeaveMapEventScript = ( eventScript: LeaveMapEventScript ): boolean => {
    if ( getClearingMapGameState() == false ) {
        const contract = getLeaveMapContract( eventScript.doorId );
        registerNewContract( contract );
        setClearingMapGameState( true );
        return true;
    }

    setClearingMapGameState( false );
    setPausedGameState( true );
    return false;
}