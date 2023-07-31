import type { FrameModel } from "./SpriteFrameModel";

export type SpriteAnimationModel = {
    name: string,
    frames: FrameModel[],
    looped: boolean,
    loops?: number
}