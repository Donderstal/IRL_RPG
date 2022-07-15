import globals from '../game-data/globals';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game-data/globals';
import controls from '../game/controls';
import { Neighbourhood } from '../game/Neighbourhood';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import { getOppositeDirection } from './utilFunctions';
import type { CellPosition } from '../models/CellPositionModel';
import type { Sprite } from '../game/core/Sprite';
import type { GameCanvasModel } from '../models/GameCanvasModel';
import type { CanvasWithGrid } from '../game/core/CanvasWithGrid';
import type { MapModel } from '../models/MapModel';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../enumerables/InteractionType';
import { DirectionEnum } from '../enumerables/DirectionEnum';
import type { ForegroundCanvas } from '../game/ForegroundCanvas';
import type { FrontgridCanvas } from '../game/FrontgridCanvas';
import type { BackgroundCanvas } from '../game/BackgroundCanvas';

const cinematicGrids: { back: GameCanvasModel, front: GameCanvasModel, frontgrid: GameCanvasModel } = {
    back: null,
    front: null,
    frontgrid: null 
};

let playerLocationAtStartOfCinematic: CellPosition = null;
let playerLocationAtEndOfCinematic: CellPosition = null;
let loadedCinematicMap: boolean = false;

export const hasCinematicMapLoaded = ( ): boolean => {
    return loadedCinematicMap;
}

export const getCinematicFrontgrid = ( ): CanvasWithGrid => {
    return cinematicGrids.frontgrid.class;
}

export const getCinematicFront = (): CanvasWithGrid => {
    return cinematicGrids.front.class;
}

export const getCinematicBack = (): CanvasWithGrid => {
    return cinematicGrids.back.class;
}

export const initCinematicGrids = ( ): void => {
    let GAME = globals.GAME;
    playerLocationAtStartOfCinematic = {
        column: GAME.PLAYER.column,
        row: GAME.PLAYER.row,
        direction: GAME.PLAYER.direction
    }
    GAME.frontgrid.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    GAME.initCanvas( 'BACK', cinematicGrids.back );
    GAME.initCanvas( 'FRONT', cinematicGrids.front );
    GAME.initCanvas( 'FRONT_GRID', cinematicGrids.frontgrid );
}

export const loadMapToCanvases = ( mapData: MapModel = globals.GAME.activeMap, loadType, setPlayer = true, cinematic = false, sprites: Sprite[] = null ): void => {
    const back: BackgroundCanvas = cinematic ? getCinematicBack() : globals.GAME.back.class;
    const front: ForegroundCanvas  = cinematic ? getCinematicFront() : globals.GAME.front.class;
    const frontgrid: FrontgridCanvas = cinematic ? getCinematicFrontgrid() : globals.GAME.frontgrid.class;

    if (setPlayer) {
        mapData.playerStart = mapData.playerStart != undefined ? mapData.playerStart : getPlayerCellInNewMap( mapData, loadType );        
    }
    else {
        mapData.playerStart = undefined;
    }

    back.initGrid( mapData.rows, mapData.columns );
    front.initGrid( mapData.rows ,mapData.columns );
    frontgrid.initGrid( mapData.rows, mapData.columns );

    const sheetData = getTilesheetModelByKey( mapData.tileSet );

    back.setBackgroundData( mapData, sheetData );
    back.setEventsDoorsAndBlockedToTilesInGrid( );
    back.drawMapFromGridData( );

    front.setForegroundData(mapData, sprites);

    frontgrid.setFrontgridData( mapData, sheetData );

    globals.GAME.sound.setActiveMusic( mapData.music != undefined ? mapData.music : globals.GAME.activeNeighbourhood.music );
    mapData.playerStart = undefined;

    if ( !cinematic ) {
        globals.GAME.cameraFocus.handleScreenFlip( 
            {'x': globals.GAME.PLAYER.centerX, 'y': globals.GAME.PLAYER.baseY},mapData
        );
        globals.GAME.cameraFocus.setSpriteFocus( globals.GAME.PLAYER );
        setTimeout( ( ) => {
            globals.GAME.story.checkForEventTrigger(CinematicTrigger.enter)     
        }, 250 )            
    }
}

export const clearMapFromCanvases = ( source: any = cinematicGrids ): void => {
    source.frontgrid.class.clearMap( );
    source.front.class.clearMap( );
    source.back.class.clearMap( );

    source.frontgrid.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    source.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    source.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
}

export const switchMap = ( destinationName: string, type: InteractionType ): void => {
    globals.GAME.story.checkForEventTrigger(CinematicTrigger.leave, [ destinationName, type ]); 
    if ( globals.GAME.inCinematic ) {
        return;
    }        
    globals.GAME.sound.clearActiveSoundEffects( );
    globals.GAME.paused = true;
    controls.stopListenForKeyPress( );
    controls.clearPressedKeys( globals.GAME.pressedKeys );

    setNeighbourhoodAndMap( destinationName );
    clearMapFromCanvases( globals.GAME );
    loadMapToCanvases( globals.GAME.activeMap, type );
    setTimeout( ( ) => {
        controls.listenForKeyPress( ); 
        globals.GAME.paused = false;   
    }, 100 )
}

