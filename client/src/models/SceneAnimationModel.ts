import type { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum"
import type { CellPosition } from "./CellPositionModel";

export type AnimationScene = {
    type: SceneAnimationType;
    waitForAnimationEnd: boolean;
    spriteId?: string;
    spriteName?: string;
    sfx?: string;
}

export type SpeakScene = AnimationScene & {
    text: string;
    speakWith?: string;
    sfx?: string;
}

export type SpeakYesNoScene = AnimationScene & {
    text: string;
    speakWith?: string;
    sfx?: string;

    pathYes?: AnimationScene[][];
    pathNo?: AnimationScene[][];
}

export type EmoteScene = AnimationScene & {
    src: string;
    speakWith?: string;
    sfx?: string;
}

export type MoveScene = AnimationScene & {
    destination: { column: number, row: number } | string;
}

export type AnimateSpriteScene = AnimationScene & {
    animationName: string;
    loop: boolean;
    isPermanent: boolean;
}

export type CreateCarScene = AnimationScene & {
    sprite: string;
    roadName: string;
}

export type CreateSpriteScene = AnimationScene & {
    sprite: string;
    column: number;
    row: number;
    direction: number;
}

export type DeleteSpriteScene = AnimationScene & {
    sfx?: string;
}

export type FadeScene = AnimationScene & {
    sfx: string;
}

export type WaitScene = AnimationScene & {
    milliseconds: number;
}

export type CameraMoveToSpriteScene = AnimationScene & {
    snapToSprite: boolean;
}

export type CameraMoveToTileScene = AnimationScene & {
    column: number;
    row: number;
    snapToTile: boolean;
}

export type LoadMapScene = AnimationScene & {
    mapName: string;
    setPlayerSprite: boolean;
    playerStart: CellPosition;
}

export type ScreenTextScene = AnimationScene & {
    text: string;
    maxWidth: number;
}