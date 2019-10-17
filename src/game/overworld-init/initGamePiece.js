const initGamePiece  = function(
    x, y, cellSize, type
) {
    this.x          = x
    this.y          = y
    this.width      = (cellSize / 3) * 4,
    this.height     = cellSize * 2,
    this.spriteSize = 24,
    this.ctx        = getCanvasContext( ),
    this.sprite     = getSprite( x, y )

    return this
}

const getSprite = function( x, y ) {

    let bgImage = new Image()

    bgImage.onload = ( ) => {
    console.log('yo')
        var ctx = getCanvasContext () 
        // temp measurements
        // must be replaced by dynamic stuff later
        ctx.drawImage(bgImage, 0, 0, 24, 24, x, y, 37, 37)                
    }

    bgImage.src =  './assets/chars/mani/mani-idle-run.png'      

    return bgImage
}

const getCanvasContext = function() {
    let canv = document.getElementsByTagName('canvas')[1]

    let ctx = canv.getContext('2d')

    return ctx
}


module.exports = {
    initGamePiece
}