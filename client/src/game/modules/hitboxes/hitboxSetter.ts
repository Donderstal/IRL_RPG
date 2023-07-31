import { initSpriteFrameModel } from "../../../factories/modelFactory";
import { Hitbox } from "../../core/Hitbox";
import type { Sprite } from "../../core/Sprite";
import { addHitboxToRegistry, clearHitboxRegistry, removeHitboxFromRegistry } from "./hitboxRegistry";

export const initializeHitboxForSprite = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const frame = initSpriteFrameModel(sprite);
    const hitbox = new Hitbox( frame );
    addHitboxToRegistry(spriteId, hitbox);
};
export const destroyAssociatedHitbox = ( spriteId: string ): void => {
    removeHitboxFromRegistry( spriteId );
};

export const clearHitboxes = (): void => {
    clearHitboxRegistry();
}