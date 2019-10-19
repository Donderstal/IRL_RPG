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
            cell    : getGridLocation( x, y )
        }

        // The three following properties have arbitray values (for now)
        this.width      = (cellSize / 3) * 4;
        this.height     = cellSize * 2;
        this.spriteSize = 24
        //
        this.ctx        = getCanvasContext( )
        this.sprite     = getSprite( x, y )    
        this.getXY      = ( ) => {
            return this.xy
        }
        this.updateXY   = ( newX, newY ) => {
            this.xy.x       = newX
            this.xy.y       = newY
            this.xy.cell    = getGridLocation( newX, newY )
        }     
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

const getGridLocation = ( x, y ) => {
    console.log("Grid location! X is " + x + ", Y is " + y)
    return x + ", " + y
}

const getCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[1]

    let ctx = canv.getContext('2d')

    return ctx
}


module.exports = {
    initGamePiece
}