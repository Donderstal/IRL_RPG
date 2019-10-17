const initGamePiece  = ( x, y, cellSize, type ) => {

    return gamePiece = {
        x          : x,
        y          : y,
        width      : (cellSize / 3) * 4,
        height     : cellSize * 2,
        spriteSize : 24,
        ctx        : getCanvasContext( ),
        sprite     : getSprite( x, y )        
    }
    
}

const getSprite = ( x, y ) => {

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

const getCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[1]

    let ctx = canv.getContext('2d')

    return ctx
}


module.exports = {
    initGamePiece
}