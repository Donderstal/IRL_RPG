import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { SpriteStateEnum } from "../../enumerables/SpriteStateEnum";
import globals from "../../game-data/globals";
import type { Sprite } from "../core/Sprite";
import type { Tile } from "../core/Tile";
import { Destination } from "../map/map-classes/Destination";
import { checkForCollision } from "../map/collision";
import { destroySpriteAnimation, spriteHasAnimation } from "./animationModule";
import { blockedSpriteCounterIsOverLimit, destroyBlockedSpriteCounter, handleBlockedSpriteCounter } from "./blockedSpritesModule";
import { getRandomDestinationInRadius } from "../../helpers/utilFunctions";
import { cameraFocus } from "../cameraFocus";
import type { DestinationCellModel } from "../../models/DestinationCellModel";
import { DestinationType } from "../../enumerables/DestinationType";

let movementDictionary: { [key in string]: Destination } = {};

export const initializeSpriteMovement = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
    if ( spriteHasAnimation( sprite.spriteId ) ) {
        destroySpriteAnimation( sprite );
    }
    try {
        movementDictionary[sprite.spriteId] = new Destination( destinationCell, sprite );
        sprite.State.set( SpriteStateEnum.pathfinding );
    }
    catch ( ex ) {
        console.log( 'error generating path for destination c' + destinationCell.column + ' r' + destinationCell.row );
        console.log( ex );
        if ( destinationCell.type === DestinationType.randomGeneratedSprite ) {
            globals.GAME.FRONT.deleteSprite( sprite.spriteId );
        } 
    }
};
export const handleSpriteMovement = ( sprite: Sprite ): void => {
    if ( spriteHasAnimation( sprite.spriteId ) ) {
        destroySpriteAnimation( sprite );
    }
    const destination = getSpriteDestination( sprite.spriteId );
    checkIfSpriteCanMove( sprite, destination );
};
export const destroySpriteMovement = ( sprite: Sprite ): void => {
    const id = sprite.spriteId;
    const destination = movementDictionary[id];
    destination.snapSpriteToCurrentStepTile( sprite )
    if ( destination.type === DestinationType.randomGeneratedSprite ) {
        globals.GAME.FRONT.deleteSprite( id );
    } 
    delete movementDictionary[id];
};
export const clearSpriteMovementDictionary = (): void => {
    movementDictionary = {}
};
export const getSpriteDestination = ( spriteId: string ): Destination => {
    return movementDictionary[spriteId];
};
const checkIfSpriteCanMove = ( sprite: Sprite, destination: Destination ) => {
    const direction = destination.getNextStepDirection( sprite );
    const tile = destination.getNextStepTile();
    if ( direction !== null && tile !== null ) {
        moveSpriteInDirection( sprite, direction, tile );
    }
    else if ( destination.hasNextStep ) { 
        destination.setNextStep( sprite );
        if ( sprite.isCar ) return;
        destination.setPath( sprite );
    }
    else if ( destination.inSideStep ) {
        destination.resetOriginalDestination( sprite );
    }
    //else if ( !destination.hasNextStep() && sprite.isCar
    //    && cameraFocus.xyValueIsInView( sprite.centerX, sprite.baseY )
    //    && destination.type === DestinationType.randomGeneratedSprite ) {
    //    const road = getRoadOfCar( sprite );
    //    const newDestination = getValidCarDestination( { column: sprite.column, row: sprite.row }, road );
    //    initializeSpriteMovement( sprite, newDestination );
    //}
    else {
        sprite.deactivateMovementModule();
        destroySpriteMovement( sprite );
    }
};
export const moveSpriteInDirection = ( sprite: Sprite, direction: DirectionEnum, tile: Tile = null ) => {
    sprite.setDirection( direction, tile );
    if ( checkForCollision( sprite ) ) {
        handleSpriteInBlockedState( sprite );
    }
    switch ( direction ) {
        case DirectionEnum.left:
            sprite.x -= sprite.speed;
            break;
        case DirectionEnum.up:
            sprite.y -= sprite.speed;
            break;
        case DirectionEnum.right:
            sprite.x += sprite.speed;
            break;
        case DirectionEnum.down:
            sprite.y += sprite.speed;
            break;
    }
    if ( cameraFocus.focusSpriteId == sprite.spriteId && !cameraFocus.movingToNewFocus ) {
        cameraFocus.centerOnXY( sprite.centerX, sprite.baseY );
    }
    sprite.movementFrameCounter();
};
const handleSpriteInBlockedState = (sprite: Sprite) => {
    if ( sprite.isPlayer || sprite.isCar ) return;
    handleBlockedSpriteCounter( sprite );
    if ( blockedSpriteCounterIsOverLimit( sprite.spriteId ) ) {
        destroyBlockedSpriteCounter( sprite.spriteId );
        if ( !sprite.isCar ) {
            const destination = getSpriteDestination( sprite.spriteId );
            const sideStepDestination = getRandomDestinationInRadius( sprite, 2 );
            if ( sideStepDestination === null ) return;
            destination.setSideStep( sideStepDestination, sprite );
        }
    }
}
export const spriteHasMovement = ( spriteId: string ): boolean => {
    return spriteId in movementDictionary;
}