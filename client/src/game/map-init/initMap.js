
const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')
const state         = require('../../game-data/state')
const mapHelpers    = require('../mapHelpers')

/** 
 * EXPORTED @function fetchMapJsonWithCallback
 * Fetch JSON file with data based on path relative to Maps folder
 * 
 * @param {string} worldName - Name of Map written as follows: 'path/to/Map'
 * @callback generateMAp - Start Map rendering with JSON data when fetch succeeds
 */

const fetchMapJsonWithCallback = (worldName) => {
    fetch('/static/maps/' + worldName +'.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then( (json) => {
            state.currentMap.mapData = json;

            generateMap( state.currentMap )
    })    
}


/** 
 * @function generateMap
 * MAIN FUNCTION
 * 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} currentMap - JSON containing data on the Map
 */

const generateMap = ( currentMap ) => {

    let startingPosition = getStartingPositionOfGridInCanvas( currentMap.mapData.columns, currentMap.mapData.rows )

    currentMap.tileSheet = new Image();
    currentMap.blockedXyValues = []
    currentMap.tileSheet.src = '/static/tilesets/' + currentMap.mapData.src
    currentMap.tileSheet.onload = ( ) => {      
        drawGrid(  startingPosition, currentMap )
    }

}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} mapColumns - columns of map ( in grid blocks )
 * @param {object} mapRows - rows of map  ( in grid blocks )
 * @return {object} - top and left position in Canvas to start drawing grid ( in pixels ) 
 */

const getStartingPositionOfGridInCanvas = ( mapColumns, mapRows ) => {

    const gridStartingPosition = {}

    if ( mapColumns > globals.CANVAS_COLUMNS ) {
        gridStartingPosition.x = ( ( mapColumns - globals.CANVAS_COLUMNS ) / 2 ) * -globals.GRID_BLOCK_PX
    }

    if ( mapColumns <= globals.CANVAS_COLUMNS ) {
        gridStartingPosition.x = ( ( globals.CANVAS_COLUMNS - mapColumns ) / 2 ) * globals.GRID_BLOCK_PX
    }

    if ( mapRows > globals.CANVAS_ROWS ) {
        gridStartingPosition.y = ( ( mapRows - globals.CANVAS_ROWS ) / 2 )  * -globals.GRID_BLOCK_PX
    }

    if ( mapRows <= globals.CANVAS_ROWS ) {
        gridStartingPosition.y = ( ( globals.CANVAS_ROWS - mapRows ) / 2 )  * globals.GRID_BLOCK_PX
    }

    return gridStartingPosition 
}

/** 
 * @function drawGrid
 * Get number of columns and rows from JSON
 * Call @function drawRow for each row
 * 
 * @param {object} startingPosition - starting x and y for drawing
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 */

const drawGrid = ( startingPosition, currentMap ) => {

    setMapBorders( startingPosition, currentMap.mapData.rows, currentMap.mapData.columns)

    currentMap.topLeftCell = mapHelpers.getTopLeftCellOfGridInCanvas( startingPosition.x, startingPosition.y )

    const position = startingPosition

    for ( var i = 0; i <= currentMap.mapData.rows; i++ ) {
        const currentRow = currentMap.mapData.grid[i]

        drawRow( currentMap, currentRow, position )

        position.y += globals.GRID_BLOCK_PX
        position.x = ( ( globals.CANVAS_COLUMNS - currentMap.mapData.columns ) / 2 ) * globals.GRID_BLOCK_PX
    }

}

/**
 * @function getMapBorders
 * 
 * set borders in currentMap
 * these will be used in movement.js to determine where characters can't pass through
 * this needs to be adapted to a few different types of map
 * for example: indoors, outdoors and non-square maps
 */

const setMapBorders = (gridStartingPosition, mapRows, mapColumns) => {
    state.currentMap.borders = { 
        top     : gridStartingPosition.y + ( globals.GRID_BLOCK_PX * .5 ),
        left    : gridStartingPosition.x,
        bottom  : gridStartingPosition.y + ( mapRows * globals.GRID_BLOCK_PX ) - globals.GRID_BLOCK_PX * .5 ,
        right   : gridStartingPosition.x + ( mapColumns * globals.GRID_BLOCK_PX )
    }
}

/** 
 * @function drawRow
 * Call @function drawTileInGridBlock for each column in this row
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {object} position - Starting x and y Canvas in pixels
 * @param {array} currentRow - Array with numbers representing a row
 */

const drawRow = ( currentMap, currentRow, position ) => {

    for ( var j = 0; j <= currentMap.mapData.columns; j++) {
        const currentTile = currentRow[j]

        drawTileInGridBlock( currentMap, currentTile, position )

        position.x += globals.GRID_BLOCK_PX
    }

}

/** 
 * @function drawTileInGridBlock
 * 
 * Handle non-numeric tile if necessary
 * Get blocksize and current tile xy in sheet from globals
 * Then draw the tile in block
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {integer} tile - number representing position of the tile in a tilesheet
 * @param {columns} startPositionInCanvas - Starting x and y Canvas in pixels
 */
const drawTileInGridBlock = ( currentMap, tile, startPositionInCanvas ) => {

    // if tile is E - empty...
    if ( tile === "E" ) {
        return 
    }

    // if tile is F - filler...
    if ( tile === "F" ) {
        tile = currentMap.mapData.fillerTile
    }

    const blockSize = globals.GRID_BLOCK_PX

    const tilePositionInSheet = globals.TILESHEET_GRID_XY_VALUES[ tile ]

    const ctx = utilFunctions.getBackCanvasContext()

    ctx.drawImage( 

        currentMap.tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        blockSize, blockSize,
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize
    )          

    // ctx methods down here are for testing purposes only

    for ( var i = 0; i < currentMap.mapData.blocked.length; i++ ) {
        if ( tile === currentMap.mapData.blocked[i] ) {
            currentMap.blockedXyValues.push( { 
                "FACING_UP": startPositionInCanvas.y + globals.GRID_BLOCK_PX,
                "FACING_RIGHT": startPositionInCanvas.x,
                "FACING_LEFT": startPositionInCanvas.x + globals.GRID_BLOCK_PX,
                "FACING_DOWN": startPositionInCanvas.y
            } )

            ctx.fillStyle = "red"

            ctx.fillRect( 
                startPositionInCanvas.x, startPositionInCanvas.y,
                blockSize, blockSize 
            )
        }
    }

    ctx.strokeRect( 
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize 
    )        


    ctx.fillStyle = "gold"
    ctx.font = "17.5px Georgia";
    ctx.fillText(
        tile,
        (startPositionInCanvas.x + 9.25), 
        (startPositionInCanvas.y + 18.5)
    )

}

module.exports = {
    fetchMapJsonWithCallback
}
