
const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

/** 
 * @function fetchOverworldJsonWithCallback
 * Fetch JSON file with data based on path relative to overworlds folder
 * 
 * @param {string} worldName - Name of overworld written as follows: 'path/to/overworld'
 * @callback generateOveworld - Start overworld rendering with JSON data when fetch succeeds
 */

const fetchOverworldJsonWithCallback = (worldName) => {
    fetch('/static/overworlds/' + worldName +'.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then( (json) => {
           generateOverworld(json)
    })    
}


/** 
 * @function generateOverworld
 * MAIN FUNCTION
 * 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} json - JSON containing data on the overworld
 */

const generateOverworld = (json) => {

    const startingPos = getStartingPositionOfGridInCanvas( json.columns, json.rows )

    const bgImage = new Image();
    bgImage.src = '/static/tilesets/' + json.src
    bgImage.onload = ( ) => {      
        drawGrid( startingPos, json, bgImage )
    }

}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} dimensions - columns and rows of overworld expressed in grid blocks
 * @return {object} - top and left position in Canvas to start drawing grid ( in pixels ) 
 */

const getStartingPositionOfGridInCanvas = ( columns, rows ) => {
    if ( columns > globals.HORI_BLOCKS || rows > globals.VERTI_BLOCKS ) {

        // helper function to be written for maps that are larger than 24 * 16 blocks
        // We need a way to determine what part of the map is rendered when
        // this will probably depend on the player character's entry point into the overworld

    }

    return {

        x: ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX,
        y: ( ( globals.VERT_BLOCKS - rows ) / 2 )  * globals.GRID_BLOCK_PX

    }

}

/** 
 * @function drawGrid
 * Get number of columns and rows from JSON
 * Call @function drawRow for each row
 * 
 * @param {object} startPos - Starting x and y Canvas in pixels
 * @param {JSON} json - JSON containing data on the overworld
 * @param {object} tileSheet - tilesheet HTML image
 */

const drawGrid = ( startPos, json, tileSheet ) => {

    const position  = startPos
    const columns   = json.columns
    const rows      = json.rows

    for ( var i = 0; i < rows; i++ ) {

        const currentRow = json.grid[i]

        drawRow( columns, position, currentRow, tileSheet )

        position.y += globals.GRID_BLOCK_PX
        position.x = ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX
    }
    
}

/** 
 * @function drawRow
 * Call @function drawGridBlock for column in this row
 * 
 * @param {JSON} json - JSON containing data on the overworld
 * @param {columns} position - Starting x and y Canvas in pixels
 * @param {object} tileSheet - tilesheet HTML image
 */

const drawRow = ( columns, position, currentRow, tileSheet) => {

    for ( var j = 0; j < columns; j++) {

        const currentTile = currentRow[j]

        drawGridBlock( position, currentTile, tileSheet )

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
const drawGridBlock = ( startPositionInCanvas, tile, tileSheet ) => {

    const blockSize = globals.GRID_BLOCK_PX

    // The global TILESHEET_GRID_XY_VALUES is an array used to store the x and y...
    // ...position of single tiles in the tilesheet, which is always 4 tiles wide.
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
    fetchOverworldJsonWithCallback
}
