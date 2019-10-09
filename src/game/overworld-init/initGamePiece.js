function initGamePiece (
    x, y, cellSize, type
) {
    this.x          = x
    this.y          = y
    this.width      = cellSize,
    this.height     = cellSize,
    this.sprite     = getSprite( x, y )
    this.onKeyPress = handleKeyPress( this.x, this.y )
}

function handleKeyPress (  ) {

}

function getSprite( x, y ) {

    let bgImage = new Image()

    bgImage.onload = ( ) => {

        const canv = document.getElementsByTagName('canvas')[0]

        const ctx  = canv.getContext('2d')

        ctx.drawImage(bgImage, x, y, x * 2, y * 2)                
    }

    bgImage.src =  './images/test-sprite.png'   
}


module.exports = {
    initGamePiece
}