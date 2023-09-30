import { registerNewContract } from "../contracts/contractRegistry";
import { getEnterMapContract } from "../factories/contractFactory";
import type { EnterMapEventScript } from "../models/eventScripts/EnterMapEventScript";
import { getLoadingMapGameState, setLoadingMapGameState, setPausedGameState } from "../state/state";

export const handleActiveEnterMapEventScript = ( eventScript: EnterMapEventScript ): boolean => {
    setPausedGameState( false );
    if ( getLoadingMapGameState() ) {
        return getLoadingMapGameState() == false;
    }
    const contract = getEnterMapContract( eventScript.doorId, eventScript.mapName, eventScript.playerStart );
    registerNewContract( contract );
    setLoadingMapGameState( true );
}