import { MovementType } from '../../enumerables/MovementTypeEnum';
import type { Sprite } from '../core/Sprite';
import { drawBubbles } from '../controllers/bubbleController';
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { getBackSprites, getDynamicSprites } from '../modules/sprites/spriteGetter';
import { drawRect } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX } from '../../game-data/globals';
import { SpriteModuleEnum } from '../../enumerables/SpriteModuleEnum';
import { handleNeighbourhoodNPCCounter } from '../neighbourhoodModule';
import { getBackSpritesGrid, getTileOnCanvasByIndex } from '../canvas/canvasGetter';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';
import { inDebugState, inPausedState } from '../../state/stateGetter';
import { moduleIsRunningForSprite } from '../modules/moduleRegistryGetter';
import { handleSpriteModules } from '../modules/moduleHandler';
import { handleSpritesScheduledForDelete } from '../modules/sprites/spriteHandler';
import { getBaseCellList, getDynamicallyBlockedTileIndexes, registerTilesBlockedByDynamicSprites } from './blockedTilesRegistry';
import { checkForEventTriggers, drawTriggers, updateAssociatedTrigger } from '../../event-triggers/triggerHandler';
import { getAssociatedHitbox } from '../modules/hitboxes/hitboxGetter';
import { TriggerType } from '../../enumerables/TriggerType';
import { PLAYER_ID } from '../../game-data/interactionGlobals';

export const handleMapAnimations = (): void => {
    clearSpriteCanvasGrids();
    clearUICanvasGrids()
    handleSpritesScheduledForDelete();
    registerTilesBlockedByDynamicSprites( getDynamicSprites() );

    drawSpritesInOrder( )
    drawTriggers();

    handleRoadNetworkFuncs()
    handleNpcCounter()

    drawBubbles();

    const playerHitbox = getAssociatedHitbox( PLAYER_ID );
    checkForEventTriggers( TriggerType.collision, playerHitbox );
}

export const drawSpritesInOrder = (): void => {
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
        else if ( b.row > a.row || b.row === a.row && b.bottom > a.bottom ) {
            return -1
        }
        else {
            return 0
        }
    } )

    if ( inDebugState() ) {
        const baseCells = getBaseCellList()
        baseCells.forEach( ( e, index ) => {
            if ( e === null ) {
                drawTileWithColor( index, 'orange' );
            }
        } )

        const indexes = getDynamicallyBlockedTileIndexes();
        indexes.forEach( ( e ) => {
            drawTileWithColor( e, 'red' );
        } )
    }
    spritesInView.forEach( ( sprite ) => {
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

    drawSpritesInArray( backgroundSprites );
    drawSpritesInArray( standardSprites );
    drawSpritesInArray( foregroundSprites );
    drawSpritesInArray( flyingSprites );

    handleOutOfScreenSprites( spritesOutOfView );
}
const handleRoadNetworkFuncs = ( ): void => {
    const backSpritesGrid = getBackSpritesGrid();
    if ( backSpritesGrid.roadNetwork != null ) {
        backSpritesGrid.roadNetwork.handleCarCounter();
    }
}
const handleNpcCounter = ( ): void => {
    handleNeighbourhoodNPCCounter( );
}
const drawSpritesInArray = ( array: Sprite[] ): void => {
    if ( !inPausedState() ) {
        array.forEach( ( sprite ) => { handleSpriteFrameLoop( sprite ) } );
    }
}
const handleOutOfScreenSprites = ( array: Sprite[]): void => {
    let movingSprites = array.filter( ( e ) => { return moduleIsRunningForSprite( e.spriteId, SpriteModuleEnum.movement ); } );
    if ( !inPausedState() ) {
        movingSprites.forEach( ( sprite ) => { handleSpriteFrameLoop( sprite, true ) } )
    }
}
const handleSpriteFrameLoop = ( sprite: Sprite, isOutOfScreen: boolean = false ): void => {
    if ( inPausedState() ) {
        return;
    }
    handleSpriteModules( sprite );
    isOutOfScreen ? sprite.updateCell() : sprite.drawSprite();
    updateAssociatedTrigger( sprite );
}
const drawTileWithColor = ( tileIndex: number, color: string ): void => {
    const backSpritesGrid = getBackSpritesGrid();
    const tile = getTileOnCanvasByIndex( tileIndex, CanvasTypeEnum.backSprites );
    if ( tile !== undefined ) {
        drawRect( backSpritesGrid.canvas, tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX, color );
    }
}