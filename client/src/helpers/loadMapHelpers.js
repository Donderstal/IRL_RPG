const globals = require('../game-data/globals');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../game-data/globals');
const controls = require('../game/controls');
const { Neighbourhood } = require('../game/Neighbourhood');
const { tryCatch } = require('./errorHelpers');
const { sheets } = require('../resources/tilesheetResources');
const cinematic = require('../game/cutscenes/Cinematic');
const { ON_ENTER, ON_LEAVE, EVENT_BUS, EVENT_DOOR } = require('../game-data/conditionGlobals');
const { getOppositeDirection } = require('./utilFunctions');

const cinematicGrids = {
    back: {},
    front: {},
    frontgrid: {}  
};

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
    GAME.frontgrid.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    GAME.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    GAME.initCanvas( 'BACK', cinematicGrids.back );
    GAME.initCanvas( 'FRONT', cinematicGrids.front );
    GAME.initCanvas( 'FRONT_GRID', cinematicGrids.frontgrid );
}

const loadMapToCanvases = ( isNewGame, back, front, frontgrid, mapData = globals.GAME.activeMap ) => {
    back.initGrid(mapData.rows,mapData.columns );
    front.initGrid(mapData.rows,mapData.columns );
    frontgrid.initGrid(mapData.rows,mapData.columns );

    const sheetData = sheets[mapData.tileSet];

    back.setBackgroundData(mapData, sheetData );
    back.setEventsDoorsAndBlockedToTilesInGrid( );
    back.drawMapFromGridData( globals.PNG_DICTIONARY['/static/tilesets/' + sheetData.src] );

    front.setForegroundData(mapData, isNewGame );
    front.spriteDictionary["PLAYER"] = globals.GAME.PLAYER;

    frontgrid.setFrontgridData(mapData, sheetData );
    frontgrid.drawMapFromGridData( globals.PNG_DICTIONARY['/static/tilesets/' + sheetData.src] );

    globals.GAME.sound.setActiveMusic(mapData.music != undefined ?mapData.music : globals.GAME.activeNeighbourhood.music );
    
    if ( !globals.GAME.useCinematicMap ) {
        globals.GAME.cameraFocus.handleScreenFlip( 
            {'x': globals.GAME.PLAYER.centerX( ), 'y': globals.GAME.PLAYER.baseY( )},mapData
        );
        globals.GAME.cameraFocus.setSpriteFocus( globals.GAME.PLAYER );
        setTimeout( ( ) => {
            globals.GAME.story.checkForEventTrigger(ON_ENTER)     
        }, 250 )            
    }
}

const clearMapFromCanvases = ( source ) => {
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

    tryCatch(setNeighbourhoodAndMap(destination));
    clearMapFromCanvases( globals.GAME );
    tryCatch(loadMapToCanvases( false, back, front, frontgrid ));
    if ( type != EVENT_BUS ) {
        tryCatch(setPlayerInNewMap(globals.GAME.activeMap, type));
    }
    else {
       mapData.mapObjects.forEach( ( object ) => {
            if ( object.action != undefined && object.action[0].action.type == EVENT_BUS ) {
                object.action[0].action.events.forEach( ( e ) => {
                    if ( e["trigger"] == ON_ENTER ) {
                        new cinematic.Cinematic( e.scenes, ON_ENTER )
                    }
                })
            }
            
        } )
    }
    setTimeout( ( ) => {
        controls.listenForKeyPress( ); 
        globals.GAME.paused = false;   
    }, 100 )
}

const setPlayerInNewMap = ( mapData, type ) => {
    const newPlayerCell = {};
    let direction;

    switch ( type ) {
        case EVENT_DOOR :
            [...mapData.doors, ...mapData.mapObjects.filter( ( e ) => { return e.hasDoor })].forEach( ( door ) => {
                if ( globals.GAME.previousMapName == door.destination ) {
                    newPlayerCell.row = door.row;
                    newPlayerCell.col = door.col;
                    direction = getOppositeDirection(door.direction);
                }
            } )
            break;
        case EVENT_NEIGHBOUR :
            let neighbours = globals.GAME.activeMap.neighbours;
            direction = globals.GAME.PLAYER.direction;
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
        case EVENT_BUS :
            mapData.mapObjects.forEach( ( object ) => {
                if ( object.action != undefined && object.action[0].action.type == EVENT_BUS ) {
                    newPlayerCell.row = object.row;
                    newPlayerCell.col = object.col;
                    direction   = FACING_DOWN
                }
            } )
            break;
        default : 
            console.log( "Type " + type + " not recognized." )
            break;
    }
    setPlayerToCellInNewMap( newPlayerCell, direction, getCinematicFront() )
}

const setPlayerToCellInNewMap = ( newPlayerCell, spriteDirection, foreground ) => {
    globals.GAME.PLAYER.setNewLocationInGrid( newPlayerCell, spriteDirection );
    globals.GAME.cameraFocus.centerOnXY( globals.GAME.PLAYER.centerX(), globals.GAME.PLAYER.baseY() )
    foreground.allSprites.push( globals.GAME.PLAYER );
    foreground.spriteDictionary["PLAYER"] = globals.GAME.PLAYER
}

const loadCinematicMap = ( mapName, setPlayer = false, playerLocationObject = {'row': globals.GAME.PLAYER.row, 'col': globals.GAME.PLAYER.col} ) => {
    clearMapFromCanvases( cinematicGrids )
    let GAME = globals.GAME;
    GAME.sound.clearActiveSoundEffects( );
    setCinematicNeighbourhoodAnMap(mapName, false);
    loadMapToCanvases( 
        false, cinematicGrids.back.class, cinematicGrids.front.class, 
        cinematicGrids.frontgrid.class, GAME.cinematicNeighbourhood.activeMap 
    );
    if ( setPlayer ) {
        setPlayerToCellInNewMap(
            playerLocationObject, GAME.PLAYER.direction, GAME.FRONT
        )
    }
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
module.exports = {
    loadMapToCanvases,
    clearMapFromCanvases,
    switchMap,
    setPlayerInNewMap,
    setPlayerToCellInNewMap,
    loadCinematicMap,
    setNeighbourhoodAndMap,
    initCinematicGrids,
    getCinematicBack,
    getCinematicFront,
    getCinematicFrontgrid
}