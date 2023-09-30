import { CANVAS_COLUMNS, CANVAS_HEIGHT, CANVAS_ROWS, CANVAS_WIDTH, GRID_BLOCK_PX } from '../game-data/globals';
import { markMapAsActive, getActiveMap, getActiveMapKey, getNeighbourhoodModel, initializeNeighbourhood } from '../game/neighbourhoodModule';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import type { Sprite } from '../game/core/Sprite';
import type { MapModel } from '../models/MapModel';
import { getSpriteById, getStaticSprites } from '../game/modules/sprites/spriteGetter';
import { clearSpriteModuleRegistries } from '../game/modules/moduleRegistrySetter';
import { clearActiveSoundEffects, setActiveMusic } from '../game/sound/sound';
import { clearCanvasGridMaps, clearCanvasGrids, setCanvasGridsDimensions } from '../game/canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getFrontTilesGrid } from '../game/canvas/canvasGetter';
import { setPausedState } from '../state/stateSetter';
import { clearAllModuleRegistries } from '../game/modules/moduleSetter';
import { PlayerMapEntry } from '../enumerables/PlayerMapEntryEnum';
import { registerMapExit, setPlayerLocationOnMapLoad } from '../game/map/playerLocationOnMapLoad';
import { clearBlockedTilesRegistry, registerNewMap, registerTilesBlockedByStaticSprites } from '../game/map/blockedTilesRegistry';
import type { GridCellModel } from '../models/GridCellModel';
import type { TriggerModel } from '../models/TriggerModel';
import type { BackTileGrid } from '../game/canvas/BackTileGrid';
import { setTrigger } from '../event-triggers/triggerSetter';
import { determineMapNeighbourhood } from '../resources/mapResources/mapIds';
import { checkForEventTriggers } from '../event-triggers/triggerHandler';
import { TriggerType } from '../enumerables/TriggerType';
import { getFocusCameraOnSpriteContract, getFocusCameraOnTileContract } from '../factories/contractFactory';
import { PLAYER_ID } from '../game-data/interactionGlobals';
import { registerNewContract } from '../contracts/contractRegistry';

export const loadMapToCanvases = ( mapData: MapModel, loadType: PlayerMapEntry, setPlayer = true, sprites: Sprite[] = null, cameraFocusTile: GridCellModel = null ): void => {
    const neighbourhood = getNeighbourhoodModel();
    setPlayerLocationOnMapLoad( mapData, loadType);

    const back = getBackTilesGrid();
    const front = getBackSpritesGrid();
    const frontgrid = getFrontTilesGrid();

    back.initGrid( mapData.columns, mapData.rows );
    front.initGrid( mapData.columns, mapData.rows );
    frontgrid.initGrid( mapData.columns, mapData.rows );

    const sheetData = getTilesheetModelByKey( mapData.tileSet );

    back.setBackgroundData( mapData, sheetData );
    front.setForegroundData( mapData, neighbourhood.carSpawnRate );
    frontgrid.setFrontgridData( mapData, sheetData );

    setTriggers( mapData.triggers, back );

    setActiveMusic( mapData.music != undefined ? mapData.music : neighbourhood.music );

    setCameraFocus( setPlayer, cameraFocusTile );

    registerBlockedTilesOnMap();
    back.drawMapFromGridData();
    frontgrid.drawMapFromGridData();

    checkForEventTriggers( TriggerType.map_enter );
}

export const switchMap = ( destinationName: string, loadType: PlayerMapEntry, exitId: string = null, setPlayer: boolean = true, cameraFocusTile: GridCellModel = null ): void => {
    checkForEventTriggers( TriggerType.map_leave );
    clearBlockedTilesRegistry();

    if ( loadType !== PlayerMapEntry.cinematic ) {
        registerMapExit( getActiveMapKey(), exitId );
    }
    
    clearActiveSoundEffects();
    setPausedState( true );

    setNeighbourhoodAndMap( destinationName, loadType );
    setCanvasDimensions();

    clearActiveMap();

    loadMapToCanvases( getActiveMap(), loadType, setPlayer, null, cameraFocusTile );
    setTimeout( () => {
        setPausedState( false ); 
    }, 100 )
}

