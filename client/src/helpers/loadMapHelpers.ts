import globals, { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game-data/globals';
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
import { clearGridCanvases, clearGrids, getCanvasWithType, setCanvasesDimensions } from '../game/controllers/gridCanvasController';
import { CanvasTypeEnum } from '../enumerables/CanvasTypeEnum';
import type { BackTileGrid } from '../game/canvas/BackTileGrid';
import type { BackSpriteGrid } from '../game/canvas/BackSpriteGrid';
import type { FrontTileGrid } from '../game/canvas/FrontTileGrid';
import { clearAllSprites, getPlayer } from '../game/controllers/spriteController';
import { clearAllSpriteModules } from '../game/controllers/spriteModuleController';

export const loadMapToCanvases = ( mapData: MapModel, loadType, setPlayer = true, sprites: Sprite[] = null ): void => {
    const back = getCanvasWithType( CanvasTypeEnum.background ) as BackTileGrid;
    const front = getCanvasWithType( CanvasTypeEnum.backSprites ) as BackSpriteGrid;
    const frontgrid = getCanvasWithType( CanvasTypeEnum.foreground ) as FrontTileGrid;

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
        const player = getPlayer();
        cameraFocus.handleScreenFlip( 
            { 'x': player.centerX, 'y': player.baseY}
        );
        cameraFocus.setSpriteFocus( player, true );
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
    setCanvasDimensions( );

    clearGrids();
    clearGridCanvases();

    clearAllSpriteModules();
    clearAllSprites();

    console.log( playerStart )
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
    console.log( type )
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
            const player = getPlayer()
            let neighbours = globals.GAME.activeMap.neighbours;
            newPlayerCell.direction = player.direction;
            if ( neighbours.left == globals.GAME.previousMapName ) {
                newPlayerCell.row = player.row;
                newPlayerCell.column = 1;
            }
            else if ( neighbours.up == globals.GAME.previousMapName ) {
                newPlayerCell.row = 1;
                newPlayerCell.column = player.column;
            }
            else if ( neighbours.right == globals.GAME.previousMapName ) {
                newPlayerCell.row = player.row;
                newPlayerCell.column = mapData.columns;
            }
            else if ( neighbours.down == globals.GAME.previousMapName ) {
                newPlayerCell.row = mapData.rows;
                newPlayerCell.column = player.column;
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
    console.log(newPlayerCell)
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

const setCanvasDimensions = (): void => {
    if ( globals.GAME.activeMap.outdoors ) {
        let neighbourhoodModel = globals.GAME.activeNeighbourhood.model;
        const width = neighbourhoodModel.horizontalSlots.length * CANVAS_WIDTH;
        const height = neighbourhoodModel.verticalSlots.length * CANVAS_HEIGHT;

        setCanvasesDimensions( width, height );
    }
    else {
        setCanvasesDimensions( CANVAS_WIDTH, CANVAS_HEIGHT );
    }
}