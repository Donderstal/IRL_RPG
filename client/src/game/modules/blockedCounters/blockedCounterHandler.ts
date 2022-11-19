import type { Sprite } from "../../core/Sprite";
import { getAssociatedBlockedSpriteCounter, spriteHasBlockedCounter } from "./blockedCounterGetter";
import { initializeBlockedSpriteCounter } from "./blockedCounterSetter";

export const handleBlockedSpriteCounter = ( sprite: Sprite ): void => {
    if ( spriteHasBlockedCounter( sprite.spriteId ) ) {
        const counter = getAssociatedBlockedSpriteCounter( sprite.spriteId );
        counter.count();
    }
    else {
        initializeBlockedSpriteCounter( sprite );
    }
}
export const blockedSpriteCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedBlockedSpriteCounter( spriteId );
    return counter.isCounterOverLimit();
}