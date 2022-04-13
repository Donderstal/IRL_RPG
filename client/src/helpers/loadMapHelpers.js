const globals = require('../game-data/globals');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../game-data/globals');
const controls = require('../game/controls');
const { Neighbourhood } = require('../game/Neighbourhood');
const { sheets } = require('../resources/tilesheetResources');
const { 
    ON_ENTER, ON_LEAVE, EVENT_CINEMATIC_END, EVENT_BUS, 
    EVENT_DOOR, EVENT_NEIGHBOUR, EVENT_CINEMATIC
} = require('../game-data/conditionGlobals');
const { getOppositeDirection } = require('./utilFunctions');

const cinematicGrids = {
    back: {},
    front: {},
    frontgrid: {}  
};

let playerLocationAtStartOfCinematic = { }
let playerLocationAtEndOfCinematic = { }
let loadedCinematicMap = false;

const hasCinematicMapLoaded = ( ) => {
    return loadedCinematicMap;
}

const getCinematicFrontgrid = ( ) => {
    return cinematicGrids.frontgrid.class;
}

const getCinematicFront = ( ) => {
    return cinematicGrids.front.class;
}

const getCinematicBack = ( ) => {
    return cinematicGrids.back.class;
}

const initCinematicGrids = ( ) => {
    let GAME = globals.GAME;
    playerLocationAtStartOfCinematic = {
        'col': GAME.PLAYER.col,
        'row': GAME.PLAYER.row,
        'direction': GAME.PLAYER.direction
    }
    GAME.frontgrid.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    GAME.initCanvas( 'BACK', cinematicGrids.back );
    GAME.initCanvas( 'FRONT', cinematicGrids.front );
    GAME.initCanvas( 'FRONT_GRID', cinematicGrids.frontgrid );
}

const loadMapToCanvases = ( mapData = globals.GAME.activeMap, loadType, setPlayer = true, cinematic = false ) => {
    const back = cinematic ? getCinematicBack() : globals.GAME.back.class;
    const front = cinematic ? getCinematicFront() : globals.GAME.front.class;
    const frontgrid = cinematic ? getCinematicFrontgrid() : globals.GAME.frontgrid.class;

    if (setPlayer) {
        mapData.playerStart = mapData.playerStart != undefined ? mapData.playerStart : getPlayerCellInNewMap( mapData, loadType );        
    }
    else {
        mapData.playerStart = undefined;
    }

    back.initGrid(mapData.rows,mapData.columns );
    front.initGrid(mapData.rows,mapData.columns );
    frontgrid.initGrid(mapData.rows,mapData.columns );

    const sheetData = sheets[mapData.tileSet];

    back.setBackgroundData(mapData, sheetData );
    back.setEventsDoorsAndBlockedToTilesInGrid( );
    back.drawMapFromGridData( globals.PNG_DICTIONARY['/static/tilesets/' + sheetData.src] );

    front.setForegroundData(mapData);

    frontgrid.setFrontgridData(mapData, sheetData );
    frontgrid.drawMapFromGridData( globals.PNG_DICTIONARY['/static/tilesets/' + sheetData.src] );

    globals.GAME.sound.setActiveMusic(mapData.music != undefined ?mapData.music : globals.GAME.activeNeighbourhood.music );
    mapData.playerStart = undefined;

    if ( !cinematic ) {
        globals.GAME.cameraFocus.handleScreenFlip( 
            {'x': globals.GAME.PLAYER.centerX( ), 'y': globals.GAME.PLAYER.baseY( )},mapData
        );
        globals.GAME.cameraFocus.setSpriteFocus( globals.GAME.PLAYER );
        setTimeout( ( ) => {
            globals.GAME.story.checkForEventTrigger(ON_ENTER)     
        }, 250 )            
    }
}

const clearMapFromCanvases = ( source = cinematicGrids ) => {
    source.frontgrid.class.clearMap( );
    source.front.class.clearMap( );
    source.back.class.clearMap( );

    source.frontgrid.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    source.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    source.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
}

const switchMap = ( destination, type ) => {
    globals.GAME.story.checkForEventTrigger(ON_LEAVE, [ destination, type ]); 
    if ( globals.GAME.inCinematic ) {
        return;
    }        
    globals.GAME.sound.clearActiveSoundEffects( );
    globals.GAME.paused = true;
    controls.stopListenForKeyPress( );
    controls.clearPressedKeys( globals.GAME.pressedKeys );

    setNeighbourhoodAndMap(destination)
    clearMapFromCanvases( globals.GAME );
    loadMapToCanvases( globals.GAME.activeMap, type );
    setTimeout( ( ) => {
        controls.listenForKeyPress( ); 
        globals.GAME.paused = false;   
    }, 100 )
}

