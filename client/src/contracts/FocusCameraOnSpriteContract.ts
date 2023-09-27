import type { IContract } from "./IContract";

export type FocusCameraOnSpriteContract = IContract & {
    spriteId: string;
    snap: boolean;
}