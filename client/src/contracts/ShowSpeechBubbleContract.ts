import type { IContract } from "./IContract";

export type ShowSpeechBubbleContract = IContract & {
    speakingSpriteId: string;
    text: string;
    sfx: string;
    speakingToSpriteId: string
}