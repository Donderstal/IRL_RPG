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
    const startPos = getPositionOfGrid(json.dimensions.horizontal, json.dimensions.vertical)
    drawGrid(startPos)
}

const getPositionOfGrid = (horizontalBlocks, verticalBlocks) => {
    console.log(horizontalBlocks, verticalBlocks)
    if ( horizontalBlocks > 24 || verticalBlocks > 16 ) {
        // helper function to be written for maps that are larger than 24 * 16 blocks
    }

    return {
        horizontalStartingPoint: horizontalBlocks * globals.GRID_BLOCK_PX,
        verticalStartingPoint: verticalBlocks * globals.GRID_BLOCK_PX
    }
}

const drawGrid = (startPos) => {
    
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