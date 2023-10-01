import type { CreateSpriteContract } from "../contracts/CreateSpriteContract";
import type { DeleteSpriteContract } from "../contracts/DeleteSpriteContract";
import type { EnterMapContract } from "../contracts/EnterMapContract";
import type { FadeContract } from "../contracts/FadeContract";
import type { FocusCameraOnSpriteContract } from "../contracts/FocusCameraOnSpriteContract";
import type { FocusCameraOnTileContract } from "../contracts/FocusCameraOnTileContract";
import type { IContract } from "../contracts/IContract";
import type { LeaveMapContract } from "../contracts/LeaveMapContract";
import type { MoveSpriteContract } from "../contracts/MoveSpriteContract";
import type { SetSpriteAnimationContract } from "../contracts/SetSpriteAnimationContract";
import type { SetTriggerContract } from "../contracts/SetTriggerContract";
import type { ShowEmoteContract } from "../contracts/ShowEmoteContract";
import type { ShowScreenTextContract } from "../contracts/ShowScreenTextContract";
import type { ShowSpeechBubbleContract } from "../contracts/ShowSpeechBubbleContract";
import type { SwitchCutsceneMapContract } from "../contracts/SwitchCutsceneMapContract";
import { getNewContractId } from "../contracts/contractRegistry";
import { ContractType } from "../enumerables/ContractType";
import { MAX_BUBBLE_TEXT_WIDTH } from "../game-data/globals";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { GridCellModel } from "../models/GridCellModel";
import type { TriggerModel } from "../models/TriggerModel";

export const getCreateSpriteContract = ( canvasObjectModel: CanvasObjectModel ): CreateSpriteContract => {
    return {
        ...getContractBase( ContractType.CreateSprite ),
        canvasObjectModel: canvasObjectModel
    };
};
export const getDeleteSpriteContract = ( spriteId: string ): DeleteSpriteContract => {
    return {
        ...getContractBase( ContractType.DeleteSprite ),
        spriteId: spriteId
    };
};
export const getEnterMapContract = ( doorId: string, mapId: string, playerStart: GridCellModel = null ): EnterMapContract => {
    return {
        ...getContractBase( ContractType.EnterMap ),
        doorId: doorId,
        mapId: mapId,
        playerStart: playerStart
    };
};
export const getFadeContract = ( opacity: number, fadeBack: boolean = false ): FadeContract => {
    return {
        ...getContractBase( ContractType.Fade ),
        targetOpacity: opacity,
        fadeBack: fadeBack
    };
};
export const getFocusCameraOnSpriteContract = ( spriteId: string, snap: boolean ): FocusCameraOnSpriteContract => {
    return {
        ...getContractBase( ContractType.FocusCameraOnSprite ),
        spriteId: spriteId,
        snap: snap
    };
};
export const getFocusCameraOnTileContract = ( cell: GridCellModel, snap: boolean ): FocusCameraOnTileContract => {
    return {
        ...getContractBase( ContractType.FocusCamerOnTile ),
        tile: cell,
        snap: snap
    };
};
export const getLeaveMapContract = ( doorId: string ): LeaveMapContract => {
    return {
        ...getContractBase( ContractType.LeaveMap ),
        doorId: doorId
    };
};
export const getMoveSpriteContract = ( spriteId: string, cell: GridCellModel ): MoveSpriteContract => {
    return {
        ...getContractBase( ContractType.MoveSprite ),
        spriteId: spriteId,
        destination: cell
    };
};
export const getSetSpriteAnimationContract = ( spriteId: string, animationName: string, loop: boolean = false ): SetSpriteAnimationContract => {
    return {
        ...getContractBase( ContractType.SetSpriteAnimation ),
        spriteId: spriteId,
        animationName: animationName,
        loop: loop
    };
};
export const getSetTriggerContract = ( triggerModel: TriggerModel ): SetTriggerContract => {
    return {
        ...getContractBase( ContractType.SetTrigger ),
        triggerModel: triggerModel
    };
};
export const getShowEmoteContract = ( spriteId: string, emoteName: string ): ShowEmoteContract => {
    return {
        ...getContractBase( ContractType.ShowEmote ),
        spriteId: spriteId,
        emote: emoteName
    };
};
export const getShowScreenTextContract = ( text: string, isTitle: boolean, maxWidth: number = MAX_BUBBLE_TEXT_WIDTH ): ShowScreenTextContract => {
    return {
        ...getContractBase( ContractType.ShowEmote ),
        text: text,
        isTitle: isTitle,
        maxWidth: maxWidth
    };
};
export const getShowSpeechBubbleContract = ( speakingSpriteId: string, text: string, speakingToSpriteId: string = null, sfx: string = null ): ShowSpeechBubbleContract => {
    return {
        ...getContractBase( ContractType.ShowEmote ),
        speakingSpriteId: speakingSpriteId,
        text: text,
        speakingToSpriteId: speakingToSpriteId,
        sfx: sfx
    };
};
export const getSwitchCutsceneMapContract = ( mapId: string, focusTile: GridCellModel, setPlayerSprite: boolean = false, playerStart: GridCellModel = null ): SwitchCutsceneMapContract => {
    return {
        ...getContractBase( ContractType.SwitchCutsceneMap ),
        mapId: mapId,
        focusTile: focusTile,
        setPlayerSprite: setPlayerSprite,
        playerStart: playerStart
    };
};
const getContractBase = ( type: ContractType ): IContract => {
    return {
        contractId: getNewContractId(),
        contractType: type,
        attempts: 0
    }
}