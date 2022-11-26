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
import { destroySpriteMovementToDestination, tryInitializeSpriteMovement } from "./moduleSetter";

export const handleSpriteModules = ( sprite: Sprite ): void => {
	let id = sprite.spriteId;
	if ( sprite.isPlayer ) {
		updateAssociatedHitbox( sprite );
	}
	if ( moduleIsRunningForSprite( id, SpriteModuleEnum.movement ) || inDebugGameState() ) {
		if ( moduleIsRunningForSprite( id, SpriteModuleEnum.door ) ) {
			updateSpriteAssociatedDoor( sprite )
		}
		else if ( moduleIsRunningForSprite( id, SpriteModuleEnum.animation ) ) {
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

    if ( destination.failedToFindPath ) {
        destroySpriteMovementToDestination( sprite );
    }

    if ( spriteNextPositionIsBlocked( sprite ) ) {
        if ( spriteIsAtDestination( sprite ) ) {
            destroySpriteMovementToDestination( sprite );
            return;
        }

        handleBlockedSpriteCounter( sprite );
        if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
            destroyBlockedSpriteCounter( sprite.spriteId );
            setSideStepDestination( sprite );
        }
    }
    else {
        const movingToDestination = checkIfSpriteCanMove( sprite, destination );
        if ( cameraFocus.focusSpriteId == sprite.spriteId && !cameraFocus.movingToNewFocus ) {
            drawNewTilesInCameraFocus( cameraFocus );
        }
        if ( !movingToDestination ) destroySpriteMovementToDestination( sprite );
    }
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
        tryInitializeSpriteMovement( sprite, destination );
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