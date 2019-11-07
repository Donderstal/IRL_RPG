
const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

/** 
 * @function getStartingPositionOfGridInCanvas
 * Fetch JSON file with data of overworlds or subworlds
 * Call generateOveworld() when ready
 * @param {string} worldName - Name of overworld written as follows: 'overworld/subworld'
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
 * Master function which calls all overworld rendering functionalities
 * @param {Object} json - JSON containing data of an overworld
 */

const generateOverworld = (json) => {

    const startingPos = getStartingPositionOfGridInCanvas( json.dimensions )

    let bgImage = new Image()

    let tileSheet = '/static/tilesets/' + json.sheet.src      //tilesheet
    

    bgImage.onload = ( ) => {      
        drawGrid( startingPos, json, bgImage )
    }

    bgImage.src = tileSheet
    
}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * @param {object} dimensions - width and height of overworld expressed in grid blocks
 * @return {object} - top and left position in Canvas to start drawing grid in px 
 */

const getStartingPositionOfGridInCanvas = ( dimensions ) => {

    if ( dimensions.hori > globals.HORI_BLOCKS || dimensions.vert > globals.VERTI_BLOCKS ) {

        // helper function to be written for maps that are larger than 24 * 16 blocks
        // We need a way to determine what part of the map is rendered when
        // this will probably depend on the player character's entry point into the overworld

    }

    return {
        hori: ( ( globals.HORI_BLOCKS - dimensions.hori ) / 2 ) * globals.GRID_BLOCK_PX,
        vert: ( ( globals.VERT_BLOCKS - dimensions.vert ) / 2 )  * globals.GRID_BLOCK_PX
    }

}

const drawGrid = ( startPos, json, tileSheet ) => {

    console.log( 'Tilesheet is: ' + tileSheet)

    const position  = startPos
    const columns   = json.dimensions.hori
    const rows      = json.dimensions.vert
    const grid      = json.grid
    const sheetInfo =   json.sheet

    for ( var i = 0; i < rows; i++ ) {

        const row = grid[i]

        drawRow( columns, position, row, sheetInfo, tileSheet )

        position.vert += globals.GRID_BLOCK_PX

        position.hori = ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX

    }
    
}

const drawRow = ( columns, position, row, sheetInfo, tileSheet) => {

    for ( var j = 0; j < columns; j++) {

        drawGridBlock( position, row[j], sheetInfo, tileSheet )

        position.hori += globals.GRID_BLOCK_PX

    }

}

const drawGridBlock = ( position, tile, sheetInfo, tileSheet ) => {

    const blockSize = globals.GRID_BLOCK_PX

    const tilePositionInSheet = sheetInfo.dimensions[tile]

    console.log(tileSheet)
    console.log( position.hori, position.vert, tilePositionInSheet.x, tilePositionInSheet.y )

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
