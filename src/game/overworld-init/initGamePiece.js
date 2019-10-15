function initGamePiece (
    x, y, cellSize, type
) {
    this.x          = x
    this.y          = y
    this.width      = cellSize,
    this.height     = cellSize,
    this.spriteSize = 24,
    this.ctx        = getCanvasContext( ),
    this.sprite     = getSprite( )

    return this
}

function getSprite( ) {

    let bgImage = new Image()

    bgImage.src =  './assets/chars/mani/mani-idle-run.png'      

    return bgImage
}

function getCanvasContext () {
    let canv = document.getElementsByTagName('canvas')[1]

    let ctx  = canv.getContext('2d')

    return ctx
}


module.exports = {
    initGamePiece
}