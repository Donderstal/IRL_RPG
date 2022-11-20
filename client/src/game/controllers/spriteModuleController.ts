import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { DestinationType } from "../../enumerables/DestinationType";
import { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import type { DestinationCellModel } from "../../models/DestinationCellModel";
import { cameraFocus } from "../cameraFocus";
import type { Sprite } from "../core/Sprite";
import { spriteNextPositionIsBlocked } from "../map/collision";
import { clearActions, destroySpriteAssociatedAction } from "../modules/actions/actionSetter";
import { clearSpriteAnimations, destroySpriteAnimation, initializeSpriteAnimation } from "../modules/animations/animationSetter";
import { spriteHasAnimation } from "../modules/animations/animationGetter";
import { clearBlockedSpriteCounters, destroyBlockedSpriteCounter } from "../modules/blockedCounters/blockedCounterSetter";
import { blockedSpriteCounterIsOverLimit, handleBlockedSpriteCounter } from "../modules/blockedCounters/blockedCounterHandler";
import { clearDoors, destroySpriteAssociatedDoor } from "../modules/doors/doorSetter";
import { clearHitboxes, destroyAssociatedHitbox } from "../modules/hitboxes/hitboxSetter";
import { clearIdleAnimationCounters, destroyAssociatedIdleCounter } from "../modules/idleAnimCounters/idleAnimSetter";
import { getIdleAnimationFromList, idleAnimationCounterIsOverLimit, incrementIdleAnimationCounter, resetIdleAnimationCounter } from "../modules/idleAnimCounters/idleAnimHandler";
import { clearRandomAnimationCounters, destroyAssociatedRandomCounter } from "../modules/randomAnimCounters/randomAnimSetter";
import { getRandomAnimation, getRandomDestination, incrementRandomAnimationCounter, randomAnimationCounterIsOverLimit, resetRandomAnimationCounter } from "../modules/randomAnimCounters/randomAnimHandler";
import { getSpriteDestination } from "../modules/destinations/destinationGetter";
import { clearSpriteDestinations, destroySpriteDestination, initializeSpriteDestination } from "../modules/destinations/destinationSetter";
import { checkIfSpriteCanMove, setSideStepDestination, spriteFailedToFindPath, spriteIsAtDestination } from "../modules/destinations/destinationHandler";
import { markModuleAsInActive } from "../spriteModuleHandler";
import { checkForNewTilesToDraw } from "../../helpers/dynamicTileDrawer";
import { removeSpriteById } from "../modules/sprites/spriteSetter";

const destroyAssociatedAnimationIfExists = ( sprite: Sprite ): void => {
    if ( spriteHasAnimation( sprite.spriteId ) ) {
        destroySpriteAnimation( sprite );
    }
}

const destroySpriteMovementToDestination = ( sprite: Sprite ): void => {
    const destination = getSpriteDestination( sprite.spriteId );
    if ( destination.type === DestinationType.randomGeneratedSprite ) {
        removeSpriteById( sprite.spriteId );
    }
    destroySpriteDestination( sprite.spriteId );
    sprite.deactivateMovementModule();
    markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.movement );
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
            checkForNewTilesToDraw( cameraFocus );
        }
        if ( !movingToDestination ) destroySpriteMovementToDestination( sprite );
    }
}

export const tryInitializeSpriteMovement = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
    destroyAssociatedAnimationIfExists( sprite );
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

export const clearAllSpriteModules = () => {
    clearBlockedSpriteCounters();
    clearSpriteDestinations();
    clearSpriteAnimations();
    clearActions();
    clearDoors();
    clearHitboxes();
    clearIdleAnimationCounters();
    clearRandomAnimationCounters();
}

export const clearAllAssociatedSpriteModules = ( sprite: Sprite ) => {
    destroyBlockedSpriteCounter( sprite.spriteId );
    destroySpriteDestination( sprite.spriteId );
    destroySpriteAnimation( sprite );
    destroySpriteAssociatedAction( sprite.spriteId );
    destroySpriteAssociatedDoor( sprite.spriteId );
    destroyAssociatedHitbox( sprite.spriteId );
    destroyAssociatedIdleCounter( sprite.spriteId );
    destroyAssociatedRandomCounter( sprite.spriteId );
}