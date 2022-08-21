import { Counter } from "../../helpers/Counter";
import type { Sprite } from "../core/Sprite";

let blockedSpriteCounterDictionary: { [key in string]: Counter } = {};

const initializeBlockedSpriteCounter = ( sprite: Sprite ): void => {
    blockedSpriteCounterDictionary[sprite.spriteId] = new Counter( 1000 );
}

export const handleBlockedSpriteCounter = ( sprite: Sprite ): void => {
    if ( spriteHasBlockedCounter( sprite.spriteId ) ) {
        const counter = getAssociatedBlockedSpriteCounter( sprite.spriteId );
        counter.count();
    }
    else {
        initializeBlockedSpriteCounter( sprite );
    }
}

export const destroyBlockedSpriteCounter = ( spriteId: string ): void => {
    delete blockedSpriteCounterDictionary[spriteId];
}

export const blockedSpriteCounterIsOverLimit = ( spriteId: string ): boolean => {
    const counter = getAssociatedBlockedSpriteCounter( spriteId );
    return counter.isCounterOverLimit();
}

const getAssociatedBlockedSpriteCounter = ( spriteId: string ): Counter => {
    return blockedSpriteCounterDictionary[spriteId];
}

const spriteHasBlockedCounter = ( spriteId: string ): boolean => {
    return spriteId in blockedSpriteCounterDictionary;
}