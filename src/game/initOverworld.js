const overWorld = require('../helpers/overWorldInfo/overWorlds.json')

function initCanvas() {
    const gameCanvas    = document.createElement('canvas');
    gameCanvas.className = 'game-gfx-body'
    gameCanvas.id       = 'game-canvas'
    document.getElementsByClassName('game-gfx-container')[0].appendChild(gameCanvas)
    const ctx           = gameCanvas.getContext('2d')
    ctx.canvas.height   = 592
    ctx.canvas.width    = 888

    drawMap( ctx, ctx.canvas.width, ctx.canvas.height, overWorld )

    return ctx
}

function drawGrid(ctx, canvWidth, canvHeight, overWorld) {
    const vertiGrid = canvHeight / 16
    const horiGrid  = canvWidth / 24
    let vertAccumulator = 0
    let horiAccumulator = 0

    let currWorld = overWorld.overworld1

    for ( var i = 0; i < 16; i++ ) {
        horiAccumulator = 0
        const currWorldRow = currWorld[ i + 1 ]

        if ( i !== 0) {
            vertAccumulator += vertiGrid                
        }

        for ( var j = 0; j < 24; j++ ) {
            let bgImage = new Image()

            let imageSrc = currWorldRow[ j + 1 ]       
            
            bgImage.id = i + "-" + j
            
            bgImage.onload = ( ) => {
                let vertPos = ( bgImage.id.split("-")[0] * 37 )
                let horiPos = ( bgImage.id.split("-")[1] * 37 )
                ctx.drawImage(bgImage, horiPos, vertPos, horiGrid, vertiGrid)                
            }

            bgImage.src = imageSrc
            ctx.beginPath()
            ctx.rect(horiAccumulator, vertAccumulator, horiGrid, vertiGrid)
            ctx.stroke()
            horiAccumulator += horiGrid
        }

    }
}

function drawMap(ctx, canvWidth, canvHeight, overWorld) {
    let bgImage = new Image()

    let imageSrc = './images/gridExp.jpg'     
    
    bgImage.onload = ( ) => {
        ctx.drawImage(bgImage, 0, 0, canvWidth, canvHeight)                
    }

    bgImage.src = imageSrc
}

module.exports = {
    initCanvas
}