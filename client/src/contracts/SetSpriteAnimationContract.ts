import type { IContract } from "./IContract";

export type SetSpriteAnimationContract = IContract & {
    spriteId: string;
    animationName: string;
    loop: boolean;
}