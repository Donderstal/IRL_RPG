const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

const gridGetter = () => {
    fetch('/static/overworlds/my-neighbourhood/my-house.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            return response.json()
        })
        .then( (json) => {
            console.log(json)
           generateOverworld(json)
        })    
}

const generateOverworld = (json) => {
    const tileSet = json.tileSet
    const startPos = getPositionOfGridInCanvas(json.dimensions.hori, json.dimensions.vert)
    drawGrid(startPos)
    
}

const getPositionOfGridInCanvas = (horizontalBlocks, verticalBlocks) => {
    console.log(horizontalBlocks, verticalBlocks)
    if ( horizontalBlocks > globals.HORI_BLOCKS || verticalBlocks > globals.VERTI_BLOCKS ) {
        // helper function to be written for maps that are larger than 24 * 16 blocks
    }

    return {
        horizontalStartingPoint: ( ( globals.HORI_BLOCKS - horizontalBlocks ) / 2 ) * globals.GRID_BLOCK_PX,
        verticalStartingPoint: ( ( globals.VERT_BLOCKS - verticalBlocks ) / 2 )  * globals.GRID_BLOCK_PX
    }
}

const drawGrid = (startPos) => {

    console.log(startPos)
    
    let bgImage = new Image()

    let imageSrc = '/static/gridExp.jpg'     

    bgImage.onload = ( ) => {
        const ctx = utilFunctions.getBackCanvasContext()
        console.log('yeah!!!')
        ctx.drawImage(bgImage, startPos.horizontalStartingPoint, startPos.verticalStartingPoint, globals.GRID_WIDTH, globals.GRID_HEIGHT)                
    }

    bgImage.src = imageSrc
}

module.exports = {
    gridGetter
}