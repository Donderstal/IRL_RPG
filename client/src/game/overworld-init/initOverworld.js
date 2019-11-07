
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

    drawGrid(startingPos)
    
}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * @param {object} dimensions - width and height of overworld expressed in grid blocks
 * @return {object} - top and left position in Canvas to start drawing grid in px 
 */

const getStartingPositionOfGridInCanvas = ( dimensions ) => {
    console.log( dimensions )
    if ( dimensions.hori > globals.HORI_BLOCKS || dimensions.vert > globals.VERTI_BLOCKS ) {

        // helper function to be written for maps that are larger than 24 * 16 blocks
        // We need a way to determine what part of the map is rendered when
        // this will probably depend on the player character's entry point into the overworld

    }

    return {
        horizontalStartingPoint: ( ( globals.HORI_BLOCKS - dimensions.hori ) / 2 ) * globals.GRID_BLOCK_PX,
        verticalStartingPoint: ( ( globals.VERT_BLOCKS - dimensions.vert ) / 2 )  * globals.GRID_BLOCK_PX
    }
}

const drawGrid = (startPos) => {
    
    let bgImage = new Image()

    let imageSrc = '/static/gridExp.jpg'     

    bgImage.onload = ( ) => {
        const ctx = utilFunctions.getBackCanvasContext()
        ctx.drawImage(bgImage, startPos.horizontalStartingPoint, startPos.verticalStartingPoint, globals.GRID_WIDTH, globals.GRID_HEIGHT)                
    }

    bgImage.src = imageSrc
}

module.exports = {
    fetchOverworldJsonWithCallback
}
