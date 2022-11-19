import { Hitbox } from "../../core/Hitbox";
import type { Sprite } from "../../core/Sprite";
import { addHitboxToRegistry, clearHitboxRegistry, removeHitboxFromRegistry } from "./hitboxRegistry";

export const initializeHitboxForSprite = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const hitbox = new Hitbox( sprite.centerX, sprite.baseY, sprite.width / 2 );
    addHitboxToRegistry(spriteId, hitbox);
};
export const destroyAssociatedHitbox = ( spriteId: string ): void => {
    removeHitboxFromRegistry( spriteId );
};

export const clearHitboxes = (): void => {
    clearHitboxRegistry();
}