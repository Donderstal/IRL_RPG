import type { Sprite } from "../core/Sprite";
import { SpriteAnimation } from "../map/map-classes/SpriteAnimation";
import { getAnimationByName } from "../../resources/animationResources";

let animationDictionary: { [key in string]: SpriteAnimation } = {};

export const initializeSpriteAnimation = ( sprite: Sprite, animationName: string, options: { looped: boolean, loops: number } ): void => {
    const animationScript = getAnimationByName( animationName, sprite.width, sprite.height, sprite.direction, options );
    animationDictionary[sprite.spriteId] = new SpriteAnimation( animationScript );
    sprite.activateAnimationModule();
};
export const handleSpriteAnimation = ( sprite: Sprite ): void => {
    const animation = getSpriteAnimationById( sprite.spriteId );
    animation.spriteAnimationCounter( sprite );
    destroyAnimationIfFinished( sprite, animation );
};
export const destroySpriteAnimation = ( sprite: Sprite ): void => {
    sprite.deactivateAnimationModule();
    delete animationDictionary[sprite.spriteId];
};
export const getSpriteAnimationById = ( spriteId: string ): SpriteAnimation => {
    return animationDictionary[spriteId];
};
export const clearSpriteAnimations = (): void => {
    animationDictionary = {};
};
export const destroyAnimationIfFinished = ( sprite: Sprite, animation: SpriteAnimation ): void => {
    if ( animation.animationFinished ) {
        destroySpriteAnimation( sprite );
    }
};
export const spriteHasAnimation = ( spriteId: string ): boolean => {
    return spriteId in animationDictionary;
}