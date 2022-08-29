import globals from '../game-data/globals';
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
import { cameraFocus } from '../game/cameraFocus';
import { clearGridCanvases, clearGrids, getCanvasWithType } from '../game/controllers/gridCanvasController';
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
import type { BackTilesCanvas } from '../game/canvas/BackTilesCanvas';
import type { BackSpritesCanvas } from '../game/canvas/BackSpritesCanvas';
import type { FrontTilesCanvas } from '../game/canvas/FrontTilesCanvas';

export const loadMapToCanvases = ( mapData: MapModel, loadType, setPlayer = true, sprites: Sprite[] = null ): void => {
    const back = getCanvasWithType( CanvasTypeEnum.background ) as BackTilesCanvas;
    const front = getCanvasWithType( CanvasTypeEnum.backSprites ) as BackSpritesCanvas;
    const frontgrid = getCanvasWithType( CanvasTypeEnum.foreground ) as FrontTilesCanvas;

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

    if ( setPlayer ) {
        cameraFocus.handleScreenFlip( 
            {'x': globals.GAME.PLAYER.centerX, 'y': globals.GAME.PLAYER.baseY}
        );
        cameraFocus.setSpriteFocus( globals.GAME.PLAYER, true );
        setTimeout( ( ) => {
            globals.GAME.story.checkForEventTrigger(CinematicTrigger.enter)     
        }, 250 )            
    }
}

export const switchMap = ( destinationName: string, type: InteractionType, playerStart: CellPosition = null ): void => {
    globals.GAME.story.checkForEventTrigger( CinematicTrigger.leave, [destinationName, type] );
    globals.GAME.sound.clearActiveSoundEffects();
    globals.GAME.paused = true;
    stopListenForKeyPress();
    clearPressedKeys();
    setNeighbourhoodAndMap( destinationName );
    clearGrids();
    clearGridCanvases();

    if ( playerStart !== null ) {
        globals.GAME.activeMap.playerStart = playerStart;
    }

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
    }
    return newPlayerCell
}

export const loadCinematicMap = ( mapName, setPlayer = false, playerStart = null ) => {
    globals.GAME.paused = true;
    let GAME = globals.GAME;
    GAME.sound.clearActiveSoundEffects( );
    setNeighbourhoodAndMap( mapName );
    if ( setPlayer ) {
        GAME.activeNeighbourhood.activeMap.playerStart = playerStart;
    }
    loadMapToCanvases( 
        GAME.activeNeighbourhood.activeMap, InteractionType.cinematic, setPlayer
    );
    globals.GAME.paused = false;

}

export const setNeighbourhoodAndMap = ( mapName: string ): void => {
    if ( globals.GAME.activeNeighbourhood == undefined || !mapName.includes(globals.GAME.activeNeighbourhood.key) ) {
        globals.GAME.activeNeighbourhood = new Neighbourhood(mapName);
    }
    else {
        globals.GAME.activeNeighbourhood.activateMap(mapName);
    }
}