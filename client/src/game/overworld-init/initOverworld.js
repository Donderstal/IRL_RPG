const globals       = require('../../game-data/globals')
const utilFunctions = require('../../helpers/utilFunctions')

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
    drawGrid
}