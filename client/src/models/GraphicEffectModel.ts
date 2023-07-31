import type { FrameModel } from "./SpriteFrameModel";

export type GraphicEffectModel = {
    src: string;
    widthInBlocks: number;
    heightInBlocks: number;
    frameWidth: number;
    frameHeight: number;
    frames: FrameModel[];
}