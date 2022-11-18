import type { Sprite } from "../core/Sprite";
import { SpriteAnimation } from "../map/map-classes/SpriteAnimation";
import { getAnimationByName } from "../../resources/animationResources";
import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX } from "../../game-data/globals";
import { markModuleAsActive, markModuleAsInActive } from "../spriteModuleHandler";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";

let animationDictionary: { [key in string]: SpriteAnimation } = {};

export const initializeSpriteAnimation = ( sprite: Sprite, animationName: string, options: { looped: boolean, loops: number } ): void => {
    const frameWidth = ( sprite.width / GRID_BLOCK_PX ) * GRID_BLOCK_IN_SHEET_PX;
    const frameHeight = ( sprite.height / GRID_BLOCK_PX ) * GRID_BLOCK_IN_SHEET_PX;
    const animationScript = getAnimationByName( animationName, frameWidth, frameHeight, sprite.direction, options );
    animationDictionary[sprite.spriteId] = new SpriteAnimation( animationScript );
    markModuleAsActive( sprite.spriteId, SpriteModuleEnum.animation );
};
export const handleSpriteAnimation = ( sprite: Sprite ): void => {
    const animation = getSpriteAnimationById( sprite.spriteId );
    animation.spriteAnimationCounter( sprite );
    destroyAnimationIfFinished( sprite, animation );
};
export const destroySpriteAnimation = ( sprite: Sprite ): void => {
    markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.animation );
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