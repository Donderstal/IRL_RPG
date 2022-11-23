import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { DestinationType } from "../../enumerables/DestinationType";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import type { DestinationCellModel } from "../../models/DestinationCellModel";
import type { Sprite } from "../core/Sprite";
import { initializeActionForSprite } from "./actions/actionSetter";
import { destroySpriteAnimation, initializeSpriteAnimation } from "./animations/animationSetter";
import { getSpriteDestination } from "./destinations/destinationGetter";
import { spriteFailedToFindPath } from "./destinations/destinationHandler";
import { destroySpriteDestination, initializeSpriteDestination } from "./destinations/destinationSetter";
import { initializeDoorForSprite } from "./doors/doorSetter";
import { initializeHitboxForSprite } from "./hitboxes/hitboxSetter";
import { initializeIdleAnimationCounter } from "./idleAnimCounters/idleAnimSetter";
import { markModuleAsActive, markModuleAsInActive } from "./moduleRegistrySetter";
import { initializeRandomAnimationCounter } from "./randomAnimCounters/randomAnimSetter";
import { createSpriteFromCanvasObjectModel, removeSpriteById } from "./sprites/spriteSetter";

export const setSpriteAndSpriteModules = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): string => {
	const sprite = createSpriteFromCanvasObjectModel( model, canvas, id );
	initializeSpriteModules( sprite, model );
	return sprite.spriteId;
}
export const initializeSpriteModules = ( sprite: Sprite, canvasObjectModel: CanvasObjectModel ): void => {
	let model = sprite.model;
	let id = sprite.spriteId;
	if ( model.idleAnimation && ( !sprite.model.isCharacter || sprite.isPlayer ) ) {
		initializeIdleAnimationCounter( sprite );
		markModuleAsActive( id, SpriteModuleEnum.idleAnimation );
	}

	if ( sprite.model.isCharacter && sprite.animationType !== AnimationTypeEnum.movingLoop
		&& sprite.animationType !== AnimationTypeEnum.animationLoop ) {
		initializeRandomAnimationCounter( sprite );
		markModuleAsActive( id, SpriteModuleEnum.randomAnimation );
	}

	if ( model.canMove ) {
		markModuleAsInActive( id, SpriteModuleEnum.movement );
	}

	if ( sprite.hasDoor ) {
		initializeDoorForSprite( sprite, canvasObjectModel.door );
		markModuleAsActive( id, SpriteModuleEnum.door );
	}
	else if ( sprite.hasAction ) {
		initializeActionForSprite( sprite, canvasObjectModel.action );
		markModuleAsActive( id, SpriteModuleEnum.mapAction );
	}
	else {
		initializeHitboxForSprite( sprite );
		markModuleAsActive( id, SpriteModuleEnum.hitbox );
	}

	if ( sprite.model.canMove || sprite.model.idleAnimation ) {
		markModuleAsInActive( id, SpriteModuleEnum.animation );
		if ( sprite.animationType === AnimationTypeEnum.animationLoop ) {
			initializeSpriteAnimation( sprite, canvasObjectModel.animationName, { looped: true, loops: 0 } );
		}
	}
	if ( canvasObjectModel.destination && sprite.animationType !== AnimationTypeEnum.movingLoop ) {
		tryInitializeSpriteMovement( sprite, canvasObjectModel.destination );
	}
}

export const tryInitializeSpriteMovement = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
	destroySpriteAnimation( sprite );
	try {
		initializeSpriteDestination( sprite, destinationCell );
	}
	catch ( ex ) {
		console.log( 'error generating path for destination c' + destinationCell.column + ' r' + destinationCell.row );
		console.log( ex );
		if ( destinationCell.type === DestinationType.randomGeneratedSprite ) {
			removeSpriteById( sprite.spriteId );
		}
	}
	if ( spriteFailedToFindPath( sprite.spriteId ) && destinationCell.type === DestinationType.randomGeneratedSprite ) {
		removeSpriteById( sprite.spriteId );
	}
}

export const destroySpriteMovementToDestination = ( sprite: Sprite ): void => {
	const destination = getSpriteDestination( sprite.spriteId );
	if ( destination.type === DestinationType.randomGeneratedSprite ) {
		removeSpriteById( sprite.spriteId );
	}
	destroySpriteDestination( sprite.spriteId );
	sprite.deactivateMovementModule();
	markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.movement );
}

//export const clearAllAssociatedSpriteModules = ( sprite: Sprite ) => {
//	destroyBlockedSpriteCounter( sprite.spriteId );
//	destroySpriteDestination( sprite.spriteId );
//	destroySpriteAnimation( sprite );
//	destroySpriteAssociatedAction( sprite.spriteId );
//	destroySpriteAssociatedDoor( sprite.spriteId );
//	destroyAssociatedHitbox( sprite.spriteId );
//	destroyAssociatedIdleCounter( sprite.spriteId );
//	destroyAssociatedRandomCounter( sprite.spriteId );
//}