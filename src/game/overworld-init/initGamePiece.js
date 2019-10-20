const util = require('../../helpers/utilFunctions')

const initGamePiece  = ( x, y, cellSize, type ) => {
    return new gamePiece(  x, y, cellSize )
}

// The gamePiece class will be assigned to all overworld characters in the game
// Changes on 

class gamePiece {
    constructor ( x, y, cellSize ) {
        // XY object to determine location
        // Cells will be used to determine the location 
        // of the character in the overworld
        this.xy         = { 
            x       : x, 
            y       : y,
            cell    : getGridLocation
        }

        // The three following properties have arbitray values (for now)
        this.width      = cellSize;
        this.height     = cellSize * 1.5;
        this.animLoop   = [ 0, 1, 2, 3]
        this.animIterator   = 0
        this.direction  = 0;
        this.ctx        = util.getFrontCanvasContext( )
        this.spriteSize = { 
            width: 48,
            height: 64
        }
        this.sprite     = getSprite( x, y, this.spriteSize )    
        this.getXY      = ( ) => {
            return this.xy
        }
    }
}

const getSprite = ( x, y, spriteSize ) => {

    let bgImage = new Image()

    bgImage.onload = ( ) => {
        var ctx = util.getFrontCanvasContext( ) 
        ctx.drawImage(bgImage, 0, 0, spriteSize.width, spriteSize.height, x, y, 37, 37)                
    }

    bgImage.src =  './images/practice-sheet-1.png'      

    return bgImage
}

const getGridLocation = ( x, y ) => {
    return x + ", " + y
}

module.exports = {
    initGamePiece
}