const getPlayerCellInNewMap = ( mapData, type ) => {
    let newPlayerCell = {};
    switch ( type ) {
        case EVENT_DOOR:
            [...mapData.doors, ...mapData.mapObjects.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                if ( globals.GAME.previousMapName == door.destination ) {
                    newPlayerCell.row = door.row;
                    newPlayerCell.col = door.col;
                    newPlayerCell.direction = getOppositeDirection(door.direction);
                }
            } )
            break;
        case EVENT_NEIGHBOUR:
            let neighbours = globals.GAME.activeMap.neighbours;
            newPlayerCell.direction = globals.GAME.PLAYER.direction;
            if ( neighbours.left == globals.GAME.previousMapName ) {
                newPlayerCell.row = globals.GAME.PLAYER.row;
                newPlayerCell.col = 1;
            }
            else if ( neighbours.up == globals.GAME.previousMapName ) {
                newPlayerCell.row = 1;
                newPlayerCell.col = globals.GAME.PLAYER.col;
            }
            else if ( neighbours.right == globals.GAME.previousMapName ) {
                newPlayerCell.row = globals.GAME.PLAYER.row;
                newPlayerCell.col = mapData.columns;
            }
            else if ( neighbours.down == globals.GAME.previousMapName ) {
                newPlayerCell.row = mapData.rows;
                newPlayerCell.col = globals.GAME.PLAYER.col;
            }
            break;
        case EVENT_BUS:
            mapData.mapObjects.forEach( ( object ) => {
                if ( object.action != undefined && object.action[0].action.type == EVENT_BUS ) {
                    newPlayerCell.row = object.row;
                    newPlayerCell.col = object.col;
                    newPlayerCell.direction   = FACING_DOWN
                }
            } )
            break;
        case EVENT_CINEMATIC:
            newPlayerCell = playerLocationAtStartOfCinematic;
            break;
        case EVENT_CINEMATIC_END:
            newPlayerCell = playerLocationAtEndOfCinematic;
            break;
        default : 
            newPlayerCell = false;
            console.log( "Type " + type + " not recognized." )
            break;
    }
    return newPlayerCell
}

const loadCinematicMap = ( mapName, setPlayer = false ) => {
    loadedCinematicMap = false;
    getCinematicFront().playerSprite = globals.GAME.front.class.playerSprite;
    clearMapFromCanvases( cinematicGrids )
    let GAME = globals.GAME;
    GAME.sound.clearActiveSoundEffects( );
    setCinematicNeighbourhoodAnMap(mapName, false);
    loadMapToCanvases( 
        GAME.cinematicNeighbourhood.activeMap, EVENT_CINEMATIC, setPlayer, true
    );
    setTimeout(()=> {
        loadedCinematicMap = true;        
    }, 250 )

}

const setNeighbourhoodAndMap = (mapName) => {
    if ( globals.GAME._activeNeighbourhood == undefined || !mapName.includes(globals.GAME._activeNeighbourhood.key) ) {
        globals.GAME._activeNeighbourhood = new Neighbourhood(mapName);
    }
    else {
        globals.GAME._activeNeighbourhood.activateMap(mapName);
    }
}

const setCinematicNeighbourhoodAnMap = (mapName) => {
    if ( globals.GAME.cinematicNeighbourhood == undefined || !mapName.includes(globals.GAME.cinematicNeighbourhood.key) ) {
        globals.GAME.cinematicNeighbourhood = new Neighbourhood(mapName);
    }
    else {
        globals.GAME.cinematicNeighbourhood.activateMap(mapName);
    }
}

const clearCinematicGrids = ( ) => {
    const GAME = globals.GAME;
    playerLocationAtEndOfCinematic = { 
        'col': getCinematicFront().playerSprite.col,
        'row': getCinematicFront().playerSprite.row,
        'direction': getCinematicFront().playerSprite.direction
    }
    clearMapFromCanvases( );
    loadMapToCanvases( 
        GAME._activeNeighbourhood.activeMap, 
        GAME.cinematicNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ? EVENT_CINEMATIC_END : EVENT_CINEMATIC, 
        true
    );
    cinematicGrids.back                 = {};
    cinematicGrids.front                = {};
    cinematicGrids.frontgrid            = {};
    playerLocationAtStartOfCinematic    = {};
    playerLocationAtEndOfCinematic      = {};
    loadedCinematicMap = false;
}
module.exports = {
    loadMapToCanvases,
    clearMapFromCanvases,
    switchMap,
    loadCinematicMap,
    setNeighbourhoodAndMap,
    initCinematicGrids,
    getCinematicBack,
    getCinematicFront,
    getCinematicFrontgrid,
    clearCinematicGrids,
    hasCinematicMapLoaded
}