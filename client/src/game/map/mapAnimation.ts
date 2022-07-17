import { MovementType } from '../../enumerables/MovementTypeEnum';
import { SpriteStateEnum } from '../../enumerables/SpriteStateEnum';
import globals from '../../game-data/globals';
import { clearEntireCanvas } from '../../helpers/canvasHelpers';
import { getActiveDoors, unsetPendingDoor, setDoorAsPending, getPendingDoor } from '../../helpers/doorController';
import type { Sprite } from '../core/Sprite';
import type { Game } from "../Game";
import { handleMovementKeys } from './mapControls';

export const handleMapAnimations = ( GAME: Game ): void => {
    const PLAYER = GAME.PLAYER;
    clearEntireCanvas("FRONT");

    if ( globals.SCREEN.MOBILE ) {
        clearEntireCanvas("SPEECH");
    }

    drawSpritesInOrder( GAME )

    GAME.BACK.backgroundActions.forEach( ( e ) => { 
        e.updateXy( e.activeAction.x, e.activeAction.y )
    })
    
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    if ( GAME.PLAYER != undefined && !GAME.paused ) {
        handleMovementKeys( );  
    }

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })

    if ( GAME.FRONTGRID.hasFrontGrid ) {
        const tilesFront = GAME.PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    GAME.speechBubbleController.drawBubbles( );

    const doors = getActiveDoors( )
    let inDoorRange = false;

    doors.forEach( ( door ) => { 
        if ( PLAYER.hitbox.checkForDoorRange( door ) ) {
            let pendingDoor = getPendingDoor( );
            inDoorRange = true;
            if ( door.model.direction == PLAYER.direction && pendingDoor.id != door.id && pendingDoor.destination != door.model.doorTo ) {
                setDoorAsPending( door.id, door.model.doorTo )
                door.handle( );
            }
        }
    })

    if ( !inDoorRange ) {
        unsetPendingDoor( );
    }

    if ( GAME.cameraFocus.movingToNewFocus ) {
        GAME.cameraFocus.moveToNewFocus( );
    }
}

export const handleRoadNetworkFuncs = ( GAME: Game ): void => {
    if ( GAME.FRONT.roadNetwork != null ) {
        GAME.FRONT.roadNetwork.handleCarCounter()
        GAME.FRONT.roadNetwork.handleRoadCrossings();
    }
}

export const handleNpcCounter = ( GAME: Game ): void => {
    GAME.activeNeighbourhood.handleNPCCounter( );
}

export const drawSpritesInOrder = ( GAME: Game ): void => {
    GAME.FRONT.allSprites.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row && a.bottom > b.bottom ) {
            return 1 
        }
        else if (b.row > a.row || b.row === a.row && b.bottom > a.bottom ) {
            return -1
        }
        else {
            return 0
        }          
    })

    if ( GAME.debugMode ) {
        GAME.BACK.grid.array.forEach( ( tile ) => { 
            if ( tile.hasEvent ) {
                tile.event.updateXy( tile.event.x, tile.event.y );
            }
        })
    }

    const backgroundSprites = [];
    const standardSprites   = [];
    const foregroundSprites = [];
    const flyingSprites     = [];

    GAME.FRONT.tilesBlockedBySprites = [];

    GAME.FRONT.allSprites.forEach( ( sprite )  => {
        if ( sprite.model.onBackground ) {
            backgroundSprites.push( sprite );
        }
        else if ( sprite.model.notGrounded ) {
            foregroundSprites.push( sprite );
        }
        else if ( sprite.movementType == MovementType.flying && sprite.State.is( SpriteStateEnum.moving ) ) {
            flyingSprites.push( sprite );
        }
        else {
            standardSprites.push( sprite );
            GAME.FRONT.getTilesBlockedBySprite( sprite );
        }
    })
    
    if ( GAME.BACK.savepoint ) {
        GAME.BACK.savepoint.event.draw( )
    }
    
    drawSpritesInArray( backgroundSprites, GAME );
    drawSpritesInArray( standardSprites, GAME );
    drawSpritesInArray( foregroundSprites, GAME );
    drawSpritesInArray( flyingSprites, GAME );

    const cars = GAME.FRONT.allSprites.filter((e) => {return e.isCar;});
    cars.forEach((car)=>{car.State.decideStateFromPendingStateChanges( )});
}

export const drawSpritesInArray = ( array: Sprite[], GAME: Game ): void => {
    if ( !GAME.paused ) {
        array.forEach( ( sprite ) => {
            if ( GAME.paused ) {
                return;
            }
            sprite.drawSprite();
        })
    }
}