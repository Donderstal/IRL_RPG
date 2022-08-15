import globals from '../game-data/globals';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game-data/globals';
import { listenForKeyPress, stopListenForKeyPress, clearPressedKeys } from '../game/controls';
import { Neighbourhood } from '../game/Neighbourhood';
import { getTilesheetModelByKey } from '../resources/tilesheetResources';
import { getOppositeDirection } from './utilFunctions';
import type { CellPosition } from '../models/CellPositionModel';
import type { Sprite } from '../game/core/Sprite';
import type { MapModel } from '../models/MapModel';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../enumerables/InteractionType';
import { DirectionEnum } from '../enumerables/DirectionEnum';
import type { ForegroundCanvas } from '../game/ForegroundCanvas';
import type { FrontgridCanvas } from '../game/FrontgridCanvas';
import type { BackgroundCanvas } from '../game/BackgroundCanvas';
import type { CanvasContextModel } from '../models/CanvasContextModel';

const cinematicGrids: { back: CanvasContextModel, front: CanvasContextModel, frontgrid: CanvasContextModel } = {
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

export const getCinematicFrontgrid = (): FrontgridCanvas => {
    return cinematicGrids.frontgrid.class as FrontgridCanvas;
}

export const getCinematicFront = (): ForegroundCanvas => {
    return cinematicGrids.front.class as ForegroundCanvas;
}

export const getCinematicBack = (): BackgroundCanvas => {
    return cinematicGrids.back.class as BackgroundCanvas;
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

    cinematicGrids.back = GAME.initCanvas( 'BACK' );
    cinematicGrids.front = GAME.initCanvas( 'FRONT' );
    cinematicGrids.frontgrid = GAME.initCanvas( 'FRONT_GRID' );
}

export const loadMapToCanvases = ( mapData: MapModel, loadType, setPlayer = true, cinematic = false, sprites: Sprite[] = null ): void => {
    const back: BackgroundCanvas = cinematic ? getCinematicBack() : globals.GAME.back.class as BackgroundCanvas;
    const front: ForegroundCanvas = cinematic ? getCinematicFront() : globals.GAME.front.class as ForegroundCanvas;
    const frontgrid: FrontgridCanvas = cinematic ? getCinematicFrontgrid() : globals.GAME.frontgrid.class as FrontgridCanvas;

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
    back.drawMapFromGridData( );

    front.setForegroundData(mapData, sprites);

    frontgrid.setFrontgridData( mapData, sheetData );

    globals.GAME.sound.setActiveMusic( mapData.music != undefined ? mapData.music : globals.GAME.activeNeighbourhood.model.music );
    mapData.playerStart = undefined;

    if ( !cinematic ) {
        globals.GAME.cameraFocus.handleScreenFlip( 
            {'x': globals.GAME.PLAYER.centerX, 'y': globals.GAME.PLAYER.baseY}
        );
        globals.GAME.cameraFocus.setSpriteFocus( globals.GAME.PLAYER, true );
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
    globals.GAME.sound.clearActiveSoundEffects( );
    globals.GAME.paused = true;
    stopListenForKeyPress( );
    clearPressedKeys( );

    setNeighbourhoodAndMap( destinationName );
    clearMapFromCanvases( globals.GAME );
    loadMapToCanvases( globals.GAME.activeMap, type );
    setTimeout( ( ) => {
        listenForKeyPress( ); 
        globals.GAME.paused = false;   
    }, 100 )
}

const getPlayerCellInNewMap = ( mapData: MapModel, type: InteractionType ) => {
    let newPlayerCell: CellPosition = { row: null, column: null, direction: null };
    switch ( type ) {
        case InteractionType.door:
            [...mapData.doors, ...mapData.sprites.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                if ( globals.GAME.previousMapName == door.doorTo ) {
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
                newPlayerCell.column = globals.GAME.PLAYER.column;
            }
            else if ( neighbours.right == globals.GAME.previousMapName ) {
                newPlayerCell.row = globals.GAME.PLAYER.row;
                newPlayerCell.column = mapData.columns;
            }
            else if ( neighbours.down == globals.GAME.previousMapName ) {
                newPlayerCell.row = mapData.rows;
                newPlayerCell.column = globals.GAME.PLAYER.column;
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
    globals.GAME.paused = true;
    getCinematicFront().playerSprite = globals.GAME.front.class.playerSprite;
    clearMapFromCanvases( cinematicGrids )
    let GAME = globals.GAME;
    GAME.sound.clearActiveSoundEffects( );
    setCinematicNeighbourhoodAndMap(mapName);
    loadMapToCanvases( 
        GAME.cinematicNeighbourhood.activeMap, InteractionType.cinematic, 
        setPlayer, true,
        GAME.cinematicNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ? GAME.front.class.allSprites : null
    );
    loadedCinematicMap = true;
    globals.GAME.paused = false;

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

export const clearCinematicGrids = () => {
    console.log('clear em...')
    const GAME = globals.GAME;
    GAME.paused = true;
    const front = getCinematicFront()
    playerLocationAtEndOfCinematic = { 
        column: front.playerSprite.column,
        row: front.playerSprite.row,
        direction: front.playerSprite.direction
    }
    const sprites = [...front.allSprites];
    loadedCinematicMap = false;
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
    GAME.paused = false;
}