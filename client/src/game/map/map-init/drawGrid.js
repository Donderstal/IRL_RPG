const mapHelpers    = require('../../../helpers/mapHelpers')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const state         = require('../../../game-data/state')
const globals       = require('../../../game-data/globals')
const BlockedArea   = require('./setMapAttributes').BlockedArea

let tilesheetXyValues = [ ]

/** 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} currentMap - JSON containing data on the Map
 */

const generateMap = ( currentMap, sheetJson ) => {
    if ( state.debug.map == true ) {
        console.log( "Loading map: " + currentMap.mapData.mapName )
        console.log( "With tileset: " + currentMap.mapData.tileSet )
        console.log( "Getting tilesheet at: " + '/static/tilesets/' + sheetJson.src )
    }

    currentMap.tileSheet = new Image();    
    currentMap.tileSheet.src = '/static/tilesets/' + sheetJson.src
    currentMap.tileSheet.onload = ( ) => {    
        drawGrid( startingPosition, currentMap, sheetJson )
    }

    let startingPosition = getStartingPositionOfGridInCanvas( currentMap.mapData.columns, currentMap.mapData.rows )
    currentMap.topLeftCell = mapHelpers.getTopLeftCellOfGridInCanvas( startingPosition.x, startingPosition.y )
    if ( currentMap.battleMap != true ) {
        setMapBorders( startingPosition, currentMap.mapData.rows, currentMap.mapData.columns)
    }
    
    calcTilesheetXyPositions( sheetJson.uniqueTiles )
}

const calcTilesheetXyPositions = ( tilesInSheet ) => {
    let tileX = 0 
    let tileY = 0
    tilesheetXyValues = []

    for ( var i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += globals.GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += globals.GRID_BLOCK_IN_SHEET_PX
        }
    }
}

/** 
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} mapColumns - columns of map ( in grid blocks )
 * @param {object} mapRows - rows of map  ( in grid blocks )
 * @return {object} - top and left position in Canvas to start drawing grid ( in pixels ) 
 */

const getStartingPositionOfGridInCanvas = ( mapColumns, mapRows ) => {
    return {
        'x': Math.ceil( ( globals.CANVAS_COLUMNS - mapColumns ) / 2 ) * globals.GRID_BLOCK_PX,
        'y': Math.ceil( ( globals.CANVAS_ROWS - mapRows ) / 2 )  * globals.GRID_BLOCK_PX
    }
}

/** 
 * Get starting position of grid in canvas
 * Call @function drawRow for each row
 * 
 * @param {object} startingPosition - starting x and y for drawing
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 */

const drawGrid = ( startingPosition, currentMap, sheetJson, battleMap = false ) => {
    const position = startingPosition

    if ( battleMap ) {
        calcTilesheetXyPositions( sheetJson.uniqueTiles )
    }

    for ( var i = 0; i <= currentMap.mapData.rows; i++ ) {
        const currentRow = currentMap.mapData.grid[i]
        drawRow( currentMap, currentRow, position, sheetJson )

        position.y += globals.GRID_BLOCK_PX
        position.x = Math.ceil( ( globals.CANVAS_COLUMNS - currentMap.mapData.columns ) / 2 ) * globals.GRID_BLOCK_PX

    }
}

const setMapBorders = (gridStartingPosition, mapRows, mapColumns) => {
    state.currentMap.borders = { 
        top     : gridStartingPosition.y,
        left    : gridStartingPosition.x,
        bottom  : gridStartingPosition.y + ( mapRows * globals.GRID_BLOCK_PX ) - globals.GRID_BLOCK_PX * .5 ,
        right   : gridStartingPosition.x + ( mapColumns * globals.GRID_BLOCK_PX )
    };
}

/** 
 * Call @function drawTileInGridBlock for each column in this row
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {object} position - Starting x and y Canvas in pixels
 * @param {array} currentRow - Array with numbers representing a row
 */

const drawRow = ( currentMap, currentRow, position, sheetJson ) => {
    for ( var j = 0; j <= currentMap.mapData.columns; j++ ) {
        const currentTile = currentRow[j]

        setBlockedXyIfNeeded( currentTile, position, sheetJson )
        drawTileInGridBlock( currentMap, currentTile, position )

        position.x += globals.GRID_BLOCK_PX
    }
}

const setBlockedXyIfNeeded = ( tile, startPositionInCanvas, sheetJson ) => {
    if ( sheetJson.blocked ) {
        sheetJson.blocked.forEach( ( e ) => {
            if ( tile === e ) {
                state.currentMap.blockedXyValues.push( 
                    new BlockedArea( 
                        startPositionInCanvas.x, 
                        startPositionInCanvas.y,
                        globals.GRID_BLOCK_PX,
                        globals.GRID_BLOCK_PX
                    ) 
                )
            }                   
        } )        
    } 
}

/** 
 * Add block to BlockedXyValues if necessary
 * Handle non-numeric tile if necessary
 * Get blocksize and current tile xy in sheet from globals
 * Then draw the tile in block
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {integer} tile - number representing position of the tile in a tilesheet
 * @param {columns} startPositionInCanvas - Starting x and y Canvas in pixels
 */
const drawTileInGridBlock = ( currentMap, tile, startPositionInCanvas ) => {
    // if tile is E - empty, nothing will be drawn
    if ( tile === "E" || tile === null) {
        return 
    }

    const blockSize = globals.GRID_BLOCK_PX  
    const tilePositionInSheet = tilesheetXyValues[tile]
    canvasHelpers.drawFromImageToCanvas( 
        "BACK",
        currentMap.tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize
    )           
}

module.exports = {
    generateMap,
    drawGrid
}