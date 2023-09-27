import type { CreateSpriteContract } from "../contracts/CreateSpriteContract";
import type { DeleteSpriteContract } from "../contracts/DeleteSpriteContract";
import type { FadeContract } from "../contracts/FadeContract";
import type { FocusCameraOnSpriteContract } from "../contracts/FocusCameraOnSpriteContract";
import type { FocusCameraOnTileContract } from "../contracts/FocusCameraOnTileContract";
import type { IContract } from "../contracts/IContract";
import type { MoveSpriteContract } from "../contracts/MoveSpriteContract";
import type { SetSpriteAnimationContract } from "../contracts/SetSpriteAnimationContract";
import type { ShowEmoteContract } from "../contracts/ShowEmoteContract";
import type { ShowScreenTextContract } from "../contracts/ShowScreenTextContract";
import type { ShowSpeechBubbleContract } from "../contracts/ShowSpeechBubbleContract";
import { contractIsPublishedAndPending, registerNewContract } from "../contracts/contractRegistry";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import { getCreateSpriteContract, getDeleteSpriteContract, getFadeContract, getFocusCameraOnSpriteContract, getFocusCameraOnTileContract, getMoveSpriteContract, getSetSpriteAnimationContract, getShowEmoteContract, getShowScreenTextContract, getShowSpeechBubbleContract, getSwitchCutsceneMapContract } from "../factories/contractFactory";
import { initCanvasObjectModel } from "../factories/modelFactory";
import { getBackSpritesGrid } from "../game/canvas/canvasGetter";
import { getSpriteByName } from "../game/modules/sprites/spriteGetter";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { AnimateSpriteScene, AnimationScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene, DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveScene, ScreenTextScene, SpeakScene } from "../models/cutscenes/SceneAnimationModel";

let waitingForContractIds: string[] = []; 

export const dispatchContract = ( animationScene: AnimationScene ): void => {
    let contract: IContract = null;

    switch ( animationScene.type ) {
        case SceneAnimationType.animation:
            contract = getContractFromAnimateSpriteScene( animationScene as AnimateSpriteScene )
            break;
        case SceneAnimationType.cameraMoveToSprite:
            contract = getContractFromCameraMoveToSpriteScene( animationScene as CameraMoveToSpriteScene );
            break;
        case SceneAnimationType.cameraMoveToTile:
            contract = getContractFromCameraMoveToTileScene( animationScene as CameraMoveToTileScene );
            break;
        case SceneAnimationType.createCar:
            contract = getContractFromCreateCarScene( animationScene as CreateCarScene );
            break;
        case SceneAnimationType.createSprite:
            contract = getContractFromCreateSpriteScene( animationScene as CreateSpriteScene );
            break;
        case SceneAnimationType.deleteSprite:
            contract = getContractFromDeleteSpriteScene( animationScene as DeleteSpriteScene );
            break;
        case SceneAnimationType.emote:
            contract = getContractFromEmoteScene( animationScene as EmoteScene );
            break;
        case SceneAnimationType.fadeIn:
        case SceneAnimationType.fadeOut:
        case SceneAnimationType.fadeOutIn:
            contract = getContractFromFadeScene( animationScene as FadeScene )
            break;
        case SceneAnimationType.loadMap:
            contract = getContractFromSwitchMapScene( animationScene as LoadMapScene )
            break;
        case SceneAnimationType.move:
            contract = getContractFromMoveScene( animationScene as MoveScene );
            break;
        case SceneAnimationType.screenText:
            contract = getContractFromSceenTextScene( animationScene as ScreenTextScene );
            break;
        case SceneAnimationType.speak:
        case SceneAnimationType.speakYesNo:
            contract = getContractFromSpeakScene( animationScene as SpeakScene );
            break;
    }

    if ( animationScene.waitForAnimationEnd ) {
        waitingForContractIds.push( contract.contractId );
    }

    registerNewContract(contract);
}
export const checkIfEventScriptSceneIsFinished = (): boolean => {
    const waitingForAnimations = waitingForContractIds.filter( e => !contractIsPublishedAndPending(e) );
    if ( waitingForAnimations.length < 1 ) {
        waitingForContractIds = [];
        return true;
    }
    return false;
}

