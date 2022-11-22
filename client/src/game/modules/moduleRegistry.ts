import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { ModuleState } from "./ModuleState";

export type ModuleStateRegistry = {
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

export const clearSpriteModules = (): void => {
	movementModuleRegistry = {};
	idleAnimationModuleRegistry = {};
	randomAnimationModuleRegistry = {};
	hitboxModuleRegistry = {};
	mapActionModuleRegistry = {};
	doorModuleRegistry = {};
	collisionModuleRegistry = {};
	animationModuleRegistry = {};
}

export const spriteModuleIsRunning = ( spriteId: string, moduleType: SpriteModuleEnum ): boolean => {
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

export const setModuleState = ( spriteId: string, moduleType: SpriteModuleEnum, moduleState: ModuleState ): void => {
	switch ( moduleType ) {
		case SpriteModuleEnum.movement:
			movementModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.idleAnimation:
			idleAnimationModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.randomAnimation:
			randomAnimationModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.hitbox:
			hitboxModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.mapAction:
			mapActionModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.door:
			doorModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.collision:
			collisionModuleRegistry[spriteId] = moduleState;
			break;
		case SpriteModuleEnum.animation:
			animationModuleRegistry[spriteId] = moduleState;
			break;
	}
}

const checkIfModuleIsActive = ( moduleState: ModuleState ): boolean => {
	if ( moduleState === null || moduleState === undefined ) {
		return false;
	}
	return moduleState.set && moduleState.active;
}