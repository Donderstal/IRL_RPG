import type { FadeContract } from "../contracts/FadeContract";
import type { FocusCameraOnSpriteContract } from "../contracts/FocusCameraOnSpriteContract";
import type { FocusCameraOnTileContract } from "../contracts/FocusCameraOnTileContract";
import { deregisterContractOnCompletion, markContractAsFailed, removeFromPendingContractIds } from "../contracts/contractRegistry";
import { cameraFocus } from "../game/cameraFocus";
import { drawTilesToCanvasGrids } from "../game/canvas/canvasSetter";
import { getSpriteById } from "../game/modules/sprites/spriteGetter";

export const acknowledgeFadeContract = ( contract: FadeContract ): void => {

}
export const acknowledgeFocusCameraOnSpriteContract = ( contract: FocusCameraOnSpriteContract ): void => {
    try {
        const sprite = getSpriteById( contract.spriteId );
        cameraFocus.setSpriteFocus( sprite, contract.snap );
        deregisterContractOnCompletion( contract.contractId );
        drawTilesToCanvasGrids();
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        removeFromPendingContractIds( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete createSpriteContract with id ${contract.contractId}. Sprite ${contract.spriteId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeFocusCameraOnTileContract = ( contract: FocusCameraOnTileContract ): void => {

}