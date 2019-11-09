
const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

/** 
 * @function fetchMapJsonWithCallback
 * Fetch JSON file with data based on path relative to Maps folder
 * 
 * @param {string} worldName - Name of Map written as follows: 'path/to/Map'
 * @callback generateOveworld - Start Map rendering with JSON data when fetch succeeds
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
           generateMap(json)
    })    
}


/** 
 * @function generateMap
 * MAIN FUNCTION
 * 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} json - JSON containing data on the Map
 */

const generateMap = (json) => {

    const startingPosition = getStartingPositionOfGridInCanvas( json.columns, json.rows )

    const bgImage = new Image();
    bgImage.src = '/static/tilesets/' + json.src
    bgImage.onload = ( ) => {      
        drawGrid( startingPosition, json, bgImage )
    }

}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} dimensions - columns and rows of Map expressed in grid blocks
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
 * @param {object} startingPosition - Starting x and y position in backgroundCanvas ( pixels )
 * @param {JSON} json - JSON containing data on the Map to be brawn
 * @param {object} tileSheet - tilesheet HTML image
 */

const drawGrid = ( startingPosition, json, tileSheet ) => {

    const position   = startingPosition
    const columns    = json.columns
    const rows       = json.rows
    const fillerTile = json.fillerTile

    for ( var i = 0; i < rows; i++ ) {
        const currentRow = json.grid[i]

        drawRow( columns, position, currentRow, tileSheet, fillerTile )

        position.y += globals.GRID_BLOCK_PX
        position.x = ( ( globals.CANVAS_COLUMNS - columns ) / 2 ) * globals.GRID_BLOCK_PX
    }
    
}

/** 
 * @function drawRow
 * Call @function drawGridBlock for column in this row
 * 
 * @param {JSON} json - JSON containing data on the Map
 * @param {columns} position - Starting x and y Canvas in pixels
 * @param {object} tileSheet - tilesheet HTML image
 */

const drawRow = ( columns, position, currentRow, tileSheet, fillerTile ) => {

    for ( var j = 0; j < columns; j++) {
        const currentTile = currentRow[j]

        drawGridBlock( position, currentTile, tileSheet, fillerTile )

        position.x += globals.GRID_BLOCK_PX
    }

}

/** 
 * @function drawRow
 * Get blocksize and tile position in sheet from globals
 * Then draw block based on starting position in canvas and blocksize
 * 
 * @param {columns} startPositionInCanvas - Starting x and y Canvas in pixels
 * @param {integer} tile - Integer representing a tile position in the sheet
 * @param {object} tileSheet - tilesheet HTML image
 */
const drawGridBlock = ( startPositionInCanvas, tile, tileSheet, fillerTile ) => {

    // if tile is E - empty...
    if ( tile === "E" ) {
        return 
    }

    // if tile is F - filler...
    if ( tile === "F" ) {
        tile = fillerTile
    }

    const blockSize = globals.GRID_BLOCK_PX

    const tilePositionInSheet = globals.TILESHEET_GRID_XY_VALUES[ tile ]

    const ctx = utilFunctions.getBackCanvasContext()

    ctx.drawImage( 

        tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        blockSize, blockSize,
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize,
    ) 

}

module.exports = {
    fetchMapJsonWithCallback
}
