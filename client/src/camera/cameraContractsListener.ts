import type { FadeContract } from "../contracts/FadeContract";
import type { FocusCameraOnSpriteContract } from "../contracts/FocusCameraOnSpriteContract";
import type { FocusCameraOnTileContract } from "../contracts/FocusCameraOnTileContract";
import { markContractAsAcknowledged, markContractAsFailed, unmarkContractAsPending } from "../contracts/contractRegistry";
import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { cameraFocus } from "../game/cameraFocus";
import { getTileOnCanvasByCell } from "../game/canvas/canvasGetter";
import { getSpriteById } from "../game/modules/sprites/spriteGetter";
import { startFadeFromBlack, startFadeToBlack } from "../helpers/faderModule";

export const acknowledgeFadeContract = ( contract: FadeContract ): void => {
    try {
        if ( contract.fadeIn ) {
            startFadeToBlack( contract.targetOpacity, contract.fadeBack, contract.contractId );
        }
        else {
            startFadeFromBlack( contract.targetOpacity, contract.contractId )
        }
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete FadeContract with id ${contract.contractId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};
export const acknowledgeFocusCameraOnSpriteContract = ( contract: FocusCameraOnSpriteContract ): void => {
    try {
        const sprite = getSpriteById( contract.spriteId );
        cameraFocus.setSpriteFocus( sprite, contract.snap, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete FocusCameraOnSpriteContract with id ${contract.contractId}. Sprite ${contract.spriteId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};
export const acknowledgeFocusCameraOnTileContract = ( contract: FocusCameraOnTileContract ): void => {
    try {
        const tile = getTileOnCanvasByCell( contract.tile, CanvasTypeEnum.background );
        cameraFocus.setTileFocus( tile, contract.snap, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete FocusCameraOnTileContract with id ${contract.contractId}. Tile ${contract.tile}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};