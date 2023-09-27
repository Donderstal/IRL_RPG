import type { IContract } from "./IContract";

export type ShowEmoteContract = IContract & {
    spriteId: string;
    emote: string;
}