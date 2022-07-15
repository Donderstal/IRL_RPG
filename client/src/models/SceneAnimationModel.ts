import type { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum"

export type SceneAnimationModel = {
    type: SceneAnimationType,
    waitForAnimationEnd: boolean,
    spriteId?: string
}

export type SpeakScene = SceneAnimationModel & {
    text: string,
    spriteName: string,

    speakWith?: string,
    sfx?: string,
}

export type SpeakYesNoScene = SceneAnimationModel & {
    text: string,
    spriteName: string,

    speakWith?: string,
    sfx?: string,

    pathYes?: SceneAnimationModel[],
    pathNo?: SceneAnimationModel[]
}

export type EmoteScene = SceneAnimationModel & {
    src: string,
    spriteName: string,

    speakWith?: string,
    sfx?: string,
}

export type MoveScene = SceneAnimationModel & {
    spriteName: string,
    destination: { column: number, row: number }
}

export type MoveCarScene = SceneAnimationModel & {
    spriteName: string,
    roadName: string,
    column: number,
    row: number,
    direction: number
}

export type AnimateSpriteScene = SceneAnimationModel & {
    animationName: string,
    spriteName: string,
    loop: boolean
}

export type CreateCarScene = SceneAnimationModel & {
    sprite: string,
    spriteName: string,
    roadName: string
}

export type CreateSpriteScene = SceneAnimationModel & {
    sprite: string,
    spriteName: string,
    column: number,
    row: number,
    direction: number
}

export type DeleteSpriteScene = SceneAnimationModel & {
    spriteName: string,
    sfx?: string,
}

export type FadeScene = SceneAnimationModel & {
    sfx: number
}

export type WaitScene = SceneAnimationModel & {
    milliseconds: number
}

export type CameraMoveToSpriteScene = SceneAnimationModel & {
    spriteName: string,
    snapToSprite: boolean
}

export type CameraMoveToTileScene = SceneAnimationModel & {
    column: number,
    row: number,
    snapToTile: boolean
}

export type LoadMapScene = SceneAnimationModel & {
    mapName: string,
    setPlayerSprite: boolean,
    playerSpriteLocation: {}
}