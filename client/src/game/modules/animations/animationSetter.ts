import { SpriteModuleEnum } from "../../../enumerables/SpriteModuleEnum";
import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX } from "../../../game-data/globals";
import { getAnimationByName } from "../../../resources/animationResources";
import type { Sprite } from "../../core/Sprite";
import { SpriteAnimation } from "../../map/map-classes/SpriteAnimation";
import { markModuleAsActive, markModuleAsInActive } from "../moduleSetter";
import { addAnimationToRegistry, clearAnimationRegistry, deleteAnimationFromRegistry } from "./animationRegistry";

export const initializeSpriteAnimation = ( sprite: Sprite, animationName: string, options: { looped: boolean, loops: number } ): void => {
    const frameWidth = ( sprite.width / GRID_BLOCK_PX ) * GRID_BLOCK_IN_SHEET_PX;
    const frameHeight = ( sprite.height / GRID_BLOCK_PX ) * GRID_BLOCK_IN_SHEET_PX;
    const animationScript = getAnimationByName( animationName, frameWidth, frameHeight, sprite.direction, options );
    const animation = new SpriteAnimation( animationScript );
    addAnimationToRegistry( sprite.spriteId, animation )
    markModuleAsActive( sprite.spriteId, SpriteModuleEnum.animation );
};

export const destroySpriteAnimation = ( sprite: Sprite ): void => {
    markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.animation );
    sprite.deactivateAnimationModule();
    deleteAnimationFromRegistry( sprite.spriteId );
};

export const clearSpriteAnimations = (): void => {
    clearAnimationRegistry();
};