import { isNullOrUndefined } from "../../../helpers/utilFunctions";
import type { Sprite } from "../../core/Sprite";
import { getActiveHitboxes } from "./hitboxRegistry";

export const updateAssociatedHitbox = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const allHitboxes = getActiveHitboxes();
    const hitbox = allHitboxes[spriteId];
    if ( !isNullOrUndefined( hitbox ) ) {
        hitbox.updateXy( sprite.x, sprite.y );
    }
    if ( sprite.direction !== sprite.previousDirection ) {
        hitbox.updateDimensions( sprite.width, sprite.height)
    }
};