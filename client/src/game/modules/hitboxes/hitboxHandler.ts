import { isHorizontal } from "../../../helpers/utilFunctions";
import type { Sprite } from "../../core/Sprite";
import { getActiveHitboxes } from "./hitboxRegistry";

export const updateAssociatedHitbox = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const allHitboxes = getActiveHitboxes();
    const hitbox = allHitboxes[spriteId];
    if ( hitbox !== null && hitbox !== undefined ) {
        hitbox.updateXy( sprite.centerX, sprite.baseY );
    }
    if ( sprite.direction !== sprite.previousDirection ) {
        const radius = sprite.isCar && !isHorizontal( sprite.direction ) ? sprite.height / 2 : sprite.width / 2;
        hitbox.updateRadius( radius );
    }
};