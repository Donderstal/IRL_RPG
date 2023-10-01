import { registerNewContract } from "../contracts/contractRegistry";
import { StateType } from "../enumerables/StateType";
import { getLeaveMapContract } from "../factories/contractFactory";
import type { LeaveMapEventScript } from "../models/eventScripts/LeaveMapEventScript";
import { alterGameState, getGameState } from "../state/state";

export const handleActiveLeaveMapEventScript = ( eventScript: LeaveMapEventScript ): boolean => {
    if ( getGameState( StateType.clearingMap ) == false ) {
        const contract = getLeaveMapContract( eventScript.doorId );
        registerNewContract( contract );
        alterGameState( StateType.clearingMap, true );
        return true;
    }

    alterGameState( StateType.clearingMap, false );
    alterGameState( StateType.paused, true );
    return false;
}