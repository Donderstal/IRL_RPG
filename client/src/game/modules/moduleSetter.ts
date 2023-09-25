import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { DestinationType } from "../../enumerables/DestinationType";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import type { DirectionXy } from "../../models/DirectionXyModel";
import type { GridCellModel } from "../../models/GridCellModel";
import { getBackTilesGrid } from "../canvas/canvasGetter";
import type { Sprite } from "../core/Sprite";
import { tryFindPath } from "../map/pathfinder";
import { clearSpriteAnimations, destroySpriteAnimation, initializeSpriteAnimation } from "./animations/animationSetter";
import { clearBlockedSpriteCounters } from "./blockedCounters/blockedCounterSetter";
import { getSpriteDestination } from "./destinations/destinationGetter";
import { clearSpriteDestinations, destroySpriteDestination, initializeSpriteDestination } from "./destinations/destinationSetter";
import { clearHitboxes, initializeHitboxForSprite } from "./hitboxes/hitboxSetter";
import { clearIdleAnimationCounters, initializeIdleAnimationCounter } from "./idleAnimCounters/idleAnimSetter";
import { markModuleAsActive, markModuleAsInActive } from "./moduleRegistrySetter";
import { clearRandomAnimationCounters, initializeRandomAnimationCounter } from "./randomAnimCounters/randomAnimSetter";
import { clearAllSprites, createSpriteFromCanvasObjectModel, scheduleSpriteForDeletion } from "./sprites/spriteSetter";

export const setSpriteAndSpriteModules = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): string => {
	const sprite = createSpriteFromCanvasObjectModel( model, canvas, id );
	initializeSpriteModules( sprite, model );
	return sprite.spriteId;
}
export const initializeSpriteModules = ( sprite: Sprite, canvasObjectModel: CanvasObjectModel ): void => {
	let model = sprite.model;
	let id = sprite.spriteId;
	if ( model.idleAnimation && ( !sprite.model.isCharacter || sprite.isPlayer ) ) {
		initializeIdleAnimationModule( sprite );
	}

	if ( sprite.model.isCharacter && sprite.animationType !== AnimationTypeEnum.movingLoop
		&& sprite.animationType !== AnimationTypeEnum.animationLoop ) {
		initializeRandomAnimationModule( sprite );
	}

	if ( model.canMove ) {
		markModuleAsInActive( id, SpriteModuleEnum.movement );
	}

	initializeHitboxForSprite( sprite );
	markModuleAsActive( id, SpriteModuleEnum.hitbox );

	if ( sprite.model.canMove || sprite.model.idleAnimation ) {
		markModuleAsInActive( id, SpriteModuleEnum.animation );
		if ( sprite.animationType === AnimationTypeEnum.animationLoop ) {
			initializeSpriteAnimation( sprite, canvasObjectModel.animationName, { looped: true, loops: 0 } );
		}
	}
	if ( canvasObjectModel.destination && sprite.animationType !== AnimationTypeEnum.movingLoop ) {
		const backTiles = getBackTilesGrid();
		const start = backTiles.getTileAtCell( canvasObjectModel.column, canvasObjectModel.row );
		const destination = backTiles.getTileAtCell( canvasObjectModel.destination.column, canvasObjectModel.destination.row );

		const path = tryFindPath( start, destination );
		if ( path === null ) return;
		initializeSpriteMovement( path, DestinationType.randomGeneratedSprite, sprite, canvasObjectModel.destination );
	}
}

export const initializeSpriteMovement = ( path: DirectionXy[], type: DestinationType, sprite: Sprite, destinationCell: GridCellModel = null ): void => {
	destroySpriteAnimation( sprite );
	initializeSpriteDestination( path, type, sprite, destinationCell );
}

export const destroySpriteMovementToDestination = ( sprite: Sprite ): void => {
	const destination = getSpriteDestination( sprite.spriteId );
	if ( destination.type === DestinationType.randomGeneratedSprite ) {
		scheduleSpriteForDeletion( sprite.spriteId, sprite.model.isCharacter !== undefined, sprite.isCar )
	}
	destroySpriteDestination( sprite.spriteId );
	sprite.deactivateMovementModule();
	markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.movement );
}

export const clearAllModuleRegistries = (): void => {
	clearSpriteAnimations();
	clearBlockedSpriteCounters();
	clearSpriteDestinations();
	clearHitboxes();
	clearIdleAnimationCounters();
	clearRandomAnimationCounters();
	clearAllSprites();
}

const initializeIdleAnimationModule = ( sprite: Sprite ) => {
	initializeIdleAnimationCounter( sprite );
	markModuleAsActive( sprite.spriteId, SpriteModuleEnum.idleAnimation );
}
const initializeRandomAnimationModule = ( sprite: Sprite ) => {
	initializeRandomAnimationCounter( sprite );
	markModuleAsActive( sprite.spriteId, SpriteModuleEnum.randomAnimation );
}