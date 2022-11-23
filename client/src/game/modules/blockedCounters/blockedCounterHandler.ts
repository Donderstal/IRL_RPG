import type { Sprite } from "../../core/Sprite";
import { getAssociatedBlockedSpriteCounter, spriteHasBlockedCounter } from "./blockedCounterGetter";
import { initializeBlockedSpriteCounter } from "./blockedCounterSetter";

export const handleBlockedSpriteCounter = ( sprite: Sprite ): void => {
    const id = sprite.spriteId;
    if ( spriteHasBlockedCounter( id ) ) {
        const counter = getAssociatedBlockedSpriteCounter( id );
        counter.count();
    }
    else {
        initializeBlockedSpriteCounter( id );
    }
}
export const blockedSpriteCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedBlockedSpriteCounter( spriteId );
    return counter.isCounterOverLimit();
}