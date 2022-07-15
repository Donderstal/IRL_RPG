import type { SpriteFrameModel } from "./SpriteFrameModel";

export type AnimationScriptModel = {
    loop: boolean;
    frames: SpriteFrameModel[]
    index: number;
    numberOfFrames: number;
    frameRate: number;
    numberOfLoops?: number;
    currentLoop?: number;
}