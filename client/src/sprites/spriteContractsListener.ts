import type { CreateSpriteContract } from "../contracts/CreateSpriteContract";
import type { DeleteSpriteContract } from "../contracts/DeleteSpriteContract";
import type { MoveSpriteContract } from "../contracts/MoveSpriteContract";
import type { SetSpriteAnimationContract } from "../contracts/SetSpriteAnimationContract";
import { deregisterContractOnCompletion, markContractAsFailed, removeFromPendingContractIds } from "../contracts/contractRegistry";
import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { setSpriteAndSpriteModules } from "../game/modules/moduleSetter";

export const acknowledgeCreateSpriteContract = ( contract: CreateSpriteContract ): void => {
    try {
        setSpriteAndSpriteModules( contract.canvasObjectModel, CanvasTypeEnum.backSprites, contract.canvasObjectModel.id );
        deregisterContractOnCompletion( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        removeFromPendingContractIds( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete createSpriteContract with id ${contract.contractId}. Sprite ${contract.canvasObjectModel.spriteDataModel.key}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeDeleteSpriteContract = ( contract: DeleteSpriteContract ): void => {

}
export const acknowledgeMoveSpriteContract = ( contract: MoveSpriteContract ): void => {

}
export const acknowledgeSetSpriteAnimationContract = ( contract: SetSpriteAnimationContract ): void => {

}