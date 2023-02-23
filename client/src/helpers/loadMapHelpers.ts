import { CANVAS_COLUMNS, CANVAS_HEIGHT, CANVAS_ROWS, CANVAS_WIDTH, GRID_BLOCK_PX } from '../game-data/globals';
import { activateMap, getActiveMap, getActiveMapKey, getNeighbourhoodKey, getNeighbourhoodModel, hasActiveNeighbourhood, initializeNeighbourhood } from '../game/neighbourhoodModule';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import type { Sprite } from '../game/core/Sprite';
import type { MapModel } from '../models/MapModel';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { cameraFocus } from '../game/cameraFocus';
import { getPlayer, getStaticSprites } from '../game/modules/sprites/spriteGetter';
import { clearSpriteModuleRegistries } from '../game/modules/moduleRegistrySetter';
import { clearActiveSoundEffects, setActiveMusic } from '../game/sound/sound';
import { clearCanvasGridMaps, clearCanvasGrids, setCanvasGridsDimensions } from '../game/canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getFrontTilesGrid, getTileOnCanvasByCell } from '../game/canvas/canvasGetter';
import { checkForEventTrigger } from '../game/storyEvents/storyEventHandler';
import { clearStoryEventsForMap, setStoryEventsForMap } from '../game/storyEvents/storyEventSetter';
import { setPausedGameState } from '../game/gameState/gameState';
import { dismissActiveAction } from '../game/controllers/actionController';
import { clearAllModuleRegistries } from '../game/modules/moduleSetter';
import { PlayerMapEntry } from '../enumerables/PlayerMapEntryEnum';
import { registerMapExit, setPlayerLocationOnMapLoad } from '../game/map/playerLocationOnMapLoad';
import { clearBlockedTilesRegistry, registerNewMap, registerTilesBlockedByStaticSprites } from '../game/map/blockedTilesRegistry';
import type { GridCellModel } from '../models/GridCellModel';

export const loadMapToCanvases = ( mapData: MapModel, loadType: PlayerMapEntry, setPlayer = true, sprites: Sprite[] = null, cameraFocusTile: GridCellModel = null ): void => {
    const neighbourhood = getNeighbourhoodModel();
    setPlayerLocationOnMapLoad( mapData, loadType);

    const back = getBackTilesGrid();
    const front = getBackSpritesGrid();
    const frontgrid = getFrontTilesGrid();

    setStoryEventsForMap(mapData.key)

    back.initGrid( mapData.columns, mapData.rows );
    front.initGrid( mapData.columns, mapData.rows );
    frontgrid.initGrid( mapData.columns, mapData.rows );

    const sheetData = getTilesheetModelByKey( mapData.tileSet );

    back.setBackgroundData( mapData, sheetData );
    front.setForegroundData( mapData, neighbourhood.carSpawnRate, sprites, setPlayer );
    frontgrid.setFrontgridData( mapData, sheetData );

    setActiveMusic( mapData.music != undefined ? mapData.music : neighbourhood.music );

    if ( setPlayer ) {
        const player = getPlayer();
        cameraFocus.handleScreenFlip(
            { 'x': player.centerX, 'y': player.baseY }
        );

        cameraFocus.setSpriteFocus( player, true );
        setTimeout( () => {
            checkForEventTrigger( CinematicTrigger.enter )
        }, 250 )
    }
    else if ( cameraFocusTile !== null ) {
        const cameraTile = back.getTileAtCell( cameraFocusTile.column, cameraFocusTile.row );
        cameraFocus.setTileFocus( cameraTile, true );
    }

    registerBlockedTilesOnMap();
    back.drawMapFromGridData();
    frontgrid.drawMapFromGridData();
}

export const switchMap = ( destinationName: string, loadType: PlayerMapEntry, exitId: string = null, setPlayer: boolean = true, cameraFocusTile: GridCellModel = null ): void => {
    if ( checkForEventTrigger( CinematicTrigger.leave, [destinationName, loadType, exitId] ) ) return;

    clearBlockedTilesRegistry();
    if ( loadType !== PlayerMapEntry.cinematic ) {
        registerMapExit( getActiveMapKey(), exitId );
    }
    
    clearActiveSoundEffects();
    setPausedGameState( true );

    setNeighbourhoodAndMap( destinationName, loadType );
    setCanvasDimensions();

    clearActiveMap();

    clearStoryEventsForMap();
    dismissActiveAction();

    loadMapToCanvases( getActiveMap(), loadType, setPlayer, null, cameraFocusTile );
    setTimeout( () => {
        setPausedGameState( false ); 
    }, 100 )
}

export const clearActiveMap = () => {
    clearActiveSoundEffects();
    clearCanvasGridMaps();
    clearCanvasGrids();

    clearSpriteModuleRegistries();
    clearAllModuleRegistries();

    clearStoryEventsForMap();
}

export const loadCinematicMap = ( mapName, setPlayer = false ) => {
    setPausedGameState( true );
    clearActiveSoundEffects( );
    setNeighbourhoodAndMap( mapName, PlayerMapEntry.cinematic );
    loadMapToCanvases( 
        getActiveMap(), PlayerMapEntry.cinematic, setPlayer
    );
    setPausedGameState( false );

}

export const setNeighbourhoodAndMap = ( mapName: string, playerMapEntry: PlayerMapEntry ): void => {
    if ( !hasActiveNeighbourhood() || !mapName.includes( getNeighbourhoodKey() )) {
        initializeNeighbourhood( mapName, playerMapEntry );
    }
    else {
        activateMap( mapName, playerMapEntry );
    }
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