import type { CreateSpriteContract } from "../contracts/CreateSpriteContract";
import type { DeleteSpriteContract } from "../contracts/DeleteSpriteContract";
import type { MoveSpriteContract } from "../contracts/MoveSpriteContract";
import type { SetSpriteAnimationContract } from "../contracts/SetSpriteAnimationContract";
import { markContractAsResolved, markContractAsFailed, unmarkContractAsPending, markContractAsAcknowledged } from "../contracts/contractRegistry";
import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { deleteSpriteAndSpriteModules, setSpriteAndSpriteModules, setSpriteDestination, setSpriteAnimation } from "../game/modules/moduleSetter";

export const acknowledgeCreateSpriteContract = ( contract: CreateSpriteContract ): void => {
    try {
        setSpriteAndSpriteModules( contract.canvasObjectModel, CanvasTypeEnum.backSprites, contract.canvasObjectModel.id );
        markContractAsResolved( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete createSpriteContract with id ${contract.contractId}. Sprite ${contract.canvasObjectModel.spriteDataModel.key}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};
export const acknowledgeDeleteSpriteContract = ( contract: DeleteSpriteContract ): void => {
    try {
        deleteSpriteAndSpriteModules( contract.spriteId );
        markContractAsResolved( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete DeleteSpriteContract with id ${contract.contractId}. Sprite ${contract.spriteId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};
export const acknowledgeMoveSpriteContract = ( contract: MoveSpriteContract ): void => {
    try {
        setSpriteDestination( contract.spriteId, contract.destination, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete MoveSpriteContract with id ${contract.contractId}. Sprite ${contract.spriteId}, destination ${contract.destination}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};
export const acknowledgeSetSpriteAnimationContract = ( contract: SetSpriteAnimationContract ): void => {
    try {
        setSpriteAnimation( contract.spriteId, contract.animationName, contract.loop, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete SetSpriteAnimationContract with id ${contract.contractId}. Sprite ${contract.spriteId}, animation ${contract.animationName}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
};