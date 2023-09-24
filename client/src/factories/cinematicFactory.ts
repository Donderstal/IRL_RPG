import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import type { CellPosition } from "../models/CellPositionModel";
import type { GridCellModel } from "../models/GridCellModel";
import type {
    AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene, DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveScene, AnimationScene, SpeakScene, SpeakYesNoScene, WaitScene, ScreenTextScene
} from "../models/cutscenes/SceneAnimationModel"

const getBaseSceneModel = ( type: SceneAnimationType, waitForAnimationEnd: boolean, spriteName: string = null, sfx: string = null, spriteId: string = null ): AnimationScene => {
    const model: AnimationScene = {
        type: type,
        waitForAnimationEnd: waitForAnimationEnd,
        spriteId: spriteId,
        spriteName: spriteName,
        sfx: sfx
    };
    return model;
};

export const getSpeakScene = ( text: string, speakWith: string = null, spriteName: string = null, waitForEnd = true, sfx: string = null ): SpeakScene => {
    const base = getBaseSceneModel( SceneAnimationType.speak, waitForEnd, spriteName, sfx );
    const scene: SpeakScene = {
        ...base,
        text: text,
        speakWith: speakWith
    };
    return scene;
};
export const getSpeakYesNoScene = ( text: string, pathYes: AnimationScene[][], pathNo: AnimationScene[][], speakWith: string = null, spriteName: string = null, sfx: string = null ): SpeakYesNoScene => {
    const base = getBaseSceneModel( SceneAnimationType.speakYesNo, true, spriteName, sfx );
    const scene: SpeakYesNoScene = {
        ...base,
        text: text,
        pathYes: pathYes,
        pathNo: pathNo,
        speakWith: speakWith
    };
    return scene;
};
export const getEmoteScene = ( src: string, speakWith: string = null, spriteName: string = null, waitForEnd = true, sfx: string = null ): EmoteScene => {
    const base = getBaseSceneModel( SceneAnimationType.emote, waitForEnd, spriteName, sfx );
    const scene: EmoteScene = {
        ...base,
        src: src,
        speakWith: speakWith
    };
    return scene;
};
export const getMoveSpriteScene = ( destination: GridCellModel, spriteName: string = null, waitForEnd = true, sfx: string = null ): MoveScene => {
    const base = getBaseSceneModel( SceneAnimationType.move, waitForEnd, spriteName, sfx );
    const scene: MoveScene = {
        ...base,
        destination: destination
    };
    return scene;
};
export const getAnimateSpriteScene = ( animationName: string, loop: boolean = false, isPermanent: boolean = false, spriteName: string = null, waitForEnd = true, sfx: string = null ): AnimateSpriteScene => {
    const base = getBaseSceneModel( SceneAnimationType.animation, waitForEnd, spriteName, sfx );
    const scene: AnimateSpriteScene = {
        ...base,
        animationName: animationName,
        loop: loop,
        isPermanent: isPermanent
    };
    return scene;
};
export const getCreateSpriteScene = ( position: CellPosition, sprite: string, spriteName: string = null, waitForEnd = true, sfx: string = null ): CreateSpriteScene => {
    const base = getBaseSceneModel( SceneAnimationType.createSprite, waitForEnd, spriteName, sfx );
    const scene: CreateSpriteScene = {
        ...base,
        sprite: sprite,
        direction: position.direction,
        row: position.row,
        column: position.column
    };
    return scene;
};
export const getDeleteSpriteScene = ( spriteName: string = null, waitForEnd = true, sfx: string = null ): DeleteSpriteScene => {
    return getBaseSceneModel( SceneAnimationType.deleteSprite, waitForEnd, spriteName, sfx ) as DeleteSpriteScene;
};
export const getFadeScene = ( type: SceneAnimationType, targetOpacity = null, waitForEnd = true, sfx: string = null ): FadeScene => {
    const base = getBaseSceneModel( type, waitForEnd, null, sfx );
    const scene: FadeScene = {
        ...base,
        sfx: base.sfx,
        targetOpacity: targetOpacity
    };
    return scene;
};
export const getWaitScene = ( milliseconds: number, sfx: string = null ): WaitScene => {
    const base = getBaseSceneModel( SceneAnimationType.wait, true, null, sfx );
    const scene: WaitScene = {
        ...base,
        milliseconds: milliseconds
    };
    return scene;
};
export const getCameraMoveToSpriteScene = ( snapToSprite: boolean, spriteName: string, waitForEnd = true, sfx: string = null ): CameraMoveToSpriteScene => {
    const base = getBaseSceneModel( SceneAnimationType.cameraMoveToSprite, waitForEnd, spriteName, sfx );
    const scene: CameraMoveToSpriteScene = {
        ...base,
        snapToSprite: snapToSprite
    };
    return scene;
};
export const getLoadMapScene = ( mapName: string, setPlayerSprite: boolean, playerStart: CellPosition = null, focusTile: GridCellModel = null, sfx: string = null ): LoadMapScene => {
    const base = getBaseSceneModel( SceneAnimationType.loadMap, true, null, sfx );
    const scene: LoadMapScene = {
        ...base,
        mapName: mapName,
        setPlayerSprite: setPlayerSprite,
        playerStart: playerStart,
        focusTile: focusTile
    };
    return scene;
};
export const getScreenTextScene = ( text: string, title: boolean = false, maxWidth: number = null, sfx: string = null ) => {
    const base = getBaseSceneModel( SceneAnimationType.screenText, true, null, sfx );
    const scene: ScreenTextScene = {
        ...base,
        title: title,
        text: text,
        maxWidth: maxWidth
    };
    return scene;
}

// Geen idee of deze nog werken?
export const getCreateCarScene = ( base: AnimationScene, roadName: string, sprite: string ): CreateCarScene => {
    const scene: CreateCarScene = {
        ...base,
        roadName: roadName,
        sprite: sprite
    };
    return scene;
};
export const getCameraMoveToTileScene = ( base: AnimationScene, position: CellPosition, snapToTile: boolean ): CameraMoveToTileScene => {
    const scene: CameraMoveToTileScene = {
        ...base,
        column: position.column,
        row: position.row,
        snapToTile: snapToTile
    };
    return scene;
};