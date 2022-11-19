import type { Sprite } from "../../core/Sprite";
import { getSpriteActionById } from "./actionGetter";

export const updateSpriteAssociatedAction = ( sprite: Sprite ): void => {
    const action = getSpriteActionById(sprite.spriteId);
    if ( action !== null && action !== undefined ) {
        action.updateXy( sprite.centerX, sprite.baseY );
    }
};