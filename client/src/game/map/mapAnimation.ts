import { MovementType } from '../../enumerables/MovementTypeEnum';
import { PLAYER_ID } from '../../game-data/interactionGlobals';
import type { Sprite } from '../core/Sprite';
import { getActiveDoors } from '../modules/doors/doorGetter';
import { getAssociatedHitbox } from '../modules/hitboxes/hitboxGetter';
import { drawBubbles } from '../controllers/bubbleController';
import { cameraFocus } from '../cameraFocus';
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { setActiveCinematic } from '../controllers/cinematicController';
import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import { addDoorToUnlockedDoorsRegistry } from '../../registries/doorRegistry';
import { getBackSprites, getDynamicSprites, getPlayer, getSpriteById } from '../modules/sprites/spriteGetter';
import type { Door } from './map-classes/Door';
import { drawRect } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX } from '../../game-data/globals';
import { SpriteModuleEnum } from '../../enumerables/SpriteModuleEnum';
import { playEffect } from '../sound/sound';
import { handleNeighbourhoodNPCCounter } from '../neighbourhoodModule';
import { getBackSpritesGrid, getTileOnCanvasByIndex } from '../canvas/canvasGetter';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';
import { inDebugState, inPausedState } from '../../state/stateGetter';
import { switchMap } from '../../helpers/loadMapHelpers';
import { moduleIsRunningForSprite } from '../modules/moduleRegistryGetter';
import { handleSpriteModules } from '../modules/moduleHandler';
import { drawSavePoint } from '../modules/actions/actionHandlers';
import { PlayerMapEntry } from '../../enumerables/PlayerMapEntryEnum';
import { INTERACTION_LOCKED_DOOR, INTERACTION_UNLOCK_DOOR } from '../../resources/interactionResources';
import { handleSpritesScheduledForDelete } from '../modules/sprites/spriteHandler';
import { getBaseCellList, getDynamicallyBlockedTileIndexes, registerTilesBlockedByDynamicSprites } from './blockedTilesRegistry';
import { queueEvent } from '../../events/eventQueueSetter';
import { checkForQueuedEvent } from '../../events/eventQueueHandler';

export const handleMapAnimations = (): void => {
    const event = checkForQueuedEvent();
    if ( event !== null ) {
        setActiveCinematic( event.interaction, event.trigger, event.options )
        return;
    }

    const player = getPlayer();
    const playerHitbox = getAssociatedHitbox( PLAYER_ID );

    clearSpriteCanvasGrids();
    clearUICanvasGrids()
    handleSpritesScheduledForDelete();
    registerTilesBlockedByDynamicSprites( getDynamicSprites() );

    drawSpritesInOrder( )
    
    handleRoadNetworkFuncs()
    handleNpcCounter()

    //backSpritesGrid.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    drawBubbles();

    const doors = getActiveDoors();

    Object.values(doors).forEach( ( door ) => { 
        if ( inDebugState() ) {
            door.draw();
        }

        if ( playerHitbox !== undefined && playerHitbox.isInDoorRange( door ) && door.model.direction === player.direction ) {
            handleDoor( door );
        }
    })

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}

const handleDoor = ( door: Door ): void => {
    if ( !door.meetsCondition ) {
        queueEvent( INTERACTION_LOCKED_DOOR[0], CinematicTrigger.interaction, [PLAYER_ID] );
    }
    else if ( door.model.condition !== undefined ) {
        queueEvent(
            INTERACTION_UNLOCK_DOOR[0], CinematicTrigger.leave, [door.model.doorTo, PlayerMapEntry.door, door.model.id]
        );
        door.metConditionAtLastCheck = true;
        addDoorToUnlockedDoorsRegistry( door.registryString );
    }
    else {
        switchMap( door.model.doorTo, PlayerMapEntry.door, door.model.id );
        playEffect( "misc/random5.wav" );
    }
}

export const handleRoadNetworkFuncs = ( ): void => {
    const backSpritesGrid = getBackSpritesGrid();
    if ( backSpritesGrid.roadNetwork != null ) {
        backSpritesGrid.roadNetwork.handleCarCounter();
    }
}

export const handleNpcCounter = ( ): void => {
    handleNeighbourhoodNPCCounter( );
}

export const drawSpritesInOrder = ( ): void => {
    const backSpritesGrid = getBackSpritesGrid();

    const backgroundSprites = [];
    const standardSprites = [];
    const foregroundSprites = [];
    const flyingSprites = [];
    const spritesInView = getBackSprites().filter( ( e ) => { return e.isVisible() } );
    const spritesOutOfView = getBackSprites().filter( ( e ) => { return !e.isVisible() } );

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

    if ( inDebugState() ) {
        const baseCells = getBaseCellList()
        baseCells.forEach( ( e, index ) => {
            if ( e === null ) {
                const tile = getTileOnCanvasByIndex( index, CanvasTypeEnum.backSprites );
                if ( tile !== undefined ) {
                    drawRect( backSpritesGrid.canvas, tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX, 'orange' );
                }
            }
        } )

        const indexes = getDynamicallyBlockedTileIndexes();
        indexes.forEach( ( e ) => {
            const tile = getTileOnCanvasByIndex( e, CanvasTypeEnum.backSprites );
            if ( tile !== undefined ) {
                drawRect( backSpritesGrid.canvas, tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX, 'red' );
            }
        } )
    }
    spritesInView.forEach( ( sprite )  => {
        if ( sprite.model.onBackground ) {
            backgroundSprites.push( sprite );
        }
        else if ( sprite.model.notGrounded ) {
            foregroundSprites.push( sprite );
        }
        else if ( sprite.movementType == MovementType.flying && moduleIsRunningForSprite( sprite.spriteId, SpriteModuleEnum.movement ) ) {
            flyingSprites.push( sprite );
        }
        else {
            standardSprites.push( sprite );
        }
    } )

    drawSavePoint();
    
    drawSpritesInArray( backgroundSprites );
    drawSpritesInArray( standardSprites );
    drawSpritesInArray( foregroundSprites );
    drawSpritesInArray( flyingSprites );

    handleMovingSpriteModules( spritesOutOfView );
}

export const drawSpritesInArray = ( array: Sprite[] ): void => {
    if ( !inPausedState() ) {
        array.forEach( ( sprite ) => {
            if ( inPausedState() ) {
                return;
            }
            handleSpriteModules( sprite );
            sprite.drawSprite();
        })
    }
}

export const handleMovingSpriteModules = ( array: Sprite[]): void => {
    let movingSprites = array.filter( ( e ) => { return moduleIsRunningForSprite( e.spriteId, SpriteModuleEnum.movement ); } );
    if ( !inPausedState() ) {
        movingSprites.forEach( ( sprite ) => {
            if ( inPausedState() ) {
                return;
            }
            handleSpriteModules(sprite);
            sprite.updateCell();
        } )
    }
}