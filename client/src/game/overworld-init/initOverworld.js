
const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

/** 
 * @function fetchOverworldJsonWithCallback
 * Fetch JSON file with data based on path relative to overworlds folder
 * @param {string} worldName - Name of overworld written as follows: 'path/to/overworld'
 * @callback generateOveworld - Start overworld rendering with JSON data
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
 * Main function
 * Call @function getStartingPositionOfGridInCanvas to get pixels values to start drawing
 * When tilesheet has been loaded based on the path in the json file, call @function drawGrid
 * @param {Object} json - JSON containing data of an overworld
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

        hori: ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX,
        vert: ( ( globals.VERT_BLOCKS - rows ) / 2 )  * globals.GRID_BLOCK_PX

    }

}

/** 
 * @function drawGrid
 * 
 * @param {object} startPos - columns and rows of overworld expressed in grid blocks
 * @param {JSON} json - columns and rows of overworld expressed in grid blocks
 * @param {object} tileSheet - columns and rows of overworld expressed in grid blocks
 */

const drawGrid = ( startPos, json, tileSheet ) => {

    const position  = startPos
    const columns   = json.columns
    const rows      = json.rows

    for ( var i = 0; i < rows; i++ ) {

        const currentRow = json.grid[i]

        drawRow( columns, position, currentRow, tileSheet )

        position.vert += globals.GRID_BLOCK_PX
        position.hori = ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX
    }
    
}

const drawRow = ( columns, position, currentRow, tileSheet) => {

    for ( var j = 0; j < columns; j++) {

        const currentTile = currentRow[j]

        drawGridBlock( position, currentTile, tileSheet )

        position.hori += globals.GRID_BLOCK_PX
    }

}

const drawGridBlock = ( position, tile, tileSheet ) => {

    const blockSize = globals.GRID_BLOCK_PX

    // The global TILESHEET_GRID_XY_VALUES is used to represent the x and y position...
    // of tiles in a tilesheet. A tilesheet is always 4 blocks wide.
    // Using the global, we won't have to type more or less the same info... 
    // ...in each overworld JSON file individually
    const tilePositionInSheet = globals.TILESHEET_GRID_XY_VALUES[ tile ]

    const ctx = utilFunctions.getBackCanvasContext()
    ctx.drawImage( 
        tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        blockSize, blockSize,
        position.hori, position.vert,
        blockSize, blockSize,
    )   
}

module.exports = {
    fetchOverworldJsonWithCallback
}
