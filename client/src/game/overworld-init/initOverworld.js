
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

    drawGrid( startingPos, json )
    
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

const drawGrid = ( startPos, json ) => {

    const position    = startPos
    const columns   = json.dimensions.hori
    const rows      = json.dimensions.vert
    const grid      = json.grid
    const tileset   = json.tileSet

    for ( var i = 0; i < rows; i++ ) {

        const row = grid[i] 

        console.log(row)

        drawRow( columns, position, row, tileset )

        position.vert += globals.GRID_BLOCK_PX

        position.hori = ( ( globals.HORI_BLOCKS - columns ) / 2 ) * globals.GRID_BLOCK_PX

    }
    
}

const drawRow = ( columns, position, row, tileset ) => {

    for ( var j = 0; j < columns; j++) {

        drawGridBlock( position, row[j], tileset )

        position.hori += globals.GRID_BLOCK_PX

    }

}

const drawGridBlock = ( position, tile, tileset ) => {
    let bgImage = new Image()
    bgImage.hori = position.hori
    bgImage.vert = position.vert

    let imageSrc = '/static/tilesets/' + tileset + '/Tile0' + tile + '.png'      //tile 
    

    bgImage.onload = ( ) => {      

        console.log( imageSrc, bgImage.hori, bgImage.vert )
        const ctx = utilFunctions.getBackCanvasContext()
        ctx.drawImage( bgImage, bgImage.hori, bgImage.vert, globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX)   

    }

    bgImage.src = imageSrc
}

module.exports = {
    fetchOverworldJsonWithCallback
}
