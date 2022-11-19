import type { SpriteAnimation } from "../../map/map-classes/SpriteAnimation";
import { getAnimationRegistry } from "./animationRegistry"

export const getSpriteAnimation = ( id: string ): SpriteAnimation => {
    const animations = getAnimationRegistry();
    return animations[id];
}
export const spriteHasAnimation = ( id: string ): boolean => {
    const animations = getAnimationRegistry();
    return id in animations;
}