export const clearActiveMap = () => {
    clearActiveSoundEffects();
    clearCanvasGridMaps();
    clearCanvasGrids();

    clearSpriteModuleRegistries();
    clearAllModuleRegistries();
}

export const loadCinematicMap = ( mapName, setPlayer = false ) => {
    setPausedState( true );
    clearActiveSoundEffects( );
    setNeighbourhoodAndMap( mapName, PlayerMapEntry.cinematic );
    loadMapToCanvases( 
        getActiveMap(), PlayerMapEntry.cinematic, setPlayer
    );
    setPausedState( false );

}

export const setNeighbourhoodAndMap = ( mapName: string, playerMapEntry: PlayerMapEntry ): void => {
    const neighbourhoodId = determineMapNeighbourhood( mapName );
    initializeNeighbourhood( neighbourhoodId );
    markMapAsActive( mapName, playerMapEntry );
}

const registerBlockedTilesOnMap = (): void => {
    const backGrid = getBackTilesGrid();
    const sprites = getStaticSprites();

    registerNewMap( backGrid );
    registerTilesBlockedByStaticSprites( sprites );
}

const setCanvasDimensions = (): void => {
    const map = getActiveMap();
    if ( map.outdoors ) {
        let neighbourhoodModel = getNeighbourhoodModel();
        const width = neighbourhoodModel.horizontalSlots.length * CANVAS_WIDTH;
        const height = neighbourhoodModel.verticalSlots.length * CANVAS_HEIGHT;
        setCanvasGridsDimensions( width, height )
    }
    else if ( map.columns > CANVAS_COLUMNS || map.rows > CANVAS_ROWS ) {
        setCanvasGridsDimensions( map.columns * GRID_BLOCK_PX, map.rows * GRID_BLOCK_PX );
    }
    else {
        setCanvasGridsDimensions( CANVAS_WIDTH, CANVAS_HEIGHT );
    }
}

const setCameraFocus = ( setPlayer: boolean, cameraFocusTile: GridCellModel ): void => {
    let cameraFocusContract = null;
    if ( setPlayer ) {
        cameraFocusContract = getFocusCameraOnSpriteContract( PLAYER_ID, true );
    }
    else if ( cameraFocusTile !== null ) {
        cameraFocusContract = getFocusCameraOnTileContract( cameraFocusTile, true )
    }
    if ( cameraFocusContract !== null ) {
        registerNewContract( cameraFocusContract )
    }
}

const setTriggers = ( triggerList: TriggerModel[], back: BackTileGrid ): void => {
    triggerList.forEach( ( e ) => {
        if ( e.spriteId !== null && e.spriteId !== undefined ) {
            setSpriteBasedTrigger( e );
        }
        else if ( e.triggerType !== null && e.triggerType !== undefined ) {
            setTrigger( e );
        }
        else {
            setTileBasedTrigger( e, back );
        }
    } )
}

const setSpriteBasedTrigger = ( trigger: TriggerModel ): void => {
    const sprite = getSpriteById( trigger.spriteId );
    if ( sprite == null ) {
        console.error( `Error setting trigger ${trigger.eventId}. No sprite could be found with id ${sprite}` );
    }
    setTrigger( trigger, sprite );
}
const setTileBasedTrigger = ( trigger: TriggerModel, back: BackTileGrid ): void => {
    const tile = back.getTileAtCell( trigger.column, trigger.row );
    if ( tile == null ) {
        console.error( `Error setting trigger ${trigger.eventId}. No tile could be found a column ${trigger.column}, row ${trigger.row}` );
    }
    setTrigger( trigger, tile );
}