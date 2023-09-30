import { acknowledgeFadeContract, acknowledgeFocusCameraOnSpriteContract, acknowledgeFocusCameraOnTileContract } from "../camera/cameraContractsListener";
import { ContractType } from "../enumerables/ContractType";
import { acknowledgeSetTriggerContract } from "../event-triggers/triggerContractsListener";
import { acknowledgeEnterMapContract, acknowledgeLeaveMapContract, acknowledgeSwitchCutsceneMapContract } from "../map/mapContractsListener";
import { acknowledgeCreateSpriteContract, acknowledgeDeleteSpriteContract, acknowledgeMoveSpriteContract, acknowledgeSetSpriteAnimationContract } from "../sprites/spriteContractsListener";
import { acknowledgeShowEmoteContract, acknowledgeShowScreenTextContract, acknowledgeShowSpeechBubbleContract } from "../text/textContractsListener";
import type { CreateSpriteContract } from "./CreateSpriteContract";
import type { DeleteSpriteContract } from "./DeleteSpriteContract";
import type { EnterMapContract } from "./EnterMapContract";
import type { FadeContract } from "./FadeContract";
import type { FocusCameraOnSpriteContract } from "./FocusCameraOnSpriteContract";
import type { FocusCameraOnTileContract } from "./FocusCameraOnTileContract";
import type { IContract } from "./IContract";
import type { LeaveMapContract } from "./LeaveMapContract";
import type { MoveSpriteContract } from "./MoveSpriteContract";
import type { SetSpriteAnimationContract } from "./SetSpriteAnimationContract";
import type { SetTriggerContract } from "./SetTriggerContract";
import type { ShowEmoteContract } from "./ShowEmoteContract";
import type { ShowScreenTextContract } from "./ShowScreenTextContract";
import type { ShowSpeechBubbleContract } from "./ShowSpeechBubbleContract";
import type { SwitchCutsceneMapContract } from "./SwitchCutsceneMapContract";
import { addToPendingContractIds, contractIsPublishedAndPending, getPendingContracts } from "./contractRegistry";

export const publishNewContracts = (): void => {
    const contracts = getPendingContracts().filter( ( e ) => {
        return !contractIsPublishedAndPending( e.contractId );
    } )
    contracts.forEach( publishContract );
}
const publishContract = ( contract: IContract ): void => {
    addToPendingContractIds( contract.contractId );
    switch ( contract.contractType ) {
        case ContractType.CreateSprite:
            acknowledgeCreateSpriteContract( contract as CreateSpriteContract );
            break;
        case ContractType.EnterMap:
            acknowledgeEnterMapContract( contract as EnterMapContract );
            break;
        case ContractType.DeleteSprite:
            acknowledgeDeleteSpriteContract( contract as DeleteSpriteContract );
            break;
        case ContractType.Fade:
            acknowledgeFadeContract( contract as FadeContract );
            break;
        case ContractType.FocusCameraOnSprite:
            acknowledgeFocusCameraOnSpriteContract( contract as FocusCameraOnSpriteContract );
            break;
        case ContractType.FocusCamerOnTile:
            acknowledgeFocusCameraOnTileContract( contract as FocusCameraOnTileContract );
            break;
        case ContractType.MoveSprite:
            acknowledgeMoveSpriteContract( contract as MoveSpriteContract );
            break;
        case ContractType.LeaveMap:
            acknowledgeLeaveMapContract( contract as LeaveMapContract );
            break;
        case ContractType.SetSpriteAnimation:
            acknowledgeSetSpriteAnimationContract( contract as SetSpriteAnimationContract );
            break;
        case ContractType.SetTrigger:
            acknowledgeSetTriggerContract( contract as SetTriggerContract );
            break;
        case ContractType.ShowEmote:
            acknowledgeShowEmoteContract( contract as ShowEmoteContract );
            break;
        case ContractType.ShowScreenText:
            acknowledgeShowScreenTextContract( contract as ShowScreenTextContract );
            break;
        case ContractType.ShowSpeechBubble:
            acknowledgeShowSpeechBubbleContract( contract as ShowSpeechBubbleContract );
            break;
        case ContractType.SwitchCutsceneMap:
            acknowledgeSwitchCutsceneMapContract( contract as SwitchCutsceneMapContract );
            break;
    }
}