import { MovementType } from '../../enumerables/MovementTypeEnum';
import { SpriteStateEnum } from '../../enumerables/SpriteStateEnum';
import { PLAYER_ID } from '../../game-data/interactionGlobals';
import { unsetPendingDoor, setDoorAsPending, getPendingDoor } from '../controllers/doorController';
import type { Sprite } from '../core/Sprite';
import type { Game } from "../Game";
import { getAllDoors } from '../modules/doorModule';
import { getAssociatedHitbox } from '../modules/hitboxModule';
import { handleMovementKeys } from '../controls';
import { drawBubbles } from '../controllers/bubbleController';
import { cameraFocus } from '../cameraFocus';
import { mobileAgent } from '../../helpers/screenOrientation';
import { clearCanvasOfType } from '../controllers/gridCanvasController';
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { initInteractionModel } from '../../helpers/modelFactory';
import { setActiveCinematic } from '../controllers/cinematicController';
import { lockedDoorEvent, unlockDoorEvent } from '../../resources/actionResources';
import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../../enumerables/InteractionType';
import { addDoorToUnlockedDoorsRegistry } from '../../helpers/doorRegistry';

export const handleMapAnimations = ( GAME: Game ): void => {
    const playerHitbox = getAssociatedHitbox( PLAYER_ID );

    clearCanvasOfType( CanvasTypeEnum.backSprites );

    if ( mobileAgent ) {
        clearCanvasOfType( CanvasTypeEnum.overview );
    }

    drawSpritesInOrder( GAME )
    
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    if ( GAME.PLAYER != undefined && !GAME.paused ) {
        handleMovementKeys( );  
    }

    //GAME.FRONT.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    if ( GAME.FRONTGRID.hasFrontGrid ) {
        const tilesFront = GAME.PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    drawBubbles();

    const doors = getAllDoors();
    let inDoorRange = false;

    doors.forEach( ( door ) => { 
        if ( GAME.debugMode ) {
            door.draw();
        }

        if ( playerHitbox.doorInRange( door ) ) {
            inDoorRange = true;
            handleDoor( GAME, door );
        }
    })

    if ( !inDoorRange ) {
        unsetPendingDoor( );
    }

    if ( cameraFocus.movingToNewFocus ) {
        cameraFocus.moveToNewFocus( );
    }
}

const handleDoor = ( GAME, door ): void => {
    const PLAYER = GAME.PLAYER;
    let pendingDoor = getPendingDoor();

    if ( door.model.direction == PLAYER.direction && pendingDoor.id != door.id && pendingDoor.destination != door.model.doorTo ) {
        setDoorAsPending( door.id, door.model.doorTo )
        if ( !door.meetsCondition ) {
            setActiveCinematic(
                initInteractionModel( lockedDoorEvent ), CinematicTrigger.interaction, [PLAYER_ID]
            );
        }
        else if ( door.model.condition !== undefined ) {
            setActiveCinematic(
                initInteractionModel( unlockDoorEvent ), CinematicTrigger.leave, [door.model.doorTo, InteractionType.door.toString()]
            );
            door.metConditionAtLastCheck = true;
            addDoorToUnlockedDoorsRegistry( door.registryString );
        }
        else {
            GAME.switchMap( door.model.doorTo, InteractionType.door );
            GAME.sound.playEffect( "misc/random5.wav" );
        }
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

    GAME.FRONT.resetTilesBlockedBySprites();
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
        GAME.BACK.savepoint.draw( )
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