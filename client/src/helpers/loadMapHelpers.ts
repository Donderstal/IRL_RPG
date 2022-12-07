import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game-data/globals';
import { activateMap, getActiveMap, getActiveMapKey, getNeighbourhoodKey, getNeighbourhoodModel, getPreviousMapKey, hasActiveNeighbourhood, initializeNeighbourhood } from '../game/neighbourhoodModule';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import type { CellPosition } from '../models/CellPositionModel';
import type { Sprite } from '../game/core/Sprite';
import type { MapModel } from '../models/MapModel';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { cameraFocus } from '../game/cameraFocus';
import { getPlayer } from '../game/modules/sprites/spriteGetter';
import { clearSpriteModuleRegistries } from '../game/modules/moduleRegistrySetter';
import { clearActiveSoundEffects, setActiveMusic } from '../game/sound/sound';
import { clearCanvasGridMaps, clearCanvasGrids, setCanvasGridsDimensions } from '../game/canvas/canvasSetter';
import { getBackSpritesGrid, getBackTilesGrid, getFrontTilesGrid } from '../game/canvas/canvasGetter';
import { checkForEventTrigger } from '../game/storyEvents/storyEventHandler';
import { clearStoryEventsForMap, setStoryEventsForMap } from '../game/storyEvents/storyEventSetter';
import { setPausedGameState } from '../game/gameState/gameState';
import { dismissActiveAction } from '../game/controllers/actionController';
import { clearAllModuleRegistries } from '../game/modules/moduleSetter';
import { PlayerMapEntry } from '../enumerables/PlayerMapEntryEnum';
import { registerMapExit, setPlayerLocationOnMapLoad } from '../game/map/playerLocationOnMapLoad';

export const loadMapToCanvases = ( mapData: MapModel, loadType: PlayerMapEntry, setPlayer = true, sprites: Sprite[] = null ): void => {
    setPlayerLocationOnMapLoad( mapData , loadType);

    const back = getBackTilesGrid();
    const front = getBackSpritesGrid();
    const frontgrid = getFrontTilesGrid();

    setStoryEventsForMap(mapData.key)

    back.initGrid( mapData.columns, mapData.rows );
    front.initGrid( mapData.columns, mapData.rows );
    frontgrid.initGrid( mapData.columns, mapData.rows );

    const sheetData = getTilesheetModelByKey( mapData.tileSet );

    back.setBackgroundData( mapData, sheetData );
    front.setForegroundData( mapData, sprites, setPlayer );
    frontgrid.setFrontgridData( mapData, sheetData );

    setActiveMusic( mapData.music != undefined ? mapData.music : getNeighbourhoodModel().music );

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

export const switchMap = ( destinationName: string, loadType: PlayerMapEntry, playerStart: CellPosition = null ): void => {
    registerMapExit( getActiveMapKey() );
    checkForEventTrigger( CinematicTrigger.leave, [destinationName, loadType] );
    clearActiveSoundEffects();
    setPausedGameState( true );

    setNeighbourhoodAndMap( destinationName );
    setCanvasDimensions();

    clearActiveMap();

    clearStoryEventsForMap();
    getBackSpritesGrid().resetTilesBlockedBySprites();
    dismissActiveAction();

    loadMapToCanvases( getActiveMap(), loadType );
    setTimeout( ( ) => {
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
    setNeighbourhoodAndMap( mapName );
    loadMapToCanvases( 
        getActiveMap(), PlayerMapEntry.cinematic, setPlayer
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