const getPlayerCellInNewMap = ( mapData: MapModel, type: InteractionType ) => {
    let newPlayerCell: CellPosition;
    switch ( type ) {
        case InteractionType.door:
            [...mapData.doors, ...mapData.sprites.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                if ( globals.GAME.previousMapName == door.destination ) {
                    newPlayerCell.row = door.row;
                    newPlayerCell.column = door.column;
                    newPlayerCell.direction = getOppositeDirection(door.direction);
                }
            } )
            break;
        case InteractionType.neighbour:
            let neighbours = globals.GAME.activeMap.neighbours;
            newPlayerCell.direction = globals.GAME.PLAYER.direction;
            if ( neighbours.left == globals.GAME.previousMapName ) {
                newPlayerCell.row = globals.GAME.PLAYER.row;
                newPlayerCell.column = 1;
            }
            else if ( neighbours.up == globals.GAME.previousMapName ) {
                newPlayerCell.row = 1;
                newPlayerCell.column = globals.GAME.PLAYER.col;
            }
            else if ( neighbours.right == globals.GAME.previousMapName ) {
                newPlayerCell.row = globals.GAME.PLAYER.row;
                newPlayerCell.column = mapData.columns;
            }
            else if ( neighbours.down == globals.GAME.previousMapName ) {
                newPlayerCell.row = mapData.rows;
                newPlayerCell.column = globals.GAME.PLAYER.col;
            }
            break;
        case InteractionType.bus:
            mapData.sprites.forEach( ( object ) => {
                if ( object.action != undefined && object.action[0].action.type == InteractionType.bus ) {
                    newPlayerCell.row = object.row;
                    newPlayerCell.column = object.column;
                    newPlayerCell.direction = DirectionEnum.down;
                }
            } )
            break;
        case InteractionType.cinematic:
            newPlayerCell = playerLocationAtStartOfCinematic;
            break;
        case InteractionType.cinematic_end:
            newPlayerCell = playerLocationAtEndOfCinematic;
            break;
    }
    return newPlayerCell
}

export const loadCinematicMap = ( mapName, setPlayer = false ) => {
    loadedCinematicMap = false;
    getCinematicFront().playerSprite = globals.GAME.front.class.playerSprite;
    clearMapFromCanvases( cinematicGrids )
    let GAME = globals.GAME;
    GAME.sound.clearActiveSoundEffects( );
    setCinematicNeighbourhoodAndMap(mapName);
    loadMapToCanvases( 
        GAME.cinematicNeighbourhood.activeMap, InteractionType.cinematic, 
        setPlayer, true,
        GAME.cinematicNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ? GAME.front.class.allSprites : false
    );
    setTimeout(()=> {
        loadedCinematicMap = true;        
    }, 250 )

}

export const setNeighbourhoodAndMap = ( mapName: string ): void => {
    if ( globals.GAME._activeNeighbourhood == undefined || !mapName.includes(globals.GAME._activeNeighbourhood.key) ) {
        globals.GAME._activeNeighbourhood = new Neighbourhood(mapName);
    }
    else {
        globals.GAME._activeNeighbourhood.activateMap(mapName);
    }
}

const setCinematicNeighbourhoodAndMap = (mapName) => {
    if ( globals.GAME.cinematicNeighbourhood == undefined || !mapName.includes(globals.GAME.cinematicNeighbourhood.key) ) {
        globals.GAME.cinematicNeighbourhood = new Neighbourhood(mapName);
    }
    else {
        globals.GAME.cinematicNeighbourhood.activateMap(mapName);
    }
}

export const clearCinematicGrids = ( ) => {
    const GAME = globals.GAME;
    playerLocationAtEndOfCinematic = { 
        column: getCinematicFront().playerSprite.column,
        row: getCinematicFront().playerSprite.row,
        direction: getCinematicFront().playerSprite.direction as DirectionEnum
    }
    const sprites = [ ...getCinematicFront().allSprites ];
    clearMapFromCanvases( );
    loadMapToCanvases( 
        GAME._activeNeighbourhood.activeMap, 
        GAME.cinematicNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ? InteractionType.cinematic_end : InteractionType.cinematic, 
        true, false,
        sprites
    );
    cinematicGrids.back = null;
    cinematicGrids.front = null;
    cinematicGrids.frontgrid = null;
    playerLocationAtStartOfCinematic = null;
    playerLocationAtEndOfCinematic = null;
    loadedCinematicMap = false;
}