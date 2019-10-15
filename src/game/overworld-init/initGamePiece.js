function initGamePiece (
    x, y, cellSize, type
) {
    this.x          = x
    this.y          = y
    this.width      = cellSize,
    this.height     = cellSize,
    this.sprite     = getSprite( x, y )
    this.onKeyPress = handleKeyPress( this.x, this.y )

    return this
}

function handleKeyPress (  ) {

}

function getSprite( x, y ) {

    let bgImage = new Image()

    bgImage.onload = ( ) => {

        const canv = document.getElementsByTagName('canvas')[1]

        const ctx  = canv.getContext('2d')
        
        // temp measurements
        // must be replaced by dynamic stuff later
        ctx.drawImage(bgImage, 0, 0, 24, 24, x, y, 37, 37)                
    }

    bgImage.src =  './assets/chars/mani/mani-idle-run.png'      
}


module.exports = {
    initGamePiece
}