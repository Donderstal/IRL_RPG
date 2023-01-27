import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { Sprite } from "../core/Sprite";

import { drawNewTilesInCameraFocus } from "../../helpers/dynamicTileDrawer";
import { cameraFocus } from "../cameraFocus";
import { spriteNextPositionIsBlocked } from "../map/collision";
import { inDebugGameState } from "../gameState/gameStateGetter";

import { updateSpriteAssociatedAction } from "./actions/actionHandlers";
import { handleSpriteAnimation } from "./animations/animationHandler";
import { blockedSpriteCounterIsOverLimit, handleBlockedSpriteCounter } from "./blockedCounters/blockedCounterHandler";
import { checkIfSpriteCanMove, setSideStepDestination, spriteIsAtDestination } from "./destinations/destinationHandler";
import { updateSpriteAssociatedDoor } from "./doors/doorHandler";
import { updateAssociatedHitbox } from "./hitboxes/hitboxHandler";
import { getIdleAnimationFromList, idleAnimationCounterIsOverLimit, incrementIdleAnimationCounter, resetIdleAnimationCounter } from "./idleAnimCounters/idleAnimHandler";
import { getRandomAnimation, getRandomDestination, incrementRandomAnimationCounter, randomAnimationCounterIsOverLimit, resetRandomAnimationCounter } from "./randomAnimCounters/randomAnimHandler";

import { moduleIsRunningForSprite } from "./moduleRegistryGetter";
import { getSpriteDestination } from "./destinations/destinationGetter";

import { initializeSpriteAnimation } from "./animations/animationSetter";
import { destroyBlockedSpriteCounter } from "./blockedCounters/blockedCounterSetter";
import { destroySpriteMovementToDestination, initializeSpriteMovement } from "./moduleSetter";
import { getBackSpritesGrid, getBackTilesGrid } from "../canvas/canvasGetter";
import { DestinationType } from "../../enumerables/DestinationType";
import { tryFindPath } from "../map/pathfinder";
import type { Destination } from "../map/map-classes/Destination";

export const handleSpriteModules = ( sprite: Sprite ): void => {
	let id = sprite.spriteId;
	if ( sprite.isPlayer ) {
		updateAssociatedHitbox( sprite );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) || inDebugGameState() ) {
		if ( moduleIsRunningForSprite( id, SpriteModuleEnum.door ) ) {
			updateSpriteAssociatedDoor( sprite )
		}
		else if ( moduleIsRunningForSprite( id, SpriteModuleEnum.mapAction ) ) {
			updateSpriteAssociatedAction( sprite )
		}
		else {
			updateAssociatedHitbox( sprite );
		}
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

    if ( spriteNextPositionIsBlocked( sprite ) ) {
        if ( spriteIsAtDestination( sprite ) ) {
            checkIfSpriteShouldFindNewPath( sprite, destination );
            return;
        }

        handleBlockedSpriteCounter( sprite );
        if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
            destroyBlockedSpriteCounter( sprite.spriteId );
            if ( !sprite.isCar ) {
                setSideStepDestination( sprite );
            }
            else if ( sprite.isCar && !sprite.isVisible() ) {
                destroySpriteMovementToDestination( sprite );
            }
        }
    }
    else {
        const movingToDestination = checkIfSpriteCanMove( sprite, destination );
        if ( cameraFocus.focusSpriteId == sprite.spriteId && !cameraFocus.movingToNewFocus ) {
            drawNewTilesInCameraFocus( cameraFocus );
        }
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
            initializeSpriteMovement( path, DestinationType.randomInRange, sprite );
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
        initializeSpriteMovement( path, DestinationType.randomInRange, sprite );
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