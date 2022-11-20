import { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import { SpriteModuleEnum } from "../enumerables/SpriteModuleEnum";
import globals from "../game-data/globals";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import { handleIdleAnimationCounter, handleRandomAnimationCounter, handleSpriteMoveToDestination, tryInitializeSpriteMovement } from "./controllers/spriteModuleController";
import type { Sprite } from "./core/Sprite";

import { initializeActionForSprite } from "./modules/actions/actionSetter";
import { updateSpriteAssociatedAction } from "./modules/actions/actionHandlers";

import { initializeSpriteAnimation } from "./modules/animations/animationSetter";
import { handleSpriteAnimation } from "./modules/animations/animationHandler";

import { initializeHitboxForSprite } from "./modules/hitboxes/hitboxSetter";
import { updateAssociatedHitbox } from "./modules/hitboxes/hitboxHandler";

import { initializeDoorForSprite } from "./modules/doors/doorSetter";
import { updateSpriteAssociatedDoor } from "./modules/doors/doorHandler";

import { initializeIdleAnimationCounter } from './modules/idleAnimCounters/idleAnimSetter';
import { resetIdleAnimationCounter } from './modules/idleAnimCounters/idleAnimHandler';

import { initializeRandomAnimationCounter } from "./modules/randomAnimCounters/randomAnimSetter";
import { resetRandomAnimationCounter } from "./modules/randomAnimCounters/randomAnimHandler";

type ModuleState = {
	set: boolean;
	active: boolean;
}
type ModuleStateRegistry = {
	[key in string]: ModuleState;
}

let movementModuleRegistry: ModuleStateRegistry = {};
let idleAnimationModuleRegistry: ModuleStateRegistry = {};
let randomAnimationModuleRegistry: ModuleStateRegistry = {};
let hitboxModuleRegistry: ModuleStateRegistry = {};
let mapActionModuleRegistry: ModuleStateRegistry = {};
let doorModuleRegistry: ModuleStateRegistry = {};
let collisionModuleRegistry: ModuleStateRegistry = {};
let animationModuleRegistry: ModuleStateRegistry = {};

export const clearSpriteModuleRegistries = (): void => {
	movementModuleRegistry = {};
	idleAnimationModuleRegistry = {};
	randomAnimationModuleRegistry = {};
	hitboxModuleRegistry = {};
	mapActionModuleRegistry = {};
	doorModuleRegistry = {};
	collisionModuleRegistry = {};
	animationModuleRegistry = {};
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

export const handleSpriteModules = ( sprite: Sprite ): void => {
	let id = sprite.spriteId;
	if ( sprite.isPlayer ) {
		updateAssociatedHitbox( sprite );
	}
	if ( pluginIsRunning( id, SpriteModuleEnum.movement ) || globals.GAME.debugMode ) {
		if ( pluginIsRunning( id, SpriteModuleEnum.door ) ) {
			updateSpriteAssociatedDoor( sprite )
		}
		else if ( pluginIsRunning( id, SpriteModuleEnum.animation ) ) {
			updateSpriteAssociatedAction( sprite )
		}
		else {
			updateAssociatedHitbox( sprite );
		}
	}
	if ( pluginIsRunning( id, SpriteModuleEnum.movement ) ) {
		handleSpriteMoveToDestination( sprite );
		resetSpriteModuleCounters( id );
	}
	if ( pluginIsRunning( id, SpriteModuleEnum.animation ) ) {
		handleSpriteAnimation( sprite );
		resetSpriteModuleCounters( id );
	}
	if ( pluginIsRunning( id, SpriteModuleEnum.idleAnimation ) && !pluginIsRunning( id, SpriteModuleEnum.movement ) && !pluginIsRunning( id, SpriteModuleEnum.animation ) ) {
		handleIdleAnimationCounter( sprite );
	}
	if ( pluginIsRunning( id, SpriteModuleEnum.randomAnimation ) && !pluginIsRunning( id, SpriteModuleEnum.movement ) && !pluginIsRunning( id, SpriteModuleEnum.animation ) ) {
		handleRandomAnimationCounter( sprite );
	}
}

export const resetSpriteModuleCounters = ( spriteId: string ): void => {
	if ( pluginIsRunning( spriteId, SpriteModuleEnum.idleAnimation ) ) {
		resetIdleAnimationCounter( spriteId );
	}
	if ( pluginIsRunning( spriteId, SpriteModuleEnum.randomAnimation ) ) {
		resetRandomAnimationCounter( spriteId );
	}
}

export const pluginIsRunning = ( spriteId: string, moduleType: SpriteModuleEnum ): boolean => {
	switch ( moduleType ) {
		case SpriteModuleEnum.movement:
			return checkIfModuleIsActive( movementModuleRegistry[spriteId] );
		case SpriteModuleEnum.idleAnimation:
			return checkIfModuleIsActive( idleAnimationModuleRegistry[spriteId] );
		case SpriteModuleEnum.randomAnimation:
			return checkIfModuleIsActive( randomAnimationModuleRegistry[spriteId] );
		case SpriteModuleEnum.hitbox:
			return checkIfModuleIsActive( hitboxModuleRegistry[spriteId] );
		case SpriteModuleEnum.mapAction:
			return checkIfModuleIsActive( mapActionModuleRegistry[spriteId] );
		case SpriteModuleEnum.door:
			return checkIfModuleIsActive( doorModuleRegistry[spriteId] );
		case SpriteModuleEnum.collision:
			return checkIfModuleIsActive( collisionModuleRegistry[spriteId] );
		case SpriteModuleEnum.animation:
			return checkIfModuleIsActive( animationModuleRegistry[spriteId] );
	}
}

const checkIfModuleIsActive = ( moduleState: ModuleState ): boolean => {
	if ( moduleState === null || moduleState === undefined ) {
		return false;
	}
	return moduleState.set && moduleState.active;
}

export const markModuleAsActive = ( spriteId: string, moduleType: SpriteModuleEnum ) => {
	setModuleState( spriteId, moduleType, true, true );
}
export const markModuleAsInActive = ( spriteId: string, moduleType: SpriteModuleEnum ) => {
	setModuleState( spriteId, moduleType, true, false );
}

const setModuleState = ( spriteId: string, moduleType: SpriteModuleEnum, set: boolean, active: boolean ): void => {
	switch ( moduleType ) {
		case SpriteModuleEnum.movement:
			movementModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.idleAnimation:
			idleAnimationModuleRegistry[spriteId] = createModuleState(set, active);
			break;
		case SpriteModuleEnum.randomAnimation:
			randomAnimationModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.hitbox:
			hitboxModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.mapAction:
			mapActionModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.door:
			doorModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.collision:
			collisionModuleRegistry[spriteId] = createModuleState( set, active );
			break;
		case SpriteModuleEnum.animation:
			animationModuleRegistry[spriteId] = createModuleState( set, active );
			break;
	}
}

const createModuleState = ( set: boolean, active: boolean ): ModuleState => {
	const state: ModuleState = {
		set: set,
		active: active
	};
	return state;
}