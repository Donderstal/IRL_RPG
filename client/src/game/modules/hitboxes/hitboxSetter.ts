import { isHorizontal } from "../../../helpers/utilFunctions";
import { Hitbox } from "../../core/Hitbox";
import type { Sprite } from "../../core/Sprite";
import { addHitboxToRegistry, clearHitboxRegistry, removeHitboxFromRegistry } from "./hitboxRegistry";

export const initializeHitboxForSprite = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const radius = sprite.isCar && !isHorizontal( sprite.direction ) ? sprite.height / 2 : sprite.width / 2;
    const hitbox = new Hitbox( sprite.centerX, sprite.baseY, radius );
    addHitboxToRegistry(spriteId, hitbox);
};
export const destroyAssociatedHitbox = ( spriteId: string ): void => {
    removeHitboxFromRegistry( spriteId );
};

export const clearHitboxes = (): void => {
    clearHitboxRegistry();
}