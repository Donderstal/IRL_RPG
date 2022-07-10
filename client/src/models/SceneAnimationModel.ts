import type { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum"

export type SceneAnimationModel = {
    id: string,
    type: SceneAnimationType,
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

export type CreateSprite = SceneAnimationModel & {
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

export type LoadMap = SceneAnimationModel & {
    mapName: string,
    setPlayerSprite: boolean
}