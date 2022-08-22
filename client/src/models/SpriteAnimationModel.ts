import type { SpriteFrameModel } from "./SpriteFrameModel";

export type SpriteAnimationModel = {
    name: string,
    frames: SpriteFrameModel[],
    looped: boolean,
    loops?: number
}