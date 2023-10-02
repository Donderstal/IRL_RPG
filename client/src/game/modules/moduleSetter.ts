import { markContractAsResolved, registerNewContract } from "../../contracts/contractRegistry";
import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { DestinationType } from "../../enumerables/DestinationType";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import { getDeleteSpriteContract, getMoveSpriteContract, getSetSpriteAnimationContract } from "../../factories/contractFactory";
import { isNullOrUndefined } from "../../helpers/utilFunctions";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import type { GridCellModel } from "../../models/GridCellModel";
import { getTileOnCanvasByCell } from "../canvas/canvasGetter";
import type { Sprite } from "../core/Sprite";
import { tryFindPath } from "../map/pathfinder";
import { spriteHasAnimation } from "./animations/animationGetter";
import { clearSpriteAnimations, destroySpriteAnimation, initializeSpriteAnimation } from "./animations/animationSetter";
import { clearBlockedSpriteCounters, destroyBlockedSpriteCounter } from "./blockedCounters/blockedCounterSetter";
import { getSpriteDestination } from "./destinations/destinationGetter";
import { clearSpriteDestinations, destroySpriteDestination, initializeSpriteDestination } from "./destinations/destinationSetter";
import { clearHitboxes, destroyAssociatedHitbox, initializeHitboxForSprite } from "./hitboxes/hitboxSetter";
import { clearIdleAnimationCounters, destroyAssociatedIdleCounter, initializeIdleAnimationCounter } from "./idleAnimCounters/idleAnimSetter";
import { markModuleAsActive, markModuleAsInActive } from "./moduleRegistrySetter";
import { clearRandomAnimationCounters, destroyAssociatedRandomCounter, initializeRandomAnimationCounter } from "./randomAnimCounters/randomAnimSetter";
import { getSpriteById } from "./sprites/spriteGetter";
import { clearAllSprites, createSpriteFromCanvasObjectModel, removeSpriteById } from "./sprites/spriteSetter";

export const setSpriteAndSpriteModules = ( model: CanvasObjectModel, canvas: CanvasTypeEnum, id: string = null ): void => {
	const sprite = createSpriteFromCanvasObjectModel( model, canvas, id );
	initializeSpriteModules( sprite, model );
};
export const deleteSpriteAndSpriteModules = ( spriteId: string ): void => {
	destroySpriteModulesBySpriteId( spriteId );
	removeSpriteById( spriteId );
};
export const setSpriteDestination = ( spriteId: string, destination: GridCellModel, contractId: string ): void => {
	const sprite = getSpriteById( spriteId );
	const startTile = getTileOnCanvasByCell( { column: sprite.column, row: sprite.row }, CanvasTypeEnum.background );
	const destinationTile = getTileOnCanvasByCell( destination, CanvasTypeEnum.background );

	const path = tryFindPath( startTile, destinationTile );
	if ( path === null ) {
		throw new Error( `Failed to find path from ${startTile} to ${destinationTile}` );
	};

	if ( spriteHasAnimation( sprite.spriteId ) ) {
		destroySpriteAnimation( sprite );
	}

	initializeSpriteDestination( path, destination, sprite, contractId );
}
export const destroySpriteMovementToDestination = ( sprite: Sprite ): void => {
	const destination = getSpriteDestination( sprite.spriteId );
	markContractAsResolved( destination.contractId );
	if ( destination.type === DestinationType.randomGeneratedSprite ) {
		const contract = getDeleteSpriteContract( sprite.spriteId );
		registerNewContract( contract );
	}
	destroySpriteDestination( sprite.spriteId );
	sprite.deactivateMovementModule();
	markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.movement );
};
export const setSpriteAnimation = ( spriteId: string, animationName: string, loop: boolean, contractId: string ): void => {
	const sprite = getSpriteById( spriteId );
	initializeSpriteAnimation( sprite, animationName, { looped: loop, loops: 0 }, contractId );
};
export const clearAllModuleRegistries = (): void => {
	clearSpriteAnimations();
	clearBlockedSpriteCounters();
	clearSpriteDestinations();
	clearHitboxes();
	clearIdleAnimationCounters();
	clearRandomAnimationCounters();
	clearAllSprites();
}

const destroySpriteModulesBySpriteId = ( spriteId: string ): void => {
	const sprite = getSpriteById( spriteId );
	if ( spriteHasAnimation( sprite.spriteId ) ) {
		destroySpriteAnimation( sprite );
	}
	destroySpriteDestination( sprite.spriteId );
	destroyAssociatedHitbox( spriteId );
	destroyAssociatedIdleCounter( spriteId );
	destroyAssociatedRandomCounter( spriteId );
	destroyBlockedSpriteCounter( spriteId );
};
const initializeSpriteModules = ( sprite: Sprite, canvasObjectModel: CanvasObjectModel ): void => {
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
			const contract = getSetSpriteAnimationContract( sprite.spriteId, canvasObjectModel.animationName, true );
			registerNewContract( contract );
		}
	}
	if ( !isNullOrUndefined( canvasObjectModel.destination ) && sprite.animationType !== AnimationTypeEnum.movingLoop ) {
		const destinationCell = { ...canvasObjectModel.destination, type: DestinationType.randomGeneratedSprite };
		const contract = getMoveSpriteContract( id, destinationCell );
		registerNewContract( contract );
	}
};
const initializeHitboxModule = ( sprite: Sprite ) => {
	initializeHitboxForSprite( sprite );
	markModuleAsActive( sprite.spriteId, SpriteModuleEnum.hitbox );
}
const initializeIdleAnimationModule = ( sprite: Sprite ) => {
	initializeIdleAnimationCounter( sprite );
	markModuleAsActive( sprite.spriteId, SpriteModuleEnum.idleAnimation );
};
const initializeRandomAnimationModule = ( sprite: Sprite ) => {
	initializeRandomAnimationCounter( sprite );
	markModuleAsActive( sprite.spriteId, SpriteModuleEnum.randomAnimation );
};