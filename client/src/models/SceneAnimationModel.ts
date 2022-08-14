import type { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum"

export type SceneAnimationModel = {
    type: SceneAnimationType;
    waitForAnimationEnd: boolean;
    spriteId?: string;
    spriteName?: string;
}

export type SpeakScene = SceneAnimationModel & {
    text: string;
    speakWith?: string;
    sfx?: string;
}

export type SpeakYesNoScene = SceneAnimationModel & {
    text: string;
    speakWith?: string;
    sfx?: string;

    pathYes?: SceneAnimationModel[];
    pathNo?: SceneAnimationModel[];
}

export type EmoteScene = SceneAnimationModel & {
    src: string;
    speakWith?: string;
    sfx?: string;
}

export type MoveScene = SceneAnimationModel & {
    destination: { column: number, row: number };
}

export type MoveCarScene = SceneAnimationModel & {
    roadName: string;
    column: number;
    row: number;
    direction: number;
}

export type AnimateSpriteScene = SceneAnimationModel & {
    animationName: string;
    loop: boolean;
}

export type CreateCarScene = SceneAnimationModel & {
    sprite: string;
    roadName: string;
}

export type CreateSpriteScene = SceneAnimationModel & {
    sprite: string;
    column: number;
    row: number;
    direction: number;
}

export type DeleteSpriteScene = SceneAnimationModel & {
    sfx?: string;
}

export type FadeScene = SceneAnimationModel & {
    sfx: string;
}

export type WaitScene = SceneAnimationModel & {
    milliseconds: number;
}

export type CameraMoveToSpriteScene = SceneAnimationModel & {
    snapToSprite: boolean;
}

export type CameraMoveToTileScene = SceneAnimationModel & {
    column: number;
    row: number;
    snapToTile: boolean;
}

export type LoadMapScene = SceneAnimationModel & {
    mapName: string;
    setPlayerSprite: boolean;
    playerSpriteLocation: {};
}