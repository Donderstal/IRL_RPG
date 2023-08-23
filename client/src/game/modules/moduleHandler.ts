import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { Sprite } from "../core/Sprite";
import { spriteNextPositionIsBlocked } from "../map/collision";
import { inDebugState } from "../../state/stateGetter";

import { handleSpriteAnimation } from "./animations/animationHandler";
import { blockedSpriteCounterIsOverLimit, handleBlockedSpriteCounter } from "./blockedCounters/blockedCounterHandler";
import { checkIfSpriteCanMove } from "./destinations/destinationHandler";
import { updateAssociatedHitbox } from "./hitboxes/hitboxHandler";
import { getIdleAnimationFromList, idleAnimationCounterIsOverLimit, incrementIdleAnimationCounter, resetIdleAnimationCounter } from "./idleAnimCounters/idleAnimHandler";
import { getRandomAnimation, getRandomDestination, incrementRandomAnimationCounter, randomAnimationCounterIsOverLimit, resetRandomAnimationCounter } from "./randomAnimCounters/randomAnimHandler";

import { moduleIsRunningForSprite } from "./moduleRegistryGetter";
import { getSpriteDestination, getSpriteDestinationCell, spriteHasDestinationCell } from "./destinations/destinationGetter";

import { initializeSpriteAnimation } from "./animations/animationSetter";
import { destroyBlockedSpriteCounter } from "./blockedCounters/blockedCounterSetter";
import { destroySpriteMovementToDestination, initializeSpriteMovement } from "./moduleSetter";
import { getBackSpritesGrid, getBackTilesGrid, getTileOnCanvasByCell } from "../canvas/canvasGetter";
import { DestinationType } from "../../enumerables/DestinationType";
import { tryFindPath } from "../map/pathfinder";
import type { Destination } from "../map/map-classes/Destination";
import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";

export const handleSpriteModules = ( sprite: Sprite ): void => {
	let id = sprite.spriteId;
    if ( moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) || inDebugState() ) {
        updateAssociatedHitbox( sprite );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) ) {
		handleSpriteMoveToDestination( sprite );
		resetSpriteModuleCounters( id );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.animation ) ) {
		handleSpriteAnimation( sprite );
		resetSpriteModuleCounters( id );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.idleAnimation ) && !moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) && !moduleIsRunningForSprite( id, SpriteModuleEnum.animation ) ) {
		handleIdleAnimationCounter( sprite );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.randomAnimation ) && !moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) && !moduleIsRunningForSprite( id, SpriteModuleEnum.animation ) ) {
		handleRandomAnimationCounter( sprite );
    }
}

export const resetSpriteModuleCounters = ( spriteId: string ): void => {
    if ( moduleIsRunningForSprite( spriteId, SpriteModuleEnum.idleAnimation ) ) {
        resetIdleAnimationCounter( spriteId );
    }
    if ( moduleIsRunningForSprite( spriteId, SpriteModuleEnum.randomAnimation ) ) {
        resetRandomAnimationCounter( spriteId );
    }
}

export const handleSpriteMoveToDestination = ( sprite: Sprite ): void => {
    const destination = getSpriteDestination( sprite.spriteId );

    if ( sprite.isVisible() && spriteNextPositionIsBlocked( sprite, destination ) ) {
        handleBlockedSpriteCounter( sprite );
        if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
            destroyBlockedSpriteCounter( sprite.spriteId );
            if ( !sprite.isCar && spriteHasDestinationCell( sprite.spriteId ) ) {
                const destinationCell = getSpriteDestinationCell( sprite.spriteId );
                const startTile = getTileOnCanvasByCell( { column: sprite.column, row: sprite.row }, CanvasTypeEnum.background );
                const destinationTile = getTileOnCanvasByCell( destinationCell, CanvasTypeEnum.background )
                const path = tryFindPath( startTile, destinationTile );
                const destination = getSpriteDestination( sprite.spriteId );
                if ( path === null || path === undefined || path.length === 0 ) {
                    destroySpriteMovementToDestination( sprite );
                    return;
                }
                initializeSpriteMovement( path, destination.type, sprite );
                return;
            }
            else if ( sprite.isCar && !sprite.isVisible() ) {
                destroySpriteMovementToDestination( sprite );
            }
        }
    }
    else {
        const movingToDestination = checkIfSpriteCanMove( sprite, destination );
        if ( !movingToDestination ) checkIfSpriteShouldFindNewPath( sprite, destination );
    }
}

export const checkIfSpriteShouldFindNewPath = ( sprite: Sprite, destination: Destination ): void => {
    if ( destination.type === DestinationType.randomGeneratedSprite && sprite.isVisible() ) {
        if ( sprite.isCar ) {
            const path = getBackSpritesGrid().roadNetwork.findPathFromDirectionXy( destination.currentStep );
            if ( path === null || path === undefined || path.length === 0 ) {
                destroySpriteMovementToDestination( sprite );
                return;
            }
            initializeSpriteMovement( path, DestinationType.randomGeneratedSprite, sprite );
            return;
        }
    }
    destroySpriteMovementToDestination( sprite );
}

export const handleRandomAnimationCounter = ( sprite: Sprite ) => {
    const id = sprite.spriteId;
    incrementRandomAnimationCounter( id );
    if ( !randomAnimationCounterIsOverLimit( id ) ) return;

    resetRandomAnimationCounter( id );
    const chance = Math.random() < .33;
    if ( sprite.animationType === AnimationTypeEnum.idle || ( chance && sprite.animationType === AnimationTypeEnum.semiIdle ) ) {
        const animation = getRandomAnimation( sprite );
        initializeSpriteAnimation( sprite, animation, { looped: false, loops: 0 } )
    }
    else {
        const destination = getRandomDestination( sprite );
        if ( destination == null ) return;

        const start = getBackTilesGrid().getTileAtCell( sprite.column, sprite.row );
        const destinationTile = getBackTilesGrid().getTileAtCell( destination.column, destination.row );
        const path = tryFindPath( start, destinationTile );
        if ( path === null ) return;

        initializeSpriteMovement( path, DestinationType.randomInRange, sprite, destination );
    }
}

export const handleIdleAnimationCounter = ( sprite: Sprite ) => {
    const id = sprite.spriteId;
    incrementIdleAnimationCounter( id );
    if ( !idleAnimationCounterIsOverLimit( id ) ) return;

    resetIdleAnimationCounter( id );
    const animation = getIdleAnimationFromList( sprite );
    initializeSpriteAnimation( sprite, animation, { looped: false, loops: 0 } );
}