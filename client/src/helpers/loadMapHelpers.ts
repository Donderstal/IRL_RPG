import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game-data/globals';
import { activateMap, getActiveMap, getNeighbourhoodKey, getNeighbourhoodModel, getPreviousMapKey, hasActiveNeighbourhood, initializeNeighbourhood } from '../game/neighbourhoodModule';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import { getOppositeDirection } from './utilFunctions';
import type { CellPosition } from '../models/CellPositionModel';
import type { Sprite } from '../game/core/Sprite';
import type { MapModel } from '../models/MapModel';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../enumerables/InteractionType';
import { DirectionEnum } from '../enumerables/DirectionEnum';
import { cameraFocus } from '../game/cameraFocus';
import { getPlayer } from '../game/modules/sprites/spriteGetter';
import { clearAllSprites } from '../game/modules/sprites/spriteSetter';
import { clearSpriteModuleRegistries } from '../game/modules/moduleRegistrySetter';
import { clearActiveSoundEffects, setActiveMusic } from '../game/sound/sound';
import { clearCanvasGridMaps, clearCanvasGrids, setCanvasGridsDimensions } from '../game/canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getFrontTilesGrid } from '../game/canvas/canvasGetter';
import { checkForEventTrigger } from '../game/storyEvents/storyEventHandler';
import { clearStoryEventsForMap, setStoryEventsForMap } from '../game/storyEvents/storyEventSetter';
import { setPausedGameState } from '../game/gameState/gameState';
import { dismissActiveAction } from '../game/controllers/actionController';

export const loadMapToCanvases = ( mapData: MapModel, loadType, setPlayer = true, sprites: Sprite[] = null ): void => {
    const back = getBackTilesGrid();
    const front = getBackSpritesGrid();
    const frontgrid = getFrontTilesGrid();

    setStoryEventsForMap(mapData.key)
    if (setPlayer) {
        mapData.playerStart = mapData.playerStart != undefined ? mapData.playerStart : getPlayerCellInNewMap( mapData, loadType );        
    }
    else {
        mapData.playerStart = undefined;
    }

    back.initGrid( mapData.columns, mapData.rows );
    front.initGrid( mapData.columns, mapData.rows );
    frontgrid.initGrid( mapData.columns, mapData.rows );

    const sheetData = getTilesheetModelByKey( mapData.tileSet );

    back.setBackgroundData( mapData, sheetData );

    front.setForegroundData(mapData, sprites);

    frontgrid.setFrontgridData( mapData, sheetData );

    setActiveMusic( mapData.music != undefined ? mapData.music : getNeighbourhoodModel().music );
    mapData.playerStart = undefined;

    if ( setPlayer ) {
        const player = getPlayer();
        cameraFocus.handleScreenFlip( 
            { 'x': player.centerX, 'y': player.baseY}
        );

        cameraFocus.setSpriteFocus( player, true );
        setTimeout( ( ) => {
            checkForEventTrigger(CinematicTrigger.enter)     
        }, 250 )            
    }

    back.drawMapFromGridData();
    frontgrid.drawMapFromGridData();
}

export const switchMap = ( destinationName: string, type: InteractionType, playerStart: CellPosition = null ): void => {
    checkForEventTrigger( CinematicTrigger.leave, [destinationName, type] );
    clearActiveSoundEffects();
    setPausedGameState( true );

    setNeighbourhoodAndMap( destinationName );
    setCanvasDimensions( );

    clearCanvasGridMaps();
    clearCanvasGrids();

    clearSpriteModuleRegistries();
    clearAllSprites();

    clearStoryEventsForMap();
    getBackSpritesGrid().resetTilesBlockedBySprites();
    dismissActiveAction();

    if ( playerStart !== null ) {
        getActiveMap().playerStart = playerStart;
    }

    loadMapToCanvases( getActiveMap(), type );
    setTimeout( ( ) => {
        setPausedGameState( false ); 
    }, 100 )
}

const getPlayerCellInNewMap = ( mapData: MapModel, type: InteractionType ) => {
    let newPlayerCell: CellPosition = { row: null, column: null, direction: null };
    const previousMapKey = getPreviousMapKey()
    switch ( type ) {
        case InteractionType.door:
            [...mapData.doors, ...mapData.sprites.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                if ( previousMapKey == door.doorTo ) {
                    newPlayerCell.row = door.row;
                    newPlayerCell.column = door.column;
                    newPlayerCell.direction = getOppositeDirection(door.direction);
                }
            } )
            break;
        case InteractionType.bus:
            mapData.sprites.forEach( ( object ) => {
                if ( object.action != undefined && object.action[0].type == InteractionType.bus ) {
                    newPlayerCell.row = object.row;
                    newPlayerCell.column = object.column;
                    newPlayerCell.direction = DirectionEnum.down;
                }
            } )
            break;
    }
    return newPlayerCell
}

export const loadCinematicMap = ( mapName, setPlayer = false, playerStart = null ) => {
    setPausedGameState( true );
    clearActiveSoundEffects( );
    setNeighbourhoodAndMap( mapName );
    if ( setPlayer ) {
        getActiveMap().playerStart = playerStart;
    }
    loadMapToCanvases( 
        getActiveMap(), InteractionType.cinematic, setPlayer
    );
    setPausedGameState( false );

}

export const setNeighbourhoodAndMap = ( mapName: string ): void => {
    if ( !hasActiveNeighbourhood() || !mapName.includes( getNeighbourhoodKey() )) {
        initializeNeighbourhood(mapName);
    }
    else {
        activateMap(mapName);
    }
}

const setCanvasDimensions = (): void => {
    if ( getActiveMap().outdoors ) {
        let neighbourhoodModel = getNeighbourhoodModel();
        const width = neighbourhoodModel.horizontalSlots.length * CANVAS_WIDTH;
        const height = neighbourhoodModel.verticalSlots.length * CANVAS_HEIGHT;
        setCanvasGridsDimensions( width, height )
    }
    else {
        setCanvasGridsDimensions( CANVAS_WIDTH, CANVAS_HEIGHT );
    }
}