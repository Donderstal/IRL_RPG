import type { Sprite } from "../../core/Sprite";
import { getSpriteAnimation } from "./animationGetter";
import { destroySpriteAnimation } from "./animationSetter";

export const handleSpriteAnimation = ( sprite: Sprite ): void => {
    const animation = getSpriteAnimation( sprite.spriteId );
    animation.spriteAnimationCounter( sprite );
    if ( animation.animationFinished ) {
        destroySpriteAnimation( sprite );
    }
};