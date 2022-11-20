import { MovementType } from '../../enumerables/MovementTypeEnum';
import { PLAYER_ID } from '../../game-data/interactionGlobals';
import { unsetPendingDoor, setDoorAsPending, getPendingDoor } from '../controllers/doorController';
import type { Sprite } from '../core/Sprite';
import type { Game } from "../Game";
import { getActiveDoors } from '../modules/doors/doorGetter';
import { getAssociatedHitbox } from '../modules/hitboxes/hitboxGetter';
import { handleMovementKeys } from '../controls';
import { drawBubbles } from '../controllers/bubbleController';
import { cameraFocus } from '../cameraFocus';
import { clearGridCanvasOfType, getTileOnCanvasByIndex } from '../controllers/gridCanvasController';
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { initInteractionModel } from '../../helpers/modelFactory';
import { setActiveCinematic } from '../controllers/cinematicController';
import { lockedDoorEvent, unlockDoorEvent } from '../../resources/actionResources';
import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../../enumerables/InteractionType';
import { addDoorToUnlockedDoorsRegistry } from '../../registries/doorRegistry';
import { clearUtilityCanvasOfType } from '../controllers/utilityCanvasController';
import { getBackSprites, getPlayer, getSpriteById } from '../modules/sprites/spriteGetter';
import type { Door } from './map-classes/Door';
import { drawRect } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX } from '../../game-data/globals';
import { SpriteModuleEnum } from '../../enumerables/SpriteModuleEnum';
import { handleSpriteModules, pluginIsRunning } from '../spriteModuleHandler';
import { playEffect } from '../sound/sound';
import { handleNeighbourhoodNPCCounter } from '../Neighbourhood';

export const handleMapAnimations = ( GAME: Game ): void => {
    const playerHitbox = getAssociatedHitbox( PLAYER_ID );

    clearGridCanvasOfType( CanvasTypeEnum.backSprites );
    clearUtilityCanvasOfType( CanvasTypeEnum.speechBubbleCanvas );

    drawSpritesInOrder( GAME )
    
    //handleRoadNetworkFuncs(GAME)
    //handleNpcCounter(GAME)

    if ( getPlayer() != undefined && !GAME.paused ) {
        handleMovementKeys( );  
    }

    //GAME.FRONT.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    //if ( GAME.FRONTGRID.hasFrontGrid ) {
    //    const tilesFront = GAME.PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
    //    GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    //}

    drawBubbles();

    const doors = getActiveDoors();
    let inDoorRange = false;

    Object.values(doors).forEach( ( door ) => { 
        if ( GAME.debugMode ) {
            door.draw();
        }

        if ( playerHitbox !== undefined && playerHitbox.doorInRange( door ) ) {
            inDoorRange = true;
            handleDoor( GAME, door );
        }
    })

    if ( !inDoorRange ) {
        unsetPendingDoor( );
    }

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}

const handleDoor = ( GAME: Game, door: Door ): void => {
    const player = getPlayer();
    let pendingDoor = getPendingDoor();

    if ( door.model.direction == player.direction && pendingDoor.id != door.id && pendingDoor.destination != door.model.doorTo ) {
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
            playEffect( "misc/random5.wav" );
        }
    }
}

export const handleRoadNetworkFuncs = ( GAME: Game ): void => {
    if ( GAME.FRONT.roadNetwork != null ) {
        GAME.FRONT.roadNetwork.handleCarCounter()
        GAME.FRONT.roadNetwork.handleRoadCrossings();
    }
}

export const handleNpcCounter = ( ): void => {
    handleNeighbourhoodNPCCounter( );
}

export const drawSpritesInOrder = ( GAME: Game ): void => {
    const backgroundSprites = [];
    const standardSprites = [];
    const foregroundSprites = [];
    const flyingSprites = [];
    const spritesInView = getBackSprites().filter( ( e ) => {
        return cameraFocus.xyValueIsInView( e.left, e.top )
            || cameraFocus.xyValueIsInView( e.left, e.bottom )
            || cameraFocus.xyValueIsInView( e.right, e.top )
            || cameraFocus.xyValueIsInView( e.right, e.bottom );
    } )

    const spritesOutOfView = getBackSprites().filter( ( e ) => {
        return !( cameraFocus.xyValueIsInView( e.left, e.top )
            || cameraFocus.xyValueIsInView( e.left, e.bottom )
            || cameraFocus.xyValueIsInView( e.right, e.top )
            || cameraFocus.xyValueIsInView( e.right, e.bottom ) );
    } )

    spritesInView.sort( ( a, b ) => {
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
        GAME.FRONT.tilesBlockedBySprites.forEach( ( e ) => {
            const tile = getTileOnCanvasByIndex( e, CanvasTypeEnum.backSprites );
            if ( tile !== undefined ) {
                drawRect( GAME.FRONT.canvas, tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX, 'red' );
            }
        } )
    }
    GAME.FRONT.resetTilesBlockedBySprites();
    spritesOutOfView.forEach( ( sprite ) => {
        if ( !(sprite.model.onBackground || sprite.model.notGrounded
            || ( sprite.movementType == MovementType.flying && pluginIsRunning( sprite.spriteId, SpriteModuleEnum.movement ) ) ) ) {
            GAME.FRONT.setTilesBlockedBySprite( sprite );
        }
    } )
    spritesInView.forEach( ( sprite )  => {
        if ( sprite.model.onBackground ) {
            backgroundSprites.push( sprite );
        }
        else if ( sprite.model.notGrounded ) {
            foregroundSprites.push( sprite );
        }
        else if ( sprite.movementType == MovementType.flying && pluginIsRunning( sprite.spriteId, SpriteModuleEnum.movement ) ) {
            flyingSprites.push( sprite );
        }
        else {
            standardSprites.push( sprite );
            GAME.FRONT.setTilesBlockedBySprite( sprite );
        }
    })
    if ( GAME.BACK.savepoint ) {
        GAME.BACK.savepoint.draw( )
    }
    
    drawSpritesInArray( backgroundSprites, GAME );
    drawSpritesInArray( standardSprites, GAME );
    drawSpritesInArray( foregroundSprites, GAME );
    drawSpritesInArray( flyingSprites, GAME );

    handleMovingSpriteModules( spritesOutOfView, GAME );
}

export const drawSpritesInArray = ( array: Sprite[], GAME: Game ): void => {
    if ( !GAME.paused ) {
        array.forEach( ( sprite ) => {
            if ( GAME.paused ) {
                return;
            }
            handleSpriteModules( sprite );
            sprite.drawSprite();
        })
    }
}

export const handleMovingSpriteModules = ( array: Sprite[], GAME: Game ): void => {
    let movingSprites = array.filter( ( e ) => { return pluginIsRunning( e.spriteId, SpriteModuleEnum.movement ); } );
    if ( !GAME.paused ) {
        movingSprites.forEach( ( sprite ) => {
            if ( GAME.paused ) {
                return;
            }
            handleSpriteModules(sprite);
            sprite.updateCell();
        } )
    }
}