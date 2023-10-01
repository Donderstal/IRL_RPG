import { registerNewContract } from "../contracts/contractRegistry";
import { StateType } from "../enumerables/StateType";
import { getEnterMapContract } from "../factories/contractFactory";
import type { EnterMapEventScript } from "../models/eventScripts/EnterMapEventScript";
import { alterGameState, getGameState } from "../state/state";

export const handleActiveEnterMapEventScript = ( eventScript: EnterMapEventScript ): boolean => {
    alterGameState( StateType.paused, false );
    if ( getGameState( StateType.loadingMap ) ) {
        return false;
    }
    const contract = getEnterMapContract( eventScript.doorId, eventScript.mapName, eventScript.playerStart );
    registerNewContract( contract );
    alterGameState( StateType.loadingMap, true );
}