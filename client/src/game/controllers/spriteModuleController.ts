import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import { DestinationType } from "../../enumerables/DestinationType";
import type { DestinationCellModel } from "../../models/DestinationCellModel";
import type { Sprite } from "../core/Sprite";
import { spriteNextPositionIsBlocked } from "../map/collision";
import { clearActions, destroySpriteAssociatedAction } from "../modules/actionModule";
import { clearSpriteAnimations, destroySpriteAnimation, initializeSpriteAnimation, spriteHasAnimation } from "../modules/animationModule";
import { blockedSpriteCounterIsOverLimit, clearBlockedSpriteCounters, destroyBlockedSpriteCounter, handleBlockedSpriteCounter } from "../modules/blockedSpritesModule";
import { clearDoors, destroySpriteAssociatedDoor } from "../modules/doorModule";
import { clearHitboxes, destroyAssociatedHitbox } from "../modules/hitboxModule";
import { clearIdleAnimationCounters, destroyAssociatedIdleCounter, getIdleAnimationFromList, idleAnimationCounterIsOverLimit, incrementIdleAnimationCounter, resetIdleAnimationCounter } from "../modules/idleAnimationModule";
import { clearRandomAnimationCounters, destroyAssociatedRandomCounter, getRandomAnimation, getRandomDestination, incrementRandomAnimationCounter, randomAnimationCounterIsOverLimit, resetRandomAnimationCounter } from "../modules/randomAnimationModule"
import { checkIfSpriteCanMove, clearSpriteMovementDictionary, destroySpriteMovement, getSpriteDestination, initializeSpriteMovement, setSideStepDestination, spriteFailedToFindPath } from "../modules/spriteMovementModule";
import { removeSpriteById } from "./spriteController";

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
    destroySpriteMovement( sprite.spriteId );
    sprite.deactivateMovementModule();
}

export const handleSpriteMoveToDestination = ( sprite: Sprite ): void => {
    const destination = getSpriteDestination( sprite.spriteId );

    if ( destination.failedToFindPath ) {
        destroySpriteMovementToDestination( sprite );
    }

    if ( spriteNextPositionIsBlocked( sprite ) ) {
        handleBlockedSpriteCounter( sprite );
        if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
            destroyBlockedSpriteCounter( sprite.spriteId );
            setSideStepDestination( sprite );
        }
    }
    else {
        const movingToDestination = checkIfSpriteCanMove( sprite, destination );
        if ( !movingToDestination ) destroySpriteMovementToDestination( sprite );
    }
}

export const tryInitializeSpriteMovement = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
    destroyAssociatedAnimationIfExists( sprite );
    try {
        initializeSpriteMovement( sprite, destinationCell );
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
    clearSpriteMovementDictionary();
    clearSpriteAnimations();
    clearActions();
    clearDoors();
    clearHitboxes();
    clearIdleAnimationCounters();
    clearRandomAnimationCounters();
}

export const clearAllAssociatedSpriteModules = ( sprite: Sprite ) => {
    destroyBlockedSpriteCounter( sprite.spriteId );
    destroySpriteMovement( sprite.spriteId );
    destroySpriteAnimation( sprite );
    destroySpriteAssociatedAction( sprite.spriteId );
    destroySpriteAssociatedDoor( sprite.spriteId );
    destroyAssociatedHitbox( sprite.spriteId );
    destroyAssociatedIdleCounter( sprite.spriteId );
    destroyAssociatedRandomCounter( sprite.spriteId );
}