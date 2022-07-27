import { Hitbox } from "../core/Hitbox";
import type { Sprite } from "../core/Sprite";

let hitboxDictionary: { [key in string]: Hitbox } = {};

export const initializeHitboxForSprite = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    hitboxDictionary[spriteId] = new Hitbox( sprite.centerX, sprite.baseY, sprite.width / 2 );
    sprite.plugins.hitbox.active = true;
};

export const getAssociatedHitbox = ( spriteId: string ): Hitbox => {
    return hitboxDictionary[spriteId];
};

export const updateAssociatedHitbox = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    const hitbox = hitboxDictionary[spriteId];
    hitbox.updateXy( sprite.centerX, sprite.baseY );
};

export const destroyAssociatedHitbox = ( sprite: Sprite ): void => {
    const spriteId = sprite.spriteId;
    delete hitboxDictionary[spriteId];
};

export const clearHitboxes = (): void => {
    hitboxDictionary = {};
};