import type { SetTriggerContract } from "../contracts/SetTriggerContract";
import { markContractAsAcknowledged, markContractAsFailed, unmarkContractAsPending } from "../contracts/contractRegistry";
import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { getTileOnCanvasByCell } from "../game/canvas/canvasGetter";
import { getSpriteById } from "../game/modules/sprites/spriteGetter";
import { isNullOrUndefined } from "../helpers/utilFunctions";
import type { TriggerModel } from "../models/TriggerModel";
import { setTrigger } from "./triggerSetter";

export const acknowledgeSetTriggerContract = ( contract: SetTriggerContract ): void => {
    try {
        setTriggerFromContract( contract.triggerModel )
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.error( `Failed to complete SetTriggerContract with id ${contract.contractId}.` );
            console.log( contract );
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
const setTriggerFromContract = ( trigger: TriggerModel ): void => {
    if ( !isNullOrUndefined( trigger.spriteId ) ) {
        setSpriteBasedTrigger( trigger );
    }
    else if ( !isNullOrUndefined( trigger.triggerType ) ) {
        setTrigger( trigger );
    }
    else {
        setTileBasedTrigger( trigger );
    }
}
const setSpriteBasedTrigger = ( trigger: TriggerModel ): void => {
    const sprite = getSpriteById( trigger.spriteId );
    if ( sprite == null ) {
        console.warn( `Error setting trigger ${trigger.eventId}. No sprite could be found with id ${sprite}` );
    }
    setTrigger( trigger, sprite );
}
const setTileBasedTrigger = ( trigger: TriggerModel ): void => {
    const tile = getTileOnCanvasByCell( { column: trigger.column, row: trigger.row }, CanvasTypeEnum.background )
    if ( tile == null ) {
        console.warn( `Error setting trigger ${trigger.eventId}. No tile could be found a column ${trigger.column}, row ${trigger.row}` );
    }
    setTrigger( trigger, tile );
}