const getContractFromAnimateSpriteScene = ( animationScene: AnimateSpriteScene ): SetSpriteAnimationContract => {
    return getSetSpriteAnimationContract( getSpriteId( animationScene ), animationScene.animationName, animationScene.loop );
};
const getContractFromCameraMoveToSpriteScene = ( animationScene: CameraMoveToSpriteScene ): FocusCameraOnSpriteContract => {
    return getFocusCameraOnSpriteContract( getSpriteId( animationScene ), animationScene.snapToSprite );
};
const getContractFromCameraMoveToTileScene = ( animationScene: CameraMoveToTileScene ): FocusCameraOnTileContract => {
    return getFocusCameraOnTileContract( { column: animationScene.column, row: animationScene.row }, animationScene.snapToTile );
};
const getContractFromCreateCarScene = ( animationScene: CreateCarScene ): CreateSpriteContract => {
    let road = getBackSpritesGrid().roadNetwork.roads.filter( ( e ) => { return e.model.name == animationScene.roadName } )[0];
    let startCell = road.getRoadStartPosition();
    let model = initCanvasObjectModel( {
        column: startCell.column, row: startCell.row,
        type: animationScene.sprite, name: animationScene.spriteName,
        direction: road.model.direction
    } );
    return getCreateSpriteContract( model );
};
const getContractFromCreateSpriteScene = ( animationScene: CreateSpriteScene ): CreateSpriteContract => {
    const model: CanvasObjectModel = initCanvasObjectModel( {
        type: animationScene.sprite, direction: animationScene.direction,
        row: animationScene.row, column: animationScene.column, name: animationScene.spriteName
    } );
    return getCreateSpriteContract( model );
};
const getContractFromDeleteSpriteScene = ( animationScene: DeleteSpriteScene ): DeleteSpriteContract => {
    return getDeleteSpriteContract( getSpriteId( animationScene ) );
};
const getContractFromEmoteScene = ( animationScene: EmoteScene ): ShowEmoteContract => {
    return getShowEmoteContract( getSpriteId( animationScene ), animationScene.src );
}
const getContractFromFadeScene = ( animationScene: FadeScene ): FadeContract => {
    let opacity = animationScene.targetOpacity == null ? ( animationScene.type === SceneAnimationType.fadeIn ? 0 : 1 ) : animationScene.targetOpacity;
    return getFadeContract( opacity, animationScene.type === SceneAnimationType.fadeOutIn );
}
const getContractFromSwitchMapScene = ( animationScene: LoadMapScene ) => {
    return getSwitchCutsceneMapContract( animationScene.mapName, animationScene.focusTile, animationScene.setPlayerSprite, animationScene.playerStart );
}
const getContractFromMoveScene = ( animationScene: MoveScene ): MoveSpriteContract => {
    return getMoveSpriteContract( getSpriteId( animationScene ), animationScene.destination )
}
const getContractFromSceenTextScene = ( animationScene: ScreenTextScene ): ShowScreenTextContract => {
    return getShowScreenTextContract( animationScene.text, animationScene.title, animationScene.maxWidth );
}
const getContractFromSpeakScene = ( animationScene: SpeakScene ): ShowSpeechBubbleContract => {
    const conversationPartnerId = ( animationScene.speakWith !== undefined && animationScene.speakWith !== null ) ? getSpriteByName( animationScene.spriteName ).spriteId : null;
    return getShowSpeechBubbleContract( getSpriteId( animationScene ), animationScene.text, conversationPartnerId, animationScene.sfx );
}

const getSpriteId = ( animationScene: AnimationScene ): string => {
    if ( animationScene.spriteId !== null && animationScene.spriteId !== undefined ) {
        return animationScene.spriteId;
    }
    return getSpriteByName( animationScene.spriteName ).spriteId;
};
