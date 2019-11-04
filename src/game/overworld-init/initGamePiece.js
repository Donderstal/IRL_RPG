const util = require('../../helpers/utilFunctions')

const initGamePiece  = ( cellSize ) => {
    return new gamePiece(  cellSize )
}

// The gamePiece class will be assigned to all overworld characters in the game

class gamePiece {
    constructor ( cellSize ) {

        // XY object to determine location
        // Cells will be used to determine the location 
        // of the character in the overworld
        // still experimental
        this.xy             = { 
            x       : cellSize, 
            y       : cellSize,
            cell    : cellSize + ', ' + cellSize
        }

        // The three following properties have arbitrary values (for now)
        this.width          = cellSize;
        this.height         = cellSize * 1.5;
        this.animLoop       = [ 0, 1, 2, 3]

        this.animIterator   = 0
        this.direction      = 0;

        this.ctx            = util.getFrontCanvasContext( )
        this.sprite         = getSprite( cellSize, cellSize, this.width, this.height )    
        this.getXY          = ( ) => {
            return this.xy
        }
    }
}

const getSprite = ( x, y, width, height ) => {

    console.log( x, y, width, height )

    let newSprite = new Image()

    newSprite.onload = ( ) => {
        var ctx = util.getFrontCanvasContext( ) 
        ctx.drawImage(newSprite, 0, 0, 74, 74, x, y, width, height)                
    }

    // this should be made dynamic at some point
    newSprite.src =  './sprites-and-tiles/sprites/animation_guy.png'      

    return newSprite
}

module.exports = {
    initGamePiece
}